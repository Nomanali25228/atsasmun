'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect when the user scrolls past a certain point
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>


    
      {isVisible && (
      <button
      onClick={scrollToTop}
      className="fixed bottom-7 right-6 z-50 w-10 h-10 border-2 border-blue-500 bg-transparent text-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
      aria-label="Scroll to Top"
    >
      <FaArrowUp />
    </button>
    
      )}
    </>
  );
};

export default ScrollToTop;
