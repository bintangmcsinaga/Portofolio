import { motion } from 'framer-motion';

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
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Work <span className="text-cyan-400">Experience</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A snapshot of recent roles and the impact delivered.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {experiences.map((item, index) => (
                        <motion.div
                            key={`${item.role}-${item.company}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-lg"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                                    <p className="text-sm text-gray-400">{item.company}</p>
                                </div>
                                <div className="text-sm text-gray-400 text-right">
                                    <p>{item.period}</p>
                                    <p>{item.location}</p>
                                </div>
                            </div>

                            <ul className="mt-4 space-y-2 text-sm text-gray-300">
                                {item.highlights.map((highlight) => (
                                    <li key={highlight} className="flex gap-2">
                                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;
