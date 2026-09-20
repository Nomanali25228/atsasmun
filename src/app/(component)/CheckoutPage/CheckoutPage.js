"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutPage = ({ amount, originalAmount, appliedCoupon }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setInitLoading(true);
    setErrorMessage("");

    fetch("/api1/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(amount),
        couponCode: appliedCoupon?.code || null,
        discount: appliedCoupon?.discount || 0,
        originalAmount: originalAmount || amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else if (data.error) {
          setErrorMessage(data.error);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setErrorMessage("Failed to initialize payment form. Please try again.");
      })
      .finally(() => {
        if (isMounted) setInitLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [amount, appliedCoupon, originalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements || !clientSecret) {
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const returnUrl = `${
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "http://localhost:3000"
    }/payment-success?amount=${amount}`;

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem("amounts");
      }
    }
  };

  if (initLoading || !clientSecret || !stripe || !elements) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-300">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2EC4B6] border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="text-xs text-gray-400 mt-3">Loading secure payment form...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-transparent">
      <PaymentElement />

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
          ⚠️ {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 py-4 px-6 bg-[#060713] hover:bg-[#1B1E3D] text-white rounded-xl font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-e-transparent"></span>
            <span>Processing Payment...</span>
          </>
        ) : (
          <span>Pay ${Number(amount).toFixed(2)} USD</span>
        )}
      </button>
    </form>
  );
};

export default CheckoutPage;