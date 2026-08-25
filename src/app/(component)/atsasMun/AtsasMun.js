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
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                marginTop: 0,
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                color: '#F5F1E8',
              }}
            >
              About Us
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
              ATSASMUN is dedicated to the cultivation of the next generation of global leaders. Our flagship programme convenes an international community of young delegates in pursuit of structured diplomacy, critical problem solving, and collaborative engagement in matters of global concern.
            </p>
            <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 14, fontSize: 15, fontFamily: "'Work Sans', sans-serif", lineHeight: 1.6 }}>
              The programme is convened across a series of international host cities including Istanbul, Dubai and Kuala Lumpur providing delegates with the requisite tools to engage substantively with pressing global issues. Through this immersive diplomatic and cross cultural experience, participants cultivate core competencies in leadership, negotiation and analytical reasoning, in keeping with the principles of international cooperation and mutual understanding.
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

          </div>
        </div>
      </div>
    </section>
  )
}

export default AtsasMun