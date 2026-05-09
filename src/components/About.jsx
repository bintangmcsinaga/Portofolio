import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaBrain } from 'react-icons/fa';
import { SiExpress, SiMysql, SiPostgresql, SiMongodb, SiKubernetes, SiFigma, SiPrisma, SiFlutter, SiJavascript, SiFirebase } from 'react-icons/si';
import { skills } from '../data/profile';

const skillIcons = {
    SiJavascript,
    FaReact,
    SiExpress,
    FaNodeJs,
    FaPython,
    FaBrain,
    SiFlutter,
    FaGitAlt,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiPrisma,
    SiFirebase,
    FaDocker,
    SiKubernetes,
    SiFigma,
};

const About = () => {
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

                    <div className="relative w-full overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                        <motion.div
                            className="flex gap-6 min-w-max py-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                        >
                            {[...skills, ...skills].map((skill, index) => {
                                const Icon = skillIcons[skill.icon];

                                return (
                                    <div
                                        key={`${skill.name}-${index}`}
                                        className="group flex w-[160px] flex-shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-[#141414] p-4 transition-all hover:border-[#FF653F]/25 hover:bg-[#1a1a1a]"
                                    >
                                        <div className={`text-4xl ${skill.color} transform group-hover:scale-110 transition-transform duration-300`}>
                                            {Icon && <Icon />}
                                        </div>
                                        <span className="font-medium text-[#888888] transition-colors group-hover:text-white">{skill.name}</span>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
