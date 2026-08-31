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
    const [loader1, setLoader1] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [loader3, setLoader3] = useState(false);

    useEffect(() => {
        setCheck("Istanbul, Turkey")
    }, [check, setCheck])

    const seo = (oo) => {
        setAmounts(oo)
    }

    // choose buttons ////////////////////////////////
    // Package 1
    const [showOptions1, setShowOptions1] = useState(false);
    const optionsRef1 = useRef(null);
    const handleClick1 = () => {
        if (loader1) {
            setShowOptions1(true);
            setShowOptions2(false);
            setShowOptions3(false);
        } else {
            setShowOptions1(!showOptions1);
            setShowOptions2(false);
            setShowOptions3(false);
        }
    };

    // Package 2
    const [showOptions2, setShowOptions2] = useState(false);
    const optionsRef2 = useRef(null);
    const handleClick2 = () => {
        if (loader2) {
            setShowOptions2(true);
            setShowOptions1(false);
            setShowOptions3(false);
        } else {
            setShowOptions2(!showOptions2);
            setShowOptions1(false);
            setShowOptions3(false);
        }
    };

    // Package 3
    const [showOptions3, setShowOptions3] = useState(false);
    const optionsRef3 = useRef(null);
    const handleClick3 = () => {
        if (loader3) {
            setShowOptions3(true);
            setShowOptions1(false);
            setShowOptions2(false);
        } else {
            setShowOptions3(!showOptions3);
            setShowOptions1(false);
            setShowOptions2(false);
        }
    };

    // Close the options menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef1.current && !optionsRef1.current.contains(event.target)) {
                setShowOptions1(false);
            }
            if (optionsRef2.current && !optionsRef2.current.contains(event.target)) {
                setShowOptions2(false);
            }
            if (optionsRef3.current && !optionsRef3.current.contains(event.target)) {
                setShowOptions3(false);
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
                const url = `/api1/api/firstnames?filters[userid][$eq]=${id}`;
                const response = await fetch(url);
                if (!response.ok) {
                     const errData = await response.json();
                     throw new Error(`Server Error: ${response.status}`);
                }
                let result = await response.json();
                
                let customerId = "";
                let email = "";
                if (result.data && result.data.length > 0) {
                    const item = result.data[0];
                    const attrs = item.attributes || item;
                    customerId = attrs.customerId;
                    email = attrs.Email || attrs.email;
                }

                setCustID(customerId || "");
                setUserEmail(email || "");
            } catch (err) {
                console.error("Fetch Logic Error:", err.message);
                toast.error(`Error: ${err.message}`);
            }
        };

        fetchData();
    }, [id]);

    const handleCreateInvoice = async (su) => {
        if (!id) {
            toast.error("User ID is missing. Please use the link from your email.");
            return;
        }

        let pkgName = su === 418 ? "Delegation Package" : su === 549 ? "Delegation + Accommodation" : "Full Experience Package";
        
        if (su === 418) setLoader1(true);
        else if (su === 549) setLoader2(true);
        else setLoader3(true);

        try {
            let customerIdToUse = custId;
            let emailToUse = userEmail;

            if (!customerIdToUse && !emailToUse) {
                const url = `/api1/api/firstnames?filters[userid][$eq]=${id}`;
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
                setLoader1(false);
                setLoader2(false);
                setLoader3(false);
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
                    description: `ATSASMUN Istanbul - ${pkgName}`,
                    disnew: pkgName
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

            setLoader1(false);
            setLoader2(false);
            setLoader3(false);

        } catch (error) {
            console.error("Error creating invoice:", error.message);
            toast.error(`Error: ${error.message}`);
            setLoader1(false);
            setLoader2(false);
            setLoader3(false);
        }
    };

    return (
        <div>
            <Navbar />
            <header
                className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-[#060713] bg-opacity-80"></div>
                <section>
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <h2 className="text-center mt-24 lg:mt-20 relative z-10 text-3xl lg:text-4xl font-bold text-white mb-10 leading-tight tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            Pricing for <span style={{ color: '#FF5A5F' }}>Istanbul, Turkey</span>
                        </h2>

                        <div className="grid grid-cols-1 mb-12 lg:grid-cols-3 gap-8">
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
                                        <li>✔️ First come First Serve committee Allocation</li>
                                        <li>✔️ Breakfast Every Morning</li>
                                        <li>✔️ 1 Dinner</li>
                                    </ul>
                                </div>
                                <div className="text-center mt-6">
                                    <div ref={optionsRef1} className="relative">
                                        {!showOptions1 && (
                                            <button
                                                className="atsas-btn-solid w-full"
                                                style={{ width: '100%', justifyContent: 'center' }}
                                                onClick={handleClick1}
                                            >
                                                Choose Package →
                                            </button>
                                        )}

                                        {showOptions1 && (
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="w-full mb-2 py-2 bg-gray-700 text-white text-xs font-bold rounded-lg hover:bg-gray-600 transition duration-300"
                                                    onClick={handleClick1}
                                                >
                                                    Cancel ✖
                                                </button>
                                                <Link href="/checkout">
                                                    <button
                                                        onClick={() => seo(418)}
                                                        className="atsas-btn-solid w-full"
                                                        style={{ width: '100%', justifyContent: 'center', background: '#2EC4B6' }}
                                                    >
                                                        Pay Now ($418) →
                                                    </button>
                                                </Link>
                                                {loader1 ? (
                                                    <button className="atsas-btn-outline w-full" style={{ width: '100%', justifyContent: 'center' }}>
                                                        Generating Invoice...
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="atsas-btn-outline w-full"
                                                        style={{ width: '100%', justifyContent: 'center' }}
                                                        onClick={() => handleCreateInvoice(418)}
                                                    >
                                                        Invoice PDF ↓
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
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
                                    <div ref={optionsRef2} className="relative">
                                        {!showOptions2 && (
                                            <button
                                                className="atsas-btn-solid w-full"
                                                style={{ width: '100%', justifyContent: 'center', background: '#FF5A5F' }}
                                                onClick={handleClick2}
                                            >
                                                Choose Package →
                                            </button>
                                        )}

                                        {showOptions2 && (
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="w-full mb-2 py-2 bg-gray-700 text-white text-xs font-bold rounded-lg hover:bg-gray-600 transition duration-300"
                                                    onClick={handleClick2}
                                                >
                                                    Cancel ✖
                                                </button>
                                                <Link href="/checkout">
                                                    <button
                                                        onClick={() => seo(549)}
                                                        className="atsas-btn-solid w-full"
                                                        style={{ width: '100%', justifyContent: 'center', background: '#2EC4B6' }}
                                                    >
                                                        Pay Now ($549) →
                                                    </button>
                                                </Link>
                                                {loader2 ? (
                                                    <button className="atsas-btn-outline w-full" style={{ width: '100%', justifyContent: 'center' }}>
                                                        Generating Invoice...
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="atsas-btn-outline w-full"
                                                        style={{ width: '100%', justifyContent: 'center' }}
                                                        onClick={() => handleCreateInvoice(549)}
                                                    >
                                                        Invoice PDF ↓
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
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
                                <div className="text-center mt-6">
                                    <div ref={optionsRef3} className="relative">
                                        {!showOptions3 && (
                                            <button
                                                className="atsas-btn-solid w-full"
                                                style={{ width: '100%', justifyContent: 'center' }}
                                                onClick={handleClick3}
                                            >
                                                Choose Package →
                                            </button>
                                        )}

                                        {showOptions3 && (
                                            <div className="mt-4 space-y-2">
                                                <button
                                                    className="w-full mb-2 py-2 bg-gray-700 text-white text-xs font-bold rounded-lg hover:bg-gray-600 transition duration-300"
                                                    onClick={handleClick3}
                                                >
                                                    Cancel ✖
                                                </button>
                                                <Link href="/checkout">
                                                    <button
                                                        onClick={() => seo(689)}
                                                        className="atsas-btn-solid w-full"
                                                        style={{ width: '100%', justifyContent: 'center', background: '#2EC4B6' }}
                                                    >
                                                        Pay Now ($689) →
                                                    </button>
                                                </Link>
                                                {loader3 ? (
                                                    <button className="atsas-btn-outline w-full" style={{ width: '100%', justifyContent: 'center' }}>
                                                        Generating Invoice...
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="atsas-btn-outline w-full"
                                                        style={{ width: '100%', justifyContent: 'center' }}
                                                        onClick={() => handleCreateInvoice(689)}
                                                    >
                                                        Invoice PDF ↓
                                                    </button>
                                                )}
                                            </div>
                                        )}
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
