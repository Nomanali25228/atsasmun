import React from 'react'

import comunties from '@/app//public/img/community.svg'
import speech from '@/app//public/img/speech.svg'
import talk from '@/app//public/img/talk.svg'
import world from '@/app//public/img/world.svg'
import Image from 'next/image'
const OurMission = () => {
  return (
    <>

{/* OUR MISSION/////////////////////////////////////////////////////////////////////////////////////////////////////// */}

       <div className="flex items-center justify-center bg-white">
      <div data-aos="fade-up" className="text-center  max-w-2xl">
        {/* Title */}
        <p className="inline-block  text-[#3a3939] font-semibold mt-14 text-[30px]
         py-2 px-4  mb-4">
          OUR MISSION
        </p>
        {/* Description */}
        <p className="text-[#777676] text-base px-10 ">
          Our mission is to inculcate a new vision in the youth we serve. We bring to them a platform,
          where they are immersed wholly, as diplomats and peacemakers, in an environment where they have
          to uptake the responsibilities as leaders and policymakers and change the world for the better.
        </p>
      </div>
    </div>



    {/* WHAT IS IN IT FOR YOU section////////////////////////////////////////////////////////////////////////////// */}
    <section className="min-h-[450px] bg-gradient-to-r from-white  py-16 px-6 overflow-hidden">
      {/* Section Title */}
      <h2 data-aos="fade-right" className="text-center text-3xl md:text-[30px] font-semibold text-[#3a3939] tracking-wider mb-16 animate-fade-in">
        WHAT IS IN IT FOR YOU
      </h2>

      {/* Cards Grid with Advanced Animation */}
      <div data-aos="fade-up" className="relative grid grid-cols-1 mt-6 md:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* Global Exposure Card */}
        <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl rounded-t-lg shadow-2xl hover:shadow-[0px_0px_20px_rgba(0,0,0,0.8)] transition-all duration-500 p-6 hover:-translate-y-6 animate-floating-card">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 rounded-t-3xl"></div>
          <h3 className="text-[25px] font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-300">
            Global exposure
          </h3>
          <p className="text-sm text-gray-600 mb-8">
            An outclass chance of networking with the international community of
            delegates and secretariat.
          </p>
          <div className="absolute bottom-2  right-2">
            <Image
              src={comunties}
              alt="Global Exposure"
              className="w-14 h-14 transition-transform duration-300 group-hover:rotate-[30deg] group-hover:scale-110"
            />
          </div>
        </div>

        {/* Change the World Card */}
        <div className="group relative bg-gradient-to-br from-white  to-red-50 rounded-2xl rounded-t-lg shadow-2xl hover:shadow-[0px_0px_20px_rgba(0,0,0,0.8)] transition-all duration-500 p-6 hover:-translate-y-6 animate-floating-card animation-delay-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-400 rounded-t-3xl"></div>
          <h3 className="text-[25px] font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-300">
            Change the world
          </h3>
          <p className="text-sm text-gray-600 mb-8">
            An opportunity to collaborate with the global community to find
            plausible solutions to rising problems.
          </p>
          <div className="absolute bottom-3 right-6">
            <Image
              src={world}
              alt="Change the World"
              className="w-14 h-14 transition-transform duration-300 group-hover:rotate-[30deg] group-hover:scale-110"
            />
          </div>
        </div>

        {/* Diplomacy Skills Card */}
        <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl rounded-t-lg shadow-2xl hover:shadow-[0px_0px_20px_rgba(0,0,0,0.8)] transition-all duration-500 p-6 hover:-translate-y-6 animate-floating-card animation-delay-400">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 rounded-t-3xl"></div>
          <h3 className="text-[25px] font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-300">
            Diplomacy skills
          </h3>
          <p className="text-sm text-gray-600 mb-8">
            We believe in meaningful discourses. We aspire to inculcate the
            ability to negotiate and debate through dialogue.
          </p>
          <div className="absolute bottom-3 right-6">
            <Image
              src={talk}
              alt="Diplomacy Skills"
              className="w-14 h-14 transition-transform duration-300 group-hover:rotate-[30deg] group-hover:scale-110"
            />
          </div>
        </div>

        {/* Recognition Card */}
        <div className="group relative bg-gradient-to-br  from-white to-orange-50 rounded-2xl rounded-t-lg shadow-2xl hover:shadow-[0px_0px_20px_rgba(0,0,0,0.8)] transition-all duration-500 p-6 hover:-translate-y-6 animate-floating-card animation-delay-600">
          <div className="absolute top-0 left-0 w-full h-1 bg-orange-400 rounded-t-3xl"></div>
          <h3 className="text-[25px] font-bold text-gray-800 mb-4 group-hover:scale-105 transition-transform duration-300">
            Recognition
          </h3>
          <p className="text-sm  text-gray-600 mb-8">
            Be recognized and known for  solutions in the atsasMun
            network.We testify your contribution with a UNHCR endorsed
            certificate.
          </p>
          <div className="absolute bottom-2 right-6">
            <Image
              src={speech}
              alt="Recognition"
              className="w-14 h-14 transition-transform duration-300 group-hover:rotate-[30deg] group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default OurMission
