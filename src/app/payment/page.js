'use client'
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import istan from '@/app/public/img/istun.jpg';
import istan1 from '@/app/public/img/Azerbaijan.jpeg';
import istan2 from '@/app/public/img/london.jpg';
import istan3 from '@/app/public/img/bgUSA.jpg';
import istan4 from '@/app/public/img/riyadhcity.jpg';
import istan5 from '@/app/public/img/dubia.jpg';
import bg from "@/app/public/img/bg.png";
import Footer from '../(component)/footer/Footer';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp'
import logo from '@/app/public/img/logo-1.png'; // Logo
import ParticleCanvas from "../(component)/ParticleCanvas";
import ContextPage from "../Context/ContextPage";
import Navbar from "../(component)/navbar/Navbar";

export default function Flip() {

    const {dubaidates,setDubaidates} = useContext(ContextPage);
    const {istanbuldates,setIstanbuldates} = useContext(ContextPage);
    const {saudidates,setSaudidates} = useContext(ContextPage);
    const {newyorkdates,setNewyorkdates} = useContext(ContextPage);
    const {londondates,setLondondates} = useContext(ContextPage);
    const {bakudates,setBakudates} = useContext(ContextPage);

  const locations = [
    { name: 'Istanbul, Türkiye', image: istan, date: istanbuldates.startdate === 'Coming Soon' ? 'Coming Soon' : `${istanbuldates.startdate} – ${istanbuldates.enddate} ${istanbuldates.month} ${istanbuldates.year}`, link: '/Istanbulfee', isOpen: true },
    { name: 'London, UK', image: istan2, date: londondates.startdate === 'Coming Soon' ? 'Coming Soon' : `${londondates.startdate} – ${londondates.enddate} ${londondates.month} ${londondates.year}`, link: '/UKfee', isOpen: false },
    { name: 'Riyadh, Saudi Arabia', image: istan4, date: saudidates.startdate === 'Coming Soon' ? 'Coming Soon' : `${saudidates.startdate} – ${saudidates.enddate} ${saudidates.month} ${saudidates.year}`, link: '/Saudifee', isOpen: false },
    { name: 'New York, USA', image: istan3, date: newyorkdates.startdate === 'Coming Soon' ? 'Coming Soon' : `${newyorkdates.startdate} – ${newyorkdates.enddate} ${newyorkdates.month} ${newyorkdates.year}`, link: '/USAfee', isOpen: false },
  ];


 

  return (
    <>
  <Navbar />
      <div
        className="relative bg-cover bg-center bg-no-repeat bg-black bg-opacity-30 w-full h-80 text-white flex justify-center items-center"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute  inset-0 bg-[#060713] bg-opacity-80"></div>

        <div>
          <p className="font-semibold relative z-10 text-white text-[20px]">Payment</p>
        </div>
        <ParticleCanvas />

      </div>

      <div className="min-h-screen py-8 bg-[#1d212b] flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="group relative w-72 h-72 perspective">
              {/* Front Side */}
              <div
                className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg backface-hidden"
                style={{ backgroundImage: `url(${location.image.src})` }}
              >
                <div className="flex justify-center items-center h-full bg-black bg-opacity-20 text-white text-md font-semibold rounded-lg">

                  <div className='bg-[#0000003b] px-6 backdrop-blur-sm py-3 rounded-lg'>
                    {location.name}
                  </div>

                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute w-full h-full bg-cover bg-center rounded-lg shadow-lg backface-hidden transform rotate-y-180"
                style={{ backgroundImage: `url(${location.image.src})` }}
              >
                <div className="flex flex-col justify-center items-center h-full text-center p-4 bg-black bg-opacity-60 text-white rounded-lg">
                  <h2 className="text-lg font-bold">{location.name}</h2>
                  <p className="text-sm">{location.date}</p>
                  {location.isOpen ? (
                    <a
                      href={location.link}
                      className="mt-4 px-4 py-2 atsas-btn-solid text-xs"
                      style={{ textDecoration: 'none' }}
                    >
                      Pay for {location.name}
                    </a>
                  ) : (
                    <span
                      className="mt-4 px-4 py-2 atsas-btn-outline text-xs opacity-75 cursor-default inline-block"
                      style={{ borderStyle: 'dashed' }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ScrollToTop />
      <Whatsapp />
    </>
  );
}