'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Map(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [props.img3, props.img2, props.img1, props.img4];

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImage);
    setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImage);
    setSelectedImage(images[(currentIndex + 1) % images.length]);
  };

  return (
    <section id="venue" style={{ background: '#12142B', padding: '72px 0', position: 'relative', zIndex: 1 }}>
      <div className="atsas-wrap">
        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <span className="atsas-eyebrow">Event Venue</span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(26px, 3.5vw, 44px)',
              marginTop: 14,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              color: '#F5F1E8',
            }}
          >
            {props.hname}
          </h2>
          <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 12, fontSize: 15, fontFamily: "'Work Sans', sans-serif", lineHeight: 1.7 }}>
            {props.disc}
          </p>
        </div>

        {/* Map + Hotel Image */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderRadius: 16, overflow: 'hidden' }}
          className="atsas-map-grid"
        >
          {/* Map */}
          <div style={{ aspectRatio: '4/3', position: 'relative' }}>
            <iframe
              src={props.map}
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              style={{ border: 'none', display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
            />
          </div>

          {/* Hotel Image */}
          <div style={{ aspectRatio: '4/3', position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <Image
              src={props.bgimg5}
              alt={props.hname}
              fill
              style={{ objectFit: 'cover', filter: 'saturate(0.85)' }}
              sizes="50vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,20,43,0.55)' }} />
          </div>
        </div>

        {/* Thumbnails */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}
          className="atsas-thumb-grid"
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', cursor: 'pointer' }}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`Venue image ${index + 1}`}
                fill
                style={{ objectFit: 'cover', filter: 'saturate(0.88)', transition: 'transform .3s ease' }}
                sizes="25vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
          }}
        >
          <button onClick={() => setSelectedImage(null)}
            style={{ position: 'absolute', top: 16, right: 16, color: '#F5F1E8', fontSize: 22, background: 'none', border: 'none', cursor: 'pointer' }}
          ><FaTimes /></button>
          <button onClick={handlePrev}
            style={{ position: 'absolute', left: 16, color: '#F5F1E8', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          ><FaChevronLeft /></button>
          <Image
            src={selectedImage}
            alt="Selected venue image"
            width={700}
            height={500}
            style={{ borderRadius: 10, objectFit: 'cover', maxWidth: '90vw', maxHeight: '80vh' }}
          />
          <button onClick={handleNext}
            style={{ position: 'absolute', right: 16, color: '#F5F1E8', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          ><FaChevronRight /></button>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .atsas-map-grid { grid-template-columns: 1fr !important; }
          .atsas-thumb-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
