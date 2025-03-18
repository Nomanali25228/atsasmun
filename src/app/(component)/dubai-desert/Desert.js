import React from "react";
import Image from "next/image";

export default function Desert({ Desert, Desert2, Desert3, heading }) {
  return (
    <div className="flex flex-col items-center justify-center py-2 lg:py-8 px-6 sm:px-10 md:px-12 lg:px-14">
      {/* Title */} 
      <div data-aos="fade-up" className="text-center  mb-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-700 tracking-wide animate-fade-in">
       {heading}
        </h2>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 justify-center items-center">
        {/* First Image */}
        <div className="w-[250px] h-[180px] sm:w-[270px] sm:h-[190px] md:w-[300px] md:h-[200px] lg:w-[310px] lg:h-[230px] overflow-hidden rounded-lg mx-auto">
          <Image
            src={Desert}
            alt="Camels walking in the desert"
            className="w-full h-full object-cover rounded-lg"
            width={400}
            height={280}
          />
        </div>

        {/* Second Image */}
        <div className="w-[250px] h-[180px] sm:w-[270px] sm:h-[190px] md:w-[300px] md:h-[200px] lg:w-[310px] lg:h-[230px] overflow-hidden rounded-lg mx-auto">
          <Image
            src={Desert2}
            alt="Running camels in the desert"
            className="w-full h-full object-cover rounded-lg"
            width={200}
            height={280}
          />
        </div>

        {/* Third Image */}
        <div className="w-[250px] h-[180px] sm:w-[270px] sm:h-[190px] md:w-[300px] md:h-[200px] lg:w-[310px] lg:h-[230px] overflow-hidden rounded-lg mx-auto">
          <Image
            src={Desert3}
            alt="SUV dune bashing in the desert"
            className="w-full h-full object-cover rounded-lg"
            width={400}
            height={280}
          />
        </div>
      </div>
    </div>
  );
}
