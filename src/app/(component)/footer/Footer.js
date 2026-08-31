'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import newLogo from '@/app/public/img/new-logo.png';

const Footer = () => {
  return (
    <>
      <footer
        style={{
          borderTop: '1px solid rgba(245,241,232,0.14)',
          padding: '70px 0 34px',
          background: '#12142B',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="atsas-wrap">
          {/* CTA Block */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 26,
              paddingBottom: 54,
              borderBottom: '1px solid rgba(245,241,232,0.14)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.8vw, 46px)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
                color: '#F5F1E8',
                maxWidth: 460,
              }}
            >
              Bring your delegation to ATSASMUN.
            </h2>
            <a href="mailto:info@atsasmun.com">
              <button className="atsas-btn-solid">Email Us</button>
            </a>
          </div>

          {/* Footer Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: 40,
              paddingTop: 40,
              fontSize: 14,
              color: 'rgba(245,241,232,0.62)',
            }}
            className="atsas-foot-cols"
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '-0.01em',
                  color: '#F5F1E8',
                  marginBottom: 14,
                }}
              >
                <Image
                  src={newLogo}
                  alt="ATSASMUN Logo"
                  width={34}
                  height={34}
                  style={{ objectFit: 'contain', borderRadius: '50%' }}
                />
                <div>
                  ATSAS<span style={{ color: '#FF5A5F' }}>MUN</span>
                </div>
              </div>
              <p style={{ maxWidth: 320, color: 'rgba(245,241,232,0.62)', lineHeight: 1.6, fontFamily: "'Work Sans', sans-serif" }}>
                An international platform where participants experience the truest simulation of the United Nations — an immersive, adventurous experience for every delegate.
              </p>
            </div>

            {/* Useful Links */}
            <div>
              <h4
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#F2B705',
                  marginBottom: 14,
                }}
              >
                Useful Links
              </h4>
              {[
                { label: 'Home', href: '/' },
                { label: 'Pricing', href: '/payment' },
                { label: 'Terms & Conditions', href: '/Terms&conditions' },
                { label: 'Privacy Policy', href: '/Privac' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: 'block',
                    color: 'rgba(245,241,232,0.62)',
                    padding: '4px 0',
                    textDecoration: 'none',
                    fontFamily: "'Work Sans', sans-serif",
                    transition: 'color .2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.62)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Destinations */}
            <div>
              <h4
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#F2B705',
                  marginBottom: 14,
                }}
              >
                Destinations
              </h4>
              {[
                { label: 'Istanbul, Turkey', href: '/Istanbul' },
                { label: 'London, UK', href: '/UK' },
                { label: 'Saudi Arabia', href: '/Saudi' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: 'block',
                    color: 'rgba(245,241,232,0.62)',
                    padding: '4px 0',
                    textDecoration: 'none',
                    fontFamily: "'Work Sans', sans-serif",
                    transition: 'color .2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.62)'}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#F2B705',
                  marginBottom: 14,
                }}
              >
                Contact
              </h4>
              {[
                { label: 'info@atsasmun.com', href: 'mailto:info@atsasmun.com' },
                { label: '+44 7498 072531', href: 'tel:+447498072531' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    display: 'block',
                    color: 'rgba(245,241,232,0.62)',
                    padding: '4px 0',
                    textDecoration: 'none',
                    fontFamily: "'Work Sans', sans-serif",
                    transition: 'color .2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#FF8A8E'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,241,232,0.62)'}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Fine Print */}
          <div
            style={{
              marginTop: 44,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: 'rgba(245,241,232,0.62)',
              opacity: 0.6,
            }}
          >
            © Copyright Atsas Model United Nations. All Rights Reserved. A project of Atsas International Creations LTD.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
