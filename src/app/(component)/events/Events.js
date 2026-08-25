"use client";
import React, { useContext } from "react";
import Image from "next/image";
import ContextPage from "@/app/Context/ContextPage";
import Link from "next/link";

import istanbul from '@/app/public/img/turkey.jpeg';
import Saudi from '@/app/public/img/riyadhcity.jpg';
import london from '@/app/public/img/london.jpg';
import newyork from '@/app/public/img/newyork.jpg';

export default function Events() {
  const { check, setCheck } = useContext(ContextPage);
  const { istanbuldates } = useContext(ContextPage);
  const { londondates } = useContext(ContextPage);
  const { saudidates } = useContext(ContextPage);
  const { newyorkdates } = useContext(ContextPage);

  const cards = [
    {
      id: 1,
      status: 'open',
      statusLabel: 'Registrations Open',
      place: 'ISTANBUL, TURKEY',
      title: 'ATSASMUN Istanbul',
      date: istanbuldates.startdate === 'Coming Soon' ? 'Coming Soon' : `${istanbuldates.startdate} – ${istanbuldates.enddate} ${istanbuldates.month} ${istanbuldates.year}`,
      desc: 'Aspiring diplomatic leaders convene at the crossroads of civilizations, where centuries of cultural history inspire global discourse unmatched anywhere else.',
      image: istanbul,
      href: '/Istanbul',
      btnLabel: 'Register Now',
      btnClass: 'atsas-btn-solid',
      subtitle: 'Istanbul, Turkey',
    },
    {
      id: 5,
      status: 'soon',
      statusLabel: 'Coming Soon',
      place: 'LONDON, UK',
      title: 'ATSASMUN London',
      date: londondates.startdate === 'Coming Soon' ? 'Coming Soon' : `${londondates.startdate} – ${londondates.enddate} ${londondates.month} ${londondates.year}`,
      desc: "An iconic stage for tomorrow's leaders, built on the legacy of global governance and the ideas that have changed the world before.",
      image: london,
      href: '/UK',
      btnLabel: 'Registrations Opening Soon',
      btnClass: 'atsas-btn-outline',
      subtitle: 'London, UK',
    },
    {
      id: 3,
      status: 'soon',
      statusLabel: 'Coming Soon',
      place: 'RIYADH, SAUDI ARABIA',
      title: 'ATSASMUN Riyadh',
      date: saudidates.startdate === 'Coming Soon' ? 'Coming Soon' : `${saudidates.startdate} – ${saudidates.enddate} ${saudidates.month} ${saudidates.year}`,
      desc: 'Rooted in a culture of honor and unity, ATSASMUN Riyadh channels the spirit of majlis: dialogue, mutual understanding, true diplomacy.',
      image: Saudi,
      href: '/Saudi',
      btnLabel: 'Registrations Opening Soon',
      btnClass: 'atsas-btn-outline',
      subtitle: 'Riyadh, Saudi Arabia',
    },
    {
      id: 4,
      status: 'soon',
      statusLabel: 'Coming Soon',
      place: 'NEW YORK, USA',
      title: 'ATSASMUN New York',
      date: newyorkdates.startdate === 'Coming Soon' ? 'Coming Soon' : `${newyorkdates.startdate} – ${newyorkdates.enddate} ${newyorkdates.month} ${newyorkdates.year}`,
      desc: 'The flagship finale — where delegates from every destination converge at the heart of global diplomacy, steps from the United Nations headquarters.',
      image: newyork,
      href: '/USA',
      btnLabel: 'Registrations Opening Soon',
      btnClass: 'atsas-btn-outline',
      subtitle: 'New York, USA',
    },
  ];

  const topCards = cards.filter(c => c.id !== 4);
  const nyCard = cards.find(c => c.id === 4);

  const renderCard = (card) => (
    <div
      key={card.id}
      className="atsas-event-card"
      style={{
        background: '#12142B',
        transition: 'background .25s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = '#1B1E3D'}
      onMouseLeave={(e) => e.currentTarget.style.background = '#12142B'}
    >
      {/* Photo Section */}
      <div style={{ height: 190, position: 'relative', overflow: 'hidden' }}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          style={{ objectFit: 'cover', filter: 'saturate(0.9)' }}
          sizes="(max-width: 900px) 100vw, 33vw"
        />
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '6px 12px',
            borderRadius: 100,
            background: card.status === 'open' ? '#2EC4B6' : '#FF5A5F',
            color: '#12142B',
            fontWeight: 700,
          }}
        >
          {card.statusLabel}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 26 }}>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 12,
            color: 'rgba(245,241,232,0.62)',
            letterSpacing: '0.04em',
          }}
        >
          {card.place}
        </div>
        <h3
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 21,
            fontWeight: 600,
            marginTop: 8,
            color: '#F5F1E8',
          }}
        >
          {card.title}
        </h3>
        <div
          style={{
            color: '#F2B705',
            fontWeight: 600,
            fontSize: 14,
            marginTop: 6,
            fontFamily: "'Work Sans', sans-serif",
          }}
        >
          {card.date}
        </div>
        <p
          style={{
            color: 'rgba(245,241,232,0.62)',
            fontSize: 14,
            marginTop: 12,
            fontFamily: "'Work Sans', sans-serif",
            lineHeight: 1.6,
          }}
        >
          {card.desc}
        </p>
        <Link href={card.href}>
          <button
            onClick={() => setCheck(card.subtitle)}
            className={card.btnClass}
            style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
          >
            {card.btnLabel}
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <section id="events" style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}>
      <div className="atsas-wrap">
        <div style={{ maxWidth: 640, marginBottom: 52 }}>
          <span className="atsas-eyebrow">Series of Events</span>
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
            Pick your city.
          </h2>
        </div>

        {/* Top 3 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 1,
            background: 'rgba(245,241,232,0.14)',
            border: '1px solid rgba(245,241,232,0.14)',
          }}
          className="atsas-events-grid"
        >
          {topCards.map(renderCard)}
        </div>

        {/* New York Card — left aligned below first card */}
        {nyCard && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              background: 'rgba(245,241,232,0.14)',
              border: '1px solid rgba(245,241,232,0.14)',
              maxWidth: '33.33%',
              marginLeft: 0,
              marginRight: 'auto',
              marginTop: 16,
            }}
          >
            {renderCard(nyCard)}
          </div>
        )}

      </div>
    </section>
  );
}
