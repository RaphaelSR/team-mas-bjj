import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/i18n/I18nContext'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  const tags = t('philosophy.tags') as string[]

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const tagsEl = tagsRef.current
    if (!section || !text || !tagsEl) return

    const ctx = gsap.context(() => {
      gsap.from(text, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from(tagsEl.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          once: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: '160px clamp(20px, 4vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '80px',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '1 1 100%' }}>
          <p
            ref={textRef}
            style={{
              flex: '1 1 700px',
              fontSize: 'clamp(24px, 3.5vw, 52px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              maxWidth: '1200px',
              fontFamily: '"Oswald", "Helvetica Neue", sans-serif',
              textWrap: 'balance',
            }}
          >
            {t('philosophy.quote') as string}
          </p>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.18em',
              color: '#888888',
              marginTop: '40px',
              textTransform: 'uppercase',
              fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            }}
          >
            {t('philosophy.attribution') as string}
          </p>
        </div>

        <div
          ref={tagsRef}
          style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '12px',
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: '#ffffff',
                padding: '10px 18px',
                border: '1px solid #333333',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
                fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
