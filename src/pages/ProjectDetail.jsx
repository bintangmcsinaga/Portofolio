import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';
import { useEffect } from 'react';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
                <Link to="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 border border-gray-800 shadow-2xl">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-12">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{project.title}</h1>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                                <p className="text-gray-300 text-lg leading-relaxed pt-2 border-t border-gray-800">
                                    {project.fullDescription}
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Features & Tech</h2>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 pt-2 border-t border-gray-800">
                                    <li>Feature 1 description goes here.</li>
                                    <li>Feature 2 description goes here.</li>
                                    <li>Feature 3 description goes here.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                                <h3 className="text-lg font-bold text-white mb-4">Project Info</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-gray-500 text-sm">Date</span>
                                        <span className="text-gray-200">{project.date}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-sm">Role</span>
                                        <span className="text-gray-200">Full Stack Developer</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                                <a href="#" className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                    <FaGithub /> View Code
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
