// src/components/Projects.tsx

import { useState, useEffect, useRef } from 'react'
import { projects } from '../constants'

function getImages(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/projects/${slug}/${i + 1}.png`)
}

function PanningSlider({ images, title }: { images: string[], title: string }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'down' | 'up'>('down')
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const img = imgRef.current
    if (!container || !img) return

    const containerH = container.clientHeight
    const imgH = img.clientHeight
    const maxScroll = imgH - containerH

    if (maxScroll <= 0) {
      const timer = setTimeout(() => {
        setCurrent(prev => (prev + 1) % images.length)
      }, 3000)
      return () => clearTimeout(timer)
    }

    const duration = 4000
    let start: number | null = null
    let raf: number

    const animate = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)

      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2

      const scrollY = direction === 'down'
        ? eased * maxScroll
        : maxScroll - eased * maxScroll

      container.scrollTop = scrollY

      if (progress < 1) {
        raf = requestAnimationFrame(animate)
      } else {
        setTimeout(() => {
          setDirection(prev => prev === 'down' ? 'up' : 'down')
          if (direction === 'up') {
            setCurrent(prev => (prev + 1) % images.length)
          }
        }, 800)
      }
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [current, direction, images])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        ref={imgRef}
        src={images[current]}
        alt={`${title} ${current + 1}`}
        style={{
          width: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  )
}

export default function Projects() {
  const isOdd = projects.length % 2 !== 0
  const mainProjects = isOdd ? projects.slice(0, -1) : projects
  const lastProject = isOdd ? projects[projects.length - 1] : null

  return (
    <section style={{
      borderTop: '1px solid var(--line)',
    }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}>
        {mainProjects.map((project, i) => (
          <ProjectCard key={i} project={project} isLeft={i % 2 === 0} isTop />
        ))}
      </div>

      {lastProject && (
        <div style={{
          borderTop: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{ width: '50%' }}>
            <ProjectCard project={lastProject} isLeft />
          </div>
        </div>
      )}

    </section>
  )
}

function ProjectCard({ project, isLeft, isTop }: {
  project: typeof projects[0]
  isLeft?: boolean
  isTop?: boolean
}) {
  const images = getImages(project.slug, project.imageCount)

  return (
    <div style={{
      padding: 'var(--space-xl) var(--space-xl)',
      borderLeft: isLeft ? 'none' : '1px solid var(--line)',
      borderTop: isTop ? 'none' : '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)',
      alignItems: 'flex-start',
    }}>

      <h3 style={{
        fontFamily: 'var(--font-main)',
        fontSize: 'var(--text-lg)',
        fontWeight: '700',
        letterSpacing: '-0.05em',
        color: 'var(--text)',
        textAlign: 'center',
        width: '100%',
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
        textAlign: 'justify',
        lineHeight: '1.8',
      }}>
        {project.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
          marginRight: '10px',
        }}>
          {project.role}
        </span>

        {project.stack.map((tech, i) => (
          <img
            key={i}
            src={`/images/stack/${tech.toLowerCase()}.png`}
            alt={tech}
            style={{
              height: '25px',
              width: 'auto',
              marginRight: i === project.stack.length - 1 ? '0px' : '5px',
            }}
          />
        ))}
      </div>

      {images.length > 0 ? (
        <PanningSlider images={images} title={project.title} />
      ) : (
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'var(--dim)',
          borderRadius: '10px',
          border: '1px solid var(--line)',
        }} />
      )}

    </div>
  )
}