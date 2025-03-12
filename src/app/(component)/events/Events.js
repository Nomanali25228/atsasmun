"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
// import bell from "@/app/public/img/ax1.webp";
import bell1 from "@/app/public/img/ax11.jpeg";
import bell2 from "@/app/public/img/az1.jpeg";
import bell3 from "@/app/public/img/ax13.jpeg";
import bell4 from "@/app/public/img/ax18.jpeg";
import bell5 from "@/app/public/img/ax15.jpeg";
import bell6 from "@/app/public/img/az6.jpeg";

import istanbul from '@/app/public/img/turkey.jpeg';
import dubai from "@/app/public/img/skyline.jpeg";
import malaysia from '@/app/public/img/kulua.jpg';
import london from '@/app/public/img/london.jpg';
import Switzerland from '@/app/public/img/geneva.jpg';
import paris from '@/app/public/img/paris.jpeg';
import ContextPage from "@/app/Context/ContextPage";
import Link from "next/link";



const cards = [
  {
    id: 1,
    nowOpen: "Registrations are now open!",
    title: "ATSASMUN Dubai, UAE",
    subtitle: "Dubai, UAE",
    description:
      "(April 17th-20th, 2025)",
    details:
      "Young leaders can take advantage of a futuristic platform provided by ATSASMUN in Dubai, which combines the city's cosmopolitan allure and forward-thinking perspective with the spirit of innovation.",
    image: bell2,
    icon: dubai,
  },
  {
    id: 2,
    nowOpen: "Registrations are now open!",
    title: "ATSASMUN Istanbul, Turkey",
    subtitle: "Istanbul, Turkey",
    description:
      "(June 05th-08th, 2025)",
    details:
      "Aspiring diplomatic leaders are invited to attend the ATSASMUN in Istanbul, which is located at the crossroads of civilizations. The city's rich cultural past offers global discourse an inspiration that is unmatched by any other.",
    image: bell1,
    icon: istanbul,
  },
  {
    id: 3,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN Kuala Lumpur, Malaysia ",
    subtitle: "Kuala Lumpur, Malaysia",
    description:
      "(May 1st-04th, 2025)",
    details:
      "A multicultural hub is present in Kuala Lumpur, where the participants of the ATSASMUN are immersed. This center embodies the harmony and variety that is important for future diplomacy.",
    image: bell3,
    icon: malaysia,
  },
  {
    id: 4,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN Paris, France",
    subtitle: "Paris, France",
    description:
      "(August 07th-10th, 2025)",
    details:
      "In the City of Light, which is a shining example of culture, art, and revolutionary ideas, the ATSASMUN in Paris connects delegates with the spirit of diplomacy.                                                                                        ",
    image: bell6,
    icon: paris,
  },
  {
    id: 5,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN Geneva, Switzerland ",
    subtitle: "Geneva, Switzerland",
    description:
      "(July 3rd-06th, 2025)",
    details:
      "Young diplomats are placed at the center of international relations through the ATSASMUN in Geneva, which is inspired by the city of Geneva, which is well-known for its role in peacebuilding and worldwide cooperation.",
    image: bell5,
    icon: Switzerland,

  },
  {
    id: 6,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN London, UK",
    subtitle: "London, UK",
    description:
      "(June 12th-15th, 2025)",
    details:
      "An iconic stage for the leaders of the future is provided by the ATSASMUN in London. This stage is founded in the legacy of global governance and ideas that have the potential to change the world.",
    image: bell4,
    icon: london,
  },
];

export default function Card() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { check, setCheck } = useContext(ContextPage)

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const visibleCards = showMore ? cards : cards.slice(0, isMobile ? 3 : 4);
  return (
    <>
      <section id="events">
        <div data-aos="fade-up" className="text-center bg-gray-100 py-14 mb-">
          <h2 className="text-5xl font-semibold text-gray-700 tracking-wide animate-fade-in">
            Series of Events
          </h2>
          <p className="text-gray-500 text-lg mt-2">Our key events</p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
        </div>

        <div
          data-aos="fade-up"
          className="flex flex-col justify-center items-center py-8 bg-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:px-6 lg:px-8">
            {visibleCards.map((card) => (
              <div
                key={card.id}
                className="relative bg-white shadow-lg rounded-lg overflow-hidden h-[80vh] sm:h-[80vh] md:h-[80vh] w-[90vw] sm:w-[80vw] md:w-[40vw] group transition-all duration-500 ease-in-out"
              >
                <div className="relative h-[50vh] sm:h-[45vh] transition-all duration-500 ease-in-out transform group-hover:scale-110 group-hover:h-[100%]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg  "
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-500 ease-in-out flex flex-col justify-end group-hover:justify-start p-4 group-hover:px-10 group-hover:pt-[10%]">
                    <div className="  flex items-center space-x-2">
                      <Image
                        src={card.icon}
                        alt={card.subtitle}
                        className=" h-12 w-12 sm:h-16 sm:w-16 md:h-8 md:w-8 lg:h-16 lg:w-16 rounded-full"
                      />
                      <div>
                        <span className=" text-gray-300 font-bold group-hover:text-white text-sm sm:text-lg">
                          {card.subtitle}
                        </span>
                        <p className="text-md sm:text-md font-medium text-gray-300 group-hover:text-white ">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-[0%] left-0 right-0 bottom-0 flex flex-col justify-end p-4 md:p-1 lg:p-4 bg-white bg-opacity-10 group-hover:bg-opacity-60 group-hover:bg-black group-hover:border-b-8 group-hover:border-red-500 transition-all duration-500 ease-in-out">
                  <div className="mb-4 sm:mb-6">
                  
                    {/* **Title Fix (Left Aligned and Same Height)** */}
                    <p className="text-gray-700 leading-relaxed text-[12px] sm:text-[0.9rem] md:text-[0.9rem] -mb-4  sm:-mb-4  lg:-mb-4 xl:-mb-4   lg:text-[1rem] group-hover:text-[#c7c5c5] group-hover:-mb-2">{card.nowOpen}</p>

                    <h3 className="text-[0.9rem] sm:text-[1.20rem] md:text-[1.30rem] -mb-[14px]  sm:-mb-4   lg:-mb-4 font-bold text-[#4b4e61] group-hover:text-white transition-all duration-500 transform group-hover:-translate-y-2 text-left h-[60px] flex items-center">
                      {card.title}
                    </h3>

                    {/* **Description Fix (Fixed Height)** */}
                    <p className="text-gray-700 leading-relaxed text-[12px] sm:text-[0.9rem] md:text-[0.8rem] -mb-10 sm:mb-0 lg:mb-0 lg:text-[1rem] group-hover:text-[#c7c5c5]  transition-all duration-500 transform group-hover:-translate-y-2 text-left h-[100px] overflow-hidden">
                      {card.details}
                    </p>

                  </div>

                  <p className="text-white  group-hover:underline group-hover:pt-4  group-hover:text-base group-hover:underline-offset-2 group-hover:decoration-red-500 transition duration-300 ease-in-out  " onClick={() => (setCheck(card.subtitle))}>
                    <Link href="/RegisterNow" className="cursor-pointer">Register Now</Link>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      </section>
    </>
  );
}
