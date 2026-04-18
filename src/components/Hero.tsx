'use client'

import { useEffect, useState, useRef } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  if (!mounted) return null

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'var(--black)' }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,255,0.3) 2px, rgba(0,217,255,0.3) 4px)`,
        }}
      />

      {/* Ambient glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, var(--cyan) 0%, transparent 70%)',
        }}
      />

      {/* Nav */}
      <nav className="relative z-40 flex items-center justify-between px-10 py-7">
        <span
          className="text-xs tracking-[0.3em] uppercase animate-fade-in"
          style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
        >
          airel.adrivano
        </span>
        <div className="flex gap-10">
          {['journey', 'stack', 'work', 'contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-xs tracking-widest uppercase transition-all duration-300 hover:text-cyan-400 animate-fade-in"
              style={{
                color: 'var(--gray)',
                fontFamily: 'var(--font-mono)',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-20 flex flex-col justify-center min-h-[calc(100vh-80px)] px-10 lg:px-20">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text block */}
          <div className="flex flex-col gap-6">

            {/* System tag */}
            <div
              className="flex items-center gap-3 animate-fade-up"
              style={{ fontFamily: 'var(--font-mono)', animationDelay: '0.1s', opacity: 0 }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: 'var(--cyan)' }} />
              <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--cyan)' }}>
                system.online — developer / builder
              </span>
            </div>

            {/* Name */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              <h1
                className="leading-none tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(72px, 10vw, 140px)',
                  color: 'var(--white)',
                  letterSpacing: '-0.02em',
                }}
              >
                AIREL
              </h1>
              <h1
                className="leading-none glow-cyan"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(72px, 10vw, 140px)',
                  color: 'var(--cyan)',
                  letterSpacing: '-0.02em',
                }}
              >
                ADRIVANO
              </h1>
            </div>

            {/* Descriptor */}
            <p
              className="text-lg leading-relaxed max-w-md animate-fade-up"
              style={{
                color: 'var(--gray)',
                fontFamily: 'var(--font-body)',
                animationDelay: '0.35s',
                opacity: 0,
              }}
            >
              Full-stack engineer. System architect. I build things that matter —
              from game engines to enterprise platforms.
              <span style={{ color: 'var(--white)' }}> Depth over breadth.</span>
            </p>

            {/* CTAs */}
            <div
              className="flex items-center gap-5 animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <a
                href="#work"
                className="group relative px-7 py-3 text-sm tracking-widest uppercase transition-all duration-300"
                style={{
                  background: 'var(--cyan)',
                  color: 'var(--black)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                view work
              </a>
              <a
                href="#contact"
                className="px-7 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:text-cyan-400"
                style={{
                  color: 'var(--gray)',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--gray-dim)',
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                }}
              >
                get in touch
              </a>
            </div>

            {/* Metrics */}
            <div
              className="flex gap-10 pt-4 animate-fade-up"
              style={{
                borderTop: '1px solid var(--gray-dim)',
                animationDelay: '0.65s',
                opacity: 0,
              }}
            >
              {[
                { value: '4+', label: 'active projects' },
                { value: '3x', label: 'competition finalist' },
                { value: '5', label: 'languages' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '28px',
                      color: 'var(--cyan)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual block */}
          <div
            className="relative flex items-center justify-center animate-fade-in"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            {/* Portrait container */}
            <div
              className="relative w-[340px] h-[420px]"
              style={{
                transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Glitch frame */}
              <div
                className="absolute inset-0 border border-cyan-400"
                style={{
                  transform: 'translate(8px, -8px)',
                  borderColor: 'var(--magenta)',
                  opacity: 0.4,
                }}
              />
              <div
                className="absolute inset-0 border border-cyan-400"
                style={{
                  transform: 'translate(-8px, 8px)',
                  borderColor: 'var(--cyan)',
                  opacity: 0.4,
                }}
              />

              {/* Image placeholder — replace with your actual photo */}
              <div
                className="absolute inset-0 flex items-end"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--gray-dim)',
                }}
              >
                {/* Replace this div with: <Image src="/images/vano.jpg" alt="Airel Adrivano" fill style={{ objectFit: 'cover' }} /> */}
                <div className="w-full h-full flex items-center justify-center" style={{ color: 'var(--gray-dim)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  [ portrait ]
                </div>

                {/* Overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, var(--black), transparent)',
                  }}
                />

                {/* Name tag at bottom */}
                <div
                  className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gray)' }}
                >
                  <span className="tracking-widest uppercase">jakarta, id</span>
                  <span style={{ color: 'var(--cyan)' }}>upnvj // 2024</span>
                </div>
              </div>

              {/* Corner accents */}
              {[
                'top-0 left-0',
                'top-0 right-0 rotate-90',
                'bottom-0 right-0 rotate-180',
                'bottom-0 left-0 -rotate-90',
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
                  <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'var(--cyan)' }} />
                  <div className="absolute top-0 left-0 h-full w-[1px]" style={{ background: 'var(--cyan)' }} />
                </div>
              ))}
            </div>

            {/* Floating tag */}
            <div
              className="absolute -top-4 -right-4 px-3 py-1.5 text-xs tracking-widest uppercase animate-flicker"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--cyan)',
                color: 'var(--cyan)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              available
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'var(--gray)', fontFamily: 'var(--font-mono)' }}
          >
            scroll
          </span>
          <div
            className="w-[1px] h-12 animate-pulse"
            style={{ background: 'linear-gradient(to bottom, var(--cyan), transparent)' }}
          />
        </div>
      </div>
    </section>
  )
}