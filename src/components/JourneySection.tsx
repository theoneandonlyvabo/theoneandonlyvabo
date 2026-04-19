'use client'

import { useRef, useEffect, useState } from 'react'

const ERAS = [
  {
    year: '2009',
    era: 'Origin',
    title: 'First Contact',
    body: 'Grew up inside games. Started pulling apart how they worked instead of just playing them.',
    tags: ['Game Architecture', 'Curiosity'],
  },
  {
    year: '2014',
    era: 'Discovery',
    title: 'First Line of Code',
    body: 'Got a laptop. Wrote HTML for the first time. Realized I could build the things I was consuming.',
    tags: ['HTML/CSS', 'Web Fundamentals'],
  },
  {
    year: '2020',
    era: 'Acceleration',
    title: 'Full Immersion',
    body: 'Online school meant more time. More time meant more building. Explored full-stack and system depth.',
    tags: ['Full-Stack', 'Systems Thinking'],
  },
  {
    year: '2021',
    era: 'Clarity',
    title: 'Passion Locked In',
    body: 'First real projects. First competitions. Stopped treating this as a hobby — it was the direction.',
    tags: ['First Projects', 'Competitions'],
  },
  {
    year: '2024',
    era: 'Pivot',
    title: 'Redirected',
    body: "Two UTBK attempts. SISFOR UI. Didn't make it. Chose to build instead. Pushed further than the destination required.",
    tags: ['Resilience', 'UPNVJ'],
  },
  {
    year: 'Now',
    era: 'Present',
    title: 'Building Anyway',
    body: "Product launches. Competition finals. A game engine. A TUI tool. The institution doesn't define the output.",
    tags: ['QIOS', 'EternaFall', 'Grimoire'],
  },
]

const CARD_W = 360
const CARD_GAP = 20

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollP, setScrollP] = useState(0)
  const [winW, setWinW] = useState(1280)

  useEffect(() => {
    setWinW(window.innerWidth)
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const total = sectionRef.current.offsetHeight - window.innerHeight
      const p = Math.max(0, Math.min(1, -rect.top / total))
      setScrollP(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Continuous float index — no snapping
  const floatIndex = scrollP * (ERAS.length - 1)
  const activeIndex = Math.round(floatIndex)

  // Center active card
  const center = winW / 2 - CARD_W / 2
  const translateX = center - floatIndex * (CARD_W + CARD_GAP)

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{
        height: `${ERAS.length * 120}vh`,
        background: 'var(--black)',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>

        {/* Ambient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(64,96,208,0.07) 0%, transparent 70%)',
        }} />

        {/* Header */}
        <div style={{
          padding: '0 56px', marginBottom: '52px',
          position: 'relative', zIndex: 2, flexShrink: 0,
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.25em', color: 'var(--blue)',
            marginBottom: '10px',
          }}>
            02 / JOURNEY
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1.0, color: 'var(--white)',
              letterSpacing: '-0.03em',
            }}>
              How I got here
            </h2>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.1em', color: 'var(--gray-2)',
            }}>
              {activeIndex + 1} / {ERAS.length}
            </span>
          </div>
        </div>

        {/* Cards — overflow hidden with perspective on container */}
        <div style={{
          position: 'relative', zIndex: 2,
          overflow: 'visible',
          perspective: '1000px',
          perspectiveOrigin: '50% 50%',
        }}>
          <div style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.08s linear',
            willChange: 'transform',
          }}>
            {ERAS.map((era, i) => {
              const dist = i - floatIndex
              const absDist = Math.abs(dist)

              // POV curve: rotateY increases with distance
              const rotateY = dist * -12
              // Cards further away: smaller, more opaque, pushed back in Z
              const scale = Math.max(0.78, 1 - absDist * 0.1)
              const opacity = Math.max(0.15, 1 - absDist * 0.38)
              const translateZ = -absDist * 80
              const blur = Math.max(0, (absDist - 0.6) * 2.5)
              const isActive = absDist < 0.6

              return (
                <div
                  key={era.year}
                  style={{
                    flexShrink: 0,
                    width: `${CARD_W}px`,
                    opacity,
                    transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
                    transition: 'opacity 0.3s, transform 0.08s linear',
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    transformOrigin: dist < 0 ? 'right center' : 'left center',
                  }}
                >
                  <div style={{
                    background: isActive
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(255,255,255,0.04)'}`,
                    backdropFilter: isActive ? 'blur(16px)' : 'blur(4px)',
                    borderRadius: '12px',
                    padding: '32px',
                    height: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'background 0.4s, border-color 0.4s',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>

                    {/* Inner glow for active */}
                    {isActive && (
                      <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        borderRadius: '12px',
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(64,96,208,0.08) 0%, transparent 60%)',
                      }} />
                    )}

                    <div>
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', marginBottom: '18px',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontWeight: 600,
                          fontSize: '40px', lineHeight: 1,
                          color: isActive ? 'var(--white)' : 'var(--gray-3)',
                          letterSpacing: '-0.04em',
                          transition: 'color 0.4s',
                        }}>
                          {era.year}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '9px',
                          letterSpacing: '0.15em',
                          color: isActive ? 'rgba(64,96,208,0.9)' : 'var(--gray-2)',
                          padding: '4px 10px',
                          border: `1px solid ${isActive ? 'rgba(64,96,208,0.25)' : 'var(--border)'}`,
                          borderRadius: '100px',
                          transition: 'all 0.4s',
                        }}>
                          {era.era}
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 600,
                        fontSize: '20px', letterSpacing: '-0.02em',
                        color: isActive ? 'var(--white)' : 'var(--gray-1)',
                        marginBottom: '10px', lineHeight: 1.2,
                        transition: 'color 0.4s',
                      }}>
                        {era.title}
                      </h3>

                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '13px',
                        fontWeight: 300, color: 'var(--gray-1)', lineHeight: 1.7,
                      }}>
                        {era.body}
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {era.tags.map((tag) => (
                        <span key={tag} style={{
                          fontFamily: 'var(--font-mono)', fontSize: '9px',
                          letterSpacing: '0.06em', color: 'var(--gray-2)',
                          padding: '3px 9px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid var(--border)',
                          borderRadius: '100px',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dots */}
        <div style={{
          position: 'absolute', bottom: '44px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '6px', alignItems: 'center',
          zIndex: 3,
        }}>
          {ERAS.map((_, i) => {
            const d = Math.abs(i - floatIndex)
            return (
              <div key={i} style={{
                width: d < 0.5 ? '18px' : '4px',
                height: '3px',
                borderRadius: '2px',
                background: d < 0.5 ? 'var(--blue)' : 'var(--gray-2)',
                transition: 'all 0.3s',
              }} />
            )
          })}
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px', background: 'var(--border)',
        }}>
          <div style={{
            height: '100%', width: `${scrollP * 100}%`,
            background: 'linear-gradient(90deg, var(--blue), var(--blue-hi))',
            transition: 'width 0.08s linear',
          }} />
        </div>
      </div>
    </section>
  )
}