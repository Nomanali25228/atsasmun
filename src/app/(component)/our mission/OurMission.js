import React from 'react'
import comunties from '@/app//public/img/community.svg'
import speech from '@/app//public/img/speech.svg'
import talk from '@/app//public/img/talk.svg'
import world from '@/app//public/img/world.svg'
import Image from 'next/image'

const OurMission = () => {
  return (
    <>
      {/* OUR MISSION */}
      <section
        style={{
          background: `
            radial-gradient(ellipse at 25% 30%, rgba(255,90,95,0.16), transparent 55%),
            radial-gradient(ellipse at 85% 75%, rgba(46,196,182,0.14), transparent 55%),
            #1B1E3D`,
          borderTop: '1px solid rgba(245,241,232,0.14)',
          borderBottom: '1px solid rgba(245,241,232,0.14)',
          textAlign: 'center',
          padding: '96px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="atsas-wrap" style={{ maxWidth: 820, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="atsas-eyebrow">Our Mission</span>
          </div>
          <p
            style={{
              fontSize: 22,
              lineHeight: 1.5,
              marginTop: 20,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              color: '#F5F1E8',
            }}
          >
            We put a new vision in front of the youth we serve — a platform where they&apos;re immersed fully as diplomats and peacemakers, taking up the responsibilities of leaders and policymakers to change the world for the better.
          </p>
        </div>
      </section>

      {/* WHAT IS IN IT FOR YOU */}
      <section id="why" style={{ position: 'relative', zIndex: 1, padding: '96px 0', background: '#12142B' }}>
        <div className="atsas-wrap">
          <div style={{ maxWidth: 640, marginBottom: 52 }}>
            <span className="atsas-eyebrow">What&apos;s In It For You</span>
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
              More than a conference. A head start.
            </h2>
            <p style={{ color: 'rgba(245,241,232,0.62)', marginTop: 16, fontSize: 16, maxWidth: 520, fontFamily: "'Work Sans', sans-serif" }}>
              We kept everything advisors expect from a serious conference — and cut everything that makes MUN feel like a formality instead of a highlight of the year.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 1,
              background: 'rgba(245,241,232,0.14)',
              border: '1px solid rgba(245,241,232,0.14)',
              marginTop: 10,
            }}
            className="atsas-why-grid"
          >
            {[
              {
                icon: comunties,
                color: '#2EC4B6',
                title: 'Global exposure',
                desc: 'Network with an international community of delegates and secretariat you won\'t meet anywhere else.',
              },
              {
                icon: world,
                color: '#F2B705',
                title: 'Change the world',
                desc: 'Collaborate with a global community to work out real solutions to the problems shaping our future.',
              },
              {
                icon: talk,
                color: '#FF5A5F',
                title: 'Diplomacy skills',
                desc: 'We believe in meaningful discourse: negotiation and debate built through real dialogue, not scripts.',
              },
              {
                icon: speech,
                color: '#FF8A8E',
                title: 'Recognition',
                desc: 'Be known for the solutions you bring to the ATSASMUN network, backed by a UNHCR-endorsed certificate.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="atsas-why-card"
                style={{
                  background: '#12142B',
                  padding: 32,
                  transition: 'background .2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1B1E3D'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#12142B'}
              >
                <div style={{ width: 36, height: 36, marginBottom: 18 }}>
                  <Image src={card.icon} alt={card.title} width={36} height={36} />
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 19,
                    fontWeight: 600,
                    color: '#F5F1E8',
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: 'rgba(245,241,232,0.62)', fontSize: 14, marginTop: 8, fontFamily: "'Work Sans', sans-serif" }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OurMission
