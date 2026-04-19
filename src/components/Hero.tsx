'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    setMounted(true)
    const fn = (e: MouseEvent) => setMouse({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  if (!mounted) return null

  const gx = 30 + mouse.x * 40
  const gy = 20 + mouse.y * 40

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: 'var(--black)',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ─── Background: atmospheric blobs ─── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        {/* Main glow — mouse tracking */}
        <div style={{
          position: 'absolute',
          top: '0', left: '0', width: '100%', height: '100%',
          background: `radial-gradient(ellipse 70% 60% at ${gx}% ${gy}%, rgba(64,96,208,0.18) 0%, transparent 65%)`,
          transition: 'background 0.5s ease',
        }} />

        {/* Blob 1 — top right, blue */}
        <div style={{
          position: 'absolute', top: '-15%', right: '-5%',
          width: '70vw', height: '80vh',
          background: 'radial-gradient(ellipse, rgba(64,96,208,0.22) 0%, transparent 60%)',
          filter: 'blur(60px)',
          animation: 'blobA 16s ease-in-out infinite',
        }} />

        {/* Blob 2 — mid right, violet hint */}
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: '40vw', height: '50vh',
          background: 'radial-gradient(ellipse, rgba(100,70,200,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'blobB 20s ease-in-out infinite',
        }} />

        {/* Blob 3 — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '5%',
          width: '45vw', height: '55vh',
          background: 'radial-gradient(ellipse, rgba(64,96,208,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
          animation: 'blobC 24s ease-in-out infinite',
        }} />

        {/* Layered vertical strips — key Recognito element */}
        {[
          { left: '15%', h: '85%', o: 0.07, delay: '0s' },
          { left: '28%', h: '100%', o: 0.05, delay: '0.3s' },
          { left: '42%', h: '70%', o: 0.04, delay: '0.6s' },
          { left: '57%', h: '90%', o: 0.06, delay: '0.9s' },
          { left: '70%', h: '75%', o: 0.05, delay: '1.2s' },
          { left: '82%', h: '95%', o: 0.08, delay: '0.4s' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: 0,
            left: s.left,
            width: '1px',
            height: s.h,
            background: `linear-gradient(to top, rgba(64,96,208,${s.o * 3}), rgba(64,96,208,${s.o}) 40%, transparent)`,
            animation: `stripFloat ${14 + i * 2}s ease-in-out infinite`,
            animationDelay: s.delay,
          }} />
        ))}

        {/* Horizontal glow band */}
        <div style={{
          position: 'absolute',
          bottom: '25%', left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 5%, rgba(64,96,208,0.15) 30%, rgba(64,96,208,0.25) 50%, rgba(64,96,208,0.15) 70%, transparent 95%)',
        }} />

        {/* Floating geometric: ring */}
        <div style={{
          position: 'absolute', top: '8%', right: '12%',
          width: '200px', height: '200px',
          border: '1px solid rgba(64,96,208,0.12)',
          borderRadius: '50%',
          animation: 'spinRing 40s linear infinite',
        }} />
        <div style={{
          position: 'absolute', top: '11%', right: '15%',
          width: '140px', height: '140px',
          border: '1px solid rgba(64,96,208,0.07)',
          borderRadius: '50%',
          animation: 'spinRing 25s linear infinite reverse',
        }} />

        {/* Dot grid */}
        <svg style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', opacity: 0.25,
        }}>
          {Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 110 + 55}
                cy={row * 110 + 55}
                r="1"
                fill="rgba(64,96,208,0.5)"
              />
            ))
          )}
        </svg>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '35%',
          background: 'linear-gradient(to top, var(--black) 0%, transparent 100%)',
        }} />
      </div>

      {/* ─── Nav ─── */}
      <nav style={{
        position: 'relative', zIndex: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 56px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          letterSpacing: '0.15em', color: 'var(--gray-2)',
        }}>
          airel.adrivano
        </span>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['journey', 'stack', 'work', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.1em', color: 'var(--gray-1)',
              textDecoration: 'none', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gray-1)'}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── Main content — centered like Recognito ─── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', zIndex: 10,
        padding: '0 56px 80px',
        textAlign: 'center',
        gap: '0',
      }}>

        {/* Status badge */}
        <div className="fade-in" style={{
          animationDelay: '0.1s', opacity: 0,
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px',
          background: 'rgba(64,96,208,0.08)',
          border: '1px solid rgba(64,96,208,0.2)',
          borderRadius: '100px',
          marginBottom: '36px',
        }}>
          <div style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'var(--blue-hi)',
            animation: 'pulse 2.5s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.15em', color: 'rgba(64,96,208,0.9)',
          }}>
            available for collaboration
          </span>
        </div>

        {/* Name — large, centered */}
        <h1 className="fade-up" style={{
          animationDelay: '0.2s', opacity: 0,
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: 'clamp(52px, 8vw, 120px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          color: 'var(--cream)',
          marginBottom: '28px',
        }}>
          Airel Adrivano
        </h1>

        {/* Subtitle */}
        <p className="fade-in" style={{
          animationDelay: '0.4s', opacity: 0,
          fontFamily: 'var(--font-sans)', fontWeight: 300,
          fontSize: 'clamp(14px, 1.6vw, 18px)',
          color: 'var(--gray-1)',
          maxWidth: '480px',
          lineHeight: 1.7,
          marginBottom: '48px',
        }}>
          Full-stack engineer building products end-to-end —
          from game engines to enterprise platforms.
          Depth over breadth.
        </p>

        {/* CTAs */}
        <div className="fade-in" style={{
          animationDelay: '0.55s', opacity: 0,
          display: 'flex', gap: '12px', alignItems: 'center',
          marginBottom: '80px',
        }}>
          <a href="#work" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: '13px', letterSpacing: '0.02em',
            padding: '12px 28px',
            background: 'var(--white)', color: 'var(--black)',
            textDecoration: 'none', borderRadius: '100px',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            View Work →
          </a>
          <a href="#contact" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 400,
            fontSize: '13px', letterSpacing: '0.02em',
            padding: '12px 28px',
            border: '1px solid var(--border-mid)',
            color: 'var(--gray-1)', textDecoration: 'none',
            borderRadius: '100px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-hi)'
              e.currentTarget.style.color = 'var(--white)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.color = 'var(--gray-1)'
            }}
          >
            Get in touch
          </a>
        </div>

        {/* Floating info labels — Recognito style */}
        <div className="fade-in" style={{
          animationDelay: '0.7s', opacity: 0,
          position: 'relative', width: '100%', maxWidth: '900px', height: '0',
        }}>
          {[
            { label: 'Jakarta, ID', sub: 'Based in', x: '4%', y: '-20px' },
            { label: 'Full-Stack', sub: 'Primary', x: '35%', y: '10px' },
            { label: 'UPNVJ', sub: 'Education', x: '67%', y: '-10px' },
            { label: 'Open to work', sub: 'Status', x: '88%', y: '15px' },
          ].map((item) => (
            <div key={item.label} style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                letterSpacing: '0.15em', color: 'var(--gray-2)',
                textTransform: 'uppercase',
              }}>
                {item.sub}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: 400,
                fontSize: '12px', color: 'var(--gray-1)',
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-in" style={{
        animationDelay: '1s', opacity: 0,
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        zIndex: 10,
      }}>
        <div style={{
          width: '1px', height: '40px',
          background: 'linear-gradient(to bottom, transparent, var(--gray-2), transparent)',
          animation: 'blobA 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}