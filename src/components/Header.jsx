import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Header = () => {
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.06] bg-[#111111]"
        >
            {/* Profile / Brand */}
            <a href="#home" className="flex items-center gap-3 px-5 pt-7 pb-2">
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
    );
};

export default Header;
