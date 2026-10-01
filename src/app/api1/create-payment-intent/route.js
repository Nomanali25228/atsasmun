import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // ✅ inside function

    const {
      amount,
      couponCode,
      discount,
      originalAmount,
      customerName,
      customerEmail,
      userId,
      customerId,
      destination,
    } = await request.json();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }

    const numAmount = Number(amount);
    const amountInCents = numAmount > 10000 ? Math.round(numAmount) : Math.round(numAmount * 100);

    const intentPayload = {
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerName: customerName || "Anonymous",
        customerEmail: customerEmail || "None",
        userId: userId ? String(userId) : "None",
        customerId: customerId || "None",
        destination: destination || "Istanbul, Turkey",
        couponCode: couponCode || "None",
        discount: discount ? `$${discount}` : "$0",
        originalAmount: originalAmount ? `$${originalAmount}` : `$${(amountInCents / 100).toFixed(2)}`,
      },
    };

    if (customerEmail && typeof customerEmail === "string" && customerEmail.includes("@")) {
      intentPayload.receipt_email = customerEmail.trim().toLowerCase();
    }

    if (customerName && typeof customerName === "string" && customerName.trim()) {
      intentPayload.description = `ATSASMUN Registration Fee - ${customerName.trim()}`;
    } else {
      intentPayload.description = `ATSASMUN Registration Fee`;
    }

    const paymentIntent = await stripe.paymentIntents.create(intentPayload);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
