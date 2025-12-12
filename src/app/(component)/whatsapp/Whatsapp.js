'use client';
import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaWhatsapp, FaTimes, FaSmile } from "react-icons/fa";
import logo from '@/app/public/img/whatsapp-logo.jpg'; // Logo
import Image from "next/image";

const Whatsapp = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [message, setMessage] = useState(
    "Hello! I have questions regarding Atsas International MUN."
  );
  const [showEmojis, setShowEmojis] = useState(false);
  const phoneNumber = "+447498072531";
  const chatRef = useRef(null);

  useEffect(() => {
    // Check if the device is mobile
    const userAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));
  }, []);

  useEffect(() => {
    // Close chat box and emoji picker if clicking outside
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        event.target.tagName !== "BUTTON" // Ignore emoji buttons
      ) {
        setIsChatVisible(false);
        setShowEmojis(false); // Close emojis picker when clicking outside
      }
    };

    if (isChatVisible || showEmojis) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isChatVisible, showEmojis]);

  // Generate WhatsApp URL with message
  const getWhatsAppUrl = (message) => {
    const encodedMessage = encodeURIComponent(message);
    if (isMobile) {
      return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }
    return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  };

  // Emojis List
  const emojis = ["😊", "😇", "❤️", "👍", "🎉", "😢"];

  // Handle Emoji Click
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji);
  };

  return (
    <div className="relative">
      {/* WhatsApp Floating Button */}
     <button
  onClick={() => setIsChatVisible((prev) => !prev)}
  className="fixed bottom-20 right-5 z-50 flex items-center justify-center bg-green-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 bounce-animation"
  aria-label="Chat with us on WhatsApp"
>
  <FaWhatsapp size={28} />
</button>

<style jsx>{`
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .bounce-animation {
    animation: bounce 1s infinite;
  }
`}</style>


      {/* Chat Box */}
      {isChatVisible && (
        <div
          ref={chatRef}
          className="fixed bottom-[150px] right-4 z-50 bg-[#ece5dd] w-64 sm:w-80 max-w-full rounded-lg shadow-2xl border border-gray-300"
        >
          {/* Chat Header */}
          <div className="bg-[#075e54] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
                <Image src={logo} alt="Logo" className="rounded-full" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold">ATSAS MUN</p>
                <p className="text-xs text-gray-200">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatVisible(false)}
              className="hover:text-gray-300"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-3 h-40 overflow-y-auto text-sm text-gray-800 space-y-3">
            <div className="bg-white text-gray-800 p-2 rounded-lg shadow-sm max-w-[75%]">
              Hello! How can we assist you today?
            </div>
            <div className="bg-[#dcf8c6] text-gray-800 p-2 rounded-lg shadow-sm max-w-[75%] ml-auto">
              Hi, I need help with registration.
            </div>
          </div>

          {/* Chat Input */}
          <div className="bg-white flex items-center rounded-lg border-t border-gray-200 p-2 relative">
            {/* Emoji Picker Icon */}
            <button
              onClick={() => setShowEmojis((prev) => !prev)}
              className="text-gray-500 hover:text-[#075e54] mr-2"
              aria-label="Show emojis"
            >
              <FaSmile size={20} />
            </button>

            {/* Emoji Picker */}
            {showEmojis && (
              <div className="absolute bottom-16 left-2 bg-white border rounded-lg shadow-lg p-2 flex space-x-1 z-10">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-lg hover:bg-gray-200 p-1 rounded-full"
                    aria-label={`Emoji ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow text-sm px-2 pt-2 pb-8 border-none outline-none resize-none bg-gray-100 rounded-lg"
              placeholder="Type a message..."
              rows={1}
            />
            <a
              href={getWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#075e54] hover:text-green-700 ml-2"
              aria-label="Send message"
            >
              <FaPaperPlane size={24} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;
