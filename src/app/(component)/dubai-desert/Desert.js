import React from 'react';

import Image from 'next/image';

export default function Desert(props) {


  const { Desert, Desert2, Desert3 ,heading } = props;

  return (
    <>
      <div className="flex flex-col items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div data-aos="fade-up" className="text-center mt-10 mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700 tracking-wide animate-fade-in">
            {heading}
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {/* First Image */}
          <div className="w-full h-60 overflow-hidden rounded-lg mx-auto">
            <Image
              src={Desert}
              alt="Camels walking in the desert"
              className="object-cover w-full h-full"
              layout="responsive"
              width={320}
              height={240}
            />
          </div>

          {/* Second Image */}
          <div className="w-full h-60 overflow-hidden rounded-lg mx-auto">
            <Image
              src={Desert2}
              alt="Running camels in the desert"
              className="object-cover w-full h-full"
              layout="responsive"
              width={320}
              height={240}
            />
          </div>

          {/* Third Image */}
          <div className="w-full h-60 overflow-hidden rounded-lg mx-auto">
            <Image
              src={Desert3}
              alt="SUV dune bashing in the desert"
              className="object-cover w-full h-full"
              layout="responsive"
              width={320}
              height={240}
            />
          </div>
        </div>
      </div>
    </>
  );
}
