'use client'
import React, { useEffect, useState } from "react";
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

export default function Flip() {
  const locations = [
    { name: 'Istanbul, Türkiye', image: istan, date: '28th  31st August 2025', link: '/Istanbulfee' },
    { name: 'Dubai, UAE', image: istan5, date: '11th  14th September 2025', link: '/uaefee' },
    { name: 'Baku, Azerbaijan', image: istan1, date: '06th-09th November, 2025', link: '/Azerbaijanfee' },
    { name: 'London, UK', image: istan2, date: '20th  24th November 2025', link: '/UKfee' },
    { name: 'New York, USA', image: istan3, date: '25th  28th September 2025', link: '/USAfee' },
    { name: 'Riyadh, Saudi Arabia', image: istan4, date: '16th  19th October 2025', link: '/Saudifee' },
  ];


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [mobileDropdownOpen2, setMobileDropdownOpen2] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);


  let dropdownTimeout;
  let dropdownTimeout2;

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout); // Clear any existing timeout
    setDropdownOpen(true); // Show dropdown immediately
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setDropdownOpen(false); // Hide dropdown after 3 seconds
    }, 300); // 3-second delay
  };


  const handleMouseEnter2 = () => {
    clearTimeout(dropdownTimeout2); // Clear any existing timeout
    setDropdownOpen2(true); // Show dropdown immediately
  };

  const handleMouseLeave2 = () => {
    dropdownTimeout2 = setTimeout(() => {
      setDropdownOpen2(false); // Hide dropdown after 3 seconds
    }, 300); // 3-second delay
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, [mobileMenuOpen]);

  // Save and retrieve scroll state to/from localStorage
  useEffect(() => {
    const savedScrollState = localStorage.getItem('isScrolled');
    if (savedScrollState === 'true') {
      setIsScrolled(true);
    }

    const handleScroll = () => {
      const scrollState = window.scrollY > 10;
      setIsScrolled(scrollState);
      localStorage.setItem('isScrolled', scrollState.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  // Track the active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", offset: document.getElementById("home")?.offsetTop || 0 },
        { id: "events", offset: document.getElementById("events")?.offsetTop || 0 },
        { id: "atsasMun", offset: document.getElementById("atsasMun")?.offsetTop || 0 },
        { id: "gallery", offset: document.getElementById("gallery")?.offsetTop || 0 },
        { id: "blog", offset: document.getElementById("blog")?.offsetTop || 0 },
        { id: "faq", offset: document.getElementById("faq")?.offsetTop || 0 },
        { id: "contact", offset: document.getElementById("contact")?.offsetTop || 0 },
      ];

      const currentPosition = window.scrollY + 100; // Offset for better accuracy
      const currentSection = sections.find((section, i) => {
        const nextOffset = sections[i + 1]?.offset || Infinity;
        return currentPosition >= section.offset && currentPosition < nextOffset;
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);


  return (
    <>
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#111827fa] shadow-md' : 'bg-transparent'
          }`}
      >
        <div data-aos="fade-down" className="container cursor-pointer mx-auto  flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              className="lg:h-[100px] lg:w-[150px] md:h-[100px] md:w-[150px] sm:h-[80px] sm:w-[120px] h-[80px] w-[120px]"
            />
          </Link>
          <div className="flex items-center">
          </div>

          <button className="sm:ml-[290px] -ml-[30px] md:ml-[380px] block lg:hidden bg-[#027CAC] text-white font-semibold  py-1 px-2 sm:py-2 sm:px6 md:py-2 md:px-6 lg:py-2 lg:px-6 rounded-full border-2 border-[#027CAC] transition-all duration-300 hover:bg-transparent text-sm tracking-wide">
            <Link href="/RegisterNow">
              <p > Register Now</p>
            </Link>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-5 ml-24 text-sm font-medium text-[#A8ABBA]">
            {/* Home */}
            <Link
              href="/"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "home" ? "" : ""
                }`}
            >
              Home
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>


            <Link
              href="/#events"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "events" ? "text-white" : ""
                }`}
            >
              Events
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "events" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>

            {/* atsasMun */}
            <Link
              href="/#atsasMun"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "atsasMun" ? "text-white" : ""
                }`}
            >
              Atsas Mun
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "atsasMun" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
            {/* Gallery */}
            <Link
              href="/#gallery"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "gallery" ? "text-white" : ""
                }`}
            >
              Gallery
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "gallery" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
            {/* Blog */}



            {/* FAQ */}
            <Link
              href="/#faq"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "faq" ? "text-white" : ""
                }`}
            >
              FAQ
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "faq" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>

            {/* Contact */}
            <Link
              href="/#contact"
              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "contact" ? "text-white" : ""
                }`}
            >
              Contact
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "contact" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>


            <div
              className="relative group"
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >


              <button className="flex items-center space-x-1 hover:text-white">
                <span>
                  Destinations
                  <span
                    className="absolute left-0 top-7 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"
                  ></span>
                </span>
                <AiOutlineDown className="text-[#A8ABBA] group-hover:text-white text-xs" />
              </button>


              {dropdownOpen2 && (
                <div className="absolute w-[200px]  mt-4 bg-white text-black rounded shadow-lg">
                  <Link href="/dubai" className="block px-4 py-2 hover:text-blue-400">
                    Dubai, UAE
                  </Link>
                  <Link href="/Istanbul" className="block px-4 py-2 hover:text-blue-400 ">
                    Istanbul, Turkey
                  </Link>
                  <Link href="/Azerbaijan" className="block px-4 py-2 hover:text-blue-400">
                    Baku, Azerbaijan
                  </Link>
                  <Link href="/UK" className="block px-4 py-2 hover:text-blue-400">
                    London, UK
                  </Link>
                  <Link href="/USA" className="block px-4 py-2 hover:text-blue-400">
                    New York, USA
                  </Link>
                  <Link href="/Saudi" className="block px-4 py-2 hover:text-blue-400">
                    Riyadh, Saudi Arabia
                  </Link>
                  {/* <Link href="/franceLandingP" className="block px-4 py-2 hover:text-blue-400">
                    Paris, France
                  </Link> */}

                </div>
              )}
            </div>

            <Link
              href="/Blogs/1"

              className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "home" ? "" : ""
                }`}
            >
              Blog
              <span
                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 hover:text-white">
                <span>
                  Information                                    <span
                    className="absolute left-0 top-7 bottom-0  h-0.5 bg-blue-400 transition-all duration-300 ease-in-out w-full"
                  ></span>
                </span>
                <AiOutlineDown className="text-[#A8ABBA] group-hover:text-white text-xs" />
              </button>

              {dropdownOpen && (
                <div className="absolute w-[170px] left-0 mt-4 bg-white text-black rounded shadow-lg">
                  <Link href="/payment" className="block px-4 py-2 text-blue-400">
                    Pricing
                  </Link>
                  <Link href="/Terms&conditions" className="block px-4 py-2 hover:text-blue-400">
                    Terms & Conditions
                  </Link>
                  <Link href="/Privac" className="block px-4 py-2 hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Register Button */}
          <Link href="/RegisterNow">
            <button className="hidden lg:block bg-[#027CAC] text-white font-semibold py-1.5 px-4 rounded-full border-2 border-[#027CAC] transition-all duration-300 hover:bg-transparent text-sm tracking-wide">
              <p className='text-[13px]'> Register Now </p>
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden ml-[-10px] text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div data-aos="flip-left" className="bg-gray-800 text-white lg:hidden fixed inset-y-0 left-0 right-0 mx-4 my-4 z-50 rounded-lg overflow-y-auto shadow-lg">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                className=" fixed text-white text-2xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AiOutlineClose />
              </button>
            </div>

            <nav className="space-y-4  px-6 py-4">
              {/* Home Section */}
              <Link
                href="/"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Home</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>

              {/* Events Section */}
              <Link
                href="/#events"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Events</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>

              <Link
                href="/#atsasMun"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Atsas Mun</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>

              <Link
                href="/#gallery"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Gallery</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>
              <Link
                href="/Blogs/1"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Blog</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>



              <button
                className="flex justify-between w-full  text-left items-center px-4 py-2 font-bold text-[#A8ABBA] hover:text-blue-400"
                onClick={() => setMobileDropdownOpen2(!mobileDropdownOpen2)}
              >
                <span className='ml-9'>Destinations</span>
                <AiOutlineDown
                  className={`text-sm transition-transform ${mobileDropdownOpen2 ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {mobileDropdownOpen2 && (
                <div className="ml-6 space-y-2">
                  <Link
                    href="/dubai"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dubai, UAE
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/Istanbul"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Istanbul, Turkey
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/Azerbaijan"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Baku, Azerbaijan
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/UK"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    London, UK
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/USA"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New York, USA

                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/Saudi"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Riyadh, Saudi Arabia

                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  {/* <Link
                    href="/franceLandingP"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Paris, France

                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link> */}

                </div>
              )}





              {/* Information Dropdown */}
              <button
                className="flex justify-between w-full  text-left items-center px-4 py-2 font-bold text-[#A8ABBA] hover:text-blue-400"
                onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              >
                <span className='ml-9'>Information</span>
                <AiOutlineDown
                  className={`text-sm transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {mobileDropdownOpen && (
                <div className="ml-6 space-y-2">


                  <Link
                    href="/payment"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/Terms&conditions"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Terms & Conditions

                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                  <Link
                    href="/Privac"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Privacy Policy

                    <span
                      className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                    ></span>
                  </Link>
                </div>
              )}


              {/* FAQ Section */}
              <Link
                href="/#faq"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">FAQ</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>

              {/* Contact Section */}
              <Link
                href="/#contact"
                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <span
                  className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                ></span>
                <span
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                ></span>
              </Link>
            </nav>
          </div>


        )}
      </nav>
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

      <div className="min-h-screen py-12 bg-[#1d212b] flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  <a
                    href={location.link}
                    className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                  >
                    Pay for {location.name}
                  </a>
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