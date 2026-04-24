import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { FaCube } from 'react-icons/fa'
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
            <Header />

            <div className="ml-[260px]">
                {!isTetrisActive && (
                    <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-[#141414] p-3 sm:bottom-6 sm:right-6">
                        <Link
                            to="/model"
                            aria-label="Buka 3D Model"
                            className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] text-[#FF653F] transition hover:scale-105 hover:border-[#FF653F]/25 sm:h-16 sm:w-16"
                        >
                            <FaCube size={26} className="transition-transform group-hover:rotate-12 sm:h-8 sm:w-8" />
                        </Link>
                        <button
                            onClick={() => setIsTetrisActive(true)}
                            aria-label="Buka Tetris"
                            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.03] transition hover:scale-105 hover:border-[#FF653F]/25 sm:h-16 sm:w-16"
                        >
                            <img
                                src="/tetris_logo.png"
                                alt="Tetris trigger"
                                className="h-9 w-9 rounded-full object-contain sm:h-10 sm:w-10"
                                draggable="false"
                            />
                        </button>
                    </div>
                )}

                {isTetrisActive ? (
                    <section className="fixed inset-0 z-[60] overflow-hidden overscroll-none bg-[#0d0d0d]/95">
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
            </div>
        </>
    )
}

export default Home

