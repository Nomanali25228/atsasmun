'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Footer from '../(component)/footer/Footer';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '../(component)/whatsapp/Whatsapp';


export default function Home() {
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
    <div>
      {/* Navbar */}
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
                  Destinations                                    <span
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
                  <Link href="/India" className="block px-4 py-2 hover:text-blue-400">
                    Goa, India
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
              <button className="flex items-center space-x-1 text-white">
                <span>
                  Information
                  <span
                    className="absolute left-0 top-7 bottom-0  h-0.5 bg-blue-400 transition-all duration-300 ease-in-out w-full"
                  ></span>
                </span>
                <AiOutlineDown className="text-[#A8ABBA] group-hover:text-white text-xs" />
              </button>

              {dropdownOpen && (
                <div className="absolute w-[170px] left-0 mt-4 bg-white text-black rounded shadow-lg">

                  <Link href="/payment" className="block px-4 py-2 hover:text-blue-400">
                    Pricing
                  </Link>
                  <Link href="/Terms&conditions" className="block px-4 py-2 text-blue-400">
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
                    href="/India"
                    className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Goa, India
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
                className="flex justify-between w-full  text-left items-center px-4 py-2 font-bold text-[#f6f7f8] hover:text-blue-400"
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
      {/* Hero Section */}
      <header
        className="relative bg-cover  bg-center min-h-screen flex items-center justify-center "
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute  inset-0 bg-[#060713] bg-opacity-80"></div>

        {/* Hero Content */}

        <div className=' pb-10 relative  z-10 w-screen'>

          <div className="  min-h-screen py-12">
            <div className="text-center mt-24 mb-8">
              <h1 className="text-3xl  md:text-4xl font-extrabold text-gray-100 uppercase">
                Atsas MUN Terms & Conditions
              </h1>
            </div>
            <div className="max-w-5xl mx-4 lg:mx-auto bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
              <p className="mb-4">
                These terms and conditions {`("Agreement")`} apply to all delegates
                {`("Participants")`} who attend AtsasMUN activities {`("Events")`}. These
                events are planned and administered by Atsas Creation International,
                which is registered in the UK. UK laws and jurisdiction shall govern
                any legal disputes.
              </p>
              <p className="mb-4">
                This website{`'`}s content is meant for a broad audience and might not be
                applicable in every location. Despite its best efforts to guarantee
                the content{`'`}s timeliness and correctness, Atsas Creation International
                maintains the right to amend or change material at any moment without
                giving notice.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2">Eligibility</h3>
              <ol className="list-decimal list-inside mb-4">
                <li>
                  To attend AtsasMUN Events, participants must be 16 years of age or
                  older at the time of registration.
                </li>
                <li>
                  The official website, <Link href="/RegisterNow" className="text-blue-500 underline">atsasmun.com/register</Link>, is where registration must be finished.
                </li>
                <li>
                  Since AtsasMUN is not liable for inaccurate information submitted,
                  participants must supply correct and comprehensive information,
                  including any dietary or special access requirements.
                </li>
                <li>
                  AtsasMUN is not responsible for any decisions or actions made by
                  public agencies or governments, including those pertaining to
                  attendance limitations or visa denials.
                </li>
                <li>
                  While in the host city, delegates are in charge of their personal
                  security and safety.
                </li>
              </ol>


              <h3 className="text-xl font-semibold mt-6 mb-2">
                Registration Deadlines
              </h3>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Registrations are only accepted through the official AtsasMUN
                  website.
                </li>
                <li>
                  Participants must complete all required information, including
                  committee and country preferences, during registration.
                </li>
                <li>
                  Allocations are based on availability, committee capacity, and
                  vacancy of the chosen preferences.
                </li>
                <li>
                  Participants can choose from Basic (Non-Accommodation) or Full
                  Experience (Accommodation) packages.
                </li>
                <li>
                  Registration takes place in three phases: Early Bird, Regular, and
                  Late Registration, each with varying fees. Deadlines will not be
                  extended.
                </li>
                <li>
                  Registration is considered final upon payment. Missing any step
                  during the registration process will result in automatic
                  disqualification and service being denied on the day of the event.
                </li>
              </ul>
              {/* Additional Sections */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Committee Allocation Policy
                </h2>
                <p>
                  AtsasMUN does not guarantee the availability of preferred countries
                  and encourages participants to select alternatives if necessary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    All intellectual property rights related to the AtsasMUN website,
                    content, graphics, and materials are owned by or licensed to
                    Atsas Creation International. Participants may not:
                  </li>
                  <li>
                    Reproduce, distribute, or use any content for commercial or
                    public purposes without written permission.
                  </li>
                  <li>
                    Use AtsasMUN content on other websites without authorization.
                  </li>
                  <li>
                    Print or copy materials for purposes other than personal
                    reference.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Payments</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>Payments must be made through the official AtsasMUN website.</li>
                  <li>
                    AtsasMUN will not acknowledge payments made to unauthorized
                    individuals claiming to represent the organization.
                  </li>
                  <li>
                    Accepted payment methods include credit/debit cards and
                    international wire transfers.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Visa Support</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    If a legitimate request is received at least 60 days prior to the
                    start of the event, Visa Support Letters will be issued within 14
                    days.
                  </li>
                  <li>
                    While they can help, visa support letters do not ensure that a
                    visa will be granted.
                  </li>
                  <li>
                    Delegates are in charge of obtaining their own visas; in the event
                    that a visa is refused, costs are not refundable.
                  </li>
                  <li>
                    While AtsasMUN can help with visa-related inquiries, it is unable
                    to influence decisions made by embassies or consulates.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Subject to the following restrictions, delegates who have made
                    their full payment may ask for a credit voucher or transfer their
                    participation to another AtsasMUN location:
                  </li>
                  <li>
                    Requests have to be submitted sixty days prior to the start of the
                    event.
                  </li>
                  <li>
                    Credit coupons or transfers are only good for AtsasMUN activities.
                  </li>
                  <li>
                    Delegates who only paid an installment will not be eligible for
                    credit vouchers or transfers; the installment will be kept as a
                    cancellation charge.
                  </li>
                  <li>All payments are non-refundable.</li>
                </ul>
              </section>
              {/* Credit Voucher or Transfer Conditions */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Credit Voucher or Transfer Conditions
                </h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Requests for credit vouchers or transfers must be submitted via
                    email.
                  </li>
                  <li>
                    Cancellation fees apply as follows:
                    <ul className="list-disc pl-5 ml-12 mt-2">
                      <li>
                        45 days before the event: 30% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        30 days before the event: 50% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        15 days before the event: 70% cancellation
                        fee; the remaining amount will be issued as a credit voucher.
                      </li>
                      <li>
                        Less than 15 days before the event: 100%
                        cancellation fee.
                      </li>
                    </ul>
                  </li>
                </ul>
              </section>

              {/* Jurisdiction and Applicable Law */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">
                  Jurisdiction and Applicable Law
                </h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    For payments processed in the United Kingdom, UK laws apply, and
                    UK courts have exclusive jurisdiction over related disputes.
                  </li>
                  <li>
                    For payments processed outside the UK, the applicable jurisdiction
                    will depend on the payment’s location. Participants must agree to
                    these terms as a condition of participation.
                  </li>
                </ul>
              </section>

              {/* Code of Conduct */}
              <section>
                <h2 className="text-2xl font-semibold mb-4">Code of Conduct</h2>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    Participants must ensure all information provided during
                    registration is accurate. False information will result in
                    disqualification and potential legal action.
                  </li>
                  <li>
                    All submitted materials must be original; plagiarism will result
                    in disqualification.
                  </li>
                  <li>
                    Participants must obey the host country’s laws and are personally
                    responsible for any damages or violations.
                  </li>
                  <li>
                    AtsasMUN is not liable for participant misconduct; individuals
                    will bear sole responsibility for their actions.
                  </li>
                  <li>
                    Participants must adhere to the Code of Conduct outlined in the
                    Conference Handbook.
                  </li>
                </ul>
              </section>

              <p>
                These Terms and Conditions ensure a seamless and professional
                experience for all participants and uphold the integrity of AtsasMUN
                events.
              </p>
            </div>
          </div>




        </div>

      </header>
      <Footer />
      <ScrollToTop />
      <Whatsapp />
    </div>
  );
}
