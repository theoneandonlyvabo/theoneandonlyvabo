import { useState, useEffect } from 'react'

const words = ['Moonshot Builder', 'System Designer', 'Change Maker', 'Opportunity Taker', "Big-League Chaser"]

export default function Hero() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % words.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: 'var(--space-lg) var(--space-md)',
            gap: '10px',
        }}>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            marginTop: '100px',
        }}>
            
        <img
            src="/src/assets/profile.jpeg"
            alt="Vabo"
            style={{
                marginTop: '54px',
                width: '65px',
                height: '65px',
                borderRadius: '5px',
                objectFit: 'cover',
            }}
        />

        <h1 style={{
            marginTop: '54px',
            fontFamily: 'var(--font-main)',
            fontSize: 'var(--text-xl)',
            fontWeight: '700',
            letterSpacing: '-0.05em',
            color: 'var(--text)',
        }}>
            aireladrivano
        </h1>

        </div>

        <p
            key={words[index]}
            style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text-muted)',
                animation: 'wordIn 0.5s ease forwards',
            }}
        >
            {words[index]}
        </p>

      <div style={{
        fontFamily: 'var(--font-body)',
        marginTop: '120px',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
        animation: 'breathe 4s infinite',
      }}>
        Scroll Down ↓
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        marginTop: '120px',
        fontSize: 'var(--text-md)',
        color: 'var(--text)',
      }}>
        Architecting products from zero to one. End-to-end
        <br />
        execution with a founder's eye for value.
      </div>

    </section>
  )
}