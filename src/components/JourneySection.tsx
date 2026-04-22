'use client'

import { useRef, useEffect, useState } from 'react'

const ERAS = [
  {
    year: '2009',
    era: 'Origin',
    title: 'First Contact',
    body: 'Grew up inside games. Started pulling apart how they worked instead of just playing them.',
    tags: ['Game Architecture', 'Curiosity'],
    color: '64,96,208', // Blue (Main brand color)
  },
  {
    year: '2014',
    era: 'Discovery',
    title: 'First Line of Code',
    body: 'Got a laptop. Wrote HTML for the first time. Realized I could build the things I was consuming.',
    tags: ['HTML/CSS', 'Web Fundamentals'],
    color: '255,200,50', // Yellow
  },
  {
    year: '2020',
    era: 'Acceleration',
    title: 'Full Immersion',
    body: 'Online school meant more time. More time meant more building. Explored full-stack and system depth.',
    tags: ['Full-Stack', 'Systems Thinking'],
    color: '50,200,120', // Green
  },
  {
    year: '2021',
    era: 'Clarity',
    title: 'Passion Locked In',
    body: 'First real projects. First competitions. Stopped treating this as a hobby — it was the direction.',
    tags: ['First Projects', 'Competitions'],
    color: '150,80,220', // Purple
  },
  {
    year: '2024',
    era: 'Pivot',
    title: 'Redirected',
    body: "Two UTBK attempts. SISFOR UI. Didn't make it. Chose to build instead. Pushed further than the destination required.",
    tags: ['Resilience', 'UPNVJ'],
    color: '255,100,50', // Orange
  },
  {
    year: 'Now',
    era: 'Present',
    title: 'Building Anyway',
    body: "Product launches. Competition finals. A game engine. A TUI tool. The institution doesn't define the output.",
    tags: ['QIOS', 'EternaFall', 'Grimoire'],
    color: 'chroma', // Special rainbow flag
  },
]

const cardWidth = 360
const cardGap = 20

export default function AboutAndJourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(1280)
  const [floatIndex, setFloatIndex] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleHorizontalScroll = () => {
    if (!scrollContainerRef.current) return
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const newFloatIndex = scrollLeft / (cardWidth + cardGap)
    setFloatIndex(newFloatIndex)
  }
  
  const horizontalPadding = Math.max(0, windowWidth / 2 - cardWidth / 2)
  const activeIndex = Math.min(Math.max(Math.round(floatIndex), 0), ERAS.length - 1)
  const activeColor = ERAS[activeIndex].color

  return (
    <section 
      id="about-journey" 
      style={{ 
        background: '#000000', 
        position: 'relative', 
        overflow: 'hidden',
        padding: '140px 0 120px' 
      }}
    >
      
      {/* Hide native scrollbar but keep functionality */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Keyframes for chroma/rainbow background */
          @keyframes chromaPulse {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* Dynamic Ambient Glow tied to Active Card (More vibrant) */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100vw', height: '100vh', pointerEvents: 'none',
        zIndex: 1,
        transition: 'background 0.8s ease-in-out',
        ...(activeColor === 'chroma' 
          ? {
              // Increased opacity for chroma effect
              background: 'radial-gradient(ellipse at center, transparent 0%, transparent 100%), linear-gradient(120deg, rgba(255,0,0,0.08), rgba(255,165,0,0.08), rgba(255,255,0,0.08), rgba(0,128,0,0.08), rgba(0,0,255,0.08), rgba(75,0,130,0.08), rgba(238,130,238,0.08))',
              backgroundSize: '200% 200%',
              animation: 'chromaPulse 8s ease infinite',
              maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 60%)',
            }
          : {
              // Increased opacity to 0.12 for more vibrant background ambience
              background: `radial-gradient(ellipse at center, rgba(${activeColor},0.12) 0%, transparent 60%)`,
            }
        )
      }} />

      {/* ======================= TOP: HEADER & ABOUT ME ======================= */}
      <div style={{
        maxWidth: '1140px', 
        margin: '0 auto', 
        padding: '0 56px',
        position: 'relative', 
        zIndex: 2, 
        marginBottom: '70px' 
      }}>
        
        {/* Title */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.25em', color: 'rgba(64,96,208,0.9)',
            marginBottom: '16px',
          }}>
            01 / ORIGIN
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.0, color: '#FFFFFF',
            letterSpacing: '-0.03em',
          }}>
            The Journey
          </h2>
        </div>

        {/* 2-Column Split: About Me (Left) & Collage (Right) */}
        <div style={{ 
          display: 'flex', 
          gap: '80px',
          flexWrap: 'wrap',
          alignItems: 'center' 
        }}>
          
          {/* Left: About Me Text */}
          <div style={{ flex: '1 1 450px' }}>
            <p style={{
              fontFamily: 'var(--font-sans)', 
              fontSize: '15px',
              color: 'rgba(255,255,255,0.75)', 
              lineHeight: 1.85, 
              fontWeight: 300, 
              marginBottom: '28px',
              textAlign: 'justify', 
              letterSpacing: '0.01em', 
            }}>
              My name's Vano. I don’t just build products, I chase them down from raw, unstructured ideas into something tangible, something that works, something that matters, operating at the intersection of business impact, experimentation, and execution while constantly refining how problems are understood and solved; every project I take on is a reflection of how I think daily, dissecting needs, aligning goals, and engineering solutions that don’t just exist, but deliver with intention.
            </p>
            <p style={{
              fontFamily: 'var(--font-sans)', 
              fontSize: '15px',
              color: 'rgba(255,255,255,0.75)', 
              lineHeight: 1.85,
              fontWeight: 300,
              textAlign: 'justify', 
              letterSpacing: '0.01em',
            }}>
              As a collaborative, detail-oriented builder, I lead with clarity and direction while staying adaptive in the process, treating development as an evolving system where iteration, curiosity, and precision coexist, allowing me to consistently translate what people actually need into products that feel right, function seamlessly, and solve problems before they even need to be explained.
            </p>
          </div>

          {/* Right: Pictures / Collage */}
          <div style={{ 
            flex: '1 1 400px', 
            display: 'grid', 
            gridTemplateColumns: '5fr 4fr', 
            gridTemplateRows: 'repeat(2, 170px)', 
            gap: '20px' 
          }}>
            {/* Main Tall Image */}
            <div style={{
              gridRow: 'span 2',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.1em', textAlign: 'center', padding: '20px'
            }}>
              <span style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>[MAIN_PHOTO]</span>
              <span style={{ opacity: 0.5 }}>Portrait / Primary</span>
            </div>

            {/* Top Right Image */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.1em', textAlign: 'center', padding: '20px'
            }}>
              <span style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>[MOMENT_1]</span>
              <span style={{ opacity: 0.5 }}>Square format</span>
            </div>

            {/* Bottom Right Image */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.1em', textAlign: 'center', padding: '20px'
            }}>
              <span style={{ marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>[MOMENT_2]</span>
              <span style={{ opacity: 0.5 }}>Square format</span>
            </div>
          </div>

        </div>
      </div>

      {/* ======================= BOTTOM: JOURNEY SCROLL ======================= */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleHorizontalScroll}
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollBehavior: 'smooth',
          padding: `20px ${horizontalPadding}px 60px`, 
          gap: `${cardGap}px`,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {ERAS.map((era, i) => {
          const dist = i - floatIndex
          const absDist = Math.abs(dist)

          // 3D Perspective logic relative to scroll
          const rotateY = dist * -15 
          const scale = Math.max(0.78, 1 - absDist * 0.1)
          const opacity = Math.max(0.15, 1 - absDist * 0.4)
          const translateZ = -absDist * 80
          const blur = Math.max(0, (absDist - 0.6) * 2.5)
          const isActive = absDist < 0.6
          
          // Determine active ring color for current card
          const cardGlow = era.color === 'chroma' 
            ? 'rgba(255,255,255,0.15)' // subtle white for chroma card
            : `rgba(${era.color},0.4)` // Increased opacity for card border glow

          return (
            <div
              key={era.year}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                opacity,
                transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
                transition: 'opacity 0.2s ease, filter 0.2s ease', 
                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                transformOrigin: dist < 0 ? 'right center' : 'left center',
              }}
            >
              <div style={{
                background: isActive
                  ? 'rgba(10,12,16,0.8)' 
                  : 'rgba(255,255,255,0.01)',
                border: `1px solid ${isActive
                  ? cardGlow
                  : 'rgba(255,255,255,0.03)'}`,
                backdropFilter: isActive ? 'blur(16px)' : 'blur(4px)',
                borderRadius: '16px',
                padding: '36px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.3s, border-color 0.5s, box-shadow 0.5s',
                position: 'relative',
                overflow: 'hidden',
                // Added a more vibrant box shadow when active
                boxShadow: isActive ? `0 15px 40px -10px rgba(0,0,0,0.8), 0 0 25px ${cardGlow.replace('0.4', '0.15')}` : 'none'
              }}>

                {/* Inner glow for active card matching its era color */}
                {isActive && (
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    borderRadius: '16px',
                    ...(era.color === 'chroma' 
                      ? {
                          background: 'linear-gradient(120deg, rgba(255,0,0,0.1), rgba(255,165,0,0.1), rgba(255,255,0,0.1), rgba(0,128,0,0.1), rgba(0,0,255,0.1), rgba(75,0,130,0.1), rgba(238,130,238,0.1))',
                          backgroundSize: '200% 200%',
                          animation: 'chromaPulse 8s ease infinite',
                        }
                      : {
                          // Increased opacity for inner card glow
                          background: `radial-gradient(ellipse at 30% 20%, rgba(${era.color},0.18) 0%, transparent 60%)`
                        }
                    )
                  }} />
                )}

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '24px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 600,
                      fontSize: '44px', lineHeight: 1,
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                      letterSpacing: '-0.04em',
                      transition: 'color 0.3s',
                    }}>
                      {era.year}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: isActive 
                        ? (era.color === 'chroma' ? '#FFFFFF' : `rgb(${era.color})`)
                        : 'rgba(255,255,255,0.4)',
                      padding: '4px 10px',
                      border: `1px solid ${isActive 
                        ? (era.color === 'chroma' ? 'rgba(255,255,255,0.3)' : `rgba(${era.color},0.5)`) 
                        : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '100px',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                    }}>
                      {era.era}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600,
                    fontSize: '22px', letterSpacing: '-0.02em',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                    marginBottom: '12px', lineHeight: 1.2,
                    transition: 'color 0.3s',
                  }}>
                    {era.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: '14px',
                    fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
                  }}>
                    {era.body}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', position: 'relative', zIndex: 2 }}>
                  {era.tags.map((tag) => (
                    <span key={tag} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)',
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
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

    </section>
  )
}