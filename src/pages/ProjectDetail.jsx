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
                <Link to="/#projects" className="flex items-center gap-2 text-[#FF653F] hover:text-[#FF8A6C]">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>
        );
    }

    const projectImages = project.images?.length ? project.images : [project.image];
    const projectFeatures = project.features?.length ? project.features : [];
    const projectTags = Array.isArray(project.tags) ? project.tags : [];
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

    const tagsContent = (
        <div className="flex flex-wrap gap-3">
            {projectTags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-[#452E5A]/35 px-3 py-1 text-sm text-[#F3E9FF]">
                    {tag}
                </span>
            ))}
        </div>
    );

    const imageDots = hasMultipleImages ? (
        <div className="flex items-center gap-2 mt-4">
            {projectImages.map((_, index) => (
                <button
                    key={`dot-${index}`}
                    type="button"
                    onClick={() => updateCurrentImageIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                        currentImageIndex === index ? 'w-7 bg-[#FF653F]' : 'w-2.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                />
            ))}
        </div>
    ) : null;

    return (
        <div className="min-h-screen pt-10 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/#projects" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#D7C7EE] transition-colors hover:border-[#FF653F]/40 hover:text-white">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </Link>

                <div>
                    <div className="mb-12">
                        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#1A0F43]/92 shadow-[0_30px_80px_rgba(10,6,26,0.42)]">
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
                                        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#140A36]/60 text-white transition-colors hover:border-[#FF653F]/45 hover:bg-[#FF653F]"
                                        aria-label="Previous project image"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={showNextImage}
                                        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#140A36]/60 text-white transition-colors hover:border-[#FF653F]/45 hover:bg-[#FF653F]"
                                        aria-label="Next project image"
                                    >
                                        <FaChevronRight />
                                    </button>
                                </>
                            )}

                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,54,0.02),rgba(20,10,54,0.24)_50%,rgba(20,10,54,0.9)_100%)]"></div>
                            <div className="hidden md:block absolute bottom-0 left-0 p-6 md:p-10">
                                <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#FFD7CA]">
                                    Detailed case study
                                </p>
                                <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{project.title}</h1>
                                {tagsContent}
                                {imageDots}
                            </div>
                        </div>

                        <div className="md:hidden mt-6">
                            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
                            <div className="mt-4">{tagsContent}</div>
                            {imageDots}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="space-y-8 md:col-span-2">
                            <div className="section-shell p-7 sm:p-8">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="section-kicker">Overview</span>
                                </div>
                                <p className="border-t border-white/10 pt-5 text-lg leading-relaxed text-[#E6DCF7]">
                                    {project.fullDescription}
                                </p>
                            </div>

                            <div className="section-shell p-7 sm:p-8">
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="section-kicker">Features & Tech</span>
                                </div>
                                <ul className="space-y-3 border-t border-white/10 pt-5 text-[#E6DCF7]">
                                    {projectFeatures.length > 0 ? (
                                        projectFeatures.map((feature, index) => (
                                            <li key={`${project.id}-feature-${index}`} className="flex gap-3">
                                                <span className="mt-2 h-2 w-2 rounded-full bg-[#FF653F]" />
                                                <span>{feature}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 rounded-full bg-[#FF653F]" />
                                            <span>No features available.</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="section-shell p-6">
                                <h3 className="mb-4 text-lg font-bold text-white">Project Info</h3>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-sm text-[#A996C7]">Date</span>
                                        <span className="text-[#F6F0FF]">{project.date}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-[#A996C7]">Role</span>
                                        <span className="text-[#F6F0FF]">{role}</span>
                                    </div>
                                </div>
                            </div>

                            {(hasLiveDemo || hasViewCode) && (
                                <div className="flex flex-col gap-4">
                                    {hasLiveDemo && (
                                        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF653F] py-3 font-medium text-white transition-colors hover:bg-[#ff7a59]">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                    {hasViewCode && (
                                        <a href={viewCodeUrl} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#452E5A]/40 py-3 font-medium text-white transition-colors hover:border-[#FF653F]/40 hover:bg-[#452E5A]/65">
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
