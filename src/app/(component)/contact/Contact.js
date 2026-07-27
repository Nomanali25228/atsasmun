export default function ContactUs() {
  return (
    <section id="contact" style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}>
      <div className="atsas-wrap">
        <div
          style={{
            background: `radial-gradient(ellipse at 20% 20%, rgba(242,183,5,0.14), transparent 55%), #1B1E3D`,
            borderRadius: 20,
            padding: 56,
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 50,
            border: '1px solid rgba(245,241,232,0.14)',
          }}
          className="atsas-contact-grid"
        >
          {/* Left Column */}
          <div>
            <span className="atsas-eyebrow">Contact Us</span>
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
              We&apos;re here to help.
            </h2>
            <p
              style={{
                color: 'rgba(245,241,232,0.62)',
                marginTop: 14,
                fontSize: 15,
                fontFamily: "'Work Sans', sans-serif",
                lineHeight: 1.6,
              }}
            >
              Questions about registration, visas, or which destination is right for you? Reach out — we usually reply within a day.
            </p>
            <a href="https://wa.me/+447498072531">
              <button className="atsas-btn-gold" style={{ marginTop: 24 }}>
                Message us on WhatsApp
              </button>
            </a>
          </div>

          {/* Right Column */}
          <div>
            {[
              { lbl: 'Address', content: '42 Hennerton Way, High Wycombe, HP13 7UE, United Kingdom', href: 'https://www.google.com/maps/dir//42+Hennerton+Way' },
              { lbl: 'Phone', content: '+44 7498 072531', href: 'tel:+447498072531' },
              { lbl: 'Email', content: 'info@atsasmun.com', href: 'mailto:info@atsasmun.com' },
              { lbl: 'Social', content: 'Facebook · Instagram', href: null, facebook: 'https://www.facebook.com/share/189wEJeHZ5/', instagram: 'https://www.instagram.com/atsasmun/' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '16px 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(245,241,232,0.14)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#F2B705',
                    width: 90,
                    flexShrink: 0,
                  }}
                >
                  {item.lbl}
                </div>
                <div style={{ color: '#F5F1E8', fontSize: 14, fontFamily: "'Work Sans', sans-serif" }}>
                  {item.lbl === 'Social' ? (
                    <>
                      <a href={item.facebook} target="_blank" rel="noopener noreferrer" style={{ color: '#F5F1E8', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.color = '#2EC4B6'}
                        onMouseLeave={(e) => e.target.style.color = '#F5F1E8'}
                      >Facebook</a>
                      {' · '}
                      <a href={item.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#F5F1E8', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.color = '#2EC4B6'}
                        onMouseLeave={(e) => e.target.style.color = '#F5F1E8'}
                      >Instagram</a>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      target={item.lbl === 'Address' ? '_blank' : undefined}
                      rel={item.lbl === 'Address' ? 'noopener noreferrer' : undefined}
                      style={{ color: '#F5F1E8', textDecoration: 'none' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#2EC4B6'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#F5F1E8'}
                    >
                      {item.content}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
