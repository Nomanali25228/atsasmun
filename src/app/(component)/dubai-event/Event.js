import React from "react";
import Image from "next/image";

export default function Event(props) {
  const events = [
    { title: "Committee Sessions", image: props.img1 },
    { title: "Cultural Global Village", image: props.img2 },
    { title: "Open Mic Night", image: props.img3 },
    { title: "Opening Ceremony", image: props.img4 },
    { title: "Scavenger Hunt", image: props.img5 },
  ];

  return (
    <section style={{ background: '#1B1E3D', padding: '72px 0', position: 'relative', zIndex: 1 }}>
      <div className="atsas-wrap">
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <span className="atsas-eyebrow">Key Events</span>
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
            Series of Events
          </h2>
          <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 12, fontSize: 15, fontFamily: "'Work Sans', sans-serif", lineHeight: 1.6 }}>
            Each session is crafted to challenge, inspire, and connect delegates from around the world.
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
          className="atsas-events-grid"
        >
          {events.map((event, index) => (
            <div
              key={index}
              style={{
                background: '#12142B',
                border: '1px solid rgba(245,241,232,0.1)',
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'transform .25s ease, border-color .25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(255,90,95,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(245,241,232,0.1)';
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'saturate(0.85)', transition: 'transform .35s ease' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: '18px 20px' }}>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#F5F1E8',
                  }}
                >
                  {event.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}