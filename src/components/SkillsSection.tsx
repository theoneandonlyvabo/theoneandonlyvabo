'use client'

import { useRef, useEffect, useState } from 'react'
import { SKILLS } from '@/lib/constants'

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center py-32"
      style={{ background: 'var(--deep)' }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--magenta) 1px, transparent 1px), linear-gradient(90deg, var(--magenta) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-10 lg:px-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="flex flex-col gap-3">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--cyan)',
                letterSpacing: '0.3em',
              }}
            >
              03 / STACK
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
              WHAT I BUILD WITH
            </h2>
          </div>
          <p
            className="hidden lg:block max-w-xs text-sm leading-relaxed"
            style={{ color: 'var(--gray)', fontFamily: 'var(--font-body)' }}
          >
            Primary stack is TypeScript/Next.js. Most comfortable in Go and Java.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--gray-dim)' }}>
          {SKILLS.map((category, i) => (
            <div
              key={category.category}
              className="flex flex-col gap-5 p-8 transition-all duration-500"
              style={{
                background: 'var(--deep)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}
              >
                {category.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs tracking-wide transition-all duration-200 hover:border-cyan-400 hover:text-white cursor-default"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--gray)',
                      border: '1px solid var(--gray-dim)',
                      background: 'var(--surface)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-8 flex items-center gap-3"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gray)' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--lime)' }} />
          <span>actively learning — this list grows</span>
        </div>
      </div>
    </section>
  )
}