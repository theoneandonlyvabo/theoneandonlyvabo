'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const ERAS = [
  {
    year: '2012',
    era: 'Origin',
    title: 'PC or PlayStation?',
    body: 'Got offered a choice between a PlayStation and a PC. Chose the PC. That moment sparked my curiosity and slowly introduced me to how computers actually work.',
    tags: ['Hardware', 'Curiosity'],
    color: '64,96,208',
  },
  {
    year: '2016',
    era: 'Discovery',
    title: 'First Line of Code',
    body: 'Middle school HTML class. Being around friends who were already into tech made it easier to get into it. I started learning by doing and just kept going.',
    tags: ['HTML/CSS', 'Al-Izhar'],
    color: '255,200,50',
  },
  {
    year: '2019',
    era: 'Searching',
    title: 'Figuring Things Out',
    body: 'Looked into different paths: mechanical engineering, electrical, statistics. Tried to explore everything, but kept coming back to the same place.',
    tags: ['Self-Discovery', 'Direction'],
    color: '50,200,120',
  },
  {
    year: '2024',
    era: 'Fracture',
    title: 'Four Walls, Four Rejections',
    body: "Failed UTBK. Ended up at UPNVJ. 2 years, four tries to get into SI UI, didn't make it. Started believing I was incompatible with the institution I always wanted.",
    tags: ['Resilience', 'UPNVJ'],
    color: '255,100,50',
  },
  {
    year: 'Now',
    era: 'Present',
    title: 'I Am the Institution',
    body: "Realized I don't need the institution to validate the direction. Multiple competition wins. Skalar Solutions. 2030 SUKSES!. ETERNAFALL. Not proving it to anyone else, proving it to myself.",
    tags: ['Skalar Solutions', 'EternaFall', 'Grimoire'],
    color: 'chroma',
  },
]

// Each photo has its own sound file (place MP3s in /public/music/)
// Placeholder filenames — swap with your actual tracks
const ORGANIC_PHOTOS = [
  { id: 1, src: '/photos/3:4 selfie.jpeg',   sound: '/music/best_friend.mp3', ratio: '3/4', w: '32%', top: '1%',  left: '4%',  rotate: '-11deg', delay: '0.2s', z: 3 },
  { id: 6, src: '/photos/4:3 yearbook.jpeg', sound: '/music/pilihanku.mp3', ratio: '4/3', w: '42%', top: '1%',  left: '42%', rotate: '7deg',   delay: '0.8s', z: 2 },
  { id: 3, src: '/photos/3:4 share.jpeg',    sound: '/music/novacane.mp3', ratio: '3/4', w: '30%', top: '22%', left: '70%', rotate: '13deg',  delay: '0.5s', z: 4 },
  { id: 2, src: '/photos/3:4 photo.jpeg',    sound: '/music/who_knows.mp3', ratio: '3/4', w: '30%', top: '30%', left: '-1%', rotate: '-15deg', delay: '1.5s', z: 5 },
  { id: 8, src: '/photos/1:1 mip.jpeg',      sound: '/music/adventure_of_a_lifetime.mp3', ratio: '1/1', w: '36%', top: '26%', left: '31%', rotate: '-2deg',  delay: '0s',   z: 8 },
  { id: 5, src: '/photos/4:3 og.jpeg',       sound: '/music/anything_you_want.mp3', ratio: '4/3', w: '41%', top: '58%', left: '32%', rotate: '-5deg',  delay: '1.2s', z: 6 },
  { id: 4, src: '/photos/3:4 2030.jpeg',     sound: '/music/sweet_life.mp3', ratio: '3/4', w: '29%', top: '58%', left: '70%', rotate: '10deg',  delay: '2.5s', z: 5 },
  { id: 7, src: '/photos/4:3 basket.jpeg',   sound: '/music/pony.mp3', ratio: '4/3', w: '42%', top: '64%', left: '2%',  rotate: '-3deg',  delay: '2.1s', z: 5 },
]

const FADE_STEP = 0.04   // volume increment per tick
const FADE_MS   = 30     // ms between ticks → ~750ms full fade
const TARGET_VOL = 0.55

const cardWidth = 440
const cardGap = 24

export default function AboutAndJourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(1280)
  const [floatIndex, setFloatIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Audio state
  const audioInstancesRef = useRef<{ [id: number]: HTMLAudioElement }>({})
  const fadeTimersRef = useRef<{ [id: number]: ReturnType<typeof setInterval> }>({})
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearFadeTimer = useCallback((id: number) => {
    if (fadeTimersRef.current[id]) {
      clearInterval(fadeTimersRef.current[id])
      delete fadeTimersRef.current[id]
    }
  }, [])

  const stopAll = useCallback(() => {
    Object.values(fadeTimersRef.current).forEach(timer => clearInterval(timer))
    fadeTimersRef.current = {}
    Object.values(audioInstancesRef.current).forEach(audio => {
      audio.pause()
      audio.currentTime = 0
      audio.volume = 0
    })
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    const handleInteract = () => setHasInteracted(true)

    window.addEventListener('resize', handleResize)
    window.addEventListener('click', handleInteract, { once: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleInteract)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      stopAll()
    }
  }, [stopAll])

  const syncAudio = useCallback((targetId: number | null) => {
    ORGANIC_PHOTOS.forEach(photo => {
      const isTarget = photo.id === targetId

      let audio = audioInstancesRef.current[photo.id]
      if (isTarget && !audio) {
        audio = new Audio(photo.sound)
        audio.loop = true
        audio.volume = 0
        audioInstancesRef.current[photo.id] = audio
      }

      if (!audio) return

      clearFadeTimer(photo.id)

      if (isTarget) {
        audio.play().catch(() => {/* autoplay blocked */})
        fadeTimersRef.current[photo.id] = setInterval(() => {
          if (audio.volume >= TARGET_VOL - FADE_STEP) {
            audio.volume = TARGET_VOL
            clearFadeTimer(photo.id)
          } else {
            audio.volume = Math.min(TARGET_VOL, audio.volume + FADE_STEP)
          }
        }, FADE_MS)
      } else {
        if (!audio.paused || audio.volume > 0) {
          fadeTimersRef.current[photo.id] = setInterval(() => {
            if (audio.volume <= FADE_STEP) {
              audio.pause()
              audio.currentTime = 0
              audio.volume = 0
              clearFadeTimer(photo.id)
            } else {
              audio.volume = Math.max(0, audio.volume - FADE_STEP)
            }
          }, FADE_MS)
        }
      }
    })
  }, [clearFadeTimer])

  const handlePhotoEnter = useCallback((photo: typeof ORGANIC_PHOTOS[0]) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      syncAudio(photo.id)
    }, 150)
  }, [syncAudio])

  const handlePhotoLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      syncAudio(null)
    }, 150)
  }, [syncAudio])

  const handleHorizontalScroll = () => {
    if (!scrollContainerRef.current) return
    const scrollLeft = scrollContainerRef.current.scrollLeft
    setFloatIndex(scrollLeft / (cardWidth + cardGap))
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
        padding: '140px 0 120px',
      }}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes chromaPulse {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes organicFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--r)); }
          50%      { transform: translateY(-8px) rotate(calc(var(--r) + 1.5deg)); }
        }

        .scrapbook-container {
          flex: 1 1 400px;
          position: relative;
          height: 460px;
          perspective: 1000px;
        }

        .scrapbook-photo {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          box-shadow: 0 16px 40px -8px rgba(0,0,0,0.8);
          overflow: hidden;
          background: rgba(10,12,16,0.6);
          backdrop-filter: blur(10px);
          animation: organicFloat 6s ease-in-out infinite;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      z-index 0.1s ease,
                      box-shadow 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.65s ease;
          cursor: pointer;
          filter: blur(0px) brightness(1);
          will-change: transform, filter;
        }

        .scrapbook-photo::after {
          display: none;
        }

        .scrapbook-container:has(.scrapbook-photo:hover) .scrapbook-photo {
          animation-play-state: paused;
        }

        .scrapbook-container:has(.scrapbook-photo:hover) .scrapbook-photo:not(:hover) {
          filter: blur(0px) brightness(0.25) !important;
          transform: scale(0.85) rotate(var(--r)) translateZ(-50px) !important;
          z-index: 1 !important;
        }

        .scrapbook-photo:hover {
          z-index: 30 !important;
          transform: scale(1.35) rotate(0deg) translateZ(50px) !important;
          border-color: rgba(255,255,255,0.15) !important;
          box-shadow: 0 40px 80px -15px rgba(0,0,0,1) !important;
          filter: blur(0px) brightness(1.05) contrast(1.05) !important;
        }

        .era-card {
          transition:
            opacity 0.25s ease,
            filter 0.25s ease,
            transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .era-card-inner {
          transition:
            background 0.35s ease,
            border-color 0.5s ease,
            box-shadow 0.5s ease;
        }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw', height: '100vh',
          pointerEvents: 'none', zIndex: 1,
          transition: 'background 0.9s ease-in-out',
          ...(activeColor === 'chroma'
            ? {
                background: 'linear-gradient(120deg, rgba(255,0,0,0.08), rgba(255,165,0,0.08), rgba(255,255,0,0.08), rgba(0,128,0,0.08), rgba(0,0,255,0.08), rgba(75,0,130,0.08), rgba(238,130,238,0.08))',
                backgroundSize: '200% 200%',
                animation: 'chromaPulse 8s ease infinite',
                maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 65%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 65%)',
              }
            : {
                background: `radial-gradient(ellipse at center, rgba(${activeColor},0.13) 0%, transparent 65%)`,
              }),
        }}
      />

      {/* Header + About */}
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 56px',
          position: 'relative',
          zIndex: 2,
          marginBottom: '80px',
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.25em', color: '#666666',
            marginBottom: '16px', textTransform: 'uppercase',
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

        {/* 2-col: About text + Organic Scrapbook Collage */}
        <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Left: Text */}
          <div style={{ flex: '1 1 450px' }}>
            {[
              "My name is Vano. I'm driven by creation, imagination, and the urge to build things that actually matter. Since I was young, I've always thought in scale, not just about experiencing the world, but about shaping something that leaves a mark on it. Ambition has never been something I need to manage, it's just how I naturally operate.",
              "That brought me into software engineering and product development. I'm drawn to turning nothing into something structured and usable. Most of my work is in web development, but my real interest runs deeper: backend systems, architecture, and how things work under the surface, mostly through Java and Go.",
              'At the core, I build, I learn, I refine. One principle drives everything: create and impact the world. As a famous saying went: "If You wanna make history, You gotta call Your own shots."',
            ].map((text, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.85,
                  fontWeight: 300,
                  marginBottom: i < 2 ? '28px' : '0',
                  textAlign: 'justify',
                  letterSpacing: '0.01em',
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Right: Scrapbook Collage */}
          <div className="scrapbook-container">
            {/* Hover Indicator */}
            <div style={{
              position: 'absolute',
              top: '-110px',
              right: '0',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none',
              zIndex: 1,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {hasInteracted ? (
                  <>
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </>
                ) : (
                  <>
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </>
                )}
              </svg>
              {hasInteracted ? "HOVER ON A PHOTO" : "CLICK ANYWHERE ONCE, THEN HOVER"}
            </div>

            {ORGANIC_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="scrapbook-photo"
                onMouseEnter={() => handlePhotoEnter(photo)}
                onMouseLeave={handlePhotoLeave}
                style={{
                  width: photo.w,
                  aspectRatio: photo.ratio,
                  top: photo.top,
                  left: photo.left,
                  zIndex: photo.z,
                  animationDelay: photo.delay,
                  ...({ '--r': photo.rotate } as React.CSSProperties),
                }}
              >
                <img
                  src={photo.src}
                  alt={`Vano Moment ${photo.id}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(e) => {
                    const t = e.currentTarget
                    t.style.display = 'none'
                    const parent = t.parentElement
                    if (parent) {
                      parent.style.background = 'rgba(255,255,255,0.03)'
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.2);font-family:monospace;font-size:10px;">${photo.ratio}</div>`
                    }
                  }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Journey horizontal scroll */}
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

          const rotateY = dist * -12
          const scale = Math.max(0.80, 1 - absDist * 0.09)
          const opacity = Math.max(0.12, 1 - absDist * 0.38)
          const translateZ = -absDist * 70
          const blur = Math.max(0, (absDist - 0.65) * 2.2)
          const isActive = absDist < 0.65

          const cardGlow =
            era.color === 'chroma'
              ? 'rgba(255,255,255,0.18)'
              : `rgba(${era.color},0.45)`

          const innerGlowColor =
            era.color === 'chroma'
              ? null
              : `rgba(${era.color},0.2)`

          return (
            <div
              key={era.year}
              className="era-card"
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                opacity,
                transform: `perspective(1400px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`,
                filter: blur > 0 ? `blur(${blur}px)` : 'none',
                transformOrigin: dist < 0 ? 'right center' : 'left center',
              }}
            >
              <div
                className="era-card-inner"
                style={{
                  background: isActive ? 'rgba(10,12,16,0.85)' : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${isActive ? cardGlow : 'rgba(255,255,255,0.04)'}`,
                  backdropFilter: isActive ? 'blur(20px)' : 'blur(4px)',
                  borderRadius: '18px',
                  padding: '40px',
                  height: '340px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: isActive
                    ? `0 20px 50px -12px rgba(0,0,0,0.85), 0 0 30px ${cardGlow.replace('0.45', '0.12')}`
                    : 'none',
                }}
              >
                {/* Inner glow */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute', inset: 0,
                      pointerEvents: 'none',
                      borderRadius: '18px',
                      ...(era.color === 'chroma'
                        ? {
                            background: 'linear-gradient(120deg, rgba(255,0,0,0.08), rgba(255,165,0,0.08), rgba(255,255,0,0.08), rgba(0,128,0,0.08), rgba(0,0,255,0.08), rgba(75,0,130,0.08), rgba(238,130,238,0.08))',
                            backgroundSize: '200% 200%',
                            animation: 'chromaPulse 8s ease infinite',
                          }
                        : {
                            background: `radial-gradient(ellipse at 30% 20%, ${innerGlowColor} 0%, transparent 60%)`,
                          }),
                    }}
                  />
                )}

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Year + Era badge */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '28px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 600,
                      fontSize: '48px', lineHeight: 1,
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                      letterSpacing: '-0.04em',
                      transition: 'color 0.35s ease',
                    }}>
                      {era.year}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: isActive
                        ? era.color === 'chroma' ? '#FFFFFF' : `rgb(${era.color})`
                        : 'rgba(255,255,255,0.35)',
                      padding: '5px 12px',
                      border: `1px solid ${isActive
                        ? era.color === 'chroma'
                          ? 'rgba(255,255,255,0.3)'
                          : `rgba(${era.color},0.55)`
                        : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: '100px',
                      transition: 'all 0.35s ease',
                      textTransform: 'uppercase',
                    }}>
                      {era.era}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600,
                    fontSize: '22px', letterSpacing: '-0.02em',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                    marginBottom: '14px', lineHeight: 1.2,
                    transition: 'color 0.35s ease',
                  }}>
                    {era.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: '14px',
                    fontWeight: 300,
                    color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)',
                    lineHeight: 1.65,
                    transition: 'color 0.35s ease',
                  }}>
                    {era.body}
                  </p>
                </div>

                {/* Tags */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '8px',
                  position: 'relative', zIndex: 2,
                }}>
                  {era.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        letterSpacing: '0.06em',
                        color: isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)',
                        padding: '4px 10px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '100px',
                        transition: 'color 0.35s ease',
                      }}
                    >
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