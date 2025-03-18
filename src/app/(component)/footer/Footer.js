'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import logo from '@/app/public/img/logo-1.png'; // Logo

const Footer = () => {
    return (
        <>
            {/* Footer Main Section */}
            <footer className="bg-[#040919]  text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div data-aos="fade-right">
                        <div className="mb-1 -ml-3 mt-[-20px]">
                        <Link href="#">
                        <Image
                            src={logo}
                            alt="Logo"
                            className="lg:h-[100px] lg:w-[150px] md:h-[100px] md:w-[150px] sm:h-[80px] sm:w-[120px] h-[80px] w-[120px]"
                        />
                    </Link>
                        </div>
                        <p className="text-sm text-gray-400 leading-6 -mt-3">
                            Atsas MUN is an international platform where participants experience the truest simulation of the United Nations. We aim to provide an immersive and adventurous experience for our delegates. Join us for a journey of a lifetime.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div className="w-full sm:w-[180px]" data-aos="fade-up">
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-400 w-max">
                            USEFUL LINKS
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Home
                                    </p>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/payment"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Pricing
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/Terms&conditions"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Terms & Conditions
                                    </p>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/Privac"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Privacy Policy
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className=" md:ml-[-19px] sm:ml-0 w-[250px]" data-aos="fade-up">
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-400 w-max">
                            Delegate Destinations
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/dubai"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun Dubai
                                    </p>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Istanbul"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun Istanbul
                                    </p>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/India"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun India
                                    </p>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/USA"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun USA
                                    </p>

                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Saudi"
                                    className="flex items-center text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun  Saudi Arabia
                                    </p>

                                </Link>
                            </li>
                            {/* <li>
                                <Link
                                    href="/franceLandingP"
                                    className="flex items-center  text-gray-400 hover:text-blue-400 transition-all duration-300"
                                >
                                    <span className="mr-2 ">&#10140;</span>
                                    <p className='hover:scale-105 transition-transform duration-500'>
                                        Atsas Mun France
                                    </p>
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div data-aos="fade-down">
                        <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-400 w-max">
                            CONTACT US
                        </h3>
                        <p className="text-sm text-gray-400 leading-6">
                            42 Hennerton Way
                            <br />
                            High Wycombe, HP13 7UE,
                            <br />
                            United Kingdom
                        </p>
                        <div className="text-sm text-gray-400 mt-4">
                            <span className="font-bold text-white">Phone:</span>{' '}
                            <a href="tel:+447487302322" className="hover:text-blue-400">
                                <p className='hover:scale-105 transition-transform duration-500'>
                                +447487302322
                                </p>
                            </a>
                        </div>
                        <div className="text-sm text-gray-400">
                            <span className="font-bold text-white">Email:</span>{' '}
                            <a href="mailto:info@atsasmun.com" className="hover:text-blue-400">
                                <p className='hover:scale-105 transition-transform duration-500'>
                                info@atsasmun.com
                                </p>
                            </a>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-3 mt-6 justify-center sm:justify-start">
                            <a
                                href="https://www.facebook.com/share/189wEJeHZ5/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="  w-10 h-10 flex items-center justify-center border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200"
                            >
                                <FaFacebookF className="text-lg" />
                            </a>
                            <a
                                href="https://www.instagram.com/atsasmun/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border-2 border-pink-500 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-200"
                            >
                                <FaInstagram className="text-lg" />
                            </a>
                            <a
                                href="https://wa.me/+447487302322"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border-2 border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-200"
                            >
                                <FaWhatsapp className="text-lg" />
                            </a>
                            <a
                                href="mailto:info@atsasmun.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200"
                            >
                                <FaEnvelope className="text-lg" />
                            </a>
                            <a
                                href="tel:+447487302322"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center border-2 border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-200"
                            >
                                <FaPhoneAlt className="text-lg" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Footer Bottom Section */}
            <div className="bg-[#101522] text-center py-6 text-gray-400 text-sm relative">
                <p className="mb-2">
                    © Copyright{' '}
                    <span className="font-semibold text-white">Atsas Model United Nations</span>. All Rights Reserved.
                </p>
                <p className="mb-4">
                    A project of{' '}
                    <a
                        href="/"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                    >
                        Atsas Mun
                    </a>
                </p>
                <div className="absolute right-6 bottom-2 text-gray-400 text-xs hidden sm:block">
                    Design by{' '}
                    <span className="font-semibold">
                        <a
                            href="mailto:websitedeveloper431@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >

                            <span className="text-blue-400 hover:underline cursor-pointer">Noman</span> &{' '}
                            <span className="text-blue-400 hover:underline cursor-pointer">Abdullah</span>
                        </a>
                    </span>
                </div>
                <div className="sm:hidden mt-4 text-xs">
                    Design by{' '}
                    <span className="font-semibold">
                        <a
                            href="mailto:websitedeveloper431@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="text-blue-400 hover:underline cursor-pointer">Noman</span> &{' '}
                            <span className="text-blue-400 hover:underline cursor-pointer">Abdullah</span>
                        </a>

                    </span>
                </div>
            </div>
        </>
    );
};

export default Footer;
