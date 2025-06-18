"use client";
import CheckoutPage from "@/app/(component)/CheckoutPage/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect } from "react";
import ContextPage from "../Context/ContextPage";
import { useRouter } from "next/navigation";
import ParticleCanvas from "@/app/(component)/ParticleCanvas";
import bg from "@/app/public/img/HPbg1.jpeg"; // Hero background

// Helper function
function convertToSubcurrency(amount, factor = 100) {
  return Math.round(amount * factor);
}

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const { amounts } = useContext(ContextPage);
  const router = useRouter();

  // Redirect if invalid amount
  useEffect(() => {
    const storedAmount = localStorage.getItem("amounts");
    if (!storedAmount || parseFloat(storedAmount) <= 0) {
      router.push("/");
    }
  }, [amounts, router]);

  // ✅ Remove amounts ONLY on page exit (tab close or reload)
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("amounts");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const amount = amounts || 0;

  if (!amounts || amounts <= 0) {
    return null;
  }

  return (
    <header
      className="relative bg-cover bg-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#060713] bg-opacity-80"></div>

      <main className="max-w-5xl mx-auto relative z-10 py-14 px-2 text-gray-50 text-center">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 text-white drop-shadow-md">Payment Request</h1>
          <h2 className="text-xl md:text-2xl font-medium">
            <span className="block md:inline">ATSAS MUN</span>
            <span className="font-bold text-yellow-400"> ${amount}</span>
          </h2>
        </div>

        <div className="bg-white text-black rounded-lg shadow-md p-2 md:p-6 lg:p-10">
          <h3 className="text-lg font-semibold mb-4">Please Complete Your Payment</h3>
          <Elements
            stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount),
              currency: "usd",
            }}
          >
            <CheckoutPage amount={amount} />
          </Elements>
        </div>
      </main>

      <ParticleCanvas />
    </header>
  );
}
