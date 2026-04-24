import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = () => {
        setMobileOpen(false);
    };

    return (
        <>
            {/* Mobile hamburger button */}
            <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-[#141414] text-white md:hidden"
                aria-label="Toggle menu"
            >
                <div className="flex flex-col gap-1.5">
                    <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
                    <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
            </button>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[49] bg-black/50 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Desktop: always visible. Mobile: slide in/out */}
            <motion.aside
                initial={false}
                className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.06] bg-[#111111] transition-transform duration-300 md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Profile / Brand */}
                <a href="#home" onClick={handleNavClick} className="flex items-center gap-3 px-5 pt-7 pb-2">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FF653F] text-sm font-semibold text-white">
                        BS
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold tracking-[0.04em] text-white">Bintang Sinaga</span>
                        <span className="block text-[10px] uppercase tracking-[0.32em] text-[#888888]">Backend Developer</span>
                    </span>
                </a>

                {/* Divider */}
                <div className="mx-5 my-4 h-px bg-white/[0.06]" />

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4">
                    <ul className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#999999] transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF653F]/30 transition-all duration-200 group-hover:bg-[#FF653F]" />
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Social links at bottom */}
                <div className="mt-auto px-5 pb-6">
                    <div className="mb-3 h-px bg-white/[0.06]" />
                    <div className="flex items-center justify-center gap-2.5">
                        <a
                            href="https://github.com/bintangmcsinaga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-[#888888] transition-all duration-200 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaGithub size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bintang-sinaga-62b552229"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-[#888888] transition-all duration-200 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaLinkedin size={16} />
                        </a>
                        <a
                            href="mailto:bintangsinaga007@gmail.com"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] text-[#888888] transition-all duration-200 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaEnvelope size={16} />
                        </a>
                    </div>
                </div>
            </motion.aside>
        </>
    );
};

export default Header;
