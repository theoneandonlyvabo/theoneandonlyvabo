// src/components/Contact.tsx

import { contactEmail } from '../constants'

export default function Contact() {
  return (
    <section id="contact" style={{
      borderTop: '1px solid var(--line)',
      padding: 'var(--space-xl) var(--space-md)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-lg)',
      textAlign: 'center',
    }}>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--dim)',
      }}>
        still reading?
      </span>

      <h2 style={{
        fontFamily: 'var(--font-main)',
        fontSize: 'var(--text-lg)',
        fontWeight: '700',
        letterSpacing: '-0.05em',
        color: 'var(--text)',
      }}>
        let's figure something out together.
      </h2>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
        lineHeight: '1.8',
        maxWidth: '480px',
      }}>
        I'm always open to discussing new opportunities, collaborations, and ambitious projects. anything.
      </p>

      <a
        href={`mailto:${contactEmail}`}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
        }}
      >
        contact me →
      </a>

    </section>
  )
}
