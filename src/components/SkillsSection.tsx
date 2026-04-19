'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

const SKILLS_DATA = [
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'language',
    size: 80,
    color: 'rgba(64,96,208,0.7)',
    description: 'Primary language for all web projects. Used across full-stack with Next.js and Node.',
    related: ['React', 'Next.js', 'Node.js'],
  },
  {
    id: 'java',
    label: 'Java',
    category: 'language',
    size: 76,
    color: 'rgba(80,60,160,0.7)',
    description: 'Strongest systems language. Used to build EternaFall — a full game engine from scratch.',
    related: ['AWT/Canvas', 'Game Systems'],
  },
  {
    id: 'go',
    label: 'Go',
    category: 'language',
    size: 70,
    color: 'rgba(40,140,140,0.65)',
    description: 'Backend and tooling. Built Grimoire — a TUI documentation tool — entirely in Go.',
    related: ['Bubbletea', 'Cobra', 'CLI'],
  },
  {
    id: 'react',
    label: 'React',
    category: 'frontend',
    size: 72,
    color: 'rgba(64,96,208,0.55)',
    description: 'Component-driven UI. Used in QIOS and most web projects alongside Next.js.',
    related: ['Next.js', 'TypeScript'],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    category: 'frontend',
    size: 74,
    color: 'rgba(64,96,208,0.6)',
    description: 'Full-stack React framework. App Router, API routes, SSR — used in production projects.',
    related: ['React', 'TypeScript', 'Vercel'],
  },
  {
    id: 'laravel',
    label: 'Laravel',
    category: 'backend',
    size: 62,
    color: 'rgba(100,60,60,0.6)',
    description: 'PHP backend framework. Used for Moneytor — an AI-powered personal finance app.',
    related: ['PHP', 'MySQL'],
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'backend',
    size: 65,
    color: 'rgba(50,100,70,0.6)',
    description: 'Server-side JavaScript. API design, REST endpoints, middleware architecture.',
    related: ['Express', 'TypeScript'],
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
    category: 'data',
    size: 58,
    color: 'rgba(60,80,120,0.55)',
    description: 'Primary relational database. Schema design, indexing, query optimization.',
    related: ['MySQL', 'Prisma'],
  },
  {
    id: 'figma',
    label: 'Figma',
    category: 'design',
    size: 54,
    color: 'rgba(80,60,100,0.5)',
    description: 'UI/UX design and prototyping. Used for wireframing before dev.',
    related: ['UI/UX', 'Design Systems'],
  },
  {
    id: 'php',
    label: 'PHP',
    category: 'language',
    size: 55,
    color: 'rgba(90,70,130,0.5)',
    description: 'Server-side scripting. Used alongside Laravel for backend web development.',
    related: ['Laravel', 'MySQL'],
  },
  {
    id: 'git',
    label: 'Git',
    category: 'tools',
    size: 56,
    color: 'rgba(50,50,70,0.55)',
    description: 'Version control. Daily use — branching, PRs, CI/CD workflows.',
    related: ['GitHub', 'DevOps'],
  },
  {
    id: 'python',
    label: 'Python',
    category: 'language',
    size: 52,
    color: 'rgba(50,90,80,0.5)',
    description: 'Data analytics and scripting. Used for research, automation, and ML exploration.',
    related: ['Data Analytics', 'Looker Studio'],
  },
]

type BubbleState = {
  x: number
  y: number
  vx: number
  vy: number
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [dims, setDims] = useState({ w: 800, h: 500 })
  const bubblesRef = useRef<Record<string, BubbleState>>({})

  // Init bubble positions
  useEffect(() => {
    const w = containerRef.current?.offsetWidth ?? 800
    const h = containerRef.current?.offsetHeight ?? 500
    setDims({ w, h })
    const cx = w / 2
    const cy = h / 2
    const states: Record<string, BubbleState> = {}
    SKILLS_DATA.forEach((s, i) => {
      const angle = (i / SKILLS_DATA.length) * Math.PI * 2
      const r = 80 + Math.random() * 100
      states[s.id] = {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0, vy: 0,
      }
    })
    bubblesRef.current = states
  }, [visible])

  // Physics: attract toward center, repel from each other
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({})

  const tick = useCallback(() => {
    const cx = dims.w / 2
    const cy = dims.h / 2
    const b = bubblesRef.current
    const newPos: Record<string, { x: number; y: number }> = {}

    SKILLS_DATA.forEach((s) => {
      const bs = b[s.id]
      if (!bs) return

      let fx = 0, fy = 0

      // Attract to center
      const dx = cx - bs.x
      const dy = cy - bs.y
      fx += dx * 0.012
      fy += dy * 0.012

      // Repel from other bubbles
      SKILLS_DATA.forEach((other) => {
        if (other.id === s.id) return
        const ob = b[other.id]
        if (!ob) return
        const ox = bs.x - ob.x
        const oy = bs.y - ob.y
        const dist = Math.sqrt(ox * ox + oy * oy) || 1
        const minDist = (s.size + other.size) * 0.65
        if (dist < minDist) {
          const force = (minDist - dist) / minDist * 0.4
          fx += (ox / dist) * force
          fy += (oy / dist) * force
        }
      })

      // Boundary
      const margin = s.size / 2 + 8
      if (bs.x < margin) fx += (margin - bs.x) * 0.2
      if (bs.x > dims.w - margin) fx -= (bs.x - (dims.w - margin)) * 0.2
      if (bs.y < margin) fy += (margin - bs.y) * 0.2
      if (bs.y > dims.h - margin) fy -= (bs.y - (dims.h - margin)) * 0.2

      bs.vx = (bs.vx + fx) * 0.82
      bs.vy = (bs.vy + fy) * 0.82
      bs.x += bs.vx
      bs.y += bs.vy

      newPos[s.id] = { x: bs.x, y: bs.y }
    })

    setPositions({ ...newPos })
    rafRef.current = requestAnimationFrame(tick)
  }, [dims])

  useEffect(() => {
    if (!visible) return
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [visible, tick])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const hoveredSkill = SKILLS_DATA.find((s) => s.id === hovered)

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        background: 'var(--deep)',
        padding: '120px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle violet ambient — dimension accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '400px',
        background: 'radial-gradient(ellipse at top right, rgba(100,70,200,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.25em', color: 'var(--blue)', marginBottom: '10px',
          }}>
            03 / STACK
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600,
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1.0, color: 'var(--white)',
              letterSpacing: '-0.03em',
            }}>
              What I build with
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300,
              fontSize: '13px', color: 'var(--gray-1)',
              maxWidth: '260px', lineHeight: 1.7, flexShrink: 0,
            }}>
              Hover any bubble to learn more about how I use it.
            </p>
          </div>
        </div>

        {/* Bubble container */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '520px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s',
          }}
        >
          {SKILLS_DATA.map((skill) => {
            const pos = positions[skill.id]
            if (!pos) return null
            const isHov = hovered === skill.id
            const isOther = hovered !== null && !isHov

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setHovered(skill.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: 'absolute',
                  left: pos.x,
                  top: pos.y,
                  transform: `translate(-50%, -50%) scale(${isHov ? 1.35 : isOther ? 0.88 : 1})`,
                  transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
                  zIndex: isHov ? 10 : 1,
                  opacity: isOther ? 0.45 : 1,
                }}
              >
                <div style={{
                  width: `${skill.size}px`,
                  height: `${skill.size}px`,
                  borderRadius: '50%',
                  background: isHov
                    ? skill.color.replace('0.7)', '0.85)').replace('0.6)', '0.8)').replace('0.65)', '0.8)').replace('0.5)', '0.7)').replace('0.55)', '0.75)')
                    : skill.color,
                  border: `1px solid ${isHov ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'default',
                  transition: 'background 0.3s, border-color 0.3s',
                  boxShadow: isHov ? `0 0 32px ${skill.color}` : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 500,
                    fontSize: `${Math.max(9, skill.size * 0.16)}px`,
                    color: isHov ? 'var(--white)' : 'rgba(255,255,255,0.75)',
                    letterSpacing: '-0.01em',
                    textAlign: 'center',
                    userSelect: 'none',
                    transition: 'color 0.2s',
                  }}>
                    {skill.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Hover detail panel */}
        <div style={{
          marginTop: '32px',
          padding: '24px 28px',
          background: hoveredSkill ? 'rgba(255,255,255,0.03)' : 'transparent',
          border: hoveredSkill ? '1px solid var(--border-mid)' : '1px solid transparent',
          borderRadius: '12px',
          minHeight: '80px',
          transition: 'all 0.3s',
          backdropFilter: hoveredSkill ? 'blur(12px)' : 'none',
        }}>
          {hoveredSkill ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '32px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-sans)', fontWeight: 600,
                    fontSize: '18px', color: 'var(--white)',
                    letterSpacing: '-0.02em',
                  }}>
                    {hoveredSkill.label}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px',
                    letterSpacing: '0.12em', color: 'var(--blue)',
                    padding: '2px 8px',
                    border: '1px solid rgba(64,96,208,0.25)',
                    borderRadius: '100px',
                    textTransform: 'uppercase',
                  }}>
                    {hoveredSkill.category}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  fontSize: '13px', color: 'var(--gray-1)', lineHeight: 1.7,
                }}>
                  {hoveredSkill.description}
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.15em', color: 'var(--gray-2)',
                  marginBottom: '8px', textTransform: 'uppercase',
                }}>
                  Related
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {hoveredSkill.related.map((r) => (
                    <span key={r} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      color: 'var(--gray-1)',
                      padding: '3px 10px',
                      border: '1px solid var(--border)',
                      borderRadius: '100px',
                      background: 'rgba(255,255,255,0.03)',
                    }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '0.12em', color: 'var(--gray-2)',
              textAlign: 'center', lineHeight: 1.6,
            }}>
              hover a bubble to explore
            </p>
          )}
        </div>
      </div>
    </section>
  )
}