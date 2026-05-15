import { lazy, Suspense, useEffect, useRef } from 'react'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'

const Capabilities = lazy(() => import('./sections/Capabilities'))
const Hero = lazy(() => import('./sections/Hero'))

function App() {
  const scrollRef = useRef({ y: 0, speed: 0 })

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <Preloader />
      <Header scrollRef={scrollRef} />
      <main>
        <Spatial />
        <Philosophy />
        <Works scrollRef={scrollRef} />
        <Suspense fallback={<div style={{ height: '600px', backgroundColor: '#0b0b0b' }} />}>
          <Capabilities />
        </Suspense>
        <Suspense fallback={<div style={{ height: '700px', backgroundColor: '#0b0b0b' }} />}>
          <Hero />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
