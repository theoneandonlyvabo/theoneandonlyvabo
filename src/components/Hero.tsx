'use client'

import { useEffect, useState } from 'react'
import Aurora from '@/components/Aurora'

const ROLES = [
  'Entrepreneur',
  'Product Manager',
  'Software Engineer',
  'Game Developer',
  'UI/UX Designer',
  'Innovator',
]

const INFO = [
  { sub: 'Based in',   label: 'Jakarta, ID'   },
  { sub: 'Discipline', label: 'Full-Stack'     },
  { sub: 'Education',  label: 'UPNVJ'  },
  { sub: 'Status',     label: 'Open to Collab'      },
]

function RoleCapsule() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const hold = setTimeout(() => {
      setPhase('out')
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length)
        setPhase('in')
      }, 400)
      return () => clearTimeout(swap)
    }, 2400)
    return () => clearTimeout(hold)
  }, [index])

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 18px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '100px',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'rgba(64,96,208,0.6)',
        userSelect: 'none',
        flexShrink: 0,
      }}>
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        letterSpacing: '0.06em',
        color: 'rgba(255,255,255,0.75)',
        whiteSpace: 'nowrap',
        minWidth: '148px',
        textAlign: 'center',
        filter: phase === 'out' ? 'blur(6px)' : 'blur(0px)',
        opacity: phase === 'out' ? 0 : 1,
        transition: 'filter 0.35s ease, opacity 0.35s ease',
      }}>
        {ROLES[index]}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'rgba(64,96,208,0.6)',
        userSelect: 'none',
        flexShrink: 0,
      }}>
      </span>
    </div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden',
      background: '#06060a',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Aurora — full screen ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <Aurora
          colorStops={['#4060d0', '#204060', '#0a1428']}
          speed={1.2}
          blend={0.6}
          amplitude={1.0}
        />
      </div>

      {/* ── Bottom fade into next section ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '28%', pointerEvents: 'none', zIndex: 5,
        background: 'linear-gradient(to top, #06060a 0%, transparent 100%)',
      }} />

      {/* ── Nav ── */}
      <nav style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 56px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)',
        }}>
          Airel Adrivano
        </span>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Journey', 'Stack', 'Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none', transition: 'color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Center content ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', zIndex: 10,
        padding: '0 56px 60px',
        textAlign: 'center',
      }}>

        {/* Name */}
        <h1
          className="fade-up"
          style={{
            animationDelay: '0.2s', opacity: 0,
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 1.0, letterSpacing: '-0.035em',
            color: '#f0f0f4',
            marginTop: '96px',
            marginBottom: '22px',
          }}
        >
          aireladrivano
        </h1>

        {/* Role capsule */}
        <div className="fade-in" style={{ animationDelay: '0.3s', opacity: 0, marginBottom: '24px' }}>
          <RoleCapsule />
        </div>

        {/* Subtitle */}
        <p
          className="fade-in"
          style={{
            animationDelay: '0.38s', opacity: 0,
            fontFamily: 'var(--font-sans)', fontWeight: 300,
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '480px', lineHeight: 1.75,
            marginBottom: '40px',
          }}
        >
          I build things end-to-end and adapt quickly, thinking by the big picture, and paying attention where it actually matters.
        </p>

        {/* CTAs */}
        <div
          className="fade-in"
          style={{
            animationDelay: '0.5s', opacity: 0,
            display: 'flex', gap: '10px', alignItems: 'center',
            marginBottom: '72px',
          }}
        >
          <a
            href="#work"
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '13px', letterSpacing: '0.01em',
              padding: '11px 26px',
              background: '#fff', color: '#06060a',
              textDecoration: 'none', borderRadius: '100px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            My creations →
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 400,
              fontSize: '13px', letterSpacing: '0.01em',
              padding: '11px 26px',
              border: '1px solid rgba(255,255,255,0.14)',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none', borderRadius: '100px',
              backdropFilter: 'blur(6px)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(64,96,208,0.5)'
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.background = 'rgba(64,96,208,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            Connect with me
          </a>
        </div>

        {/* Info labels */}
        <div
          className="fade-in"
          style={{
            animationDelay: '0.65s', opacity: 0,
            display: 'flex', gap: '52px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {INFO.map((item) => (
            <div key={item.label} style={{
              display: 'flex', flexDirection: 'column',
              gap: '4px', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                letterSpacing: '0.18em', color: 'rgba(64,96,208,0.65)',
                textTransform: 'uppercase',
              }}>
                {item.sub}
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)', fontWeight: 400,
                fontSize: '12px', color: 'rgba(255,255,255,0.55)',
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="fade-in"
        style={{
          animationDelay: '1s', opacity: 0,
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, rgba(64,96,208,0.6), transparent)',
        }} />
      </div>

    </section>
  )
}