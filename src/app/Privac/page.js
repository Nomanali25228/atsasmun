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
        }, 350); // 3-second delay
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
                                    <Link href="/Terms&conditions" className="block px-4 py-2 hover:text-blue-400">
                                        Terms & Conditions
                                    </Link>
                                    <Link href="/Privac" className="block px-4 py-2 text-blue-400">
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
                className="relative bg-cover bg-center min-h-screen flex items-center justify-center "
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Overlay only on background image */}
                <div className="absolute inset-0 bg-[#03040f] bg-opacity-80"></div>

                {/* Privacy Policy Content */}
                <div className=' pb-10 relative z-10 w-screen'>
                    <div className="max-w-5xl mx-4 mt-40 lg:mx-auto bg-white shadow-lg rounded-lg p-6 ">
                        <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
                        <p className="text-center text-gray-500 mb-4">Effective Date: December 20, 2024</p>

                        <ul className=" pl-6 mb-6 text-xl space-y-2">
                            <li>
                                <strong>Welcome to ATSASMUN! </strong>

                            </li>
                        </ul>
                        {/* <h2 className="text-2xl  pl-6 mt-12 mb-6">Welcome to ATSASMUN!</h2> */}

                        <p className="mb-6">
                            Your privacy matters to us, and we{"’"}re committed to keeping your personal information
                            safe. This Privacy Policy explains how we collect, use, and protect your data when you
                            visit our website or participate in our events. By using <Link href="/" className="text-blue-600 underline" >ATSASMUN.com</Link>, you{"’"}re agreeing
                            to the terms outlined here.
                        </p>
                        <ul className=" pl-6 mb-6 text-xl space-y-2">
                            <li>
                                <strong>1. What Information We Collect </strong>

                            </li>
                        </ul>
                        <p className="mb-8">
                            We collect two types of information:
                        </p>
                        <p className="mb-4">
                            Personal Information
                        </p>
                        <p className='mb-4'>
                            This includes details you provide directly, such as:
                        </p>

                        <p className='mb-4'>
                            Your full name, Email address, Phone number etc..
                        </p>

                        <p className='mb-4'>
                            Any other information you share when registering for events, reaching out to us, or
                            participating in our activities

                        </p>  <p className='mb-8'>
                            Non-Personal Information


                        </p>  <p className='mb-4'>
                            This is data we collect automatically, like:
                        </p>

                        <p className='mb-4'>Your browser type and version</p>
                        <p className='mb-4'>The operating system and device you{"’"}re using</p>
                        <p className='mb-4'>Your IP address and general location</p>
                        <p className='mb-12'>The pages you visit, how long you stay, and where you came from.</p>



                        <ul className=" pl-6 mb-6 text-xl space-y-2">
                            <li>
                                <strong>2. How We Use Your Information</strong>

                            </li>
                        </ul>

                        <p className="mb-8">We use your data to make your experience with <Link href="/" className="text-blue-600 underline" >ATSASMUN</Link> better. Here{"’"}s how:
                        </p>
                        <p className="mb-8"> <strong>Event Management:</strong> To handle event registrations
                            and keep you informed about event updates.
                        </p>
                        <p className="mb-8"> <strong>Communication:</strong> To send newsletters, updates, or promotions (only if you{"’"}ve agreed to
                            receive them).
                        </p>
                        <p className="mb-8"> <strong>Support:</strong> To answer your questions and address any
                            concerns you might have.
                        </p>
                        <p className="mb-8"> <strong>Improvement:</strong> To analyze how people use our site and improve its
                            functionality
                        </p>
                        <p className="mb-8"> <strong>Legal Compliance:</strong> Legal Compliance: To meet legal requirements and prevent fraud.

                        </p>

                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>3. Cookies and Tracking</strong>

                            </li>
                        </ul>

                        <p className="mb-8"> We use cookies (small files stored on your device) to:</p>

                        <p className='mb-4'>Save your preferences for a personalized experience</p>
                        <p className='mb-4'>Analyze how visitors use our site so we can improve</p>
                        <p className='mb-4'>Show targeted ads (but only with your consent)</p>
                        <p className='mb-4'>You can manage or block cookies in your browser settings, though some features on our
                            site may not work without them</p>



                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>4. Sharing Your Data</strong>

                            </li>
                        </ul>

                        <p className="mb-8">Your privacy is a priority. We never sell or trade your personal information. However, we
                            might share your data in these situations:</p>

                        <p className='mb-4'> <strong>Trusted Partners:</strong> To process payments, send newsletters,
                            or host the website.
                        </p>
                        <p className='mb-4'> <strong>Legal Requirements:</strong> If the law requires it or to protect
                            against fraud or harm.
                        </p>
                        <p className='mb-4'> <strong>Business Changes:</strong> If ATSASMUN merges, reorganizes, or is sold.
                        </p>
                        <p className='mb-4'>We ensure our partners protect your data and use it only for
                            the agreed purposes.</p>

                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>5. How We Keep Your Data Safe</strong>
                            </li>
                        </ul>
                        <p className="mb-8">We take strong measures to protect your information, such as:
                        </p>

                        <p className='mb-4'>Encrypting data with SSL during transmission</p>
                        <p className='mb-4'>Using secure servers with firewalls</p>
                        <p className='mb-4'>Regularly testing for vulnerabilities</p>
                        <p className='mb-4'>Limiting access to personal information</p>

                        <p className='mb-4'>While we do our best to safeguard your data, no system is completely foolproof. Please
                            use ATSASMUN.com with this in mind.</p>


                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>6. Your Rights</strong>
                            </li>
                        </ul>
                        <p className="mb-8">Depending on your location, you have certain rights regarding your data:
                        </p>

                        <p className='mb-4'> <strong>Access:</strong> View the data we have about you.</p>
                        <p className='mb-4'> <strong>Correction:</strong> Fix any inaccuracies in your information.</p>
                        <p className='mb-4'> <strong>Deletion:</strong> Request deletion of your data (when legally allowed).</p>
                        <p className='mb-4'> <strong>Data Portability:</strong> Get a copy of your data in an easy-to-use format.</p>
                        <p className='mb-4'> <strong>Withdraw Consent:</strong> Opt out of marketing communications or
                            non-essential data use.To exercise these rights, contact us at
                            [email protected]. We{"’"}ll respond within 30 days.
                        </p>

                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>7. Links to Other Websites</strong>
                            </li>
                        </ul>
                        <p className="mb-4">Our site may link to other websites. Please note that we{"’"}re not responsible for their
                            privacy practices. We encourage you to review their policies before sharing any personal
                            information.
                        </p>

                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>8. Updates to This Policy</strong>
                            </li>
                        </ul>
                        <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted here
                            with a new effective date. If the updates are significant, we{"’"}ll notify you via email or on
                            our website.
                        </p>

                        <ul className=" pl-6 text-xl mb-6 space-y-2">
                            <li>
                                <strong>9. Contact Us</strong>
                            </li>
                        </ul>
                        <p className="mb-8">Have questions or concerns? We{"’"}re here to help!
                        </p>

                        <p className="mb-4"> <strong>Email:</strong> atsasmun@gmail.com</p>
                        <p className="mb-4"> <strong>Mailing Address:</strong> 42 Hennerton Way, High Wycombe, HP13 7UE, United Kingdom
                        </p>
                        <p className="mb-4">Thank you for trusting <Link href="/" className="text-blue-600 " >ATSASMUN</Link> Your privacy is central to everything we do!</p>


                    </div>
                </div>

            </header>
            <Footer />
            <ScrollToTop />
            <Whatsapp />

        </div>
    );
}
