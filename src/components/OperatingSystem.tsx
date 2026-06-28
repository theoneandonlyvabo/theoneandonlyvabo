// src/components/OperatingSystem.tsx

import { operatingSystemText, operatingSteps } from '../constants'

export default function OperatingSystem() {
  return (
    <section style={{
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
        my operating system
      </h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
        lineHeight: '1.8',
        textAlign: 'justify',
        maxWidth: '620px',
      }}>
        {operatingSystemText}
      </p>

      <div style={{
        display: 'flex',
        gap: 'var(--space-lg)',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {operatingSteps.map((step, i) => (
          <span key={step} style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--text)',
          }}>
            ({i + 1}) {step}
          </span>
        ))}
      </div>

    </section>
  )
}
