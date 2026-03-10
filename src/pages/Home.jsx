import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import WorkExperience from '../components/WorkExperience'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import TetrisGame from '../components/TetrisGame'

const Home = () => {
    const [isTetrisActive, setIsTetrisActive] = useState(false)

    useEffect(() => {
        document.body.style.overflow = isTetrisActive ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [isTetrisActive])

    return (
        <>
            {!isTetrisActive && (
                <button
                    onClick={() => setIsTetrisActive(true)}
                    aria-label="Buka Tetris"
                    className="fixed bottom-4 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-950/90 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105 hover:bg-cyan-500/10 sm:bottom-6 sm:right-6 sm:h-20 sm:w-20"
                >
                    <img
                        src="/tetris_logo.png"
                        alt="Tetris trigger"
                        className="h-10 w-10 object-contain sm:h-14 sm:w-14"
                        draggable="false"
                    />
                </button>
            )}

            {isTetrisActive ? (
                <section className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-slate-950/95 px-2 pb-4 pt-2 sm:items-center sm:px-4 sm:py-10">
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
