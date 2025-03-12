'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti'; // For celebration effect
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background 
import Link from 'next/link'; // Import Link for navigation
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import ParticleCanvas from "@/app/(component)/ParticleCanvas";
import { Suspense } from 'react'; // Import Suspense

function PaymentSuccessContent() {
  const searchParams = useSearchParams(); // Get search params using the hook
  const amount = searchParams.get('amount'); // Access the 'amount' query parameter

  // Trigger confetti and fireworks on mount
  useEffect(() => {
    const triggerConfetti = () => {
      // Main confetti explosion for fireworks-like effect
      confetti({
        particleCount: 300, 
        spread: 50, 
        origin: { y: 0.8 }, 
        colors: ['#FFD700', '#FF4500', '#00FFFF', '#FF1493', '#FFFFFF'],
        gravity: 0.5,
        scalar: 1.2,
      });

      // Rocket-like firework effect
      const interval = setInterval(() => {
        confetti({
          particleCount: 10,
          spread: 15,
          startVelocity: 25,
          origin: { y: 1, x: Math.random() },
          gravity: 0.25,
          colors: ['#FF6347', '#FFD700', '#FFFF00'],
          angle: 90,
          drift: 0.1,
          scalar: 1.5,
        });
      }, 50);

      // Stop the rocket effect after 2 seconds
      setTimeout(() => {
        clearInterval(interval);
      }, 2000);
    };

    triggerConfetti();
  }, []);

  return (
    <header
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#060713] bg-opacity-80"></div>

      <main className="max-w-4xl relative z-10 mx-auto px-8 py-16 text-center">
        <div className="mb-12">
          <h1 className="text-6xl font-black mb-6 drop-shadow-xl text-yellow-400 animate-bounce">
            Thank You!
          </h1>
          <h2 className="text-3xl md:text-4xl font-medium text-gray-200 drop-shadow-lg mb-6">
            Your payment was successfully sent
          </h2>

          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-4 px-8 mt-6 rounded-lg shadow-xl inline-block">
            <span className="text-5xl md:text-6xl font-extrabold tracking-wide">
              ${amount}
            </span>
          </div>
        </div>

        {/* Celebrate Section */}
        <p className="text-lg md:text-xl text-gray-300 mt-8">
          We appreciate your support! You{"’"}re awesome! 🎉
        </p>

        {/* Back to Home Button */}
        <div className="mt-12">
          <Link href="/" passHref>
            <button className="px-8 py-3 text-xl font-semibold text-white bg-purple-600 hover:bg-purple-800 rounded-full shadow-lg transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
      <ParticleCanvas />
    </header>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
