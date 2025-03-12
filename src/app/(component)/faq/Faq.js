"use client";
import React, { useState } from "react";

const faqData = [
  {
    question: "What is the duration of the event?",
    answer: "It will be a four-day event.",
  },
  {
    question: "How can I be helped in obtaining my visa?",
    answer: "We help our accepted applicants with their visa acquiring process if they opt for it. We also send an official invitation letter which can be presented at the Turkish embassy to obtain a timely visa conveniently. Furthermore, we personally contact the embassies regarding the visa application processes of our delegates.",
  },
  {
    question: "Will this event benefit my resume/CV?",
    answer: "Most certainly, yes. Attending an international conference and strategising and devising solutions to world problems with the global community will add to your career profile. Learn more here.",
  },
  {
    question: "Where can I view the packages and their pricing?",
    answer: "To see the packages and their respective prices, please proceed to the Pricing page.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which question is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the selected question
  };

  return (
    <section id="faq">

    <div  className="max-w-4xl mx-auto px-6 py-12">
      {/* FAQ Title */}
      <h2 data-aos="fade-up" className="text-4xl font-semibold text-center text-gray-800">F.A.Q</h2>
      <div data-aos="fade-up" className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>


      {/* FAQ Items */}
      <div className="mt-10 space-y-6">
        {faqData.map((item, index) => (
          <div data-aos="fade-right"
            key={index}
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-[1.02]"
            >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-900 font-semibold text-lg hover:bg-gradient-to-r from-blue-100 to-indigo-100 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div
                className="px-6 py-4 text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200"
                style={{
                  animation: "fadeIn 0.3s ease-in-out",
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add subtle animation for the dropdown */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
            </section>
  );
};

export default Faq;
