// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaBrain } from 'react-icons/fa';
import { SiExpress, SiMysql, SiPostgresql, SiMongodb, SiKubernetes, SiFigma, SiPrisma, SiFlutter, SiJavascript, SiFirebase } from 'react-icons/si';

const About = () => {
    const skills = [
        { name: 'JavaScript', icon: <SiJavascript />, color: 'text-yellow-400' },
        { name: 'React', icon: <FaReact />, color: 'text-cyan-400' },
        { name: 'Express', icon: <SiExpress />, color: 'text-gray-200' },
        { name: 'Node.js', icon: <FaNodeJs />, color: 'text-green-500' },
        { name: 'Python', icon: <FaPython />, color: 'text-yellow-300' },
        { name: 'Machine Learning', icon: <FaBrain />, color: 'text-pink-500' },
        { name: 'flutter', icon: <SiFlutter />, color: 'text-blue-400' },
        { name: 'Git', icon: <FaGitAlt />, color: 'text-orange-500' },
        { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-400' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-300' },
        { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-400' },
        { name: 'Prisma ORM', icon: <SiPrisma />, color: 'text-gray-400' },
        { name: 'Firebase', icon: <SiFirebase />, color: 'text-orange-500' },
        { name: 'Docker', icon: <FaDocker />, color: 'text-blue-500' },
        { name: 'Kubernetes', icon: <SiKubernetes />, color: 'text-blue-600' },
        { name: 'Figma', icon: <SiFigma />, color: 'text-pink-400' },

    ];

    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="mb-5 flex justify-center">
                        <span className="section-kicker">About</span>
                    </div>
                    <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">Building backend systems that stay clear, scalable, and dependable.</h2>


                    <h3 className="mb-8 text-2xl font-bold text-white">Tech Stack</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#452E5A]/28 p-4 transition-all hover:border-[#FF653F]/45 hover:bg-[#452E5A]/42"
                            >
                                <div className={`text-4xl ${skill.color} transform group-hover:scale-110 transition-transform duration-300`}>
                                    {skill.icon}
                                </div>
                                <span className="font-medium text-[#E6DCF7] transition-colors group-hover:text-white">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
