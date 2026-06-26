// src/components/Navbar.tsx

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-lg)',
      padding: '20px 0',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg)',
    }}>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
      <a href="https://skalarsolutions.com" target="_blank">Skalar Solutions</a>
    </nav>
  )
}