import React from 'react';

export default function AboutDubai(props) {
  // Using destructuring to extract aboutTitle from props
  const { aboutTitle ,about } = props;

  return (
    <>
      <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <div data-aos="fade-up" className="text-center mt-4 mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-gray-700 tracking-wide animate-fade-in">
            About Atsas International MUN - {aboutTitle}
            </h2>
          </div>

          {/* Paragraph */}
          <p className="mt-4 text-base text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
            {about}
          </p>
        </div>
      </div>
    </>
  );
}
