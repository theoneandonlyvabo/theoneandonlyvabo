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
            marginTop: '100px',
            letterSpacing: '-0.05em',
            color: 'var(--text)',
        }}>
            aireladrivano
        </h1>

        <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--text-muted)',
        }}>
            Innovator
        </p>

        <div style={{
            fontFamily: 'var(--font-body)',
            marginTop: '100px',
            fontSize: 'var(--text-md)',
            color: 'var(--text)',
            animation: 'breathe 2s ease-in-out infinite',

        }}>
            Scroll Down ↓
        </div>

        <div style={{
            fontFamily: 'var(--font-body)',
            marginTop: '100px',
            fontSize: 'var(--text-md)',
            color: 'var(--text)',

        }}>
            Architecting products from zero to one. End-to-end
            <br></br>
            execution with a founder's eye for value.
        </div>

    </section>
  )
}