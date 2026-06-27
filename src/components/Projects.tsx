// src/components/Projects.tsx

import { projects } from '../constants'

export default function Projects() {
    const isOdd = projects.length % 2 !== 0
    const mainProjects = isOdd ? projects.slice(0, -1) : projects
    const lastProject = isOdd ? projects[projects.length - 1] : null

    return (
        <section style={{
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
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
    return (
        <div style={{
            padding: 'var(--space-xl) var(--space-lg)',
            borderLeft: isLeft ? 'none' : '1px solid var(--line)',
            borderTop: isTop ? 'none' : '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xl)',
            alignItems: 'center',
        }}>

        <h3 style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'var(--text-lg)',
            fontWeight: '700',
            letterSpacing: '-0.05em',
            color: 'var(--text)',
            textTransform: 'lowercase',
            textAlign: 'center',
        }}>
            {project.title}
        </h3>

        <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-md)',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            textAlign: 'justify',
            maxWidth: '620px',
        }}>
            {project.description}
        </p>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
            }}>
                {project.role}
            </span>

            {project.stack.map((tech, i) => (
            <img
                key={i}
                src={`/src/assets/stack/${tech.toLowerCase()}.png`}
                alt={tech}
                style={{
                    height: '25px',
                    width: 'auto',
                    marginLeft: i === 0 ? '-5px' : '-5px',
                }}
            />
            ))}
        </div>

        <div style={{
            width: '100%',
            maxWidth: '620px',
            aspectRatio: '16/9',
            background: 'var(--dim)',
            borderRadius: '8px',
        }} />

    </div>
  )
}