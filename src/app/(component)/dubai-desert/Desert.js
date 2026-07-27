import React from "react";
import Image from "next/image";

export default function Desert({ Desert, Desert2, Desert3, heading }) {
  return (
    <section style={{ background: '#12142B', padding: '72px 0', position: 'relative', zIndex: 1 }}>
      <div className="atsas-wrap">
        <div style={{ maxWidth: 640, marginBottom: 44 }}>
          <span className="atsas-eyebrow">City Tour</span>
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
            {heading}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
          className="atsas-desert-grid"
        >
          {[Desert, Desert2, Desert3].map((src, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                aspectRatio: '4/3',
                position: 'relative',
              }}
            >
              <Image
                src={src}
                alt={`City tour image ${i + 1}`}
                fill
                style={{ objectFit: 'cover', filter: 'saturate(0.88)' }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .atsas-desert-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .atsas-desert-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
