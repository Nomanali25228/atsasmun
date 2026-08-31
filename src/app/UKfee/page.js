'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import ScrollToTop from '../(component)/Scrolltotop/ScrollToTop';
import Footer from '../(component)/footer/Footer';
import Whatsapp from '../(component)/whatsapp/Whatsapp';
import ParticleCanvas from '../(component)/ParticleCanvas';
import ContextPage from '../Context/ContextPage';
import Navbar from '../(component)/navbar/Navbar';


export default function Home() {

    const { check, setCheck } = useContext(ContextPage)
    useEffect(() => {
        setCheck("London, UK")
    }, [check, setCheck])


    return (
        <div>
            {/* Navbar */}
            <Navbar />
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
                <section >
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-center mt-32 lg:mt-28 relative z-10 text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Pricing for <span style={{ color: '#FF5A5F' }}>London, UK</span>
                        </h2>
                        <div className="grid grid-cols-1 mb-12 sm:grid-cols-2 gap-14">
                            {/* Basic Plan */}
                            <div className="relative z-10 bg-[#1B1E3D] text-white rounded-xl p-6 shadow-lg border border-[rgba(245,241,232,0.14)] transform hover:scale-105 transition-transform duration-500">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center" style={{ color: '#F5F1E8' }}>Basic</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold" style={{ color: '#F2B705' }}>$959</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            <span className="line-through">$1000</span> Early Applicant Discount
                                        </p>
                                    </div>
                                    <p className="text-center text-[#2EC4B6] font-semibold uppercase text-xs">
                                        Non-Accommodation
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-6">
                                        <li>✔️ ATSASMUN Merch Kit</li>
                                        <li>✔️ United Nations Simulation Sessions</li>
                                        <li>✔️ ATSASMUN UNHCR Endorsed Certificates</li>
                                        <li>✔️ Cultural Performances</li>
                                        <li>✔️ Ice-breaking Session</li>
                                        <li>✔️ Diplomatic Dinner</li>
                                        <li>✔️ 1 Lunch and 2 Dinners</li>
                                    </ul>
                                    <div className="text-center mt-6">
                                        <button className="atsas-btn-outline w-full" style={{ width: '100%', justifyContent: 'center', opacity: 0.85, cursor: 'default' }}>
                                            Registrations Opening Soon
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Full Experience Plan */}
                            <div className="relative z-10 bg-[#1B1E3D] text-white rounded-xl p-6 shadow-lg border border-[rgba(245,241,232,0.14)] transform hover:scale-105 transition-transform duration-500 flex flex-col justify-between h-full">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center" style={{ color: '#F5F1E8' }}>Full Experience</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold" style={{ color: '#F2B705' }}>$1659</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            <span className="line-through">$1599</span> Early Applicant Discount
                                        </p>
                                    </div>
                                    <p className="text-center text-[#2EC4B6] font-semibold uppercase text-xs">
                                        Accommodation
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-5">
                                        <li>✔️ Everything in Non-Accommodation Package</li>
                                        <li>✔️ 5 Star Accommodation-Twin Shared (3 Nights)</li>
                                        <li>✔️ 3 Buffet Breakfast</li>
                                        <li>✔️ 2 Lunch and 3 Dinners</li>
                                        <li>✔️ London City Tour</li>
                                    </ul>
                                </div>
                                <div className="text-center mt-6">
                                    <button className="atsas-btn-outline w-full" style={{ width: '100%', justifyContent: 'center', opacity: 0.85, cursor: 'default' }}>
                                        Registrations Opening Soon
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>
            </header>
            <Footer />
            <ScrollToTop />
            <Whatsapp />
            <ParticleCanvas />

        </div>
    );
}
