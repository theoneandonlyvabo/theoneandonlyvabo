// src/components/Navbar.tsx

export default function Navbar() {
  return (
    <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-lg)',
        padding: '20px 0',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text)',
        borderBottom: '1px solid var(--line)',
    }}>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <a href="https://skalarsolutions.com" target="_blank">Skalar</a>    
    </nav>
  )
}