"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import gallry1 from "@/app/public/img/ax1.jpeg";
import gallry3 from "@/app/public/img/ax3.jpeg";
import gallry2 from "@/app/public/img/ax2.jpeg";
import gallry4 from "@/app/public/img/ax4.jpeg";
import gallry5 from "@/app/public/img/ax5.jpeg";
import gallry6 from "@/app/public/img/ax6.jpeg";
import gallry7 from "@/app/public/img/ax7.jpeg";
import gallry8 from "@/app/public/img/ax8.jpeg";
import gallry9 from "@/app/public/img/ax9.jpeg";
import gallry10 from "@/app/public/img/ax10.jpeg";
import gallry11 from "@/app/public/img/ax11.jpeg";
import gallry12 from "@/app/public/img/ax12.jpeg";
import gallry13 from "@/app/public/img/ax13.jpeg";
import gallry14 from "@/app/public/img/ax14.jpeg";
import gallry15 from "@/app/public/img/ax15.jpeg";
import gallry16 from "@/app/public/img/ax16.jpeg";
import gallry17 from "@/app/public/img/ax17.jpeg";
import gallry18 from "@/app/public/img/ax18.jpeg";
import gallry19 from "@/app/public/img/ax19.jpeg";
import gallry20 from "@/app/public/img/ax20.jpeg";
import gallry21 from "@/app/public/img/az1.jpeg";
import gallry22 from "@/app/public/img/az2.jpeg";
import gallry23 from "@/app/public/img/az3.jpeg";
import gallry24 from "@/app/public/img/az4.jpeg";
import gallry25 from "@/app/public/img/az5.jpeg";
import gallry26 from "@/app/public/img/az6.jpeg";
import gallry27 from "@/app/public/img/az7.jpeg";
import gallry28 from "@/app/public/img/az8.jpeg";


const images = [
  // { id: 1, src: gallry1.src },
  { id: 2, src: gallry2.src },
  { id: 3, src: gallry3.src },
  { id: 4, src: gallry4.src },
  { id: 5, src: gallry5.src },
  { id: 6, src: gallry6.src },
  { id: 7, src: gallry7.src },
  { id: 8, src: gallry8.src },
  { id: 9, src: gallry9.src },
  { id: 10, src: gallry10.src },
  { id: 11, src: gallry11.src },
  { id: 12, src: gallry12.src },
  { id: 13, src: gallry13.src },
  { id: 14, src: gallry14.src },
  { id: 15, src: gallry15.src },
  { id: 16, src: gallry16.src },
  { id: 17, src: gallry17.src },
  { id: 18, src: gallry18.src },
  { id: 19, src: gallry19.src },
  { id: 20, src: gallry20.src },
  { id: 21, src: gallry21.src },
  { id: 22, src: gallry22.src },
  { id: 23, src: gallry23.src },
  { id: 24, src: gallry24.src },
  { id: 25, src: gallry25.src },
  { id: 26, src: gallry26.src },
  { id: 27, src: gallry27.src },
  { id: 28, src: gallry28.src },

];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length ? 1 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 1 ? images.length : prevIndex - 1
    );
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index + 1);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let interval;
    if (!isModalOpen) {
      interval = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isModalOpen]);

  return (
    <section id="gallery">
      <div data-aos="fade-up" className="text-center mt-11">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-wide">
          Gallery
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-2">
          View our gallery from the recent events
        </p>
        <div className="w-12 md:w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
      </div>

      <div data-aos="fade-up" className="h-80 md:h-96 flex items-center justify-center">
        <div className="relative w-full max-w-6xl">
          <ul className="relative flex gap-4 md:gap-6 justify-center items-center">
            {images.map((img, index) => (
              <li
                key={img.id}
                onClick={() => handleImageClick(index)}
                className={`absolute w-28 h-40 md:w-56 md:h-56 rounded-xl cursor-pointer transition-all duration-700 overflow-hidden ${
                  index + 1 === currentIndex
                    ? "z-10 scale-100 left-[50%] -translate-x-[50%]"
                    : index + 1 < currentIndex
                    ? "left-[15%] opacity-50 scale-75"
                    : "left-[65%] opacity-50 scale-75"
                }`}
              >
                <Image
                  src={img.src}
                  alt={`Image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </li>
            ))}
          </ul>

          <button
            aria-label="Previous image"
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300"
            onClick={handlePrev}
          >
            &#8592;
          </button>
          <button
            aria-label="Next image"
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300"
            onClick={handleNext}
          >
            &#8594;
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl md:text-3xl font-bold"
          >
            ✖
          </button>
          <div className="relative flex items-center justify-center w-[90%] h-[80%] md:h-[90%]">
            <button
              aria-label="Previous image"
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 md:p-3 rounded-full hover:bg-gray-200"
              onClick={handlePrev}
            >
              &#8592;
            </button>
            <Image
              src={images[currentIndex - 1].src}
              alt={`Image ${currentIndex}`}
              layout="intrinsic"
              width={1000}
              height={500}
              objectFit="contain"
              className="rounded-lg"
            />
            <button
              aria-label="Next image"
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 md:p-3 rounded-full hover:bg-gray-200"
              onClick={handleNext}
            >
              &#8594;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carousel;
