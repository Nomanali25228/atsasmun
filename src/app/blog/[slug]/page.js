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
import Navbar from '@/app/(component)/navbar/Navbar';

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
      <Navbar />


      <header
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay only on background image */}
        <div className="absolute inset-0 bg-[#03040f] bg-opacity-80"></div>



        <div className="w-[90%] sm:w-[80%] rounded-lg relative z-10 mb-24 mt-56 p-4 sm:p-8" style={{ background: '#1B1E3D', border: '1px solid rgba(245,241,232,0.14)' }}>

          {/* Time Section */}
          <div className="w-full relative -top-36 flex items-center justify-center text-xs sm:text-sm font-medium tracking-wide mb-6">
            <span className="px-4 py-2 rounded-full" style={{ background: 'rgba(242,183,5,0.15)', color: '#F2B705', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.08em' }}>
              Published: {moment(post.createdAt).fromNow()}
            </span>
          </div>

          {/* Image Section */}
          {post.cover && (
            <div className="flex justify-center">
              <div className="relative h-[40%] w-[90%] sm:w-[60%] -mt-24 sm:-mt-32 mb-6">
                <Image

                  src={post.cover.url.startsWith('http') ? post.cover.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.cover.url}`}
                  alt={post.title}
                  width={260} // specify the width
                  height={200} // specify the height
                  className="rounded-lg w-full h-full object-cover shadow-md"
                />
              </div>
            </div>
          )}



          {/* Title Section */}
          <h3 className="text-xl sm:text-3xl leading-[40px] sm:leading-[60px] capitalize text-center font-bold font-jet-brains mb-4" style={{ color: '#F5F1E8', fontFamily: "'Space Grotesk', sans-serif" }}>
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
          <p className="text-sm sm:text-base leading-[28px] sm:leading-[32px] tracking-wide italic mt-2 mb-6" style={{ color: 'rgba(245,241,232,0.62)' }}>
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
              className="atsas-btn-outline"
              type="button"
            >
              ← Go Back
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
