"use client";

import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Footer from "@/app/(component)/footer/Footer";
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';


import { useEffect, useState } from "react";
import { getPostBySlug } from "@/app/lib/api"; // Import your API function
import { useParams } from "next/navigation"; // Import the useParams hook
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaClipboard } from "react-icons/fa"; // Import your chosen icon
import Loader from "@/app/component/loader/Loader";
import moment from "moment";
import { toast } from "react-hot-toast";

// Function to handle copying code to the clipboard
const handleCopyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!"); // Show toast on success
  } catch (err) {
    console.error("Failed to copy code: ", err);
    toast.error("Failed to copy code");
  }
};

const BlogPostPage = () => {

  // navbar////////////////////////////////////////////
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

  // blog///////////////////////////////////////////////////////////////////////////
  const { slug } = useParams(); // Access the `slug` from the URL params using useParams
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          // Fetch the post using the slug
          const fetchedPost = await getPostBySlug(slug);
          setPost(fetchedPost);
        } catch (err) {
          setError("Error fetching post.");
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [slug]);

  if (loading)
    return (
      <div className="max-w-screen-md mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error) return <p className="max-w-screen-md mx-auto">Error: {error}</p>;
  if (!post) return <p className="max-w-screen-md mx-auto">No post found.</p>;

  return (
    <>

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
                  <Link href="/India" className="block px-4 py-2 hover:text-blue-400">
                    Goa, India
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

              className={`relative group text-white transition-all duration-300 ${activeSection === "home" ? "" : ""
                }`}
            >
              Blog
              <span
                className="absolute left-0 top-7 bottom-0  h-0.5 bg-blue-400 transition-all duration-300 ease-in-out w-full"
              ></span>
            </Link>
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 text-[#A8ABBA] hover:text-white">
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


      <header
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay only on background image */}
        <div className="absolute inset-0 bg-[#03040f] bg-opacity-80"></div>



        <div className="w-[90%] sm:w-[80%] rounded-lg relative z-10 mb-24 mt-56 bg-[#e7e5e5] p-4 sm:p-8">

          {/* Time Section */}
          <div className="w-full relative -top-36 flex items-center justify-center text-gray-800 text-xs sm:text-sm font-medium tracking-wide mb-6">
            <span className="bg-gray-100 px-4 py-2 rounded-full shadow-md">
              Published: {moment(post.createdAt).fromNow()}
            </span>
          </div>

          {/* Image Section */}
          {post.cover && (
            <div className="flex justify-center">
              <div className="relative h-[40%] w-[90%] sm:w-[60%] -mt-24 sm:-mt-32 mb-6">
                <Image
                  
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                  alt={post.title}
                  className="rounded-lg w-full h-full object-cover shadow-md"
                />
              </div>
            </div>
          )}



          {/* Title Section */}
          <h3 className="text-xl sm:text-3xl leading-[40px] sm:leading-[60px] capitalize text-center font-bold text-gray-800 font-jet-brains mb-4">
            {post.title}
          </h3>

          {/* Categories Section */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 my-4">
              {post.categories.map(({ name, documentId }) => (
                <span
                  key={documentId}
                  className="border border-purple-900 font-medium px-2 py-1 text-xs sm:text-sm rounded-md bg-purple-100 text-purple-800"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-500 leading-[28px] sm:leading-[32px] tracking-wide italic mt-2 mb-6">
            {post.description}
          </p>

          {/* Content Section */}
          <Markdown
            className="leading-[30px] sm:leading-[40px] prose prose-invert prose-purple max-w-full"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                const codeString = String(children).replace(/\n$/, "");

                return !inline && match ? (
                  <div className="relative">
                    <button
                      onClick={() => handleCopyCode(codeString)}
                      className="absolute top-2 right-2 bg-gray-700 text-white p-1 rounded-md hover:bg-gray-600"
                      title="Copy to clipboard"
                    >
                      <FaClipboard />
                    </button>
                    <SyntaxHighlighter
                      style={dracula}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </Markdown>

          {/* Back Button */}
          <div className='pt-10'>
            <button
              onClick={() => window.history.back()}
              className="bg-white  text-center w-36 rounded-xl h-10 relative text-black text-lg font-semibold group"
              type="button"
            >
              <div
                className="bg-blue-400 rounded-xl h-8 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[95%] z-10 duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  height="18px"
                  width="18px"
                >
                  <path
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                    fill="#000000"
                  ></path>
                  <path
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                    fill="#000000"
                  ></path>
                </svg>
              </div>
              <p className="translate-x-2 text-sm">Go Back</p>
            </button>
          </div>


        </div>
      </header>

      <Footer />
      <ScrollToTop />
      <Whatsapp />
    </>
  );
};

export default BlogPostPage;
