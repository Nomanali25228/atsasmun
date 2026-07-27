"use client";

import React, { useContext,  useState } from "react";
import { IoPlayOutline } from "react-icons/io5";
import Link from "next/link";
import ContextPage from "@/app/Context/ContextPage";
import Navbar from "../navbar/Navbar";
import ParticleCanvas from "../ParticleCanvas";

export default function Dubaih(props) {
  const {
    bgImage,
    tital,
    Pricelink,
    StartDays,
    EndDays,
    monthsDetils,
  } = props;

  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const { setCheck } = useContext(ContextPage);

 
  return (
    <div id="banner" className="relative overflow-hidden">

  <Navbar />

  {/* Background Section */}
  <div
    className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat text-white"
    style={{ backgroundImage: `url(${bgImage.src})` }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-[#060713] bg-opacity-80 pointer-events-none z-0"></div>

    {/* Content */}
    <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center select-text">
      
      <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px] xl:text-[64px] font-bold leading-tight text-center sm:text-left">
        ATSAS MUN <br />
        <div className="sm:flex items-center">
          <span style={{ color: '#FF5A5F' }}>{tital}</span>
        </div>
      </h1>

      <p className="mt-6 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-center sm:text-left">
        {StartDays === 'Coming Soon' ? 'Coming Soon' : `${StartDays} – ${EndDays} ${monthsDetils}`}
      </p>

      <p className="mt-2 text-[16px] sm:text-[18px] md:text-[20px] text-center sm:text-left">
        {tital}
      </p>

      <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-center sm:items-start">
        <Link href="/RegisterNow">
          <button className="atsas-btn-solid">Register Now →</button>
        </Link>
        <Link href={Pricelink}>
          <button className="atsas-btn-outline">Pricing →</button>
        </Link>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-auto">
      <span className="text-xs tracking-widest mb-2 text-gray-300 select-none">
        SCROLL
      </span>

      <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
        <span className="w-1 h-2 bg-gray-300 rounded-full mt-2 animate-scroll"></span>
      </div>
    </div>

    {/* Particle Canvas Background */}
    <div className="absolute inset-0 z-0">
      <ParticleCanvas />
    </div>

  </div>

  {/* Scroll Animation */}
  <style jsx>{`
    @keyframes scroll {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(12px);
        opacity: 0;
      }
    }

    .animate-scroll {
      animation: scroll 1.4s infinite;
    }
  `}</style>

</div>

  );
}
