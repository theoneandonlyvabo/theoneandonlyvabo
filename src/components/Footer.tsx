// src/components/Footer.tsx

import { heroName, footerText, footerHashtag } from '../constants'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg)',
      padding: 'var(--space-lg)',
    }}>
      <div style={{
        background: 'var(--dim)',
        borderRadius: '16px',
        padding: 'var(--space-xl)',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-lg)',
      }}>

        <span style={{
          fontFamily: 'var(--font-main)',
          fontSize: 'var(--text-lg)',
          fontWeight: '700',
          letterSpacing: '-0.05em',
          color: 'var(--text)',
        }}>
          {heroName}
        </span>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
          lineHeight: '1.8',
          textAlign: 'justify',
          maxWidth: '560px',
        }}>
          {footerText}
        </p>

        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text)',
        }}>
          {footerHashtag}
        </span>

      </div>
    </footer>
  )
}
