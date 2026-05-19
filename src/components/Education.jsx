import { motion } from 'framer-motion';
import { FaCalendarAlt, FaExternalLinkAlt, FaGraduationCap, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { education } from '../data/profile';

const fromPublicFile = (path) => {
    if (!path) return '#';
    return `${import.meta.env.BASE_URL}${path.split('/').map(encodeURIComponent).join('/')}`;
};

const Education = () => {
    return (
        <section id="education" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <div className="mb-5 flex justify-center">
                        <span className="section-kicker">
                            <FaGraduationCap className="mr-2 inline-block" />
                            Education
                        </span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Formal academic foundation in informatics and software engineering.
                    </h2>
                    <p className="mx-auto max-w-2xl text-[#888888]">
                        A concise view of the education behind the technical work.
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4">
                    {education.map((item, index) => (
                        <motion.div
                            key={`${item.program}-${item.institution}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-2xl border border-white/[0.06] bg-[#141414] p-6 transition-all duration-300 hover:border-[#FF653F]/20"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF653F]/10 text-[#FF653F]">
                                    <FaGraduationCap size={22} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#ff8a6a]">
                                                {item.program}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-[#FF653F]">{item.institution}</p>
                                            {item.credential && (
                                                <p className="mt-1 text-sm text-[#888888]">{item.credential}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[#777777] md:justify-end">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
                                                <FaCalendarAlt size={10} />
                                                {item.period}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
                                                <FaMapMarkerAlt size={10} />
                                                {item.location}
                                            </span>
                                            {item.gpa && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5">
                                                    <FaStar size={10} />
                                                    GPA {item.gpa}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <ul className="mt-5 space-y-2 text-sm text-[#999999]">
                                        {item.highlights.map((highlight) => (
                                            <li key={highlight} className="flex gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF653F]" />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {item.transcriptFile && (
                                        <a
                                            href={fromPublicFile(item.transcriptFile)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#FF653F]/20 bg-[#FF653F]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff8a6a] transition-all duration-200 hover:bg-[#FF653F] hover:text-white"
                                        >
                                            View Transcript
                                            <FaExternalLinkAlt size={10} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
