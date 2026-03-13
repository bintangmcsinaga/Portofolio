import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';
import { useEffect, useState } from 'react';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);
    const [imageIndexes, setImageIndexes] = useState({});
    const currentImageIndex = imageIndexes[id] ?? 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-4">Project Not Found</h2>
                <Link to="/#projects" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>
        );
    }

    const projectImages = project.images?.length ? project.images : [project.image];
    const projectFeatures = project.features?.length ? project.features : [];
    const hasMultipleImages = projectImages.length > 1;
    const role = project.role || 'Not specified';
    const liveDemoUrl = project.liveDemo ?? project.link ?? '';
    const viewCodeUrl = project.viewCode ?? '';
    const hasValidUrl = (url) => typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';
    const hasLiveDemo = hasValidUrl(liveDemoUrl);
    const hasViewCode = hasValidUrl(viewCodeUrl);
    const updateCurrentImageIndex = (index) => {
        setImageIndexes((prev) => ({
            ...prev,
            [id]: index,
        }));
    };

    const showPrevImage = () => {
        updateCurrentImageIndex(currentImageIndex === 0 ? projectImages.length - 1 : currentImageIndex - 1);
    };

    const showNextImage = () => {
        updateCurrentImageIndex(currentImageIndex === projectImages.length - 1 ? 0 : currentImageIndex + 1);
    };

    return (
        <div className="pt-10 pb-20 min-h-screen">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <div>
                    <div className="relative rounded-2xl overflow-hidden mb-12 border border-gray-800 shadow-2xl bg-gray-950">
                        <img
                            src={projectImages[currentImageIndex]}
                            alt={`${project.title} - Slide ${currentImageIndex + 1}`}
                            className="block mx-auto w-auto max-w-full h-auto max-h-[75vh]"
                        />

                        {hasMultipleImages && (
                            <>
                                <button
                                    type="button"
                                    onClick={showPrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 text-white hover:bg-cyan-500 transition-colors flex items-center justify-center"
                                    aria-label="Previous project image"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button
                                    type="button"
                                    onClick={showNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/45 text-white hover:bg-cyan-500 transition-colors flex items-center justify-center"
                                    aria-label="Next project image"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10">
                            <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">{project.title}</h1>
                            <div className="flex flex-wrap gap-3">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {hasMultipleImages && (
                                <div className="flex items-center gap-2 mt-4">
                                    {projectImages.map((_, index) => (
                                        <button
                                            key={`dot-${index}`}
                                            type="button"
                                            onClick={() => updateCurrentImageIndex(index)}
                                            className={`h-2.5 rounded-full transition-all ${
                                                currentImageIndex === index
                                                    ? 'w-7 bg-cyan-400'
                                                    : 'w-2.5 bg-white/40 hover:bg-white/60'
                                            }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
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
                                    {projectFeatures.length > 0 ? (
                                        projectFeatures.map((feature, index) => (
                                            <li key={`${project.id}-feature-${index}`}>{feature}</li>
                                        ))
                                    ) : (
                                        <li>No features available.</li>
                                    )}
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
                                        <span className="text-gray-200">{role}</span>
                                    </div>
                                </div>
                            </div>

                            {(hasLiveDemo || hasViewCode) && (
                                <div className="flex flex-col gap-4">
                                    {hasLiveDemo && (
                                        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                    {hasViewCode && (
                                        <a href={viewCodeUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg text-center transition-colors flex items-center justify-center gap-2">
                                            <FaGithub /> View Code
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
