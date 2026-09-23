"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Slider from "react-slick";

import gallry2 from "@/app/public/img/ax2.jpeg";
import gallry3 from "@/app/public/img/ax3.jpeg";
import gallry4 from "@/app/public/img/ax4.jpeg";
import gallry5 from "@/app/public/img/ax5.jpeg";
import gallry6 from "@/app/public/img/ax6.jpeg";
import gallry7 from "@/app/public/img/ax7.jpeg";
import gallry8 from "@/app/public/img/ax8.jpeg";
import gallry9 from "@/app/public/img/ax9.jpeg";
import gallry10 from "@/app/public/img/ax10.jpeg";
import gallry11 from "@/app/public/img/ax11.jpeg";
import gallry12 from "@/app/public/img/ax12.jpeg";
import gallry13 from "@/app/public/img/ax13.jpeg";
import gallry14 from "@/app/public/img/ax14.jpeg";
import gallry15 from "@/app/public/img/ax15.jpeg";
import gallry16 from "@/app/public/img/ax16.jpeg";
import gallry17 from "@/app/public/img/ax17.jpeg";
import gallry18 from "@/app/public/img/ax18.jpeg";
import gallry19 from "@/app/public/img/ax19.jpeg";
import gallry20 from "@/app/public/img/ax20.jpeg";
import gallry21 from "@/app/public/img/az1.jpeg";
import gallry22 from "@/app/public/img/az2.jpeg";
import gallry23 from "@/app/public/img/az3.jpeg";
import gallry24 from "@/app/public/img/az4.jpeg";
import gallry25 from "@/app/public/img/az5.jpeg";
import gallry26 from "@/app/public/img/az6.jpeg";
import gallry27 from "@/app/public/img/az7.jpeg";
import gallry28 from "@/app/public/img/az8.jpeg";

const images = [
  gallry2, gallry3, gallry4, gallry5, gallry6, gallry7, gallry8, gallry9, gallry10,
  gallry11, gallry12, gallry13, gallry14, gallry15, gallry16, gallry17, gallry18,
  gallry19, gallry20, gallry21, gallry22, gallry23, gallry24, gallry25, gallry26,
  gallry27, gallry28,
];

const NavBtn = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    style={{
      width: 42,
      height: 42,
      borderRadius: '50%',
      background: 'rgba(18,20,43,0.85)',
      border: '1px solid rgba(245,241,232,0.18)',
      color: '#F5F1E8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'background 0.2s',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(40,44,80,0.95)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(18,20,43,0.85)')}
  >
    {direction === 'prev' ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
  </button>
);

const GallerySlider = () => {
  const sliderRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const openModal = (index) => { setCurrentIndex(index); setIsOpen(true); };
  const closeModal = () => setIsOpen(false);
  const prevImage = () => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  const nextImage = () => setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  return (
    <section
      id="gallery"
      style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}
    >
      <div className="atsas-wrap">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div style={{ maxWidth: 560 }}>
            <span className="atsas-eyebrow">Gallery</span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                marginTop: 14,
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                color: '#F5F1E8',
                marginBottom: 0,
              }}
            >
              Moments from recent sessions.
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 10, paddingBottom: 6 }}>
            <NavBtn onClick={() => sliderRef.current?.slickPrev()} direction="prev" />
            <NavBtn onClick={() => sliderRef.current?.slickNext()} direction="next" />
          </div>
        </div>

        <div style={{ margin: '0 -12px' }}>
          <Slider ref={sliderRef} {...settings}>
            {images.map((src, index) => (
              <div key={index} style={{ padding: '0 12px' }}>
                <div
                  style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onClick={() => openModal(index)}
                  onMouseEnter={e => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <Image
                    src={src}
                    alt={'Gallery image ' + (index + 1)}
                    fill
                    style={{ objectFit: 'cover', filter: 'saturate(0.9)', transition: 'transform 0.4s ease' }}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute', top: 20, right: 20,
              color: '#F5F1E8', fontSize: 18,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10000,
            }}
          >
            <FaTimes />
          </button>

          <button
            onClick={e => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute', left: 20,
              color: '#F5F1E8',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10000,
            }}
          >
            <FaChevronLeft />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(680px, 90vw)',
              height: 'min(500px, 80vh)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={'Gallery image ' + (currentIndex + 1)}
              fill
              style={{ objectFit: 'cover' }}
              sizes="90vw"
            />
          </div>

          <button
            onClick={e => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute', right: 20,
              color: '#F5F1E8',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%', width: 48, height: 48,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10000,
            }}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySlider;
