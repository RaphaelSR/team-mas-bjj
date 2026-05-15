import { useState, useEffect, useCallback } from 'react'
import { gyms } from '../data/gyms'
import { useI18n } from '@/i18n/I18nContext'

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

export default function Footer() {
  const { t } = useI18n()
  const [nearestGym, setNearestGym] = useState<{ gym: typeof gyms[0]; distance: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const findNearestGym = useCallback(() => {
    setLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude
        const userLng = position.coords.longitude

        let closest = gyms[0]
        let minDist = Infinity

        gyms.forEach((gym) => {
          const dist = getDistanceFromLatLonInKm(userLat, userLng, gym.lat, gym.lng)
          if (dist < minDist) {
            minDist = dist
            closest = gym
          }
        })

        setNearestGym({ gym: closest, distance: Math.round(minDist * 10) / 10 })
        setLoading(false)
      },
      () => {
        setLocationError(t('footer.allowLocation') as string)
        setLoading(false)
      }
    )
  }, [t])

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
        if (result.state === 'granted') {
          findNearestGym()
        }
      })
    }
  }, [findNearestGym])

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid #333333',
        padding: '80px clamp(20px, 4vw, 60px) 0',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Office Info */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '60px',
        }}
      >
        {/* Nearest Gym Finder */}
        <div style={{ gridColumn: '1 / -1', marginBottom: '20px' }}>
          <div
            style={{
              border: '1px solid #333333',
              padding: '24px 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  color: '#ffffff',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                {t('footer.findNearest') as string}
              </p>
              {nearestGym ? (
                <p style={{ fontSize: '14px', color: '#888888', fontFamily: '"Inter", sans-serif' }}>
                  {t('footer.nearestFound') as string}{' '}
                  <a
                    href={nearestGym.gym.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 500 }}
                  >
                    {nearestGym.gym.title}
                  </a>{' '}
                  ({nearestGym.distance} {t('footer.kmAway') as string})
                </p>
              ) : locationError ? (
                <p style={{ fontSize: '13px', color: '#ff6666', fontFamily: '"Inter", sans-serif' }}>
                  {locationError}
                </p>
              ) : null}
            </div>
            <button
              onClick={findNearestGym}
              disabled={loading}
              style={{
                padding: '12px 24px',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: '#ffffff',
                backgroundColor: 'transparent',
                border: '1px solid #ffffff',
                cursor: loading ? 'wait' : 'pointer',
                textTransform: 'uppercase',
                fontFamily: '"Inter", sans-serif',
                transition: 'all 0.25s ease',
                opacity: loading ? 0.6 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {loading ? '...' : (t('footer.allowLocation') as string)}
            </button>
          </div>
        </div>

        <GymColumn
          city={t('sedes.buenosAires.name') as string}
          cityEn={t('footer.buenosAires') as string}
          address={(t('sedes.buenosAires.address') as string) || gyms[0].address}
          instagram="https://www.instagram.com/team_mas_buenosaires/"
          igHandle="@team_mas_buenosaires"
          mapsUrl={`https://www.google.com/maps?q=${gyms[0].lat},${gyms[0].lng}`}
        />
        <GymColumn
          city={t('sedes.olivos.name') as string}
          cityEn={t('footer.olivos') as string}
          address={(t('sedes.olivos.address') as string) || gyms[1].address}
          instagram="https://www.instagram.com/team_mas_olivos/"
          igHandle="@team_mas_olivos"
          mapsUrl={`https://www.google.com/maps?q=${gyms[1].lat},${gyms[1].lng}`}
        />
        <GymColumn
          city={t('sedes.urquiza.name') as string}
          cityEn={t('footer.urquiza') as string}
          address={(t('sedes.urquiza.address') as string) || gyms[2].address}
          instagram="https://www.instagram.com/team_mas_urquiza/"
          igHandle="@team_mas_urquiza"
          mapsUrl={`https://www.google.com/maps?q=${gyms[2].lat},${gyms[2].lng}`}
        />
        <GymColumn
          city={t('sedes.rosario.name') as string}
          cityEn={t('footer.rosario') as string}
          address={(t('sedes.rosario.address') as string) || gyms[3].address}
          instagram="https://www.instagram.com/team_mas_bjj/"
          igHandle="@team_mas_bjj"
          mapsUrl={`https://www.google.com/maps?q=${gyms[3].lat},${gyms[3].lng}`}
        />

        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#ffffff',
              marginBottom: '20px',
              textTransform: 'uppercase',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {t('footer.contact') as string}
          </p>
          <p style={{ fontSize: '14px', color: '#888888', lineHeight: 2, fontFamily: '"Inter", sans-serif' }}>
            {t('footer.email') as string}
            <br />
            {t('footer.phone') as string}
          </p>
        </div>
      </div>

      {/* Instagram Links Bar */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          paddingBottom: '40px',
          borderTop: '1px solid #222222',
          paddingTop: '24px',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#666666', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: '"Inter", sans-serif' }}>
            {t('footer.ig') as string}:
          </span>
          {gyms.map((gym) => (
            <a
              key={gym.id}
              href={gym.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '13px',
                color: '#888888',
                textDecoration: 'none',
                fontFamily: '"Inter", sans-serif',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
            >
              {gym.instagramHandle}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
          paddingBottom: '0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: 'clamp(80px, 18vw, 320px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
            fontFamily: '"Oswald", "Helvetica Neue", sans-serif',
            textTransform: 'uppercase',
          }}
        >
          TEAM MAS BJJ
        </span>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '11px', color: '#444444', letterSpacing: '0.1em', fontFamily: '"Inter", sans-serif' }}>
          {t('footer.copyright') as string}
        </p>
      </div>
    </footer>
  )
}

function GymColumn({
  city,
  cityEn,
  address,
  instagram,
  igHandle,
  mapsUrl,
}: {
  city: string
  cityEn: string
  address: string
  instagram: string
  igHandle: string
  mapsUrl: string
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#ffffff',
          marginBottom: '20px',
          textTransform: 'uppercase',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {cityEn}
      </p>
      <p style={{ fontSize: '16px', fontWeight: 500, color: '#ffffff', marginBottom: '8px', fontFamily: '"Inter", sans-serif' }}>
        {city}
      </p>
      <p
        style={{
          fontSize: '14px',
          color: '#888888',
          lineHeight: 1.6,
          marginBottom: '12px',
          maxWidth: '260px',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        {address}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '13px',
            color: '#888888',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: '"Inter", sans-serif',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Ver en Maps →
        </a>
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '13px',
            color: '#888888',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: '"Inter", sans-serif',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          {igHandle}
        </a>
      </div>
    </div>
  )
}
