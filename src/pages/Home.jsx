import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkExperience from '../components/WorkExperience'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import TetrisGame from '../components/TetrisGame'

const Home = () => {
    const [isTetrisActive, setIsTetrisActive] = useState(false)
    const { hash } = useLocation()

    useEffect(() => {
        document.body.style.overflow = isTetrisActive ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [isTetrisActive])

    useEffect(() => {
        if (isTetrisActive) return
        if (!hash) return

        let targetId = hash.replace('#', '').trim()
        try {
            targetId = decodeURIComponent(targetId).trim()
        } catch {
            // ignore malformed URI sequences
        }
        if (!targetId) return

        const prefersReducedMotion =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const behavior = prefersReducedMotion ? 'auto' : 'smooth'

        let attempt = 0
        let timerId
        const maxAttempts = 10

        const scrollToTarget = () => {
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior, block: 'start' })
                return
            }

            attempt += 1
            if (attempt >= maxAttempts) return
            timerId = setTimeout(scrollToTarget, 50)
        }

        timerId = setTimeout(scrollToTarget, 0)
        return () => clearTimeout(timerId)
    }, [hash, isTetrisActive])

    return (
        <>
            {!isTetrisActive && <Header />}

            {!isTetrisActive && (
                <button
                    onClick={() => setIsTetrisActive(true)}
                    aria-label="Buka Tetris"
                    className="fixed bottom-4 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-950/90 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105 hover:bg-cyan-500/10 sm:bottom-6 sm:right-6 sm:h-20 sm:w-20"
                >
                    <img
                        src="/tetris_logo.png"
                        alt="Tetris trigger"
                        className="h-10 w-10 object-contain sm:h-full sm:w-full rounded-full"
                        draggable="false"
                    />
                </button>
            )}

            {isTetrisActive ? (
                <section className="fixed inset-0 z-[60] overflow-hidden overscroll-none bg-slate-950/95">
                    <TetrisGame onExit={() => setIsTetrisActive(false)} />
                </section>
            ) : (
                <>
                    <Hero />
                    <About />
                    <WorkExperience />
                    <Projects />
                    <Contact />
                </>
            )}
        </>
    )
}

export default Home
