'use client'

import { useEffect, useState, useRef } from 'react'
import { SKILLS_DETAILED } from '@/lib/constants'

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null)

  useEffect(() => {
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) visibilityObserver.observe(sectionRef.current)
    return () => visibilityObserver.disconnect()
  }, [])

  function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function getAnimParams(id: string) {
  let seed = hashString(id)

  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  return {
    floatDuration: 4.5 + rand() * 1.5,
    floatDelay: rand() * 1.5,
    breathDuration: 2.5 + rand() * 2,
    breathDelay: rand() * 2,
  }
}

  // Fungsi buat nentuin prefix, teks highlight, dan suffix berdasarkan ID
  const getDynamicTitle = (skillId: string | null) => {
    if (!skillId) {
      return { prefixText: 'What I ', highlightText: 'Build', suffixText: ' With' }
    }

    const idLower = skillId.toLowerCase()

    // Systems
    if (['java', 'go'].includes(idLower)) {
      return { prefixText: 'What I Build ', highlightText: 'Systems', suffixText: ' With' }
    }
    // Scripts
    if (['python'].includes(idLower)) {
      return { prefixText: 'What I Build ', highlightText: 'Scripts', suffixText: ' With' }
    }
    // Database
    if (['postgres', 'mysql'].includes(idLower)) {
      return { prefixText: 'What I Build ', highlightText: 'Databases', suffixText: ' With' }
    }
    // Designs
    if (['figma'].includes(idLower)) {
      return { prefixText: 'What I Build ', highlightText: 'Designs', suffixText: ' With' }
    }
    // Everything
    if (['claude'].includes(idLower)) {
      return { prefixText: 'What I Plan ', highlightText: 'Everything', suffixText: ' With' }
    }
    // AI Automations (Prefix berubah jadi "experiment")
    if (['ollama', 'openclaw'].includes(idLower)) {
      return { prefixText: 'What I Experiment ', highlightText: 'Automations', suffixText: ' with' }
    }
    
    // Default untuk bahasa & framework web
    return { prefixText: 'What I Build ', highlightText: 'Web Apps', suffixText: ' With' }
  }

  const currentTitleData = getDynamicTitle(hoveredSkillId)

  // Ambil warna untuk teks H2 yang lagi di-highlight
  let activeColor = '#FFFFFF'
  if (hoveredSkillId) {
    const activeSkill = SKILLS_DETAILED.find((s) => s.id === hoveredSkillId)
    if (activeSkill) {
      const activeIdLower = hoveredSkillId.toLowerCase()
      activeColor = activeIdLower === 'openclaw' ? '#EF4444' : activeSkill.color
    }
  }

  return (
    <section
      id="stack"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '0px 56px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
      }}
    >
      <style>
        {`
          @keyframes floatAsymmetric {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1.5deg); }
          }
          
          /* Animasi breathing dibikin subtle biar ngga clashing atau clutter */
          @keyframes neonBreathing {
            0%, 100% { 
              box-shadow: 
                0 10px 30px rgba(0,0,0,0.4),
                0 0 10px var(--skillColor);
              filter: brightness(0.98); 
            }
            50% { 
              box-shadow: 
                0 10px 30px rgba(0,0,0,0.5),
                0 0 22px var(--skillColor);
              filter: brightness(1.05); 
            }
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          @keyframes textPop {
            0% { opacity: 0; transform: translateY(8px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>

      <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{ marginBottom: '70px', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: '#888888',
            marginBottom: '16px',
          }}>
            02 / STACK
          </div>

          <h2
            key={hoveredSkillId || 'idleState'}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 'clamp(36px, 5vw, 60px)',
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              animation: 'textPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {currentTitleData.prefixText}
            <span
              style={{
                color: hoveredSkillId ? activeColor : '#FFFFFF',
                transition: 'color 0.3s ease',
              }}
            >
              {currentTitleData.highlightText}
            </span>
            {currentTitleData.suffixText}
          </h2>
        </div>

        <div
          style={{
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
          }}
        >
          {SKILLS_DETAILED.map((skillItem, index) => {
            const anim = getAnimParams(skillItem.id)
            const currentSkillIdLower = skillItem.id.toLowerCase()
            const isSkillHovered = hoveredSkillId === skillItem.id
            const isAnotherSkillHovered = hoveredSkillId !== null && !isSkillHovered
            const isIdleState = hoveredSkillId === null

            const skillColor = currentSkillIdLower === 'openclaw' ? '#EF4444' : skillItem.color

            const breathAnimation = isIdleState
              ? `neonBreathing ${anim.breathDuration}s ease-in-out infinite`
              : 'none'

            const breathDelay = isIdleState ? `${anim.breathDelay}s` : '0s'

            const isFigma = currentSkillIdLower === 'figma'
            const idleScale = isFigma ? 'scale(0.75)' : 'scale(1)'
            const hoverScale = isFigma ? 'scale(0.55)' : 'scale(0.7)'
            const currentScale = isSkillHovered ? hoverScale : idleScale

            const needsInvert = currentSkillIdLower === 'nextjs' || currentSkillIdLower === 'ollama'

            const imgFilter = needsInvert && !isSkillHovered
              ? 'invert(1) brightness(1.5)'
              : needsInvert
              ? 'invert(1)'
              : 'none'

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
                  animation: `floatAsymmetric ${anim.floatDuration}s ease-in-out infinite`,
                  animationDelay: breathDelay,
                  zIndex: isSkillHovered ? 50 : 1,
                  opacity: isAnotherSkillHovered ? 0.3 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ '--skillColor': skillColor } as React.CSSProperties}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: isSkillHovered ? '280px' : '120px',
                      height: isSkillHovered ? 'auto' : '120px',
                      minHeight: isSkillHovered ? '160px' : '0px',
                      padding: isSkillHovered ? '24px' : '0px',
                      borderRadius: isSkillHovered ? '20px' : '50%',
                      background: '#111111',
                      border: `2px solid ${skillColor}`,
                      boxShadow: isSkillHovered
                        ? `0 20px 40px rgba(0,0,0,0.9), 0 0 18px ${skillColor}1A` // Glow Opacity
                        : `0 4px 12px rgba(0,0,0,0.5), 0 0 10px ${skillColor}0D`, // Glow Opacity
                      display: 'flex',
                      flexDirection: isSkillHovered ? 'column' : 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      animation: breathAnimation,
                      transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                      filter: isSkillHovered ? 'blur(0px)' : 'blur(0.3px)',
                    }}
                  >
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) ${currentScale}`,
                        opacity: isSkillHovered ? 0 : 1,
                        transition: 'all 0.25s ease',
                        filter: imgFilter,
                      }}
                    >
                      <img
                        src={skillItem.imagePath}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>

                    <div
                      style={{
                        width: '100%',
                        opacity: isSkillHovered ? 1 : 0,
                        visibility: isSkillHovered ? 'visible' : 'hidden',
                        transition: isSkillHovered
                          ? 'opacity 0.3s ease 0.15s, transform 0.3s ease 0.15s'
                          : 'none',
                        transform: isSkillHovered ? 'translateY(0px)' : 'translateY(10px)',
                        pointerEvents: isSkillHovered ? 'auto' : 'none',
                      }}
                    >
                      {isSkillHovered && (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          marginBottom: '10px',
                          opacity: 0,
                          animation: 'fadeIn 0.3s ease forwards 0.2s'
                        }}>
                          <img src={skillItem.imagePath} style={{ width: '100%', filter: imgFilter === 'invert(1)' ? 'invert(1)' : 'none' }} />
                        </div>
                      )}

                      <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginBottom: '8px', 
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}>
                        <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>
                          {skillItem.label}
                        </h3>

                        <span style={{
                          fontSize: '8px',
                          color: skillColor,
                          padding: '2px 6px',
                          border: `1px solid ${skillColor}60`,
                          borderRadius: '100px',
                        }}>
                          {skillItem.category}
                        </span>

                        {skillItem.isExperimental && (
                          <span style={{
                            fontSize: '8px',
                            color: '#FFB800',
                            padding: '2px 6px',
                            border: `1px dashed #FFB80080`,
                            borderRadius: '100px',
                          }}>
                            EXPERIMENTAL
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '10px' }}>
                        {skillItem.description}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {skillItem.related.map((relatedItem) => (
                          <span key={relatedItem} style={{ fontSize: '9px', opacity: 0.7 }}>
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