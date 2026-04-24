import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

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

const GitHubContributionsPanel = () => {
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

    const activeCalendar = useMemo(() => {
        const current = calendarData[activeYear];
        if (!current) return null;

        const { weeks, labels } = buildYearGrid(activeYear, current.contributions);
        return {
            year: activeYear,
            total: current.total,
            weeks,
            labels,
        };
    }, [activeYear, calendarData]);

    return (
        <section id="contributions" className="section-shell scroll-mt-24 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <span className="section-kicker">Live GitHub contributions</span>
                    <h3 className="mt-4 text-2xl font-bold text-white">Consistency, visible over time.</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#D7C7EE]">
                        A live contribution snapshot integrated into the main portfolio flow, so activity looks like part of the story instead of a disconnected widget.
                    </p>
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

            {isLoading && (
                <p className="mt-6 text-sm text-[#D7C7EE]">Memuat kontribusi...</p>
            )}
            {loadError && (
                <p className="mt-6 text-sm text-[#FF9D87]">{loadError}</p>
            )}

            {!isLoading && !loadError && activeCalendar && (
                <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                    <motion.div
                        key={`calendar-${activeCalendar.year}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-[24px] border border-white/10 bg-[#1E104E]/88 p-4"
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

                                <div className="mt-3 flex items-center gap-2 text-xs text-[#BBA9D7]">
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

                    <div className="rounded-[24px] border border-white/10 bg-[#1E104E]/88 p-4">
                        <img
                            src="https://github-readme-streak-stats.herokuapp.com/?user=bintangmcsinaga&theme=dark&hide_border=false"
                            alt="GitHub contribution streak"
                            loading="lazy"
                            className="w-full"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default GitHubContributionsPanel;
