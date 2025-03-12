import Image from 'next/image';
import React from 'react';

const Bcard = ({ image, title, description, link }) => {
  return (
    <div className="a-box inline-block w-[340px] text-center">
      {/* Image Container */}
      <div className="img-container h-[300px] w-[300px] overflow-hidden rounded-b-[25px] inline-block">
        <div className="img-inner">
          <div className="inline-block rounded-[25px] overflow-hidden p-0 text-[0px] mt-[40px] bg-[#c8c2c2] h-[320px] w-[300px]">
            <Image
              src={image} // Dynamic Image URL from Props
              alt={title} // Dynamic Alt Text for Accessibility
              width={280} // Explicit width
              height={320} // Explicit height
              className="object-cover h-full w-full" // Ensures proper scaling
            />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-container shadow-md p-[30px] pt-[150px] rounded-[25px] bg-white -mt-[150px] leading-[22px] text-base">
        <p className="text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 inline-block px-2 py-1 rounded-md shadow-sm">
          {description}
        </p>
        <h3 className="text-xl font-bold text-gray-800 mt-3 group-hover:text-blue-600 transition-colors duration-500">
          {title}
        </h3>

        {/* Read More Button */}
        <div className="mt-6">
          <a
            href={link} // Dynamic Link
            className="inline-block px-6 py-2 font-medium text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bcard;
