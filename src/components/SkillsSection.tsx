'use client'

import { useEffect, useState, useRef } from 'react'

const skillsData = [
  // --- PROGRAMMING LANGUAGES ---
  {
    id: 'typescript', label: 'TypeScript', category: 'language', color: '#3178C6',
    description: 'Bahasa utama untuk semua proyek web. Digunakan di seluruh full-stack dengan Next.js dan Node.',
    related: ['React', 'Next.js', 'Node.js'], offsetY: -30, imagePath: '/images/typescript.png'
  },
  {
    id: 'javascript', label: 'JavaScript', category: 'language', color: '#F7DF1E',
    description: 'Core web programming language. Digunakan untuk logika frontend dinamis dan scripting.',
    related: ['TypeScript', 'React'], offsetY: 15, imagePath: '/images/javascript.png'
  },
  {
    id: 'python', label: 'Python', category: 'language', color: '#3776AB',
    description: 'Data analytics dan scripting. Digunakan untuk riset, otomasi, dan eksplorasi Machine Learning.',
    related: ['Data Analytics', 'Looker Studio'], offsetY: -10, imagePath: '/images/python.png'
  },
  {
    id: 'java', label: 'Java', category: 'language', color: '#5382A1',
    description: 'Strongest systems language. Digunakan untuk membangun EternaFall — full game engine dari nol.',
    related: ['AWT/Canvas', 'Game Systems'], offsetY: 40, imagePath: '/images/java.png'
  },
  {
    id: 'go', label: 'Go', category: 'language', color: '#00ADD8',
    description: 'Backend dan tooling. Membangun Grimoire — TUI documentation tool — sepenuhnya dengan Go.',
    related: ['Bubbletea', 'Cobra', 'CLI'], offsetY: -20, imagePath: '/images/golang.png'
  },
  {
    id: 'php', label: 'PHP', category: 'language', color: '#777BB4',
    description: 'Server-side scripting. Digunakan bersama Laravel untuk backend web development.',
    related: ['Laravel', 'MySQL'], offsetY: 30, imagePath: '/images/php.png'
  },

  // --- FRAMEWORKS ---
  {
    id: 'react', label: 'React', category: 'frontend', color: '#61DAFB',
    description: 'Component-driven UI. Digunakan untuk membangun QIOS smart kiosk dan aplikasi web modern.',
    related: ['Next.js', 'TypeScript'], offsetY: -30, imagePath: '/images/react.png'
  },
  {
    id: 'nextjs', label: 'Next.js', category: 'frontend', color: '#FFFFFF',
    description: 'Full-stack React framework. App Router, API routes, SSR — digunakan di proyek produksi.',
    related: ['React', 'TypeScript', 'Vercel'], offsetY: 20, imagePath: '/images/nextjs.png'
  },
  {
    id: 'nodejs', label: 'Node.js', category: 'backend', color: '#339933',
    description: 'Server-side JavaScript. API design, REST endpoints, middleware architecture.',
    related: ['Express', 'TypeScript'], offsetY: -40, imagePath: '/images/nodejs.png'
  },
  {
    id: 'laravel', label: 'Laravel', category: 'backend', color: '#FF2D20',
    description: 'PHP backend framework. Digunakan untuk Moneytor — AI-powered personal finance app.',
    related: ['PHP', 'MySQL'], offsetY: 45, 
    imagePath: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg'
  },

  // --- OTHERS / TOOLS ---
  {
    id: 'postgres', label: 'PostgreSQL', category: 'data', color: '#336791',
    description: 'Primary relational database. Schema design, indexing, dan optimasi query.',
    related: ['MySQL', 'Prisma'], offsetY: -15, 
    imagePath: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
  },
  {
    id: 'mysql', label: 'MySQL', category: 'data', color: '#00758F',
    description: 'Relational database management system. Digunakan untuk menyimpan dan mengelola data.',
    related: ['PHP', 'Laravel', 'Postgres'], offsetY: 35, imagePath: '/images/mysql.png'
  },
  {
    id: 'figma', label: 'Figma', category: 'design', color: '#F24E1E',
    description: 'UI/UX design dan prototyping. Digunakan untuk wireframing sebelum tahap development.',
    related: ['UI/UX', 'Design Systems'], offsetY: -45, 
    imagePath: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
  },
  {
    id: 'claude', label: 'Claude', category: 'AI Tools', color: '#D97757',
    description: 'Expertise dalam utilisasi Anthropic LLM dan Claude Code secara maksimal untuk percepatan development workflow.',
    related: ['Anthropic', 'LLM', 'Claude Code'], offsetY: 15, imagePath: '/images/claude.png'
  },
  {
    id: 'ollama', label: 'Ollama', category: 'AI Tools', color: '#FFFFFF',
    isExperimental: true,
    description: 'Eksperimen menjalankan model LLM secara lokal (Local AI) untuk riset privasi dan efisiensi model deployment.',
    related: ['Local LLM', 'AI Models'], offsetY: -25, imagePath: '/images/ollama.png'
  },
  {
    id: 'openclaw', label: 'OpenClaw', category: 'AI Tools', color: '#FF3B30', // Updated to Red
    isExperimental: true,
    description: 'Eksplorasi penggunaan tool AI tingkat lanjut untuk integrasi workflow, automasi riset, dan research flow development.',
    related: ['AI Agents', 'Automation'], offsetY: 25, imagePath: '/images/openclaw.png'
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)

  useEffect(() => {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) visibilityObserver.observe(sectionRef.current)
    return () => visibilityObserver.disconnect()
  }, [])

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '120px 56px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <style>
        {`
          @keyframes floatAsymmetric {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }
          
          /* Subtle Neon Breathing Effect */
          @keyframes neonBreathing {
            0%, 100% { 
              box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 2px var(--skill-color); 
              filter: brightness(0.95); 
            }
            50% { 
              box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 0 12px var(--skill-color); 
              filter: brightness(1.1); 
            }
          }
        `}
      </style>

      {/* Subtle background element */}
      <div style={{
        position: 'absolute', top: '10%', right: '15%',
        width: '600px', height: '500px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: '100px', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '0.25em', color: '#888888', marginBottom: '16px',
          }}>
            03 / STACK
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 600,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.0, color: '#FFFFFF',
            letterSpacing: '-0.03em',
          }}>
            What I build with
          </h2>
        </div>

        {/* Hive Container - Asymmetric Layout */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          maxWidth: '950px',
          margin: '0 auto',
          paddingBottom: '100px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {skillsData.map((skillItem, index) => {
            const isSkillHovered = hoveredSkillId === skillItem.id
            const isAnotherSkillHovered = hoveredSkillId !== null && !isSkillHovered
            const animationDelayOffset = (index % 5) * 0.4
            
            // Randomize breathing parameters per bubble for organic feel
            const isIdleState = hoveredSkillId === null
            const breathDuration = 3 + (index % 3) // 3 to 5 seconds
            const breathDelay = index * 0.5
            const breathAnimation = isIdleState 
              ? `neonBreathing ${breathDuration}s ease-in-out infinite ${breathDelay}s` 
              : 'none'

            // Figma sizing logic
            const isFigma = skillItem.id === 'figma'
            const idleScale = isFigma ? 'scale(0.75)' : 'scale(1)'
            const hoverScale = isFigma ? 'scale(0.55)' : 'scale(0.7)'
            const currentScale = isSkillHovered ? hoverScale : idleScale

            // Invert logic untuk nextjs dan ollama (asumsi logonya hitam/gelap)
            const needsInvert = skillItem.id === 'nextjs' || skillItem.id === 'ollama'
            const imgFilter = needsInvert && !isSkillHovered 
                ? 'invert(1) brightness(1.5)' 
                : (needsInvert ? 'invert(1)' : 'none')

            return (
              <div
                key={skillItem.id}
                onMouseEnter={() => setHoveredSkillId(skillItem.id)}
                onMouseLeave={() => setHoveredSkillId(null)}
                style={{
                  position: 'relative',
                  width: '120px',
                  height: '120px',
                  transform: `translateY(${skillItem.offsetY}px)`,
                  animation: `floatAsymmetric ${4 + (index % 3)}s ease-in-out infinite`,
                  animationDelay: `${animationDelayOffset}s`,
                  zIndex: isSkillHovered ? 50 : 1,
                  opacity: isAnotherSkillHovered ? 0.3 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              >
                {/* Inner Container */}
                <div style={{
                  '--skill-color': skillItem.color,
                } as React.CSSProperties}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isSkillHovered ? '280px' : '120px',
                    height: isSkillHovered ? 'auto' : '120px',
                    minHeight: isSkillHovered ? '160px' : '120px',
                    padding: isSkillHovered ? '24px' : '0px',
                    borderRadius: isSkillHovered ? '24px' : '50%',
                    
                    background: '#111111', 
                    border: `2px solid ${skillItem.color}`,
                    // Override default shadow setup for the subtle look when hovered
                    boxShadow: isSkillHovered 
                      ? `0 20px 40px rgba(0,0,0,0.9), 0 0 25px ${skillItem.color}60` 
                      : `0 4px 12px rgba(0,0,0,0.5), 0 0 4px ${skillItem.color}`,
                    
                    display: 'flex',
                    flexDirection: isSkillHovered ? 'column' : 'row',
                    alignItems: isSkillHovered ? 'flex-start' : 'center',
                    justifyContent: isSkillHovered ? 'flex-start' : 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    
                    // Apply breathing animation
                    animation: breathAnimation,
                    transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.5s cubic-bezier(0.16, 1, 0.3, 1), min-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), padding 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                  }}>
                    
                    {/* Icon using standard <img> tag for broader compatibility */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      flexShrink: 0,
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      marginBottom: isSkillHovered ? '16px' : '0px',
                      transform: currentScale,
                      transformOrigin: 'top left',
                      filter: imgFilter,
                    }}>
                      <img 
                        src={skillItem.imagePath} 
                        alt={`${skillItem.label} icon`} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain' 
                        }}
                      />
                    </div>

                    {/* Expanded Content */}
                    <div style={{
                      width: isSkillHovered ? '100%' : '0px',
                      height: isSkillHovered ? 'auto' : '0px',
                      opacity: isSkillHovered ? 1 : 0,
                      visibility: isSkillHovered ? 'visible' : 'hidden',
                      overflow: 'hidden',
                      transition: 'opacity 0.3s ease 0.1s, width 0.3s ease',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', width: '100%', flexWrap: 'wrap' }}>
                        <h3 style={{
                          fontFamily: 'var(--font-sans)', fontWeight: 600,
                          fontSize: '16px', color: '#FFFFFF',
                          letterSpacing: '-0.02em', margin: 0,
                          whiteSpace: 'nowrap'
                        }}>
                          {skillItem.label}
                        </h3>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '8px',
                          letterSpacing: '0.12em', color: skillItem.color,
                          padding: '2px 6px',
                          border: `1px solid ${skillItem.color}60`,
                          borderRadius: '100px',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          boxShadow: `0 0 5px ${skillItem.color}20`
                        }}>
                          {skillItem.category}
                        </span>
                        
                        {/* Experimental Badge */}
                        {'isExperimental' in skillItem && skillItem.isExperimental && (
                          <span style={{
                            fontFamily: 'var(--font-mono)', fontSize: '8px',
                            letterSpacing: '0.12em', color: '#FFB800',
                            padding: '2px 6px',
                            border: `1px dashed #FFB80080`,
                            borderRadius: '100px',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            background: 'rgba(255, 184, 0, 0.05)'
                          }}>
                            IN STUDY
                          </span>
                        )}
                      </div>

                      <p style={{
                        fontFamily: 'var(--font-sans)', fontWeight: 300,
                        fontSize: '12px', color: 'rgba(255,255,255,0.7)', 
                        lineHeight: 1.6, marginBottom: '12px',
                      }}>
                        {skillItem.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {skillItem.related.map((relatedItem) => (
                          <span key={relatedItem} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '9px',
                            color: 'rgba(255,255,255,0.6)',
                            padding: '4px 8px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '100px',
                            background: 'rgba(255,255,255,0.05)',
                            whiteSpace: 'nowrap'
                          }}>
                            {relatedItem}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}