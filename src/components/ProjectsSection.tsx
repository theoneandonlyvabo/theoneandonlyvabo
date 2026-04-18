'use client'

import { useRef, useEffect, useState } from 'react'
import { PROJECTS } from '@/lib/constants'

const FEATURED_IDS = ['qios', 'eternalfall', 'grimoire']

const PROJECT_META: Record<string, { accent: string; index: string; impact: string }> = {
  qios: {
    accent: 'var(--cyan)',
    index: '01',
    impact: 'SME-scale operations — finance, inventory, and AI analytics unified. Built for corporate deployment.',
  },
  eternalfall: {
    accent: 'var(--magenta)',
    index: '02',
    impact: 'Custom game engine. AP battle economy. 3-tier parry system. Shipped because it meant something.',
  },
  grimoire: {
    accent: 'var(--lime)',
    index: '03',
    impact: 'Dev-first documentation. Terminal-native. Built because context-switching kills flow.',
  },
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = PROJECTS.filter((p) => FEATURED_IDS.includes(p.id))

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen w-full py-32"
      style={{ background: 'var(--black)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyan) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-20">

        {/* Header */}
        <div className="flex flex-col gap-3 mb-16">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--cyan)',
              letterSpacing: '0.3em',
            }}
          >
            04 / WORK
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 80px)',
              color: 'var(--white)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            WHAT I SHIPPED
          </h2>
        </div>

        {/* Projects list */}
        <div className="flex flex-col gap-px" style={{ background: 'var(--gray-dim)' }}>
          {featured.map((project, i) => {
            const meta = PROJECT_META[project.id]
            const isHovered = hovered === project.id
            return (
              <div
                key={project.id}
                className="relative flex flex-col lg:flex-row lg:items-center gap-8 p-10 transition-all duration-500 cursor-default group"
                style={{
                  background: isHovered ? 'var(--surface)' : 'var(--black)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: `${i * 0.15}s`,
                }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Index */}
                <span
                  className="hidden lg:block flex-shrink-0 w-12"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: isHovered ? meta.accent : 'var(--gray-dim)',
                    transition: 'color 0.3s',
                  }}
                >
                  {meta.index}
                </span>

                {/* Title + tags */}
                <div className="flex flex-col gap-3 flex-shrink-0 lg:w-48">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      color: isHovered ? meta.accent : 'var(--white)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1,
                      transition: 'color 0.3s',
                    }}
                  >
                    {project.title.toUpperCase()}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--gray)',
                          border: '1px solid var(--gray-dim)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="hidden lg:block flex-shrink-0 w-px self-stretch"
                  style={{ background: isHovered ? meta.accent + '44' : 'var(--gray-dim)' }}
                />

                {/* Impact */}
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: 'var(--gray)', fontFamily: 'var(--font-body)' }}
                >
                  {meta.impact}
                </p>

                {/* Why */}
                <p
                  className="hidden lg:block flex-shrink-0 max-w-[200px] text-xs leading-relaxed"
                  style={{ color: isHovered ? 'var(--white)' : 'transparent', fontFamily: 'var(--font-mono)', transition: 'color 0.3s' }}
                >
                  {project.why}
                </p>

                {/* Link */}
                <div className="flex-shrink-0">
                  {project.links[0] && (
                    <a
                      href={project.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs tracking-widest uppercase transition-all duration-300"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: isHovered ? meta.accent : 'var(--gray)',
                      }}
                    >
                      <span>github</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                  style={{ background: isHovered ? meta.accent : 'transparent' }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}