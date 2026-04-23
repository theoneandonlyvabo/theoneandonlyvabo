'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { PROJECTS } from '@/lib/constants'

const PixelBlast = dynamic(() => import('./PixelBlast'), { ssr: false })

const FEATURED = ['qios', 'eternafall', 'grimoire']

// Status indicator mapping
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  'in-development': { label: 'IN DEV', color: '255,200,50' },
  'testing': { label: 'TESTING', color: '150,120,255' },
  'live': { label: 'LIVE', color: '50,200,120' },
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const projects = PROJECTS.filter((p) => FEATURED.includes(p.id))

  return (
    <section
      id="work"
      ref={ref}
      style={{
        background: '#000000',
        padding: '140px 56px 120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* PixelBlast background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.4,
      }}>
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#4060d0"
          patternScale={3}
          patternDensity={0.9}
          pixelSizeJitter={0.3}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1.2}
          speed={0.4}
          edgeFade={0.35}
          transparent
        />
      </div>

      {/* Ambient background glow that reacts to active card */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.8s ease-in-out',
        background: activeId
          ? `radial-gradient(ellipse at center, rgba(${projects.find(p => p.id === activeId)?.accentColor},0.08) 0%, transparent 55%)`
          : 'radial-gradient(ellipse at center, rgba(64,96,208,0.04) 0%, transparent 55%)',
      }} />

      <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '70px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: '#888888',
            marginBottom: '16px',
          }}>
            04 / WORK
          </div>

          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.0,
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
          }}>
            Selected Work
          </h2>
        </div>

        {/* Vertically stacked cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '532px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          {projects.map((project) => {
            const isActive = activeId === project.id
            const accent = project.accentColor
            const status = STATUS_MAP[project.status]

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#0A0A0F',
                  border: `1px solid ${isActive ? `rgba(${accent},0.25)` : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  position: 'relative',
                  cursor: 'pointer',
                  height: isActive ? '340px' : '80px',
                  boxShadow: isActive
                    ? `0 20px 60px -15px rgba(0,0,0,0.8), 0 0 30px rgba(${accent},0.06)`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Inner accent glow overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  borderRadius: '20px',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  background: `radial-gradient(ellipse at 20% 0%, rgba(${accent},0.1) 0%, transparent 50%)`,
                  zIndex: 1,
                }} />

                {/* ─── COLLAPSED BAR: always visible ─── */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '80px',
                  padding: '0 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  zIndex: 3,
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 0.25s ease',
                  pointerEvents: isActive ? 'none' : 'auto',
                }}>
                  {/* Year */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.35)',
                    flexShrink: 0,
                    width: '40px',
                  }}>
                    {project.year}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '20px',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0,
                    flex: 1,
                  }}>
                    {project.title}
                  </h3>

                  {/* Role */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    color: '#888888',
                    flexShrink: 0,
                  }}>
                    {project.role}
                  </span>

                  {/* Status */}
                  {status && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: `rgb(${status.color})`,
                      padding: '3px 10px',
                      borderRadius: '100px',
                      border: `1px solid rgba(${status.color},0.2)`,
                      background: `rgba(${status.color},0.04)`,
                      flexShrink: 0,
                    }}>
                      <div style={{
                        width: '5px', height: '5px',
                        borderRadius: '50%',
                        background: `rgb(${status.color})`,
                        boxShadow: `0 0 6px rgba(${status.color},0.6)`,
                        animation: 'pulse 2s ease-in-out infinite',
                      }} />
                      {status.label}
                    </div>
                  )}
                </div>

                {/* ─── EXPANDED: same layout as QIOS card ─── */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: '340px',
                  position: 'relative',
                  zIndex: 2,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.35s ease 0.08s',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}>

                  {/* Screenshot Region */}
                  <div style={{
                    flex: '0 0 48%',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#080810',
                  }}>
                    <img
                      src={`/screenshots/${project.id}-ss-1.jpeg`}
                      alt={project.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                        filter: isActive ? 'brightness(1)' : 'brightness(0.7)',
                      }}
                    />

                    {/* Gradient overlay on screenshot */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, transparent 60%, #0A0A0F 100%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Year badge on screenshot */}
                    <div style={{
                      position: 'absolute',
                      top: '16px', left: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(10px)',
                      padding: '5px 12px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      {project.year}
                    </div>

                    {/* Status indicator */}
                    {status && (
                      <div style={{
                        position: 'absolute',
                        top: '16px', right: '16px',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        color: `rgb(${status.color})`,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(10px)',
                        padding: '5px 12px',
                        borderRadius: '100px',
                        border: `1px solid rgba(${status.color},0.2)`,
                      }}>
                        <div style={{
                          width: '5px', height: '5px',
                          borderRadius: '50%',
                          background: `rgb(${status.color})`,
                          boxShadow: `0 0 6px rgba(${status.color},0.6)`,
                          animation: 'pulse 2s ease-in-out infinite',
                        }} />
                        {status.label}
                      </div>
                    )}
                  </div>

                  {/* Content Region */}
                  <div style={{
                    flex: 1,
                    padding: '28px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}>

                    <div>
                      {/* Title + Role row */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '14px',
                        gap: '12px',
                      }}>
                        <h3 style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '28px',
                          fontWeight: 600,
                          letterSpacing: '-0.02em',
                          color: '#FFFFFF',
                          margin: 0,
                          lineHeight: 1.15,
                        }}>
                          {project.title}
                        </h3>

                        <span style={{
                          fontSize: '10px',
                          letterSpacing: '0.06em',
                          color: '#888888',
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                          marginTop: '6px',
                        }}>
                          {project.role}
                        </span>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.7,
                        marginBottom: '18px',
                        maxWidth: '480px',
                      }}>
                        {project.description}
                      </p>

                      {/* Tech Stack — icons with labels */}
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        marginBottom: '16px',
                      }}>
                        {project.techStack.map((tech) => {
                          const isInvertable = ['next.js'].includes(tech.name.toLowerCase())
                          return (
                            <div
                              key={tech.name}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                                padding: '6px 14px 6px 8px',
                                background: 'rgba(255,255,255,0.03)',
                                border: `1px solid rgba(${accent},0.15)`,
                                borderRadius: '100px',
                              }}
                            >
                              <img
                                src={tech.icon}
                                alt={tech.name}
                                style={{
                                  width: '16px',
                                  height: '16px',
                                  objectFit: 'contain',
                                  filter: isInvertable ? 'invert(1) brightness(1.5)' : 'none',
                                }}
                              />
                              <span style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10px',
                                letterSpacing: '0.04em',
                                color: 'rgba(255,255,255,0.7)',
                              }}>
                                {tech.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Bottom row: Tags + Link */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '6px',
                        flexWrap: 'wrap',
                      }}>
                        {project.tags.map(tag => (
                          <span key={tag} style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.06em',
                            color: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(255,255,255,0.02)',
                            padding: '4px 10px',
                            borderRadius: '100px',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.links[0] && (
                        <a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '0.06em',
                            color: 'rgba(255,255,255,0.6)',
                            textDecoration: 'none',
                            transition: 'opacity 0.2s, gap 0.3s, color 0.2s',
                            flexShrink: 0,
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.gap = '10px'
                            e.currentTarget.style.color = '#FFFFFF'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.gap = '6px'
                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                          }}
                        >
                          <img
                            src="/icons/github.png"
                            alt="GitHub"
                            style={{
                              width: '14px',
                              height: '14px',
                              objectFit: 'contain',
                              filter: 'invert(1) brightness(1.5)',
                              opacity: 0.6,
                            }}
                          />
                          <span>View</span>
                          <span style={{ fontSize: '14px', transition: 'transform 0.3s' }}>→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Footer + CTA */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: '#888888',
            fontFamily: 'var(--font-mono)',
          }}>
            {projects.length} projects · {new Date().getFullYear()}
          </div>

          <a
            href="https://github.com/theoneandonlyvabo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px 10px 10px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <img
              src="/icons/profile.png"
              alt="Profile"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.06em',
              color: 'rgba(255, 255, 255, 1)',
            }}>
              See more on GitHub
            </span>
            <span style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 1)',
            }}>
              →
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}