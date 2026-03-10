import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const GITHUB_USERNAME = 'bintangmcsinaga';
const START_YEAR = 2025;
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LEVEL_CLASSES = [
    'bg-slate-800/70',
    'bg-emerald-900/80',
    'bg-emerald-700/90',
    'bg-emerald-500',
    'bg-emerald-300',
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
        <section id="projects" className="py-20 bg-gray-900/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My <span className="text-cyan-400">Projects</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Here are some of my recent works.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <Link to={`/project/${project.id}`} className="px-6 py-2 bg-cyan-500 text-white rounded-full font-medium hover:bg-cyan-600 transition-colors">View Details</Link>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs px-3 py-1 bg-gray-800 text-cyan-300 rounded-full border border-gray-700">
                                            {tag}
                                        </span>
                                    ))}
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
                    className="mt-16 rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-xl"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400">Productivity</p>
                            <h3 className="text-xl font-semibold text-white">Live GitHub contributions</h3>
                        </div>
                    </div>

                    {isLoading && (
                        <p className="mt-6 text-sm text-gray-400">Memuat kontribusi...</p>
                    )}
                    {loadError && (
                        <p className="mt-6 text-sm text-red-400">{loadError}</p>
                    )}

                    {!isLoading && !loadError && activeCalendar && (
                        <div className="mt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-500">Pilih tahun</p>
                                    <h4 className="text-base font-semibold text-white">{activeCalendar.year}</h4>
                                </div>
                                <select
                                    value={activeYear}
                                    onChange={(event) => setActiveYear(Number(event.target.value))}
                                    className="rounded-lg border border-gray-800 bg-gray-950/80 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                                    aria-label="Pilih tahun kontribusi"
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year} className="bg-gray-950">
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start">
                                <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-950/60 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs uppercase tracking-wider text-gray-500">
                                            {activeCalendar.total} contributions
                                        </span>
                                    </div>

                                    <div className="mt-4 overflow-x-auto">
                                        <div className="min-w-[620px]">
                                            <div className="flex gap-1 pl-8 text-[11px] text-gray-400">
                                                {activeCalendar.labels.map((label, index) => (
                                                    <span key={`month-${activeCalendar.year}-${index}`} className="w-3 whitespace-nowrap">
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-2 flex gap-1">
                                                <div className="flex flex-col gap-1 pr-2 text-[11px] text-gray-400">
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
                                                                    className={`h-3 w-3 rounded-sm border border-gray-900/40 ${day.inYear ? LEVEL_CLASSES[day.level] : 'bg-transparent'}`}
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

                                            <div className="mt-3 flex items-center justify-start text-xs text-gray-400">
                                                <span>Less</span>
                                                <div className="flex items-center gap-1">
                                                    {LEVEL_CLASSES.map((colorClass, index) => (
                                                        <span
                                                            key={`legend-${activeCalendar.year}-${index}`}
                                                            className={`h-3 w-3 rounded-sm border border-gray-900/40 ${colorClass}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span>More</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="min-w-0 rounded-xl border border-gray-800 bg-gray-950/60 p-4">
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
