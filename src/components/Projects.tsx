// src/components/Projects.tsx

import { projects } from '../constants'

export default function Projects() {
  const isOdd = projects.length % 2 !== 0
  const mainProjects = isOdd ? projects.slice(0, -1) : projects
  const lastProject = isOdd ? projects[projects.length - 1] : null

  return (
    <section style={{
      padding: 'var(--space-lg) var(--space-md)',
      maxWidth: '900px',
      margin: 'var(--space-lg) auto',
    }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-lg)',
      }}>
        {mainProjects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {lastProject && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 'var(--space-lg)',
        }}>
          <div style={{ width: '50%' }}>
            <ProjectCard project={lastProject} />
          </div>
        </div>
      )}

    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>

      <h3 style={{
        fontFamily: 'var(--font-main)',
        fontSize: 'var(--text-md)',
        fontWeight: '700',
        letterSpacing: '-0.05em',
        color: 'var(--text)',
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        lineHeight: '1.6',
        textAlign: 'justify',
        maxWidth: '620px',
      }}>
        {project.description}
      </p>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
      }}>
        {project.role}
      </p>

      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        {project.stack.map((tech, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '2px 8px',
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        background: 'var(--box)',
        borderRadius: '8px',
      }} />

    </div>
  )
}