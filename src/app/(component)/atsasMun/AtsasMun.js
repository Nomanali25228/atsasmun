import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ax15 from '@/app/public/img/ax15.jpeg';

const AtsasMun = () => {
  return (
    <section id="atsasMun" style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}>
      <div className="atsas-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'center',
          }}
          className="atsas-about-grid"
        >
          {/* Text Column */}
          <div>
            <span className="atsas-eyebrow">Our Parent Company</span>
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
              ATSASMUN is the flagship of Atsas International Creations.
            </h2>
            <p
              style={{
                color: 'rgba(245,241,232,0.62)',
                marginTop: 16,
                fontSize: 16,
                fontFamily: "'Work Sans', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Based in the United Kingdom, Atsas International Creations LTD is committed to cultivating the next generation of leaders — and ATSASMUN is its flagship endeavor, bringing together a global community of young minds for diplomacy, problem-solving, and teamwork.
            </p>
            <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 14, fontSize: 15, fontFamily: "'Work Sans', sans-serif", lineHeight: 1.6 }}>
              The programme travels beyond borders — Istanbul, Dubai, Kuala Lumpur — giving delegates the tools to handle major global issues while building leadership, negotiation, and analytical skills through immersive cultural and diplomatic experience.
            </p>
            <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 14, fontSize: 15, fontFamily: "'Work Sans', sans-serif", lineHeight: 1.6 }}>
              It all builds toward New York City each September, where winners from every regional conference meet for the journey&apos;s culmination — a platform for the next generation of changemakers to be heard on a global stage.
            </p>
            <Link href="#contact">
              <button className="atsas-btn-outline" style={{ marginTop: 24 }}>
                Get In Touch
              </button>
            </Link>
          </div>

          {/* Image Column */}
          <div
            style={{
              aspectRatio: '4/5',
              borderRadius: 16,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={ax15}
              alt="ATSASMUN delegates"
              fill
              style={{ objectFit: 'cover', filter: 'saturate(0.85)' }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div
              style={{
                content: '',
                position: 'absolute',
                bottom: 18,
                left: 18,
                fontFamily: "'Space Mono',monospace",
                fontSize: 11,
                letterSpacing: '0.08em',
                color: '#12142B',
                background: '#F2B705',
                padding: '7px 14px',
                borderRadius: 100,
                fontWeight: 700,
              }}
            >
              NYC · FLAGSHIP FINALE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AtsasMun