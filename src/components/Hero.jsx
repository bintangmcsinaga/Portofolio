import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-center">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 inline-flex items-center rounded-full border border-[#FF653F]/20 bg-[#FF653F]/[0.06] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ff8a6a]"
                    >
                        Backend-focused developer
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
                    >
                        Building reliable digital products with a tighter, clearer user experience.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="max-w-2xl text-base leading-8 text-[#888888] sm:text-lg"
                    >
                        I am Bintang Sinaga, a developer who enjoys designing scalable systems, dependable APIs, and practical interfaces that feel organized instead of crowded.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-8 flex flex-col gap-3 sm:flex-row"
                    >
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center rounded-full bg-[#FF653F] px-7 py-3 font-medium text-white transition-all duration-300 hover:brightness-110"
                        >
                            View Work
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/[0.08] bg-[#1a1a1a] px-7 py-3 font-medium text-[#cccccc] transition-all duration-300 hover:border-[#FF653F]/30 hover:text-white"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="w-full"
                >
                    <div className="rounded-2xl border border-white/[0.06] bg-[#141414] p-4 transition-transform duration-300 hover:scale-[1.02]">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.28em] text-[#FF653F]">Daily note</span>
                            <span className="rounded-full bg-white/[0.04] px-3 py-1 text-[11px] text-[#666666]">Compact hero card</span>
                        </div>
                        <img
                            src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical"
                            alt="Random developer quote"
                            loading="lazy"
                            className="w-full rounded-xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bouncing Arrow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-[#555555]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
