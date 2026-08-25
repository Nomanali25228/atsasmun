'use client';
import Link from 'next/link';
import Navbar from '../navbar/Navbar';

const HeroSection = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section
        className="atsas-hero"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '120px 0 70px',
          borderBottom: '1px solid rgba(245,241,232,0.14)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            background: `
              linear-gradient(120deg, rgba(18,20,43,0.94) 15%, rgba(18,20,43,0.7) 55%, rgba(18,20,43,0.95) 100%),
              url('https://www.atsasmun.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fax11.c9e48db1.jpeg&w=1920&q=75') center/cover no-repeat`,
          }}
        />

        <div className="atsas-wrap" style={{ width: '100%' }}>
          {/* Date Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(245,241,232,0.14)',
              borderRadius: 100,
              padding: '8px 18px',
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.08em',
              color: 'rgba(245,241,232,0.62)',
              marginBottom: 36,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#2EC4B6',
                display: 'inline-block',
              }}
            />
            ISTANBUL · LONDON · RIYADH · NEW YORK
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(40px, 6.8vw, 80px)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              maxWidth: 820,
              color: '#F5F1E8',
            }}
          >
            Debate hard.<br />Dress up.{' '}
            <span
              style={{
                color: '#12142B',
                background: '#F2B705',
                padding: '0 10px',
                display: 'inline-block',
                borderRadius: 6,
                transform: 'rotate(-1deg)',
              }}
            >
              Lead loud.
            </span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              maxWidth: 540,
              marginTop: 26,
              fontSize: 17,
              color: 'rgba(245,241,232,0.62)',
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            ATSASMUN puts student delegates inside the truest simulation of the United Nations — real committee work, sharp negotiation, and a global network that spans continents.
          </p>

          {/* CTAs */}
          <div style={{ marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/payment">
              <button className="atsas-btn-solid">
                Early Applicant Pricing — Limited Slots
              </button>
            </Link>
            <Link href="/Live-MUN">
              <button className="atsas-btn-outline">
                ▶ Watch a Live MUN Experience
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              borderTop: '1px solid rgba(245,241,232,0.14)',
              marginTop: 70,
            }}
            className="atsas-stats-grid"
          >
            {[
              { num: 'Istanbul', lbl: 'Next Destination' },
              { num: '5 – 8', lbl: '5 – 8 November 2026' },
              { num: 'UNHCR', lbl: 'Endorsed Certificate' },
              { num: '2023', lbl: 'Founding Season' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '26px 20px 0 0',
                  borderRight: i < 3 ? '1px solid rgba(245,241,232,0.14)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 34,
                    color: '#F2B705',
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,241,232,0.62)',
                    marginTop: 4,
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
