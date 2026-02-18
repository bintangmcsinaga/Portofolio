import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white"><span className="text-cyan-400">About</span> Me</h2>

                    <div className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-800 shadow-xl">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I am a passionate developer with a keen eye for design and a drive for creating seamless digital experiences. With expertise in modern web technologies, I transform ideas into operational, high-performance web applications.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or gaming. I believe in continuous learning and pushing the boundaries of what's possible on the web.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                        {['React', 'Tailwind CSS', 'Node.js', 'UI/UX Design'].map((skill, index) => (
                            <motion.div
                                key={skill}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors"
                            >
                                <h3 className="font-semibold text-cyan-300">{skill}</h3>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
