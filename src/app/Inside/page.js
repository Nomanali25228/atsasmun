'use client';
import Image from 'next/image';
// import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import mein from '@/app/public/img/ax7.jpeg'; // Logo
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
                        <Image src={logo} alt="Logo" className="h-[100px] w-[150px] " />
                    </Link>
                    <div className="flex items-center">
                    </div>

                    <button className="sm:ml-[240px] ml-[10px] md:ml-[380px] block lg:hidden bg-[#027CAC] text-white font-semibold  py-1 px-2 sm:py-2 sm:px6 md:py-2 md:px-6 lg:py-2 lg:px-6 rounded-full border-2 border-[#027CAC] transition-all duration-300 hover:bg-transparent text-sm tracking-wide">
                        <Link href="/RegisterNow">
                            <p > Register Now</p>
                        </Link>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6 ml-28 text-sm font-medium text-[#A8ABBA]">
                        {/* Home */}
                        <a
                            href="/"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "home" ? "" : ""
                                }`}
                        >
                            Home
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>


                        <a
                            href="/#events"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "events" ? "text-white" : ""
                                }`}
                        >
                            Events
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "events" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>

                        {/* atsasMun */}
                        <a
                            href="/#atsasMun"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "atsasMun" ? "text-white" : ""
                                }`}
                        >
                            Atsas Mun
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "atsasMun" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>
                        {/* Gallery */}
                        <a
                            href="/#gallery"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "gallery" ? "text-white" : ""
                                }`}
                        >
                            Gallery
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "gallery" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>
                        {/* Blog */}



                        {/* FAQ */}
                        <a
                            href="/#faq"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "faq" ? "text-white" : ""
                                }`}
                        >
                            FAQ
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "faq" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>

                        {/* Contact */}
                        <a
                            href="/#contact"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "contact" ? "text-white" : ""
                                }`}
                        >
                            Contact
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "contact" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>


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
                                    <Link href="/Istanbul" className="block px-4 py-2 hover:text-blue-400 ">
                                        Istanbul, Turkey
                                    </Link>
                                    <Link href="/dubai" className="block px-4 py-2 hover:text-blue-400">
                                        Dubai, UAE
                                    </Link>
                                    <Link href="/malaysiaLandingP" className="block px-4 py-2 hover:text-blue-400">
                                        Kuala Lumpur, Malaysia
                                    </Link>
                                    <Link href="/londonLandingP" className="block px-4 py-2 hover:text-blue-400">
                                        London, UK
                                    </Link>
                                    <Link href="/switzerlandLandingP" className="block px-4 py-2 hover:text-blue-400">
                                        Geneva, Switzerland
                                    </Link>
                                    <Link href="/franceLandingP" className="block px-4 py-2 hover:text-blue-400">
                                        Paris, France
                                    </Link>

                                </div>
                            )}
                        </div>

                        <Link
                            href="/Blogs/1"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "home" ? "text-white" : ""
                                }`}
                        >
                            Blog
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "home" ? "w-full" : "w-0 group-hover:w-full"
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
                                    Information
                                    <span
                                        className="absolute left-0 top-7 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out group-hover:w-full"
                                    ></span>
                                </span>
                                <AiOutlineDown className="text-[#A8ABBA] group-hover:text-white text-xs" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute w-[170px] left-0 mt-4 bg-white text-black rounded shadow-lg">
                                    <Link href="/Rundown" className="block px-4 py-2 hover:text-blue-400">
                                        Rundown & Events
                                    </Link>

                                    <Link href="/Price" className="block px-4 py-2 hover:text-blue-400">
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
                        <button className="hidden lg:block bg-[#027CAC] text-white font-semibold py-2 px-6 rounded-full border-2 border-[#027CAC] transition-all duration-300 hover:bg-transparent text-sm tracking-wide">
                            Register Now
                        </button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden ml-[-20px] text-white"
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
                                        href="/malaysiaLandingP"
                                        className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Kuala Lumpur, Malaysia
                                        <span
                                            className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                        ></span>
                                    </Link>
                                    <Link
                                        href="/londonLandingP"
                                        className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        London, UK

                                        <span
                                            className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                        ></span>
                                    </Link>
                                    <Link
                                        href="/switzerlandLandingP"
                                        className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Geneva, Switzerland

                                        <span
                                            className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                        ></span>
                                    </Link> <Link
                                        href="/franceLandingP"
                                        className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Paris, France

                                        <span
                                            className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                        ></span>
                                    </Link>

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
                                        href="/Rundown"
                                        className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Rundown & Events
                                        <span
                                            className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                        ></span>
                                    </Link>

                                    <Link
                                        href="/Price"
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
                                        href="/privac"
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
                className="relative bg-cover  bg-center min-h-screen flex items-center justify-center text-white"
                // style={{
                //     backgroundImage: `url(${bg.src})`,
                //     backgroundAttachment: "fixed",
                // }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#03030c] bg-opacity-80 z-0"></div>

                {/* Hero Content */}
                <div className="relative  z-10">
                    <div className="bg-white mt-[150px]  py-11 my-12 rounded-xl p-9 relative overflow-hidden max-w-[70%] mx-auto">
                        {/* Image Section */}
                        <div className=" mx-auto flex justify-center w-5/5 h-54">
                            <Image
                                src={mein}
                                alt="What is Model UN"
                                className="rounded-lg object-cover w-[90%] h-[500px] shadow-md"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="mt-12 text-center">
                            <p className="text-green-500 font-semibold text-sm uppercase tracking-wider mt-2">
                                Article
                            </p>
                            <h2 className="text-xl font-bold text-gray-800">
                                WHAT IS A MODEL UNITED NATIONS (MUN)?
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                You taking part in Model United Nations conference for the first
                                time makes us content and proud as we can help you through it all.
                                With this decision, your life is going to change, you will meet
                                individuals from all over the world, and you will get the chance
                                to practice your leadership skills on this expedition.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Model United Nations can be a valuable experience that inspires you
                                to make the world a better place, aids in the search for your first
                                job, and even helps you gain admission to college. Although Model
                                United Nations conference may at first appear overwhelming,
                                we are here to assist you.


                            </p>
                            <div className="py-10 px-4 sm:px-8 md:px-16 lg:px-24">
                                {/* Heading Section */}
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6">
                                    What Is Istanbul International Model United Nations Conference?
                                </h1>

                                {/* List Section */}
                                <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg leading-relaxed space-y-2 mb-8">
                                    <li>Understand how Istanbul MUN functions before you begin your reading, research, and preparation.</li>
                                    <li>Each delegate attends a United Nations committee to speak on behalf of a nation over a significant world problem.</li>
                                    <li>The conference offers information on the subject through a Study Guide.</li>
                                    <li>Discuss your concepts and workable solutions with the other committee members.</li>
                                    <li>Vote in the committee on the draft resolutions.</li>
                                    <li>Delegates with majority votes will pass the resolution.</li>
                                </ul>

                                {/* Subheading Section */}
                                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                                    Start With Your Countrys Profile
                                </h2>

                                {/* Paragraph Section */}
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
                                    The following are some topics to look into:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 text-base sm:text-lg leading-relaxed space-y-2 mb-8">
                                    <li>
                                        Locate your country on a map. Look at the terrain, your size, and your surroundings. Pretty much all the demographics. Analyze your political system to see if it is a democracy, a sort of anti, or a monarchy.
                                    </li>
                                    <li>
                                        Number of people, languages spoken, ethnic makeup, and revenue, which is typically calculated by looking at the Gross Domestic Product (GDP). News – Keep up with the latest headlines from around the world. Search for any recent modifications to the law, the policy, etc.
                                    </li>
                                </ul>

                                {/* Subheading Section */}
                                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
                                    Go Through Policy Statement
                                </h2>

                                {/* Paragraph Section */}
                                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    In essence, the Policy Statement is a one- or two-page paper that summarizes your expertise of the subject and the stance your nation intends to adopt when it enters the conference. The four components that are commonly included are the Background of the Topic, Previous International Actions, Nation Policy, and Potential Solutions. Normally, position papers must be submitted before the meeting.
                                </p>
                            </div>
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
