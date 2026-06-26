// src/components/About.tsx

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
            Vano is driven by a quiet obsession with understanding how things work. 
            Whether he's building software, shaping products, sketching new business ideas, 
            or creating worlds of his own, he rarely sees them as separate interests. 
            To him, they're all different expressions of the same pursuit: turning complexity 
            into something that works. More curious than certain, he's the kind of person 
            who keeps exploring a question long after others have accepted an answer. 
            He doesn't care much for titles or appearances. What motivates him is the process 
            itself, learning, building, refining, and getting a little closer to understanding 
            how things could be greater.
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
            <img src="/src/assets/stack/claude.png" alt="Claude" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '5px' }} />
            <img src="/src/assets/stack/chatgpt.png" alt="ChatGPT" style={{ width: '25px', height: '25px', borderRadius: '50%', marginRight: '10px' }} />
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