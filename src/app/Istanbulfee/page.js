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
        setCheck("Istanbul, Turkey")
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
                            Pricing for <span style={{ color: '#FF5A5F' }}>Istanbul, Turkey</span>
                        </h2>
                        <div className="grid grid-cols-1 mb-12 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Delegation Package */}
                            <div className="relative z-10 bg-[#1B1E3D] text-white rounded-xl p-6 shadow-lg border border-[rgba(245,241,232,0.14)] transform hover:scale-105 transition-transform duration-500 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center" style={{ color: '#F5F1E8' }}>Delegation Package</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold" style={{ color: '#F2B705' }}>$418 <span className="text-sm font-normal text-gray-300">+ 5% TAX</span></p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Early Bird <span className="text-[#2EC4B6] font-semibold">(Save $120)</span> · After <span className="line-through">$538 + 5% TAX</span>
                                        </p>
                                    </div>
                                    <p className="text-center text-[#2EC4B6] font-semibold uppercase text-xs">
                                        Non-Accommodation
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-6">
                                        <li>✔️ ATSASMUN Merch Kit</li>
                                        <li>✔️ Official ATSASMUN Certificate</li>
                                        <li>✔️ Visa Invitation Letter</li>
                                        <li>✔️ United Nations Simulation Sessions</li>
                                        <li>✔️ Professional event photos</li>
                                        <li>✔️ First come First Serve committee Allocation (Limited Spaces)</li>
                                        <li>✔️ Breakfast Every Morning</li>
                                        <li>✔️ 1 Dinner</li>
                                    </ul>
                                </div>
                                <div className="text-center mt-6">
                                    <Link href="/RegisterNow">
                                        <button className="atsas-btn-solid w-full" style={{ width: '100%', justifyContent: 'center' }}>
                                            Register Now →
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Delegation + Accommodation */}
                            <div className="relative z-10 bg-[#1B1E3D] text-white rounded-xl p-6 shadow-lg border-2 border-[#FF5A5F] transform hover:scale-105 transition-transform duration-500 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="bg-[#FF5A5F] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full w-max mx-auto -mt-3">
                                        Most Popular
                                    </div>
                                    <h3 className="text-lg font-bold text-center" style={{ color: '#F5F1E8' }}>Delegation + Accommodation</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold" style={{ color: '#F2B705' }}>$549 <span className="text-sm font-normal text-gray-300">+ 5% TAX</span></p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Early Bird <span className="text-[#2EC4B6] font-semibold">(Save $140)</span> · After <span className="line-through">$689 + 5% TAX</span>
                                        </p>
                                    </div>
                                    <p className="text-center text-[#2EC4B6] font-semibold uppercase text-xs">
                                        Accommodation Included
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-5">
                                        <li>✔️ Everything in Delegation Package</li>
                                        <li>✔️ 4-5 Star Accommodation (Twin Shared Room)</li>
                                        <li>✔️ Airport Arrival Assistance</li>
                                        <li>✔️ Guided City Tour</li>
                                        <li>✔️ 1 Lunch & 2 Dinner</li>
                                    </ul>
                                </div>
                                <div className="text-center mt-6">
                                    <Link href="/RegisterNow">
                                        <button className="atsas-btn-solid w-full" style={{ width: '100%', justifyContent: 'center', background: '#FF5A5F' }}>
                                            Register Now →
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Full Experience Package */}
                            <div className="relative z-10 bg-[#1B1E3D] text-white rounded-xl p-6 shadow-lg border border-[rgba(245,241,232,0.14)] transform hover:scale-105 transition-transform duration-500 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center" style={{ color: '#F5F1E8' }}>Full Experience Package</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold" style={{ color: '#F2B705' }}>$689 <span className="text-sm font-normal text-gray-300">+ 5% TAX</span></p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Early Bird <span className="text-[#2EC4B6] font-semibold">(Save $150)</span> · After <span className="line-through">$839 + 5% TAX</span>
                                        </p>
                                    </div>
                                    <p className="text-center text-[#2EC4B6] font-semibold uppercase text-xs">
                                        VIP Full Experience
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-5">
                                        <li>✔️ Everything in Delegation + Accommodation</li>
                                        <li>✔️ Bosphorus Dinner Cruise Trip</li>
                                        <li>✔️ Airport Arrival & Dropoff Assistance</li>
                                        <li>✔️ Lucky Draw</li>
                                        <li>✔️ Priority Registration</li>
                                        <li>✔️ 2 Lunch & 3 Dinner</li>
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <Link href="/RegisterNow">
                                        <button className="atsas-btn-solid w-full" style={{ width: '100%', justifyContent: 'center' }}>
                                            Register Now →
                                        </button>
                                    </Link>
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
