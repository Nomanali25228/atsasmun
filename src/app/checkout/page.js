"use client";
import CheckoutPage from "@/app/(component)/CheckoutPage/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import ContextPage from "../Context/ContextPage";
import { useRouter } from "next/navigation";
import ParticleCanvas from "@/app/(component)/ParticleCanvas";
import bg from "@/app/public/img/HPbg1.jpeg"; // Hero background
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function convertToSubcurrency(amount, factor = 100) {
  return Math.round(Number(amount) * factor);
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const { amounts } = useContext(ContextPage);
  const router = useRouter();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Redirect if invalid amount
  useEffect(() => {
    const storedAmount = localStorage.getItem("amounts");
    const activeAmount = amounts || (storedAmount ? parseFloat(storedAmount) : 0);
    if (!activeAmount || activeAmount <= 0) {
      router.push("/");
    }
  }, [amounts, router]);

  // Keep amounts in localStorage synced
  useEffect(() => {
    if (amounts && amounts > 0) {
      localStorage.setItem("amounts", amounts);
    }
  }, [amounts]);

  const rawAmount = amounts || (typeof window !== "undefined" ? parseFloat(localStorage.getItem("amounts") || 0) : 0);
  const baseAmount = Number(rawAmount) || 0;

  const finalAmount = appliedCoupon
    ? Math.max(0, baseAmount - appliedCoupon.discount)
    : baseAmount;

  if (baseAmount <= 0) {
    return null;
  }

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponLoading(true);
    setCouponError("");

    try {
      const res = await fetch("/api1/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: couponInput.trim(),
          amount: baseAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setCouponError(data.error || "Invalid coupon code");
        setAppliedCoupon(null);
      } else {
        setAppliedCoupon(data);
        setCouponError("");
        toast.success(data.message || `Coupon "${data.code}" applied!`);
      }
    } catch (err) {
      setCouponError("Could not verify coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
    toast.info("Coupon removed.");
  };

  return (
    <header
      className="relative bg-cover bg-center min-h-screen text-white pb-16"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: "fixed",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <div className="absolute inset-0 bg-[#060713] bg-opacity-85"></div>

      <main className="max-w-4xl mx-auto relative z-10 py-12 px-4 text-gray-50">
        {/* Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3 text-xs uppercase tracking-widest text-[#2EC4B6] hover:underline">
            ← Back to ATSASMUN
          </Link>
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-white drop-shadow-md">
            Complete Your Registration Payment
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Secure, encrypted checkout powered by Stripe
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Summary & Coupon */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="rounded-2xl p-6 shadow-xl"
              style={{
                background: "#1B1E3D",
                border: "1px solid rgba(245,241,232,0.14)",
                color: "#F5F1E8",
              }}
            >
              <h3 className="text-lg font-bold mb-4 pb-2 border-b border-gray-700/60 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-normal text-gray-400">ATSAS MUN</span>
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Selected Package</span>
                  <span className="font-semibold text-white">${baseAmount.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-[#2EC4B6] font-semibold bg-[#2EC4B6]/10 px-3 py-2 rounded-lg border border-[#2EC4B6]/20">
                    <span className="flex items-center gap-1.5 text-xs">
                      🎟️ Coupon ({appliedCoupon.code})
                    </span>
                    <span>-${appliedCoupon.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-700/60 flex justify-between items-center">
                  <div>
                    <span className="text-base font-bold text-white block">Total Amount</span>
                    <span className="text-xs text-gray-400">USD (Tax included)</span>
                  </div>
                  <span className="text-3xl font-extrabold text-[#F2B705] drop-shadow-sm">
                    ${finalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Input Box */}
              <div className="mt-6 pt-5 border-t border-gray-700/60">
                {!appliedCoupon ? (
                  <form onSubmit={handleApplyCoupon}>
                    <label className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                      Promo / Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponError("");
                        }}
                        placeholder="e.g. AMIS26"
                        className="flex-1 bg-[#0c0e1e] border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2EC4B6] uppercase tracking-wider font-mono"
                      />
                      <button
                        type="submit"
                        disabled={couponLoading || !couponInput.trim()}
                        className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-[#2EC4B6] hover:bg-[#25a99c] text-[#060713] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {couponLoading ? "Applying..." : "Apply"}
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-xs text-[#FF5A5F] mt-2 flex items-center gap-1">
                        ⚠️ {couponError}
                      </p>
                    )}
                  </form>
                ) : (
                  <div className="flex items-center justify-between bg-[#2EC4B6]/15 border border-[#2EC4B6]/40 rounded-xl p-3.5">
                    <div>
                      <p className="text-xs font-bold text-[#2EC4B6] flex items-center gap-1">
                        ✓ {appliedCoupon.code} Applied
                      </p>
                      <p className="text-[11px] text-gray-300">
                        {appliedCoupon.couponName} · Save ${appliedCoupon.discount.toFixed(2)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs text-[#FF5A5F] hover:underline font-semibold px-2 py-1"
                    >
                      Remove ✕
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-xs text-gray-400 space-y-1 px-2">
              <p className="flex items-center gap-2">
                🔒 <span>256-bit SSL encrypted & secure Stripe checkout</span>
              </p>
              <p className="flex items-center gap-2">
                ✉️ <span>Confirmation & receipt sent directly to your email</span>
              </p>
            </div>
          </div>

          {/* Right Column: Stripe Payment Form */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl shadow-xl p-5 md:p-8"
              style={{
                background: "#1B1E3D",
                border: "1px solid rgba(245,241,232,0.14)",
                color: "#F5F1E8",
              }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center justify-between pb-2 border-b border-gray-700/60">
                <span>Payment Details</span>
                <span className="text-xs text-[#F2B705] font-bold">
                  Amount: ${finalAmount.toFixed(2)}
                </span>
              </h3>

              <Elements
                key={finalAmount}
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(finalAmount),
                  currency: "usd",
                }}
              >
                <CheckoutPage
                  amount={finalAmount}
                  originalAmount={baseAmount}
                  appliedCoupon={appliedCoupon}
                />
              </Elements>
            </div>
          </div>
        </div>
      </main>

      <ParticleCanvas />
    </header>
  );
}
