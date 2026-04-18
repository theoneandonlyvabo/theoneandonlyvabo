'use client'

import { useRef, useEffect, useState } from 'react'

const JOURNEY_ITEMS = [
  {
    era: 'origin',
    year: '2009–2013',
    label: 'SD — first contact',
    description: 'Grew up in games. Started pulling apart how they worked instead of just playing them.',
    references: [
      { title: 'Minecraft', type: 'game', accent: 'cyan' },
      { title: 'curiosity', type: 'trait', accent: 'gray' },
    ],
  },
  {
    era: 'discovery',
    year: '2014–2016',
    label: 'SMP — first line of code',
    description: 'Got my first laptop. Wrote my first HTML. Realized I could build the things I was consuming.',
    references: [
      { title: 'HTML/CSS', type: 'tech', accent: 'cyan' },
      { title: 'Berserk', type: 'manga', accent: 'magenta' },
    ],
  },
  {
    era: 'acceleration',
    year: '2020',
    label: 'COVID — full immersion',
    description: 'Online school meant more time. More time meant more building. Explored fullstack, explored systems.',
    references: [
      { title: 'JoJo\'s Bizarre Adventure', type: 'anime', accent: 'magenta' },
      { title: 'Witcher 3', type: 'game', accent: 'cyan' },
    ],
  },
  {
    era: 'clarity',
    year: '2021–2023',
    label: 'SMA — passion locked in',
    description: 'First real projects. First competitions. Understood that this wasn\'t a hobby — it was the direction.',
    references: [
      { title: 'Elden Ring', type: 'game', accent: 'cyan' },
      { title: 'Loki', type: 'series', accent: 'magenta' },
    ],
  },
  {
    era: 'pivot',
    year: '2024',
    label: 'UTBK × 2 — redirected',
    description: 'Two attempts at SISFOR UI. Didn\'t make it. Chose to build instead of wait. Settled at UPNVJ and pushed further than the destination ever required.',
    references: [
      { title: 'resolve', type: 'trait', accent: 'lime' },
      { title: 'QIOS', type: 'project', accent: 'cyan' },
    ],
  },
  {
    era: 'now',
    year: '2024–now',
    label: 'UPNVJ — building anyway',
    description: 'Product launches. Competition finals. Game engines. A TUI tool. The institution doesn\'t define the output.',
    references: [
      { title: 'EternaFall', type: 'project', accent: 'cyan' },
      { title: 'Grimoire', type: 'project', accent: 'lime' },
    ],
  },
]

const ACCENT_COLORS: Record<string, string> = {
  cyan: 'var(--cyan)',
  magenta: 'var(--magenta)',
  lime: 'var(--lime)',
  gray: 'var(--gray)',
}

export default function JourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight))
      setScrollProgress(progress)
      const index = Math.min(
        JOURNEY_ITEMS.length - 1,
        Math.floor(progress * JOURNEY_ITEMS.length)
      )
      setActiveIndex(index)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const active = JOURNEY_ITEMS[activeIndex]

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{ height: `${JOURNEY_ITEMS.length * 100}vh`, background: 'var(--black)' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

        {/* Background ambient */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${ACCENT_COLORS[active.references[0]?.accent] ?? 'var(--cyan)'}08 0%, transparent 60%)`,
          }}
        />

        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Section header */}
        <div
          className="absolute top-10 left-10"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gray)', letterSpacing: '0.3em' }}
        >
          <span style={{ color: 'var(--cyan)' }}>02</span> / JOURNEY
        </div>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'var(--gray-dim)' }}>
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%`, background: 'var(--cyan)' }}
          />
        </div>

        {/* Main layout */}
        <div className="w-full max-w-7xl mx-auto px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Timeline nav */}
          <div className="flex flex-col gap-1">
            {JOURNEY_ITEMS.map((item, i) => (
              <div
                key={item.era}
                className="flex items-center gap-4 py-3 transition-all duration-500 cursor-default"
                style={{
                  opacity: i === activeIndex ? 1 : i < activeIndex ? 0.3 : 0.15,
                  transform: i === activeIndex ? 'translateX(0px)' : 'translateX(-4px)',
                }}
              >
                {/* Dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: i === activeIndex ? 'var(--cyan)' : 'var(--gray-dim)',
                    boxShadow: i === activeIndex ? '0 0 8px var(--cyan)' : 'none',
                  }}
                />
                {/* Year + label */}
                <div className="flex items-baseline gap-3">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: i === activeIndex ? 'var(--cyan)' : 'var(--gray)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: i === activeIndex ? '15px' : '13px',
                      color: i === activeIndex ? 'var(--white)' : 'var(--gray)',
                      fontWeight: i === activeIndex ? 500 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Vertical line */}
            <div
              className="absolute left-10 lg:left-20"
              style={{
                width: '1px',
                background: 'var(--gray-dim)',
                top: '15%',
                height: '70%',
              }}
            />
          </div>

          {/* Right: Active content */}
          <div className="flex flex-col gap-8" key={activeIndex}>

            {/* Era badge */}
            <div
              className="w-fit px-3 py-1 text-xs tracking-widest uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                border: `1px solid ${ACCENT_COLORS[active.references[0]?.accent] ?? 'var(--cyan)'}`,
                color: ACCENT_COLORS[active.references[0]?.accent] ?? 'var(--cyan)',
              }}
            >
              {active.era}
            </div>

            {/* Year large */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 7vw, 96px)',
                color: 'var(--white)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              {active.year}
            </div>

            {/* Description */}
            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: 'var(--gray)', fontFamily: 'var(--font-body)' }}
            >
              {active.description}
            </p>

            {/* References */}
            <div className="flex flex-wrap gap-3">
              {active.references.map((ref) => (
                <div
                  key={ref.title}
                  className="flex items-center gap-2 px-3 py-1.5"
                  style={{
                    background: 'var(--surface)',
                    border: `1px solid ${ACCENT_COLORS[ref.accent]}22`,
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: ACCENT_COLORS[ref.accent] }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: ACCENT_COLORS[ref.accent],
                      letterSpacing: '0.05em',
                    }}
                  >
                    {ref.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: 'var(--gray)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ref.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 right-10 text-xs tracking-widest uppercase"
          style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
        >
          {activeIndex + 1} / {JOURNEY_ITEMS.length}
        </div>
      </div>
    </section>
  )
}