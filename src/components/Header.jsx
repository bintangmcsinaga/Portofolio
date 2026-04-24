import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
        >
            <div
                className={`mx-auto max-w-6xl rounded-[28px] border px-3 py-3 transition-all duration-300 sm:px-5 ${isScrolled
                    ? 'border-[#FF653F]/30 bg-[#1E104E]/92 shadow-[0_18px_60px_rgba(16,8,42,0.45)] backdrop-blur-xl'
                    : 'border-white/10 bg-[#1E104E]/78 backdrop-blur-lg'
                    }`}
            >
                <div className="grid gap-3 md:grid-cols-[auto,1fr,auto] md:items-center md:gap-4">
                    <a href="#home" className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF653F] to-[#452E5A] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(255,101,63,0.35)]">
                            BS
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold tracking-[0.04em] text-white">Bintang Sinaga</span>
                            <span className="block text-[10px] uppercase tracking-[0.32em] text-[#FFB39F]">Backend Developer</span>
                        </span>
                    </a>

                    <nav className="overflow-x-auto md:overflow-visible">
                        <ul className="flex min-w-max items-center gap-2 md:justify-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="block rounded-full border border-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#E6DCF7] transition-all duration-200 hover:border-[#FF653F]/50 hover:bg-[#FF653F]/10 hover:text-white"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-2 justify-self-start md:justify-self-end">
                        <a
                            href="https://github.com/bintangmcsinaga"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E6DCF7] transition-all duration-200 hover:border-[#FF653F]/50 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaGithub size={16} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/bintang-sinaga-62b552229"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E6DCF7] transition-all duration-200 hover:border-[#FF653F]/50 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaLinkedin size={16} />
                        </a>
                        <a
                            href="mailto:bintangsinaga007@gmail.com"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E6DCF7] transition-all duration-200 hover:border-[#FF653F]/50 hover:bg-[#FF653F] hover:text-white"
                        >
                            <FaEnvelope size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
