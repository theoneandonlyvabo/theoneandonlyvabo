// src/components/Skills.tsx

import { skillsTagline, primarySkillRows, operateIcons, relatedSkillIcons } from '../constants'

const cardStyle: React.CSSProperties = {
  width: '96px',
  height: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#FCFCFC',
  border: '1px solid var(--line)',
  borderRadius: '14px',
}

export default function Skills() {
  return (
    <section id="skills" style={{
      borderTop: '1px solid var(--line)',
      padding: 'var(--space-xl) var(--space-md)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-lg)',
    }}>

      <h2 style={{
        fontFamily: 'var(--font-main)',
        fontSize: 'var(--text-lg)',
        fontWeight: '700',
        letterSpacing: '-0.05em',
        color: 'var(--text)',
      }}>
        things i'm good at
      </h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
        lineHeight: '1.8',
        textAlign: 'center',
        maxWidth: '620px',
      }}>
        {skillsTagline}
      </p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-md)',
        alignItems: 'center',
      }}>
        {primarySkillRows.map((row, ri) => (
          <div key={ri} style={{
            display: 'flex',
            gap: 'var(--space-md)',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {row.map(src => (
              <div key={src} style={cardStyle}>
                <img src={src} alt="" style={{ height: '48px', width: 'auto' }} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
        }}>
          Oh, and ofcourse I can operate
        </span>
        {operateIcons.map(src => (
          <img key={src} src={src} alt="" style={{ height: '22px', width: 'auto' }} />
        ))}
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-md)',
        width: '100%',
        marginTop: 'var(--space-md)',
      }}>
        <span style={{
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--text-md)',
          fontWeight: '500',
          color: 'var(--text)',
        }}>
          Related Skills
        </span>
        <div style={{
          display: 'flex',
          gap: 'var(--space-md)',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {relatedSkillIcons.map(src => (
            <div key={src} style={cardStyle}>
              <img src={src} alt="" style={{ height: '48px', width: 'auto' }} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
