import { motion } from 'framer-motion';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';

const experiences = [
    {
        role: 'Web Full Stack Developer',
        company: 'Freelance',
        period: '2023 - Present',
        location: 'Remote',
        highlights: [
            'Developed full-stack web applications using React, Node.js, and MongoDB.',
            'Designed RESTful APIs and database schemas for small-to-mid scale products.',
            'Implemented authentication, role-based access, and audit-friendly logging.',
            'Optimized query performance and improved API response times.',
        ],
    },
    {
        role: 'Mobile App Developer (Flutter)',
        company: 'Freelance',
        period: '2024 - Present',
        location: 'Remote',
        highlights: [
            'Built cross-platform mobile applications using Flutter and Dart.',
            'Integrated RESTful APIs and third-party services for dynamic content.',
            'Implemented state management solutions (Provider, Riverpod) for scalable app architecture.',
            'Optimized app performance and reduced load times through efficient coding practices.',
        ],
    },
    {
        role: 'IT Support',
        company: 'Kantor Notaris Fransisca Panjaitan, S.H., M.Kn.',
        period: '2021 - Present',
        location: 'Remote',
        highlights: [
            'Provided technical support and troubleshooting for office IT infrastructure.',
            'Managed software installations, updates, and user access controls.',
            'Assisted in the transition to remote work setups and cloud-based collaboration tools.',
        ],
    },
];

const certifications = [
    {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'January 2025',
        credentialId: 'AWS-CCP-2025-XXXXX',
        link: '#',
    },
    {
        name: 'Google Associate Cloud Engineer',
        issuer: 'Google Cloud',
        date: 'March 2025',
        credentialId: 'GCP-ACE-2025-XXXXX',
        link: '#',
    },
    {
        name: 'Meta Back-End Developer Professional Certificate',
        issuer: 'Meta (via Coursera)',
        date: 'June 2024',
        credentialId: 'META-BE-2024-XXXXX',
        link: '#',
    },
    {
        name: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        date: 'September 2024',
        credentialId: 'TF-DEV-2024-XXXXX',
        link: '#',
    },
];

const WorkExperience = () => {
    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <div className="mb-5 flex justify-center">
                        <span className="section-kicker">Experience</span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Roles shaped by hands-on delivery, product ownership, and reliable execution.
                    </h2>
                    <p className="mx-auto max-w-2xl text-[#888888]">
                        A snapshot of recent roles and the impact delivered.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {experiences.map((item, index) => (
                        <motion.div
                            key={`${item.role}-${item.company}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-white/[0.06] bg-[#141414] p-6"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                                    <p className="text-sm text-[#FF653F]">{item.company}</p>
                                </div>
                                <div className="text-right text-sm text-[#666666]">
                                    <p>{item.period}</p>
                                    <p>{item.location}</p>
                                </div>
                            </div>

                            <ul className="mt-4 space-y-2 text-sm text-[#999999]">
                                {item.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF653F]"></span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Certifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center mb-10"
                >
                    <div className="mb-5 flex justify-center">
                        <span className="section-kicker">
                            <FaAward className="mr-2 inline-block" />
                            Certifications
                        </span>
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                        Credentials that validate continuous growth.
                    </h2>
                    <p className="mx-auto max-w-2xl text-[#888888]">
                        Industry-recognized certifications earned through dedicated study and practical application.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={cert.credentialId}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-2xl border border-white/[0.06] bg-[#141414] p-5 transition-all duration-300 hover:border-[#FF653F]/20"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FF653F]/10 text-[#FF653F]">
                                    <FaAward size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[#ff8a6a]">
                                        {cert.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-[#FF653F]">{cert.issuer}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#666666]">{cert.date}</p>
                                    <p className="text-[11px] text-[#444444]">{cert.credentialId}</p>
                                </div>
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#888888] transition-all duration-200 hover:border-[#FF653F]/25 hover:text-white"
                                >
                                    View Credential
                                    <FaExternalLinkAlt size={9} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;
