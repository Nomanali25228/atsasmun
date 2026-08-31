'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import logo from '@/app/public/img/logo-1.png'; // Logo
import Link from 'next/link';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import ScrollToTop from '@/app/(component)/Scrolltotop/ScrollToTop';
import Footer from '@/app/(component)/footer/Footer';
import Whatsapp from '@/app/(component)/whatsapp/Whatsapp';
import ParticleCanvas from '@/app/(component)/ParticleCanvas';
import ContextPage from '@/app/Context/ContextPage';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/app/(component)/navbar/Navbar';

export default function Home() {

    const { check, setCheck } = useContext(ContextPage)
    const { amounts, setAmounts } = useContext(ContextPage)
    const searchParams = useSearchParams();
    const [custId, setCustID] = useState("")
    const [selectPac, setSelectPac] = useState("")
    const [loader, setLoader] = useState(false)
    const [loader1, setLoader1] = useState(false)

    useEffect(() => {
        setCheck("Paris, France")
    }, [check, setCheck])


    const seo = (oo) => {
        setAmounts(oo)
    }


    // choose button ////////////////////////////////

    // payment 1///////////////////////////////////////
    const [showOptions1, setShowOptions1] = useState(false);
    const optionsRef1 = useRef(null);

    const handleClick1 = () => {
        if (loader1 == true) {
            setShowOptions1(true)
            setShowOptions2(false)
        } else {
            setShowOptions1(!showOptions1);

        }

    };

    // Close the options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef1.current && !optionsRef1.current.contains(event.target)) {
                setShowOptions1(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // payment 2/////////////////////////////////////////
    const [showOptions2, setShowOptions2] = useState(false);
    const optionsRef = useRef(null);

    const handleClick2 = () => {
        if (loader == true) {
            setShowOptions2(true)


        } else {
            setShowOptions2(!showOptions2);

        }
    };

    // Close the options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions2(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // start invoice//////////////////////////////////////////////////////////////////////////////


    const id = searchParams.get("userid");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if (!id) return;
        
        const fetchData = async () => {
            try {
                // Use our LOCAL API instead of Strapi
                const url = `/api1/api/fivthnames?filters[userid][$eq]=${id}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }
                const result = await response.json();
                
                let customerId = "";
                let email = "";
                if (result.data && result.data.length > 0) {
                    const item = result.data[0];
                    const attrs = item.attributes || item; 
                    customerId = attrs.customerId;
                    email = attrs.Email || attrs.email;
                }

                console.log("Extracted Info:", { customerId, email });
                setCustID(customerId || "");
                setUserEmail(email || "");
            } catch (err) {
                console.error("Error fetching data:", err);
                toast.error("User details fetch failed. Check your Link or Internet.");
            }
        };

        fetchData();
    }, [id]);

    const handleCreateInvoice = async (su) => {
        if (!id) {
            toast.error("User ID is missing from the URL.");
            return;
        }

        setLoader(true);
        let non = su === 959 ? "Non-Accommodation" : "Accommodation";
        
        if (su === 959) {
            setLoader(false);
            setLoader1(true);
        } else {
            setLoader(true);
            setLoader1(false);
        }

        try {
            let customerIdToUse = custId;
            let emailToUse = userEmail;

            if (!customerIdToUse && !emailToUse) {
                const url = `/api1/api/fivthnames?filters[userid][$eq]=${id}`;
                const userRes = await fetch(url);
                if (userRes.ok) {
                    const userData = await userRes.json();
                    if (userData.data && userData.data.length > 0) {
                        const item = userData.data[0];
                        const attrs = item.attributes || item;
                        customerIdToUse = attrs.customerId || "";
                        emailToUse = attrs.Email || attrs.email || "";
                        setCustID(customerIdToUse);
                        setUserEmail(emailToUse);
                    }
                }
            }

            if (!customerIdToUse && !emailToUse) {
                toast.error("Customer information not found in database.");
                setLoader(false);
                setLoader1(false);
                return;
            }

            const response = await fetch("/api1/create-invoice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: customerIdToUse,
                    email: emailToUse,
                    amount: su,
                    description: "Tour Package Payment",
                    disnew: non
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create invoice");
            }

            if (data.invoicePdf) {
                window.location.href = data.invoicePdf;
                toast.success("Invoice PDF downloading!");
            } else if (data.invoiceUrl) {
                window.location.href = data.invoiceUrl;
                toast.success("Redirecting to invoice page...");
            }

            setLoader(false);
            setLoader1(false);

        } catch (error) {
            console.error("Error creating invoice:", error.message);
            toast.error(`Error: ${error.message}`);
            setLoader(false);
            setLoader1(false);
        }
    };


    // end invoice//////////////////////////////////////////////////////////////////////////////


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
                        <h2 className="text-center mt-32 lg:mt-28 relative z-10 text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight tracking-wide">
                            Pricing for <span className="text-purple-400">London, UK </span>
                        </h2>



                        <div className="grid  grid-cols-1 mb-12  sm:grid-cols-2 gap-14">
                            {/* Basic Plan */}
                            <div className=" relative z-10 bg-[#281a50] text-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-500">

                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center">Basic</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold">$959
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="line-through">$1059</span> Early Applicant Discount
                                        </p>
                                    </div>
                                    <p className="text-center text-blue-300 font-semibold uppercase text-xs">
                                        Non-Accommodation
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-6">
                                        <li>✔️ ATSASMUN Merch Kit</li>
                                        <li>✔️ United Nations Simulation Sessions</li>
                                        <li>✔️ ATSASMUN UNHCR Endorsed Certificates</li>
                                        <li>✔️ Cultural Performances</li>
                                        <li>✔️ Ice-breaking Session </li>
                                        <li>✔️ Diplomatic Dinner</li>
                                        <li>✔️ 1 Lunch and 2 Dinners</li>
                                    </ul>
                                    <div className="text-center mt-6">
                                        <div ref={optionsRef1} className="relative">
                                            {/* "Choose" Button */}
                                            {!showOptions1 && (
                                                <button
                                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                                                    onClick={handleClick1}
                                                >
                                                    Choose
                                                </button>
                                            )}

                                            {/* Options */}
                                            {showOptions1 && (
                                                <div className="mt-4 space-y-2">
                                                    <button
                                                        className="w-full mb-2 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300"
                                                        onClick={handleClick1}
                                                    >
                                                        Cancel ✖
                                                    </button>
                                                    <Link href="/checkout">
                                                        <button
                                                            onClick={() => seo(959)}
                                                            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 text-white text-sm font-bold rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300"
                                                        >
                                                            Pay now →
                                                        </button>
                                                    </Link>
                                                    {loader1 && <button
                                                        className="w-full py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300">
                                                        <div className=" gap-4 w-full flex items-center justify-center">
                                                            <p> Please waite. </p>
                                                            <div
                                                                className="w-8 h-8 border-2 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-500 rounded-full"
                                                            >
                                                                <div
                                                                    className="w-6 h-6 border-2 border-transparent text-red-700 text-4xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"
                                                                ></div>
                                                            </div>
                                                        </div>


                                                    </button>}
                                                    {!loader1 && <button
                                                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300"
                                                        onClick={() => handleCreateInvoice(959)}>
                                                        Invoice ↓
                                                    </button>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Full Experience Plan */}
                            <div className=" relative z-10 bg-[#281a50] text-white rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform duration-500">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-center">Full Experience</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold">$1659</p>
                                        {/* <p className="text-xs mt-1 text-gray-400">(+5% tax)</p> */}
                                        <p className="text-xs text-gray-500 mt-1">
                                            <span className="line-through">$1599</span> Early Applicant Discount
                                        </p>
                                    </div>
                                    <p className="text-center text-blue-300 font-semibold uppercase text-xs">
                                        Accommodation
                                    </p>
                                    <ul className="mt-3 space-y-2 text-gray-300 text-xs leading-5">
                                        <li>✔️ Everything in Non-Accomodation Package</li>
                                        <li>✔️ 5 Star Accommodation-Twin Shared (3 Nights)</li>
                                        <li>✔️ 3 Buffet Breakfast</li>
                                        <li>✔️ 2 Lunch and 3 Dinners</li>
                                        <li>✔️ London City Tou</li>
                                    </ul>
                                    <div className="text-center mt-6">
                                        <div ref={optionsRef} className="relative">
                                            {/* "Choose" Button */}
                                            {!showOptions2 && (
                                                <button
                                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                                                    onClick={handleClick2}
                                                >
                                                    Choose
                                                </button>
                                            )}

                                            {/* Options */}
                                            {showOptions2 && (
                                                <div className="mt-4 space-y-2">
                                                    <button
                                                        className="w-full mb-2 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white text-sm font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300"
                                                        onClick={handleClick2}
                                                    >
                                                        Cancel ✖
                                                    </button>
                                                    <Link href="/checkout">
                                                        <button
                                                            onClick={() => seo(1659)}
                                                            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 text-white text-sm font-bold rounded-full hover:bg-green-700 hover:scale-105 transition-all duration-300"
                                                        >
                                                            Pay now →
                                                        </button>
                                                    </Link>
                                                    {loader && <button
                                                        className="w-full py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300">
                                                        <div className=" gap-4 w-full flex items-center justify-center">
                                                            <p> Please waite. </p>
                                                            <div
                                                                className="w-8 h-8 border-2 border-transparent text-blue-700 text-4xl animate-spin flex items-center justify-center border-t-blue-500 rounded-full"
                                                            >
                                                                <div
                                                                    className="w-6 h-6 border-2 border-transparent text-red-700 text-4xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"
                                                                ></div>
                                                            </div>
                                                        </div>


                                                    </button>}
                                                    {!loader && <button
                                                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold rounded-full hover:scale-105 transition-all duration-300"
                                                        onClick={() => handleCreateInvoice(1659)}>
                                                        Invoice ↓
                                                    </button>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
