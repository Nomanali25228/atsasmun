"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import ContextPage from "@/app/Context/ContextPage";
import Link from "next/link";

// Import Images
import bell1 from "@/app/public/img/ax11.jpeg";
import bell2 from "@/app/public/img/az1.jpeg";
import bell3 from "@/app/public/img/ax13.jpeg";
import bell4 from "@/app/public/img/ax18.jpeg";
import bell5 from "@/app/public/img/ax15.jpeg";
import bell6 from "@/app/public/img/az6.jpeg";

import istanbul from '@/app/public/img/turkey.jpeg';
import dubai from "@/app/public/img/skyline.jpeg";
import India from '@/app/public/img/india.jpg';
import USA from '@/app/public/img/bgUSA.jpg';
import Saudi from '@/app/public/img/riyadhcity.jpg';
import london from '@/app/public/img/london.jpg';
// import ContextPage from "@/app/Context/ContextPage";
// import Link from "next/link";

// Card Data
const cards = [
  {
    id: 1,
    nowOpen: "Registrations are now open!",
    title: "ATSASMUN Dubai, UAE",
    subtitle: "Dubai, UAE",
    description:
      "(22th-25th, May 2025)",
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
      "(12th-15th, June 2025)",
    details:
"Aspiring diplomatic leaders are invited to attend ATSASMUN in Istanbul, located at the crossroads of civilizations. The city's rich cultural past offers global discourse inspiration unmatched by any other.",    image: bell1,
    icon: istanbul,
  },
  {
    id: 3,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN Goa, India ",
    subtitle: "Goa, India",
    description:
      "(26th-29th, june 2025)",
    details:
    "A multicultural hub is present in Goa,  India where the participants of the ATSASMUN are immersed. This center embodies the harmony and variety that is important for future diplomacy.",
    image: bell3,
    icon: India,
  },
  {
    id: 4,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN London, UK",
    subtitle: "London, UK",
    description:
      "(07th-10th, August 2025)",
    details:"An iconic stage for the leaders of the future is provided by the ATSASMUN in London. This stage is founded in the legacy of global governance and ideas that have the potential to change the world.",    image: bell6,
    icon: london,
  },
  {
    id: 5,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN New York, USA",
    subtitle: "New York, USA",
    description:
      "(04th-07th, September 2025)",
    details:
      "In the City of Light, which is a shining example of culture, art, and revolutionary ideas, the ATSASMUN in New York connects delegates with the spirit of diplomacy.",
    image: bell4,
    icon: USA,
  },
  {
    id: 6,
    nowOpen: "Registrations opening soon!",
    title: "ATSASMUN Riyadh, Saudi Arabia ",
    subtitle: "Riyadh, Saudi Arabia",
    description:
      "(16th-19th, october 2025)",
    details:
      "ATSASMUN in Saudi Arabia embraces a culture of honor, respect, and unity. Through the spirit of majlis, it fosters dialogue, mutual understanding, and true diplomacy in a changing world.",
      image: bell5,
      icon: Saudi,
      
    },
 
];

export default function Card() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { check, setCheck } = useContext(ContextPage);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleCards = showMore ? cards : cards.slice(0, isMobile ? 3 : 4);

  return (
    <section id="events">
      {/* Header */}
     


      {/* Cards */}
      <div className="flex flex-col items-center py-8 bg-gray-100 ">
      <div data-aos="fade-up" className="text-center  mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-700 tracking-wide animate-fade-in">
          Series of Events
        </h2>
        <p className="text-gray-500 text-lg mt-2">Our key events</p>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:px-6 lg:px-8">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden w-[90vw] sm:w-[80vw] md:w-[40vw] group transition-all duration-700 ease-in-out h-[500px] "
            >
              {/* Image section */}
              <div
                className="absolute inset-0 z- transition-all duration-700 ease-in-out group-hover:h-full "
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 ease-in-out group-hover:scale-105  "
                />
              </div>

              {/* Overlay Text on Hover */}
             {/* Overlay Text on Hover */}
{/* Always Visible Section */}

<div className="absolute top-4 sm:top-72 md:top-56  lg:top-52 group-hover:top-4 left-4 z-20 flex items-center space-x-2 text-white">
  <Image
    src={card.icon}
    alt={card.subtitle}
    
    className="h-12 w-12 sm:h-12 sm:w-12 md:h-12 md:w-12 lg:h-14 lg:w-14 rounded-full"
  />
  <div>
   <span className="font-bold text-xs sm:text-sm md:text-base">{card.subtitle}</span>
<p className="font-medium text-sm sm:text-md md:text-md">{card.description}</p>

  </div>
</div>

{/* Overlay Text on Hover */}
<div
  className="absolute inset-0 z-10 bg-black bg-opacity-80 opacity-50 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-4 text-white group-hover:border-b-8 group-hover:border-[red]"
>

</div>


              {/* Non-hover Text Below Image */}
         {/* Non-hover Text Below Image */}
            {/* Non-hover Text Below Image */}
   <div className="absolute bottom-0 z-10 p-3 md:p-4 transition-colors duration-300 pb-4 ease-in-out w-full h-auto min-h-[120px] md:min-h-[160px] lg:min-h-[190px] flex flex-col justify-center bg-white text-gray-900 group-hover:bg-transparent group-hover:text-white">
  <p className="text-xs md:text-sm lg:text-base text-gray-700 group-hover:text-white transition-colors duration-300 ease-in-out">{card.nowOpen}</p>
  <h3 className="text-sm md:text-lg font-bold mt-1 md:mt-2 text-gray-700 group-hover:text-white transition-colors duration-300 ease-in-out">{card.title}</h3>
  <p className="text-xs md:text-sm lg:text-base mt-1 text-gray-700 group-hover:text-white transition-colors duration-300 ease-in-out">
    {card.details}
  </p>
   <div className="">
      <Link href="/RegisterNow">
        <p
          className="text-white group-hover:text-red-500 cursor-pointer group-hover:underline"
          onClick={() => setCheck(card.subtitle)}
        >
          Register Now
        </p>
      </Link>
    </div>
</div>


            </div>
          ))}
        </div>

        {/* Show More Button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-8 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
}
