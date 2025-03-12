
import React, { useState } from 'react';
import Image from 'next/image';



export default function Map(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Defining images array
  const images = [props.img3, props.img2, props.img1, props.img4, ];
  var bgimg = [ props.bgimg5 ]

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  return (
    <section id='venue' >

      <div data-aos="fade-up" className="text-center mt-10 mb-10">
        <h2 className="text-5xl font-semibold text-gray-700 tracking-wide animate-fade-in">
          Event Venue

        </h2>
        <p className="text-gray-500 text-lg mt-2">
          Event venue location info and gallery
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-stretch px-4 mb- bg-white ">
        {/* Left: Google Map */}
        <div data-aos="fade-right" className="w-full md:w-1/2 h-[450px]">
          <div className="h-full">
            <iframe src={props.map}
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border border-gray-200"
            ></iframe>
          </div>
        </div>

        {/* Right: Hotel Description with background image */}
        <div data-aos="fade-up"
          className="w-full md:w-1/2 h-[450px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${props.bgimg5.src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8">
            <h1 className="text-1xl sm:text-4xl font-bold mb-6">
            {props.hname}
            </h1>
            <p className="max-w-2xl py-13 lg:text-lg  leading-relaxed">
              {props.disc}
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div data-aos="fade-up" className="px-4 mt-1 grid grid-cols-2 md:grid-cols-4 gap-1">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-[15vh] md:h-[36vh]">
            <Image
              src={image}
              alt={`Image ${index + 1 }`}
              className="cursor-pointer rounded-l object-cover"
              layout="fill"
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>

      {/* Image Viewer Modal with Text Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 pt-8">
          {/* Adjusted padding at the top with 'pt-8' */}
          <button
            className="absolute z-10 left-4 text-white text-3xl"
            onClick={handlePrev}
          >
            &#8592;
          </button>
          <div className="relative">
            <Image
              src={selectedImage}

              alt="Selected"
              className="max-h-[90vh] w-[70vw]   sm:w-[40vw] object-contain"
            />
            {/* Text overlay on the image */}

          </div>
          <button
            className="absolute right-4 text-white text-3xl"
            onClick={handleNext}
          >
            &#8594;
          </button>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
