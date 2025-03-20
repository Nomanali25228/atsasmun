"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// Import images
import gallry2 from "@/app/public/img/ax2.jpeg";
import gallry3 from "@/app/public/img/ax3.jpeg";
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

// Store images in an array
const images = [
  gallry2, gallry3, gallry4, gallry5, gallry6, gallry7, gallry8, gallry9, gallry10,
  gallry11, gallry12, gallry13, gallry14, gallry15, gallry16, gallry17, gallry18, gallry19,
  gallry20, gallry21, gallry22, gallry23, gallry24, gallry25, gallry26, gallry27, gallry28
];

const GallerySlider = () => {
  const sliderRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000, // Smooth speed
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000, // Change images every 3 sec
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };


  // Open modal and set image index
  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Navigate to previous image
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery">
    <div data-aos="fade-up" className="text-center mt-11">
      <h2 className="text-3xl md:text-4xl mt-14 font-semibold text-gray-800 tracking-wide">
        Gallery
      </h2>
      <p className="text-gray-500 text-base md:text-lg mt-2">
        View our gallery from the recent events
      </p>
      <div className="w-12 md:w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
    </div>
    <div className="w-full flex flex-col items-center justify-center py-10 px-8">
      

      <div className="relative w-full max-w-6xl">
        {/* Left Arrow */}
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Slider */}
        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <div key={index} className="px-2">
              <div
                className="rounded-lg overflow-hidden shadow-md flex items-center justify-center cursor-pointer"
                onClick={() => openModal(index)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>

        {/* Right Arrow */}
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow-md rounded-full"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Modal for Enlarged Image */}
{isOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    {/* Close Button */}
    <button
      onClick={closeModal}
      className="absolute top-4 right-4 text-white text-2xl p-2"
    >
      <FaTimes />
    </button>

    {/* Left Arrow */}
    <button
      onClick={prevImage}
      className="absolute left-4 text-white text-2xl p-2 bg-black bg-opacity-50 rounded-full"
    >
      <FaChevronLeft />
    </button>

    {/* Image with Fixed Size */}
    <Image
  src={images[currentIndex]}
  alt={`Gallery image ${currentIndex + 1}`}
  width={600}
  height={400}
  className="w-[600px] h-[300px] object-cover rounded-lg shadow-lg"
/>


    {/* Right Arrow */}
    <button
      onClick={nextImage}
      className="absolute right-4 text-white text-2xl p-2 bg-black bg-opacity-50 rounded-full"
    >
      <FaChevronRight />
    </button>
  </div>

      )}
    </div>
    </section>
  );
};

export default GallerySlider;
