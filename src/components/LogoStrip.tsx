// src/components/LogoStrip.tsx

import { useRef, useEffect } from 'react'

const logos = [
  { name: '2030 SUKSES!' },
  { name: 'Inkubiz UPNVJ' },
  { name: 'SIRCLO' },
  { name: 'Skalar Solutions' },
  { name: 'Lombakan' },
  { name: 'HIMA S1 SI UPNVJ' },
  { name: 'Visionlab Wear' },
  { name: 'Ayam67' },
  { name: 'Sandiraga Convection' },
  { name: 'Demi Music Center' },
]

export default function LogoStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const speedRef = useRef(0.5)
  const rafRef = useRef<number>(0)
  const isHovered = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    const animate = () => {
        const targetSpeed = isHovered.current ? 0.25 : 2
        speedRef.current += (targetSpeed - speedRef.current) * 0.05

      posRef.current += speedRef.current
      if (posRef.current >= totalWidth) {
        posRef.current -= totalWidth
      }

      track.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
        style={{
            overflow: 'hidden',
            width: '100%',
            padding: 'var(--space-lg) 0',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
        }}
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
        >
    <div
        ref={trackRef}
        style={{
            display: 'flex',
            gap: '60px',
            width: 'max-content',
        }}>
        {[...logos, ...logos].map((logo, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  )
}