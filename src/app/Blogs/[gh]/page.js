'use client';
import Image from 'next/image';
import bg from '@/app/public/img/HPbg1.jpeg'; // Hero background
import Link from 'next/link';
import { AiOutlineDown, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Suspense, useEffect, useState } from 'react';
import logo from '@/app/public/img/logo-1.png'; // Logo
import Footer from '../../(component)/footer/Footer';
import ScrollToTop from '../../(component)/Scrolltotop/ScrollToTop';
import Whatsapp from '../../(component)/whatsapp/Whatsapp';



import { useSearchParams, useRouter } from "next/navigation";
import { getAllPosts } from "@/app/lib/api";
import Loader from "@/app/component/loader/Loader";
import Pagination from "@/app/component/pagination/Pagination";
import Navbar from '@/app/(component)/navbar/Navbar';


export default function Home() {
   
    // start blog ///////////////////////////////////////////////////////////////////

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);

    const searchParams = useSearchParams();
    const router = useRouter();

    const searchQuery = searchParams.get("search") ?? "";
    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

    useEffect(() => {
        const fetchPosts = async (page) => {
            try {
                setLoading(true); // Show loader
                const { posts, pagination } = await getAllPosts(page, searchQuery);
                setPosts(posts || []); // Default to an empty array if undefined
                setTotalPages(pagination?.pageCount || 1); // Default to 1 if undefined
            } catch (err) {
                setError("Error fetching posts.");
            } finally {
                setLoading(false); // Hide loader
            }
        };

        fetchPosts(currentPage);
    }, [currentPage, searchQuery]);

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", newPage.toString());
        router.push(`?${newParams.toString()}`);
        setLoading(true);
    };

    return (
        <div>
            {/* Navbar */}
<Navbar/>           

            {/* Hero Section */}
            <header
                className="relative bg-cover  bg-center min-h-screen flex items-center justify-center text-white"
                style={{
                    backgroundImage: `url(${bg.src})`,
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#03040f]  bg-opacity-80 z-0"></div>

                {/* Hero Content */}
                <Suspense fallback={<Loader />}>
                    <div className="relative z-10">

                        <section className="py-16 ">
                            <div className="container mx-auto mt-[60px] px-6 lg:px-16">
                                <h2 className="text-5xl font-bold text-white text-center mb-7">
                                    Our Blog
                                </h2>


                                {loading && (
                                    <div className="w-full flex items-center justify-center">
                                        <Loader />
                                    </div>
                                )}
                                {error && <p className="text-red-500">{error}</p>}

                                {!loading && !error && (

                                    <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                                        {posts.length > 0 ? (
                                            posts.map((post) => (
                                                <div
                                                    key={post.id}
                                                    className="a-box w-full sm:w-[280px] mx-auto text-center rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                                                >
                                                    {/* Image Container */}
                                                    {post.cover?.url ? (
                                                        <div className="img-container h-[200px] w-full sm:w-[260px] overflow-hidden rounded-b-[20px] mx-auto">
                                                            <div className="img-inner">
                                                                <div className="rounded-[20px] overflow-hidden mt-[30px] bg-[#c8c2c2] h-[200px] w-full sm:w-[260px]">
                                                                    <Image
                                                                        src={post.cover.url.startsWith('http') ? post.cover.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                                                                        width={260} // specify the width
                                                                        height={200} // specify the height
                                                                        alt={post.title || "Post Image"}
                                                                        className="object-cover h-full w-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="h-[200px] w-full sm:w-[260px] bg-gray-200 flex items-center justify-center">
                                                            <span className="text-gray-500">No Image</span>
                                                        </div>
                                                    )}

                                                    {/* Text Content */}
                                                    <div className="text-container p-4 pt-[90px] rounded-[20px] -mt-[90px] leading-[20px] text-sm" style={{ background: '#1B1E3D', border: '1px solid rgba(245,241,232,0.1)' }}>
                                                        <p className="text-xs font-bold uppercase tracking-wider inline-block px-2 py-1 rounded-md" style={{ color: '#F2B705', background: 'rgba(242,183,5,0.12)' }}>
                                                            Article
                                                        </p>
                                                        <h2 className="text-base font-bold mt-3 line-clamp-2" style={{ color: '#F5F1E8' }}>
                                                            {post.title || "Untitled Post"}
                                                        </h2>

                                                        <Link href={`/blog/${post.slug}`} className="block mt-4">
                                                            <span className="inline-block px-4 py-2 text-sm font-medium rounded-full transition-all duration-300" style={{ background: '#FF5A5F', color: '#12142B', fontFamily: "'Space Mono', monospace" }}>
                                                                Read More
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400 text-center">No posts available at the moment.</p>
                                        )}
                                    </div>


                                )}

                                {/* Pagination Controls */}
                                {!loading && !error && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}



                            </div>
                        </section>
                    </div>
                </Suspense>
            </header>
            <Footer />
            <ScrollToTop />
            <Whatsapp />

        </div>
    );
}
