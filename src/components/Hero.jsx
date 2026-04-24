import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[#FF653F]/18 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[12%] right-[10%] h-80 w-80 rounded-full bg-[#452E5A]/45 blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_320px] lg:items-center">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 inline-flex items-center rounded-full border border-[#FF653F]/30 bg-[#FF653F]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFD4C8]"
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
                        className="max-w-2xl text-base leading-8 text-[#D9CDEA] sm:text-lg"
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
                            className="inline-flex items-center justify-center rounded-full bg-[#FF653F] px-7 py-3 font-medium text-white shadow-[0_14px_35px_rgba(255,101,63,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff7a59]"
                        >
                            View Work
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#452E5A]/35 px-7 py-3 font-medium text-[#F2EBFF] transition-all duration-300 hover:border-[#FF653F]/45 hover:text-white"
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
                    <div className="rounded-[28px] border border-white/10 bg-[#24124f]/75 p-4 shadow-[0_24px_60px_rgba(10,6,26,0.45)] backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.28em] text-[#FFB39F]">Daily note</span>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-[#D9CDEA]">Compact hero card</span>
                        </div>
                        <img
                            src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=radical"
                            alt="Random developer quote"
                            loading="lazy"
                            className="w-full rounded-2xl"
                        />
                    </div>
                </motion.div>
            </div>

            {/* Bouncing Arrow */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-[#BCAFD5]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
