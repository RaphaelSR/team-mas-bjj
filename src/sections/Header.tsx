import { useEffect, useRef, useState } from 'react'
import { useI18n, type Lang } from '@/i18n/I18nContext'
import { useIsMobile } from '@/hooks/use-mobile'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
}

export default function Header({ scrollRef }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const { lang, setLang, t } = useI18n()
  const isMobile = useIsMobile()

  const navItems = [
    { label: t('nav.sedes') as string, target: '#works' },
    { label: t('nav.programa') as string, target: '#capabilities' },
    { label: t('nav.contacto') as string, target: '#hero' },
  ]

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  const overHero = overHeroRaw

  const handleNavClick = (target: string) => {
    const el = document.querySelector(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const textColor = overHero ? '#ffffff' : '#000000'

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    setLangMenuOpen(false)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: isCompact ? '64px' : '88px',
        backgroundColor: overHero ? 'transparent' : '#ffffff',
        borderBottom: overHero
          ? '1px solid rgba(255,255,255,0.18)'
          : '1px solid #000000',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        transition:
          'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          cursor: 'pointer',
          color: textColor,
          transition: 'color 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img
          src="/images/team-mas-logo.png"
          alt="Team MAS BJJ — Volver al inicio"
          style={{ height: isCompact ? '36px' : '44px', width: 'auto' }}
        />
      </div>

      <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
        {!isMobile && navItems.map((item) => (
          <NavItem
            key={item.target}
            label={item.label}
            overHero={overHero}
            onClick={() => handleNavClick(item.target)}
          />
        ))}

        {/* Language Selector */}
        {!isMobile && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              onBlur={() => setTimeout(() => setLangMenuOpen(false), 200)}
              aria-label="Seleccionar idioma"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                backgroundColor: 'transparent',
                color: textColor,
                border: `1px solid ${overHero ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}`,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                textTransform: 'uppercase',
                height: '32px',
                margin: 'auto 12px',
              }}
            >
              {lang.toUpperCase()} ▾
            </button>
            {langMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '12px',
                  marginTop: '4px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #000000',
                  zIndex: 200,
                  minWidth: '80px',
                }}
              >
                {(['es', 'pt', 'en'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onMouseDown={() => handleLangChange(l)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: '12px',
                      fontWeight: l === lang ? 600 : 400,
                      letterSpacing: '0.1em',
                      backgroundColor: l === lang ? '#000000' : '#ffffff',
                      color: l === lang ? '#ffffff' : '#000000',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      textTransform: 'uppercase',
                      fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                    }}
                  >
                    {l === 'es' ? 'ESPAÑOL' : l === 'pt' ? 'PORTUGUÊS' : 'ENGLISH'}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              padding: '0 20px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              height: '100%',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  backgroundColor: textColor,
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: overHero ? 'rgba(11,11,11,0.97)' : '#ffffff',
            borderTop: overHero ? '1px solid rgba(255,255,255,0.12)' : '1px solid #000000',
            borderBottom: overHero ? '1px solid rgba(255,255,255,0.12)' : '1px solid #000000',
            zIndex: 99,
            padding: '8px 0',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => { handleNavClick(item.target); setMobileMenuOpen(false) }}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px clamp(20px, 4vw, 60px)',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                backgroundColor: 'transparent',
                color: overHero ? '#ffffff' : '#000000',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                textTransform: 'uppercase',
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ padding: '8px clamp(20px, 4vw, 60px)', display: 'flex', gap: '8px' }}>
            {(['es', 'pt', 'en'] as Lang[]).map((l) => (
              <button
                key={l}
                onMouseDown={() => { handleLangChange(l); setMobileMenuOpen(false) }}
                style={{
                  padding: '8px 14px',
                  fontSize: '11px',
                  fontWeight: l === lang ? 600 : 400,
                  letterSpacing: '0.12em',
                  backgroundColor: l === lang ? (overHero ? '#ffffff' : '#000000') : 'transparent',
                  color: l === lang ? (overHero ? '#000000' : '#ffffff') : (overHero ? '#ffffff' : '#000000'),
                  border: `1px solid ${overHero ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'}`,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#000000'
  const hoverBg = overHero ? '#ffffff' : '#000000'
  const hoverFg = overHero ? '#000000' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
