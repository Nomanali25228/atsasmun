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
import Navbar from '../(component)/navbar/Navbar';


export default function Home() {
    

    return (
        <div>
            {/* Navbar */}
      <Navbar />

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
                    <div className="max-w-5xl mx-4 mt-40 lg:mx-auto rounded-lg p-6" style={{ background: '#1B1E3D', border: '1px solid rgba(245,241,232,0.14)', color: '#F5F1E8' }}>
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
