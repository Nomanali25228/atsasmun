'use client';
import Image from 'next/image';
// import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background 
// import bg from '@/app/public/img/HPbg2.png'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
// import videoFile from "@/app/public/videos/header.mp4"; // Replace with your video path
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles
import ParticleCanvas from '../ParticleCanvas';
import { IoPlayOutline } from 'react-icons/io5';

const cities = [
    'Istanbul, Turkey',
    'Dubai, UAE',
    'Kuala Lumpur, Malaysia',
    'London, UK',
    'Geneva, Switzerland',
    'Paris, France',
    'New York, USA',
];

export default function Home() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [mobileDropdownOpen2, setMobileDropdownOpen2] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const handlePlay = () => {
    //     setIsModalOpen(true); // Open the modal
    // };

    const handleClose = () => {
        setIsModalOpen(false); // Close the modal
    };


    let dropdownTimeout;
    let dropdownTimeout2;

    const handleMouseEnter = () => {
        clearTimeout(dropdownTimeout); // Clear any existing timeout
        setDropdownOpen(true); // Show dropdown immediately
    };

    const handleMouseLeave = () => {
        dropdownTimeout = setTimeout(() => {
            setDropdownOpen(false); // Hide dropdown after 3 seconds
        }, 400); // 3-second delay
    };


    const handleMouseEnter2 = () => {
        clearTimeout(dropdownTimeout2); // Clear any existing timeout
        setDropdownOpen2(true); // Show dropdown immediately
    };

    const handleMouseLeave2 = () => {
        dropdownTimeout2 = setTimeout(() => {
            setDropdownOpen2(false); // Hide dropdown after 3 seconds
        }, 400); // 3-second delay
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
                { id: "faq", offset: document.getElementById("faq")?.offsetTop || 0 },
                { id: "contact", offset: document.getElementById("contact")?.offsetTop || 0 },
                { id: "blog", offset: document.getElementById("blog")?.offsetTop || 0 },
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


    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: 'ease-in-out', // Easing for the animation
            once: true, // Whether animation should happen only once
        });
    }, []);



    // auto text ////////////////////////////////////
    const [currentText, setCurrentText] = useState('');
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentCity = cities[currentCityIndex];
        let timer;

        if (!isDeleting && charIndex < currentCity.length) {
            // Typing effect
            timer = setTimeout(() => {
                setCurrentText((prev) => prev + currentCity[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 70);
        } else if (isDeleting && charIndex > 0) {
            // Deleting effect
            timer = setTimeout(() => {
                setCurrentText((prev) => prev.slice(0, -1));
                setCharIndex((prev) => prev - 1);
            }, 50);
        } else if (!isDeleting && charIndex === currentCity.length) {
            // Pause before deleting
            timer = setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && charIndex === 0) {
            // Switch to the next city
            setIsDeleting(false);
            setCurrentCityIndex((prev) => (prev + 1) % cities.length); // Move to the next city
        }

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, currentCityIndex]);




    return (
        <div id="banner"
            className="   relative overflow-hidden"
        >
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
                        <a
                            href="#"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "home" ? "text-white" : ""
                                }`}
                        >
                            Home
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "home" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>


                        <a
                            href="#events"
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
                            href="#atsasMun"
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "atsasMun" ? "text-white" : ""
                                }`}
                        >
                            Atsas mun
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "atsasMun" ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </a>
                        {/* Gallery */}
                        <a
                            href="#gallery"
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
                            href="#faq"
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
                            href="#contact"
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
                                    <Link href="/Istanbul" className="block px-4 py-2 hover:text-blue-400">
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
                            className={`relative group text-[#A8ABBA] hover:text-white transition-all duration-300 ${activeSection === "blog" ? "text-white" : ""
                                }`}
                        >
                            Blog
                            <span
                                className={`absolute left-0 top-7 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ease-in-out ${activeSection === "blog" ? "w-full" : "w-0 group-hover:w-full"
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
                                    <Link href="/payment" className="block px-4 py-2 hover:text-blue-400">
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
                        <button className="hidden lg:block bg-[#027CAC] text-white font-semibold py-1.5 px-4 rounded-full border-2 border-[#027CAC] transition-all duration-300 hover:bg-transparent text-[12px] tracking-wide">
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
                                href="#home"
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
                                href="#events"
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
                                href="#atsasMun"
                                className="relative block font-bold text-lg text-[#A8ABBA] hover:text-white py-3 px-5 rounded-lg transition-all duration-500 ease-in-out transform group hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="relative z-10">Atsas mun</span>
                                <span
                                    className="absolute inset-0 scale-x-0 bg-gradient-to-r from-blue-500 to-purple-700 rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-x-100"
                                ></span>
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-[3px] bg-white transition-all duration-500 ease-in-out group-hover:w-full"
                                ></span>
                            </Link>

                            <Link
                                href="#gallery"
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
                                href="#faq"
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
                                href="#contact"
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
                className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundAttachment: "fixed",
                }}
            >

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#060713] bg-opacity-80"></div>

                {/* Hero Content */}
                <div className="relative z-10  mt-[120px] text-center px-6 sm:px-8">
                    <h1
                        data-aos="fade-right"
                        className="text-3xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-100"
                    >
                        THE WORLD OF DIPLOMACY WITH
                    </h1>
                    <h1
                        data-aos="fade-right"
                        className="text-3xl sm:text-4xl lg:text-6xl mt-2 font-bold leading-tight"
                    >
                        <span className="bg-gradient-to-r from-[#C38E87] to-[#465D88] bg-clip-text text-transparent hover:underline hover:underline-offset-8">
                            Atsas Model United Nations
                        </span>
                    </h1>

                    <h1
                        data-aos="fade-right"
                        className="text-2xl sm:text-2xl lg:text-3xl mt-2 font-bold leading-tight text-gray-100"
                    >
                        By Atsas International Network
                    </h1>

                    {/* Typing Effect */}
                    <div className="text-center py-6">
                        <h1 data-aos="fade-down" className="text-3xl lg:text-4xl font-bold bg-gradient-to-r  from-[#ca8980] to-[#315fb6] bg-clip-text text-transparent">
                            <span>{currentText}</span>
                            <span className="animate-blink">|</span>
                        </h1>
                    </div>

                    {/* Play Button */}
                    <div className="flex flex-col items-center justify-center">
                        <div data-aos="fade-down" className="flex justify-center py-5">

                            {/* Play Button */}
                            <span
                                className=" flex justify-center items-center cursor-pointer hover:text-[#027CAC] transition"
                            // onClick={handlePlay}
                            >
                                <IoPlayOutline className='text-[60px]' />
                            </span>
                        </div>


                        {/* Video Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-80  z-50 flex justify-center items-center px-4 sm:px-6">
                                <div className="relative w-full max-w-4xl">
                                    {/* Video */}
                                    <video
                                        src={videoFile} // Replace with your video file path
                                        controls
                                        autoPlay
                                        className="w-full rounded-lg shadow-lg"
                                    ></video>
                                    {/* Close Button */}
                                    <button
                                        className="absolute top-5 right-2 text-white text-2xl hover:text-[#1E88E5]"
                                        onClick={handleClose}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pricing Button */}

                    <div className="text-center  py-6">
                        <Link href="/payment">
                            <button className="rounded-[50px] bg-transparent hover:bg-[#1E88E5] transition-all duration-300 border-[#1e88e5d2] border-2">
                                <div className="flex py-1 px-4 sm:px-6 justify-center items-center">
                                    <p className="font-bold text-sm sm:text-[16px] text-[#ffffff]">
                                        Pricing
                                    </p>
                                    <MdOutlineArrowRightAlt className="text-lg sm:text-[30px] mt-1 sm:mt-2 text-[#ffffff]" />
                                </div>
                                <hr className="w-[70%] sm:w-[80%] mx-auto border-t border-gray-100" />
                                <p className="py-2 px-6 sm:px-9 text-[11px] sm:text-[13px] text-gray-200">
                                    Early Applicant Discounts (Limited Slots Left)
                                </p>
                            </button>
                        </Link>
                    </div>
                </div>
            </header>


            {/* <div className="hidden sm:block"> */}
            <ParticleCanvas />
            {/* </div> */}
        </div>
    );
}
