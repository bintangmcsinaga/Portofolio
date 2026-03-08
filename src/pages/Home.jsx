import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
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
            <button
                onClick={() => setIsTetrisActive((prev) => !prev)}
                aria-label={isTetrisActive ? 'Tutup Tetris' : 'Buka Tetris'}
                className="fixed bottom-6 right-6 z-[70] flex h-36 w-36 items-center justify-center rounded-full border border-cyan-300/60 bg-slate-950/90 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:scale-105 hover:bg-cyan-500/10"
            >
                <img
                    src="/tetris_logo.png"
                    alt="Tetris trigger"
                    className="h-20 w-20 object-contain"
                    draggable="false"
                />
            </button>

            {isTetrisActive ? (
                <section className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/95 px-4 py-10">
                    <TetrisGame />
                </section>
            ) : (
                <>
                    <Hero />
                    <About />
                    <Projects />
                    <Contact />
                </>
            )}
        </>
    )
}

export default Home
