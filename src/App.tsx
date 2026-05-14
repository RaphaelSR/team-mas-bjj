import { useEffect, useRef } from 'react'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Capabilities from './sections/Capabilities'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import Preloader from './sections/Preloader'

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
        <Capabilities />
        <Hero />
      </main>
      <Footer />
    </>
  )
}

export default App
