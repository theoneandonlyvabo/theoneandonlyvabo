import { aboutText } from '../constants'

export default function About() {
    return (
        <section style={{
            padding: 'var(--space-xl) var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>

            <h2 style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'var(--text-lg)',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                color: 'var(--text)',
                marginBottom: 'var(--space-xl)',
            }}>
                who is aireladrivano, really?
            </h2>

            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-md)',
                color: 'var(--text)',
                lineHeight: '1.8',
                textAlign: 'justify',
                maxWidth: '620px',
                marginBottom: 'var(--space-xl)',
            }}>
                {aboutText}
            </p>

            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text)',
                    marginRight: '10px',
                }}>
                    Biography written fully by
                </p>
                <img src="/src/assets/stack/chatgpt.png" alt="ChatGPT" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }} />
                <img src="/src/assets/stack/claude.png" alt="Claude" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px' }} />
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text)',
                }}>
                    +1
                </p>
            </div>

        </section>
    )
}