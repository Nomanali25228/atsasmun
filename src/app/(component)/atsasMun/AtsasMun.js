import React from 'react'
import logo from '@/app/public/img/logo.png'; // Logo
import Image from 'next/image'
const AtsasMun = () => {
  return (
    <section id="atsasMun" className="bg-gradient-to-b from-gray-100 to-gray-200 py-14 px-6">
      {/* Container */}
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 data-aos="fade-up" className="text-4xl font-semibold text-gray-700 tracking-wide animate-fade-in">
          ATSAS MUN
        </h2>
        <p data-aos="fade-up" className="text-gray-500 text-lg mt-2">Our parent company</p>
        <div data-aos="fade-down" className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>

        {/* Content */}
        <div className="mt-10 flex flex-col justify-center md:flex-row items-center md:items-start gap-6 md:gap-12">
          {/* Logo */}
          <div data-aos="fade-right" className="flex-shrink-0">
            <div className="w-24 h-24   flex items-center justify-center rounded">
              <Image
                src={logo}
                alt=''
              />
            </div>
          </div>

          {/* Text Content */}
          <div data-aos="fade-up" className="max-w-3xl  md:ml-[-25px] text-left text-gray-700 leading-relaxed">
            <p className='text-[14px]'>
              As the flagship project of Atsas International Creations LTD, a company based
              in the United Kingdom that is committed to cultivating the next generation of
              leaders, AtsasMUN is the organization{"'"}s flagship endeavor. By providing a
              Model United Nations experience that is unrivaled, AtsasMUN brings together
              a global community of young minds to engage in activities such as diplomacy,
              problem-solving, and teamwork, so laying the groundwork for a more favorable
              prospect in the future.
            </p>
            <div className='md:ml-[-120px]'>

              <p className="mt-2 text-[14px] ">

              This one-of-a-kind program goes beyond national boundaries and travels all over the world in order to provide participants with a wide range of chances and viewpoints. The purpose of AtsasMUN events is to provide delegates with the tools necessary to handle major global concerns while simultaneously cultivating leadership, negotiating, and analytical abilities. These events are designed to immerse participants in comprehensive cultural and diplomatic experiences.
              </p>
              <p className="mt-2 text-[14px] ">

              An incredible platform for students and young leaders to make their mark, AtsasMUN offers events that span prominent destinations such as Istanbul, Dubai, and Kuala Lumpur. This platform leaves just enough suspense for what is to come, and it offers this opportunity to students and young leaders. This is not merely a meeting; rather, it is a movement that is currently serving to mold the leaders of the future.

              </p>
              <p className="mt-2 text-[14px] ">

              The culmination of this journey is the AtsasMUN, which takes place in New York City. This event is a landmark event that takes place in September and brings together the winners of every MUN conference from across the world to represent the culmination of their MUN adventure. This trip has the potential to be the journey of a lifetime, as it will act as a platform for future changemakers to have their views heard on a global scale.              </p>
              <p className="mt-2 text-[14px] ">
              Explore the journey and become a part of this global legacy at <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
atsasmun.com.
            </a>
               

              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}

export default AtsasMun

 
          