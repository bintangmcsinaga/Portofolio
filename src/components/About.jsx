import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaBrain } from 'react-icons/fa';
import { SiExpress, SiMysql, SiPostgresql, SiMongodb, SiKubernetes, SiFigma, SiPrisma,SiFlutter, SiJavascript } from 'react-icons/si';

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
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white"><span className="text-cyan-400">About</span> Me</h2>

                    <div className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-800 shadow-xl mb-12">
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I am a backend-focused developer with experience in building information systems and SaaS applications that are reliable, scalable, and maintainable. I enjoy designing system architectures, developing robust APIs, and translating business requirements into efficient backend solutions that support real-world operations.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            My primary tech stack includes Node.js, Express, RESTful APIs, JWT authentication, and MySQL/PostgreSQL with Prisma ORM, as well as MongoDB for certain use cases. I also have hands-on experience in machine learning and deep learning, particularly in training and fine-tuning transformer-based models such as RoBERTa for natural language processing tasks. On the DevOps side, I am familiar with Docker, basic CI/CD pipelines, and deployment on Linux-based servers, including environment configuration, monitoring, and performance optimization to support production-ready systems.
                        </p>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-400 hover:bg-gray-800 transition-all group flex flex-col items-center justify-center gap-3"
                            >
                                <div className={`text-4xl ${skill.color} transform group-hover:scale-110 transition-transform duration-300`}>
                                    {skill.icon}
                                </div>
                                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
