// src/components/Hero.tsx

export default function Hero() {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: 'var(--space-lg) var(--space-md)',
      gap: '12px',
    }}>

      <h1 style={{
        fontFamily: 'var(--font-main)',
        fontSize: 'var(--text-xl)',
        fontWeight: '700',
        letterSpacing: '-0.05em',
        color: 'var(--text)',
      }}>
        aireladrivano
      </h1>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
      }}>
        Innovator
      </p>

      <div style={{
        marginTop: 'var(--space-lg)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
      }}>
        Scroll Down ↓
      </div>

    </section>
  )
}