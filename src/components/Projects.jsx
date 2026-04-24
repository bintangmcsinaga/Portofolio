import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const GITHUB_USERNAME = 'bintangmcsinaga';
const START_YEAR = 2025;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LEVEL_CLASSES = [
    'bg-[#2a165f]',
    'bg-[#452E5A]',
    'bg-[#6f3853]',
    'bg-[#c95542]',
    'bg-[#FF653F]',
];

const toDateKey = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const buildYearGrid = (year, contributions) => {
    const contributionMap = new Map(contributions.map((item) => [item.date, item]));
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const startOffset = start.getDay();
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startOffset);

    const endOffset = 6 - end.getDay();
    const gridEnd = new Date(end);
    gridEnd.setDate(end.getDate() + endOffset);

    const weeks = [];
    const labels = [];
    let current = new Date(gridStart);
    let previousMonth = null;

    while (current <= gridEnd) {
        const week = [];
        const month = current.getMonth();
        labels.push(month !== previousMonth ? MONTH_NAMES[month] : '');
        previousMonth = month;

        for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
            const dateKey = toDateKey(current);
            const data = contributionMap.get(dateKey);
            const inYear = current.getFullYear() === year;
            week.push({
                date: new Date(current),
                count: data?.count ?? 0,
                level: data?.level ?? 0,
                inYear,
            });
            current.setDate(current.getDate() + 1);
        }
        weeks.push(week);
    }

    return { weeks, labels };
};

const Projects = () => {
    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const list = [];
        for (let year = START_YEAR; year <= currentYear; year += 1) {
            list.push(year);
        }
        return list;
    }, []);

    const [activeYear, setActiveYear] = useState(() => years[years.length - 1] ?? START_YEAR);
    const [calendarData, setCalendarData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        if (!years.includes(activeYear)) {
            setActiveYear(years[years.length - 1] ?? START_YEAR);
        }
    }, [activeYear, years]);

    useEffect(() => {
        const controller = new AbortController();
        let isActive = true;

        const loadContributions = async () => {
            setIsLoading(true);
            setLoadError('');
            try {
                const responses = await Promise.all(
                    years.map((year) =>
                        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${year}`, {
                            signal: controller.signal,
                        })
                    )
                );

                const payloads = await Promise.all(
                    responses.map((response, index) => {
                        if (!response.ok) {
                            throw new Error(`Failed to load ${years[index]} contributions`);
                        }
                        return response.json();
                    })
                );

                if (!isActive) return;

                const next = {};
                years.forEach((year, index) => {
                    const data = payloads[index];
                    next[year] = {
                        total: data?.total?.[year] ?? data?.total?.[String(year)] ?? 0,
                        contributions: data?.contributions ?? [],
                    };
                });

                setCalendarData(next);
            } catch (error) {
                if (!isActive || error?.name === 'AbortError') return;
                setLoadError('Gagal memuat kontribusi GitHub.');
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        loadContributions();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [years]);

    const yearCalendars = useMemo(() => {
        return years.map((year) => {
            const data = calendarData[year];
            if (!data) {
                return {
                    year,
                    total: 0,
                    weeks: [],
                    labels: [],
                };
            }
            const { weeks, labels } = buildYearGrid(year, data.contributions);
            return {
                year,
                total: data.total,
                weeks,
                labels,
            };
        });
    }, [calendarData, years]);

    const activeCalendar = useMemo(() => {
        return yearCalendars.find((calendar) => calendar.year === activeYear) ?? yearCalendars[yearCalendars.length - 1];
    }, [activeYear, yearCalendars]);

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="mb-5 flex justify-center">
                        <span className="section-kicker">Selected builds</span>
                    </div>
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Projects shaped around useful systems, clean execution, and durable product thinking.</h2>
                        <p className="text-base leading-8 text-[#D7C7EE] md:text-lg">
                            The structure stays the same, but the presentation now frames each project as a focused case study with stronger hierarchy, cleaner motion, and a more distinctive visual tone.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-[#1f1152]/90 to-[#170d3a]/95 shadow-[0_8px_32px_rgba(10,6,26,0.3)] backdrop-blur-md transition-all duration-500 hover:border-[#FF653F]/30 hover:shadow-[0_20px_60px_rgba(255,101,63,0.12),0_8px_24px_rgba(10,6,26,0.4)]"
                        >
                            {/* Glow effect on hover */}
                            <div className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(255,101,63,0.06), transparent 40%)' }} />

                            {/* Image area */}
                            <div className="relative h-52 overflow-hidden sm:h-60">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#170d3a] via-[#170d3a]/60 to-transparent" />

                                {/* Floating index badge */}
                                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1E104E]/70 text-sm font-bold text-[#FF653F] backdrop-blur-md">
                                    0{index + 1}
                                </div>

                                {/* Date badge */}
                                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#1E104E]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FFB39F] backdrop-blur-md">
                                    {project.date || 'Recent Work'}
                                </div>

                                {/* Role overlay at bottom of image */}
                                <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#FFD7CA]/80">{project.role}</span>
                                </div>
                            </div>

                            {/* Content area */}
                            <div className="relative flex flex-col gap-4 p-5 pt-4 sm:p-6 sm:pt-5">
                                <div>
                                    <h3 className="mb-2 text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#FFD7CA] sm:text-2xl">
                                        {project.title}
                                    </h3>
                                    <p className="line-clamp-3 text-[13px] leading-relaxed text-[#C4B5DE] sm:text-sm sm:leading-7">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-lg border border-white/[0.06] bg-[#2a165f]/60 px-2.5 py-1 text-[11px] font-medium text-[#E6DCF7] transition-colors duration-200 group-hover:border-[#FF653F]/15 group-hover:bg-[#FF653F]/[0.06]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-gradient-to-r from-[#FF653F]/20 via-white/[0.06] to-transparent" />

                                {/* CTA */}
                                <div className="flex items-center justify-between">
                                    <Link
                                        to={`/project/${project.id}`}
                                        className="group/btn inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF653F] to-[#e5502d] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(255,101,63,0.3)] transition-all duration-300 hover:shadow-[0_6px_24px_rgba(255,101,63,0.45)] hover:brightness-110"
                                    >
                                        Explore Project
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-300 group-hover/btn:translate-x-0.5">
                                            →
                                        </span>
                                    </Link>
                                    <Link
                                        to={`/project/${project.id}`}
                                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#E6DCF7] transition-all duration-200 hover:border-[#FF653F]/40 hover:bg-[#FF653F]/10 hover:text-white"
                                        aria-label={`View ${project.title} details`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="section-shell mt-16 p-6 sm:p-8"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-[#FFB39F]">Productivity</p>
                            <h3 className="text-2xl font-semibold text-white">Live GitHub contributions</h3>
                            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#D7C7EE]">
                                A compact view of consistency over time, presented as a built-in part of the portfolio instead of a generic embed block.
                            </p>
                        </div>
                    </div>

                    {isLoading && (
                        <p className="mt-6 text-sm text-[#D7C7EE]">Memuat kontribusi...</p>
                    )}
                    {loadError && (
                        <p className="mt-6 text-sm text-[#FF9D87]">{loadError}</p>
                    )}

                    {!isLoading && !loadError && activeCalendar && (
                        <div className="mt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.24em] text-[#A996C7]">Pilih tahun</p>
                                    <h4 className="text-base font-semibold text-white">{activeCalendar.year}</h4>
                                </div>
                                <select
                                    value={activeYear}
                                    onChange={(event) => setActiveYear(Number(event.target.value))}
                                    className="rounded-xl border border-white/10 bg-[#1E104E] px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FF653F]/40"
                                    aria-label="Pilih tahun kontribusi"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year} className="bg-[#1E104E]">
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
                                <motion.div
                                    key={`calendar-${activeCalendar.year}`}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9 }}
                                    className="min-w-0 rounded-[24px] border border-white/10 bg-[#1E104E]/88 p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs uppercase tracking-[0.24em] text-[#A996C7]">
                                            {activeCalendar.total} contributions
                                        </span>
                                    </div>

                                    <div className="mt-4 overflow-x-auto">
                                        <div className="min-w-[620px]">
                                            <div className="flex gap-1 pl-8 text-[11px] text-[#BBA9D7]">
                                                {activeCalendar.labels.map((label, index) => (
                                                    <span key={`month-${activeCalendar.year}-${index}`} className="w-3 whitespace-nowrap">
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-2 flex gap-1">
                                                <div className="flex flex-col gap-1 pr-2 text-[11px] text-[#BBA9D7]">
                                                    <span className="h-3 leading-3">Sun</span>
                                                    <span className="h-3 leading-3">Mon</span>
                                                    <span className="h-3 leading-3">Tue</span>
                                                    <span className="h-3 leading-3">Wed</span>
                                                    <span className="h-3 leading-3">Thu</span>
                                                    <span className="h-3 leading-3">Fri</span>
                                                    <span className="h-3 leading-3">Sat</span>
                                                </div>

                                                <div className="flex gap-1">
                                                    {activeCalendar.weeks.map((week, weekIndex) => (
                                                        <div key={`week-${activeCalendar.year}-${weekIndex}`} className="flex flex-col gap-1">
                                                            {week.map((day) => (
                                                                <div
                                                                    key={`${activeCalendar.year}-${day.date.toISOString()}`}
                                                                    className={`h-3 w-3 rounded-[4px] border border-[#140A36]/50 ${day.inYear ? LEVEL_CLASSES[day.level] : 'bg-transparent'}`}
                                                                    title={`${day.date.toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric',
                                                                    })} - ${day.count} contributions`}
                                                                    aria-label={`${day.count} contributions`}
                                                                />
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center justify-start gap-2 text-xs text-[#BBA9D7]">
                                                <span>Less</span>
                                                <div className="flex items-center gap-1">
                                                    {LEVEL_CLASSES.map((colorClass, index) => (
                                                        <span
                                                            key={`legend-${activeCalendar.year}-${index}`}
                                                            className={`h-3 w-3 rounded-[4px] border border-[#140A36]/50 ${colorClass}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span>More</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="min-w-0 rounded-[24px] border border-white/10 bg-[#1E104E]/88 p-4">
                                    <img
                                        src="https://github-readme-streak-stats.herokuapp.com/?user=bintangmcsinaga&theme=dark&hide_border=false"
                                        alt="GitHub contribution streak"
                                        loading="lazy"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
