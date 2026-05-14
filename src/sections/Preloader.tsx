import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 600)
    const t2 = setTimeout(() => setPhase('done'), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#050505',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <img
          src="/images/team-mas-logo.png"
          alt="Team Mas BJJ"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            filter: 'invert(1)',
            transform: phase === 'loading' ? 'translateY(40px)' : 'translateY(0)',
            opacity: phase === 'loading' ? 0 : 1,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
          }}
        />
        <span
          style={{
            fontSize: 'clamp(24px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#ffffff',
            transform: phase === 'loading' ? 'translateY(40px)' : 'translateY(0)',
            opacity: phase === 'loading' ? 0 : 1,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
            fontFamily: '"Oswald", "Helvetica Neue", sans-serif',
            textTransform: 'uppercase',
          }}
        >
          TEAM MAS BJJ
        </span>
      </div>
    </div>
  )
}
