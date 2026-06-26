// src/components/PhotoGrid.tsx

export default function PhotoGrid() {
  return (
    <div style={{
        display: 'flex',
        gap: 'var(--space-md)',
        padding: '0 var(--space-md)',
        margin: '0 auto',
        borderBottom: '1px solid var(--line)',
        paddingBottom: 'var(--space-md)',
    }}>
        {Array.from({ length: 5 }).map((_, i) => (
        <div
            key={i}
            style={{
                flex: 1,
                aspectRatio: '1/1',
                background: 'var(--dim)',
                borderRadius: '10px',
            }}
        />
    ))}
    </div>
  )
}