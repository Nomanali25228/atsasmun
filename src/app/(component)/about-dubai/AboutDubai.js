import React from 'react';

export default function AboutDubai(props) {
  const { aboutTitle, about } = props;

  return (
    <section style={{ background: '#12142B', padding: '72px 0', position: 'relative', zIndex: 1 }}>
      <div className="atsas-wrap">
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span className="atsas-eyebrow">About the City</span>
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
            About Atsas International MUN – {aboutTitle}
          </h2>
          <p
            style={{
              color: 'rgba(245,241,232,0.62)',
              marginTop: 20,
              fontSize: 17,
              fontFamily: "'Work Sans', sans-serif",
              lineHeight: 1.7,
            }}
          >
            {about}
          </p>
        </div>
      </div>
    </section>
  );
}
