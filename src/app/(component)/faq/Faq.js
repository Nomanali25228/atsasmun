"use client";
import React, { useState } from "react";

const faqData = [
  {
    question: "What is the duration of the event?",
    answer: "Each ATSASMUN session runs across several days of committee work, culminating in a closing ceremony — check each destination page for exact dates specific to that city.",
  },
  {
    question: "How can I be helped in obtaining my visa?",
    answer: "Once registered, delegates traveling internationally receive a formal invitation letter to support their visa application, along with guidance on timelines for each destination.",
  },
  {
    question: "Will this event benefit my resume/CV?",
    answer: "Yes — delegates receive a UNHCR-endorsed certificate of participation, and the negotiation, research, and public-speaking experience is exactly the kind of thing universities and employers look for.",
  },
  {
    question: "Where can I view the packages and their pricing?",
    answer: "Full pricing and package details, including early applicant discounts, are on our pricing page.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}>
      <div className="atsas-wrap">
        <div style={{ maxWidth: 640, marginBottom: 52 }}>
          <span className="atsas-eyebrow">F.A.Q</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              marginTop: 14,
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              color: '#F5F1E8',
            }}
          >
            Good questions, straight answers.
          </h2>
        </div>

        <div style={{ maxWidth: 760 }}>
          {faqData.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: '1px solid rgba(245,241,232,0.14)', padding: '22px 0' }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                    color: '#F5F1E8',
                  }}
                >
                  {item.question}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: '#2EC4B6',
                    fontWeight: 400,
                    marginLeft: 16,
                    flexShrink: 0,
                  }}
                >
                  {openIndex === i ? '–' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <p
                  style={{
                    color: 'rgba(245,241,232,0.62)',
                    marginTop: 12,
                    fontSize: 15,
                    maxWidth: 640,
                    fontFamily: "'Work Sans', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
