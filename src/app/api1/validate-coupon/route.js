import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { couponCode, amount } = await request.json();

    if (!couponCode || typeof couponCode !== "string" || !couponCode.trim()) {
      return NextResponse.json(
        { valid: false, error: "Please enter a coupon code." },
        { status: 400 }
      );
    }

    const codeToSearch = couponCode.trim();
    const baseAmount = Number(amount) || 0;

    let matchedCoupon = null;
    let matchedPromo = null;

    // 1. Try finding by Stripe Promotion Code (exact search)
    try {
      const promoList = await stripe.promotionCodes.list({
        code: codeToSearch,
        active: true,
        limit: 1,
      });

      if (promoList.data && promoList.data.length > 0) {
        matchedPromo = promoList.data[0];
        matchedCoupon = matchedPromo.coupon;
      }
    } catch (err) {
      console.log("Promo code exact search notice:", err.message);
    }

    // 2. Case-insensitive promo code search if exact match didn't find it
    if (!matchedCoupon) {
      try {
        const allActivePromos = await stripe.promotionCodes.list({
          active: true,
          limit: 100,
        });

        const foundPromo = allActivePromos.data.find(
          (p) => p.code && p.code.trim().toUpperCase() === codeToSearch.toUpperCase()
        );

        if (foundPromo) {
          matchedPromo = foundPromo;
          matchedCoupon = foundPromo.coupon;
        }
      } catch (err) {
        console.log("Promo code list search notice:", err.message);
      }
    }

    // 3. If still not found, check if it's a direct Coupon ID (e.g. OuJ5Q7BB)
    if (!matchedCoupon) {
      try {
        const directCoupon = await stripe.coupons.retrieve(codeToSearch);
        if (directCoupon && directCoupon.valid) {
          matchedCoupon = directCoupon;
        }
      } catch (err) {
        // Not a direct coupon ID, try listing coupons by name (e.g. ATSAS50)
        try {
          const couponList = await stripe.coupons.list({ limit: 50 });
          const found = couponList.data.find(
            (c) =>
              (c.name && c.name.trim().toUpperCase() === codeToSearch.toUpperCase()) ||
              (c.id && c.id.trim().toUpperCase() === codeToSearch.toUpperCase())
          );
          if (found && found.valid) {
            matchedCoupon = found;
          }
        } catch (e) {
          console.log("Coupon list search notice:", e.message);
        }
      }
    }

    // If no coupon found
    if (!matchedCoupon || !matchedCoupon.valid) {
      return NextResponse.json(
        {
          valid: false,
          error: `Coupon "${codeToSearch}" is not valid or has expired.`,
        },
        { status: 400 }
      );
    }

    // Check expiry
    if (matchedCoupon.redeem_by && matchedCoupon.redeem_by * 1000 < Date.now()) {
      return NextResponse.json(
        {
          valid: false,
          error: `Coupon "${codeToSearch}" has expired.`,
        },
        { status: 400 }
      );
    }

    // Check promo code expiry
    if (matchedPromo && matchedPromo.expires_at && matchedPromo.expires_at * 1000 < Date.now()) {
      return NextResponse.json(
        {
          valid: false,
          error: `Promotion code "${codeToSearch}" has expired.`,
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    let discountType = "fixed";

    if (matchedCoupon.amount_off) {
      // amount_off is in cents
      discountAmount = matchedCoupon.amount_off / 100;
      discountType = "fixed";
    } else if (matchedCoupon.percent_off) {
      discountAmount = Math.round((baseAmount * matchedCoupon.percent_off) / 100 * 100) / 100;
      discountType = "percent";
    }

    const finalAmount = Math.max(0, baseAmount - discountAmount);

    return NextResponse.json({
      success: true,
      valid: true,
      code: matchedPromo ? matchedPromo.code : (matchedCoupon.name || matchedCoupon.id),
      promoId: matchedPromo ? matchedPromo.id : null,
      couponId: matchedCoupon.id,
      couponName: matchedCoupon.name || matchedCoupon.id,
      discount: discountAmount,
      discountType,
      percentOff: matchedCoupon.percent_off || null,
      amountOff: matchedCoupon.amount_off ? matchedCoupon.amount_off / 100 : null,
      originalAmount: baseAmount,
      finalAmount: finalAmount,
      message: `Coupon "${matchedPromo ? matchedPromo.code : matchedCoupon.name || codeToSearch}" applied! $${discountAmount.toFixed(2)} off`,
    });
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      {
        valid: false,
        error: error.message || "Failed to validate coupon code.",
      },
      { status: 500 }
    );
  }
}
