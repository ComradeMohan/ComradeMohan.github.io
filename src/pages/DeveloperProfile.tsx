import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck, Github, Trophy, ArrowRight, Code2, Loader2,
  Flame, Calendar, ExternalLink
} from "lucide-react";
import {
  useGithubStats,
  useGithubContributions,
  useLeetcodeStats,
  useLeetcodeDetails,
  deriveLanguageStats
} from "@/hooks/useDeveloperStats";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Format date to YYYY-MM-DD
function fmtKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Build Sun-aligned list of 52 weeks (364 days), ending at today
function buildDayList(byDate: Record<string, number>) {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  const days: Array<{ date: Date; key: string; count: number }> = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = fmtKey(d);
    days.push({ date: new Date(d), key, count: byDate[key] || 0 });
  }
  return days;
}

// Compute level 0..4 with distinct contrast thresholds
function getContributionLevel(count: number, max: number) {
  if (!count) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.5) return 3;
  if (ratio >= 0.25) return 2;
  return 1;
}

// Compute streak stats from raw submission calendar object
function computeCalendarStats(submissionsObj: Record<string, number>) {
  const entries = Object.entries(submissionsObj)
    .map(([ts, count]) => ({ ts: parseInt(ts) * 1000, count: Number(count) }))
    .sort((a, b) => a.ts - b.ts);

  let totalSubmissions = 0;
  let longestStreak = 0;
  let currentStreak = 0;
  let prevDay: number | null = null;

  for (const e of entries) {
    totalSubmissions += e.count;
    const d = new Date(e.ts);
    const day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    if (prevDay !== null && day - prevDay === 86400000) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
    prevDay = day;
  }

  if (totalSubmissions === 0) {
    totalSubmissions = 206;
    longestStreak = 30;
    currentStreak = 9;
  }

  return { totalSubmissions, longestStreak, currentStreak };
}

const DeveloperProfile = () => {
  const { data: githubData, isLoading: isGithubLoading } = useGithubStats("developer");
  const { data: contribData, isLoading: isContribLoading } = useGithubContributions("developer");
  const { data: leetcodeData, isLoading: isLeetcodeLoading } = useLeetcodeStats("developer");
  const { data: detailsData, isLoading: isDetailsLoading } = useLeetcodeDetails("developer");

  const [selectedSkillCategory, setSelectedSkillCategory] = useState<"top" | "all">("top");
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
    dateStr: string;
    count: number;
    level: number;
    matchingTitles: string[];
  } | null>(null);
  const heatmapScrollRef = useRef<HTMLDivElement>(null);

  // Dynamic Fallbacks for GitHub
  const githubFollowers = githubData?.followers ?? 13;
  const githubRepos = githubData?.public_repos ?? 99;
  const githubContributions = contribData?.totalLifetime ?? 4537;
  const avatarUrl = githubData?.avatar_url ?? "/comrademohan.webp";

  // Dynamic Fallbacks for LeetCode
  const totalSolved = leetcodeData?.profile?.solvedProblem ?? 477;
  const easySolved = leetcodeData?.profile?.easySolved ?? 158;
  const mediumSolved = leetcodeData?.profile?.mediumSolved ?? 247;
  const hardSolved = leetcodeData?.profile?.hardSolved ?? 72;

  const contestRating = leetcodeData?.contest?.contestRating ? Math.round(leetcodeData.contest.contestRating).toLocaleString() : "1,673";
  const topPercentage = leetcodeData?.contest?.contestTopPercentage ? `${leetcodeData.contest.contestTopPercentage}%` : "16.1%";
  const contestsAttended = leetcodeData?.contest?.contestAttend ?? 15;

  const languageStats = deriveLanguageStats(leetcodeData, totalSolved);

  // Submissions, Calendar, Contests, Skills
  const submissions = detailsData?.submissions ?? [];
  const calendar = detailsData?.calendar ?? { totalActiveDays: 106, streak: 51, currentStreak: 51, maxStreak: 30, totalSubmissions: 211, submissionCalendar: {} };
  const contestHistory = detailsData?.contestHistory ?? [];
  const allSkills = detailsData?.skills ?? [];

  const displaySkills = selectedSkillCategory === "top"
    ? allSkills.slice(0, 16)
    : allSkills;

  // Real LeetCode Heatmap Computations (Grouped by Months)
  const { monthGroups, maxCount, calStats } = useMemo(() => {
    const rawCalendar = calendar.submissionCalendar || {};
    const byDate: Record<string, number> = {};

    for (const [ts, count] of Object.entries(rawCalendar)) {
      byDate[fmtKey(new Date(parseInt(ts) * 1000))] = Number(count);
    }

    const days = buildDayList(byDate);
    const max = Math.max(...Object.values(byDate), 1);
    const calculatedStats = computeCalendarStats(rawCalendar);

    const weekList: Array<typeof days> = [];
    for (let i = 0; i < days.length; i += 7) {
      weekList.push(days.slice(i, i + 7));
    }

    // Group weeks into distinct Month Clusters
    interface MonthGroup {
      key: string;
      monthName: string;
      weeks: Array<typeof days>;
    }

    const groups: MonthGroup[] = [];
    let currentGroup: MonthGroup | null = null;

    weekList.forEach((week) => {
      // Determine primary month of this week
      const midDay = week[3] || week[0];
      const mName = midDay.date.toLocaleString("en-US", { month: "short" });
      const mKey = `${midDay.date.getFullYear()}-${midDay.date.getMonth()}`;

      if (!currentGroup || currentGroup.key !== mKey) {
        currentGroup = {
          key: mKey,
          monthName: mName,
          weeks: [week],
        };
        groups.push(currentGroup);
      } else {
        currentGroup.weeks.push(week);
      }
    });

    return {
      monthGroups: groups,
      maxCount: max,
      calStats: calculatedStats,
    };
  }, [calendar]);

  // Auto-scroll heatmap to the right so current date is visible by default
  useEffect(() => {
    if (heatmapScrollRef.current) {
      heatmapScrollRef.current.scrollLeft = heatmapScrollRef.current.scrollWidth;
    }
  }, [monthGroups]);

  return (
    <>
      <SEO
        title="Developer Profile & Live Stats | Mohan Reddy (ComradeMohan)"
        description="Live GitHub and LeetCode statistics dashboard for Mohan Reddy. Real-time problem solving breakdown, contest rating, and verification metrics."
        keywords="ComradeMohan LeetCode, Mohan Reddy GitHub stats, Saveetha developer profile, Mohan Reddy LeetCode rating"
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />

        <main className="flex-grow pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* ========================================================================= */}
            {/* Left Column (Profile, GitHub Stats & Top Skills Cards) */}
            {/* ========================================================================= */}
            <div className="lg:col-span-4 space-y-6">

              {/* 1. Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-xl"
              >
                <div className="h-64 w-full bg-gradient-to-b from-primary/10 to-card relative">
                  <img
                    src={avatarUrl}
                    alt="ComradeMohan"
                    className="w-full h-full object-cover object-top opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                </div>

                <div className="p-6 relative -mt-12 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-foreground tracking-tight">ComradeMohan</h1>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verified
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 font-grotesk">Full Stack Developer • Android Developer</p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 font-grotesk">
                    <span className="text-base">🇮🇳</span> India <span className="text-xs text-muted-foreground">(Andhra Pradesh, India)</span>
                  </div>

                  <div className="w-full py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for opportunities
                  </div>
                </div>
              </motion.div>

              {/* 2. GitHub Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 text-foreground mb-6 font-medium">
                  <Github className="w-5 h-5" /> GitHub
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6 text-center divide-x divide-border relative">
                  {(isGithubLoading || isContribLoading) && (
                    <div className="absolute inset-0 bg-card/80 flex items-center justify-center backdrop-blur-sm z-10 rounded-lg">
                      <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                    </div>
                  )}
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">{githubFollowers}</div>
                    <div className="text-[11px] text-muted-foreground font-grotesk">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">{githubRepos}</div>
                    <div className="text-[11px] text-muted-foreground font-grotesk">Repositories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground mb-1">{githubContributions.toLocaleString()}+</div>
                    <div className="text-[11px] text-muted-foreground font-grotesk">Commits</div>
                  </div>
                </div>

                <a
                  href="https://github.com/ComradeMohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-border"
                >
                  View GitHub Profile <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* 3. Top Skills & Topics Card (Positioned directly below GitHub card) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground font-outfit text-base">Top Skills & Topics</h3>
                  <button
                    onClick={() => setSelectedSkillCategory(prev => prev === "top" ? "all" : "top")}
                    className="text-xs text-primary hover:underline font-grotesk font-semibold cursor-pointer"
                  >
                    {selectedSkillCategory === "top" ? "Show All" : "Show Top"}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {displaySkills.map((sk: any) => (
                    <span
                      key={sk.tagName}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-border/70 text-xs font-grotesk text-foreground transition-colors"
                    >
                      <span className="font-medium">{sk.tagName}</span>
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-400 font-bold text-[10px]">
                        {sk.problemsSolved}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border mt-4 text-[11px] text-muted-foreground font-grotesk">
                  Aggregated across {totalSolved} solved problems
                </div>
              </motion.div>

            </div>

            {/* ========================================================================= */}
            {/* Right Column (LeetCode Metrics, Full-Width Heatmap, Languages, Submissions) */}
            {/* ========================================================================= */}
            <div className="lg:col-span-8 space-y-6">

              {/* 1. TOP METRIC STATS ROW (6 CARDS GRID) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2"
              >
                {/* Total Solved */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-purple-500/40 transition-all flex flex-col justify-center">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight font-outfit">
                    <AnimatedCounter value={totalSolved} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Problems Solved</div>
                </div>

                {/* Easy */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-emerald-500/40 transition-all flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-outfit">
                    <AnimatedCounter value={easySolved} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Easy</div>
                </div>

                {/* Medium */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-amber-500/40 transition-all flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight font-outfit">
                    <AnimatedCounter value={mediumSolved} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Medium</div>
                </div>

                {/* Hard */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-rose-500/40 transition-all flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 tracking-tight font-outfit">
                    <AnimatedCounter value={hardSolved} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Hard</div>
                </div>

                {/* Contest Rating */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-sky-500/40 transition-all flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-tight font-outfit">
                    <AnimatedCounter value={contestRating} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Contest Rating</div>
                  <div className="text-[10px] text-emerald-400 font-bold font-grotesk mt-0.5">Top {topPercentage}</div>
                </div>

                {/* Contests Attended */}
                <div className="p-4 rounded-2xl bg-card border border-border/80 relative overflow-hidden shadow-lg group hover:border-indigo-500/40 transition-all flex flex-col justify-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 tracking-tight font-outfit">
                    <AnimatedCounter value={contestsAttended} />
                  </div>
                  <div className="text-[11px] text-muted-foreground font-grotesk mt-1 font-medium">Contests Attended</div>
                </div>
              </motion.div>

              {/* 2. MIDDLE ROW: ACTIVITY HEATMAP & LANGUAGE ACTIVITY IN SAME ROW */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-2 items-stretch">

                {/* Activity Heatmap Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="xl:col-span-7 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <h3 className="font-bold text-foreground font-outfit text-base">Activity Heatmap</h3>
                      <span className="text-xs text-muted-foreground font-grotesk">(Last 12 Months)</span>
                    </div>
                  </div>

                  {/* Heatmap Grid Wrapper */}
                  <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-[#090b0e] border border-border/80 my-auto overflow-hidden">
                    <div className="overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin" ref={heatmapScrollRef}>
                      <div className="w-max min-w-full flex gap-2 items-start">
                        {/* Weekday Labels Column on Left */}
                        <div className="flex-none w-4.5 pt-5 grid grid-rows-7 gap-[2.5px] text-[7.5px] text-muted-foreground font-grotesk text-right select-none pr-0.5">
                          <span className="h-2.5 leading-2.5"></span>
                          <span className="h-2.5 leading-2.5">Mon</span>
                          <span className="h-2.5 leading-2.5"></span>
                          <span className="h-2.5 leading-2.5">Wed</span>
                          <span className="h-2.5 leading-2.5"></span>
                          <span className="h-2.5 leading-2.5">Fri</span>
                          <span className="h-2.5 leading-2.5"></span>
                        </div>

                        {/* Month-Separated Week Clusters */}
                        <div className="flex gap-2.5 items-start">
                          {monthGroups.map((group, gIdx) => {
                            // Compute cumulative week offset for progressive cascade across the whole year
                            const prevWeeksCount = monthGroups
                              .slice(0, gIdx)
                              .reduce((sum, g) => sum + g.weeks.length, 0);

                            return (
                              <div key={group.key} className="flex flex-col gap-1.5 items-center">
                                {/* Month Label Centered Over This Month */}
                                <span className="text-[9px] font-semibold text-muted-foreground font-grotesk tracking-tight">
                                  {group.monthName}
                                </span>

                                {/* Weeks in this Month */}
                                <div className="flex gap-[2.5px] items-start">
                                  {group.weeks.map((week, wIdx) => {
                                    const colGlobalIdx = prevWeeksCount + wIdx;
                                    return (
                                      <motion.div
                                        key={wIdx}
                                        initial={{ opacity: 0, scaleY: 0.2, y: 6 }}
                                        whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{
                                          duration: 0.35,
                                          delay: Math.min(colGlobalIdx * 0.016, 1.2),
                                          ease: "easeOut"
                                        }}
                                        className="grid grid-rows-7 gap-[2.5px] flex-none w-2.5 origin-bottom"
                                      >
                                        {week.map((day) => {
                                          const level = getContributionLevel(day.count, maxCount);
                                          let cellClasses = "bg-[#f1f3f5] border border-[#e5e7eb] dark:bg-[#151a22] dark:border-white/[0.03]";
                                          if (level === 4) {
                                            cellClasses = "bg-[#f97316] border border-[#ea580c] shadow-[0_0_4px_rgba(249,115,22,0.35)] dark:bg-[#ff781f] dark:border-[#ff944d] dark:shadow-[0_0_7px_rgba(255,120,31,0.55)]";
                                          } else if (level === 3) {
                                            cellClasses = "bg-[#fb923c] border border-[#f97316]/70 dark:bg-[#ea580c] dark:border-[#f97316]/60";
                                          } else if (level === 2) {
                                            cellClasses = "bg-[#fdba74] border border-[#fb923c]/60 dark:bg-[#c2410c] dark:border-[#ea580c]/50";
                                          } else if (level === 1) {
                                            cellClasses = "bg-[#fed7aa] border border-[#fdba74]/50 dark:bg-[#7c2d12]/90 dark:border-[#9a3412]/40";
                                          }

                                          return (
                                            <span
                                              key={day.key}
                                              onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const dateFormatted = day.date.toLocaleDateString("en-US", {
                                                  weekday: "short",
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                                });
                                                const matches = submissions
                                                  .filter(sub => {
                                                    const subKey = fmtKey(new Date(parseInt(sub.timestamp) * 1000));
                                                    return subKey === day.key;
                                                  })
                                                  .map(sub => sub.title);

                                                setHoveredCell({
                                                  x: rect.left + rect.width / 2,
                                                  y: rect.top,
                                                  dateStr: dateFormatted,
                                                  count: day.count,
                                                  level,
                                                  matchingTitles: matches,
                                                });
                                              }}
                                              onMouseLeave={() => setHoveredCell(null)}
                                              className={`w-2.5 h-2.5 rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-125 ${cellClasses}`}
                                            />
                                          );
                                        })}
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Heatmap Footer Legend */}
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-grotesk mt-3 pt-1">
                    <span>{calStats.totalSubmissions.toLocaleString()} submissions in the last year</span>
                    <div className="flex items-center gap-1.5">
                      <span>Less</span>
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#f1f3f5] border border-[#e5e7eb] dark:bg-[#151a22] dark:border-white/[0.03] inline-block" />
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#fed7aa] border border-[#fdba74]/50 dark:bg-[#7c2d12]/90 dark:border-[#9a3412]/40 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#fdba74] border border-[#fb923c]/60 dark:bg-[#c2410c] dark:border-[#ea580c]/50 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#fb923c] border border-[#f97316]/70 dark:bg-[#ea580c] dark:border-[#f97316]/60 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-[2px] bg-[#f97316] border border-[#ea580c] shadow-[0_0_4px_rgba(249,115,22,0.35)] dark:bg-[#ff781f] dark:border-[#ff944d] dark:shadow-[0_0_7px_rgba(255,120,31,0.55)] inline-block" />
                      <span>More</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Heatmap Tooltip Popover */}
                {hoveredCell && (
                  <div
                    className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full bg-popover/95 text-popover-foreground border border-border rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs font-grotesk min-w-[190px] max-w-[260px] animate-in fade-in zoom-in-95 duration-150 transition-all"
                    style={{
                      left: `${hoveredCell.x}px`,
                      top: `${hoveredCell.y - 10}px`,
                    }}
                  >
                    <div className="font-bold text-foreground flex items-center justify-between gap-2 border-b border-border/60 pb-1.5 mb-1.5">
                      <span>{hoveredCell.dateStr}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          hoveredCell.level === 4
                            ? "bg-[#f97316] dark:bg-[#ff781f] shadow-[0_0_6px_#ff781f]"
                            : hoveredCell.level === 3
                            ? "bg-[#fb923c] dark:bg-[#ea580c]"
                            : hoveredCell.level === 2
                            ? "bg-[#fdba74] dark:bg-[#c2410c]"
                            : hoveredCell.level === 1
                            ? "bg-[#fed7aa] dark:bg-[#7c2d12]"
                            : "bg-muted"
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-1.5 text-foreground font-medium">
                      <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span>
                        {hoveredCell.count === 0
                          ? "No contributions"
                          : `${hoveredCell.count} contribution${hoveredCell.count === 1 ? "" : "s"}`}
                      </span>
                    </div>

                    {hoveredCell.matchingTitles.length > 0 && (
                      <div className="mt-2 pt-1.5 border-t border-border/50 text-[11px] space-y-1">
                        <span className="text-[10px] font-bold text-primary block uppercase tracking-wider">
                          Recent Solved:
                        </span>
                        {hoveredCell.matchingTitles.slice(0, 2).map((t, idx) => (
                          <div key={idx} className="truncate text-foreground font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                            <span className="truncate">{t}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Language Activity Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="xl:col-span-5 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground font-outfit text-base flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-purple-400" /> Language Activity
                    </h3>
                    <span className="text-[11px] font-semibold text-muted-foreground font-grotesk">Problems by stack</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-auto">
                    {/* Visual Stylized Multi-Wave Graph */}
                    <div className="sm:col-span-5 h-28 relative flex items-center justify-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="javaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="sqlGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="pyGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Java Wave (Dominant 419) */}
                        <path d="M 0,80 Q 50,10 100,60 T 200,20 L 200,100 L 0,100 Z" fill="url(#javaGrad)" />
                        <path d="M 0,80 Q 50,10 100,60 T 200,20" fill="none" stroke="#f97316" strokeWidth="2.5" />

                        {/* MySQL Wave (40) */}
                        <path d="M 0,90 Q 60,65 120,75 T 200,55 L 200,100 L 0,100 Z" fill="url(#sqlGrad)" />
                        <path d="M 0,90 Q 60,65 120,75 T 200,55" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

                        {/* Python Wave (14) */}
                        <path d="M 0,95 Q 70,80 140,85 T 200,70 L 200,100 L 0,100 Z" fill="url(#pyGrad)" />
                        <path d="M 0,95 Q 70,80 140,85 T 200,70" fill="none" stroke="#10b981" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Breakdown counters */}
                    <div className="sm:col-span-7 space-y-2.5 font-grotesk text-xs">
                      {languageStats.map((lang) => (
                        <div key={lang.name} className="p-2 rounded-xl bg-secondary/30 border border-border/50 space-y-1">
                          <div className="flex justify-between items-center font-medium">
                            <span className="flex items-center gap-1.5 text-foreground font-semibold">
                              <span className={`w-2 h-2 rounded-full ${lang.color}`} />
                              {lang.name}
                            </span>
                            <span className="font-extrabold text-foreground">{lang.count}</span>
                          </div>
                          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${lang.color}`} style={{ width: lang.percent }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* 3. BOTTOM ROW: RECENT SUBMISSIONS & CONTEST HISTORY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">

                {/* Left: Recent Submissions Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-7 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-foreground font-outfit text-base flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" /> Recent Submissions
                      </h3>
                      <span className="text-[11px] text-muted-foreground font-grotesk">Solved problems</span>
                    </div>

                    <div className="space-y-2.5">
                      {submissions.map((sub, i) => (
                        <a
                          key={sub.id || i}
                          href={`https://leetcode.com/problems/${sub.titleSlug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-border/50 flex items-center justify-between transition-all group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                            <span className="font-medium text-foreground text-xs truncate group-hover:text-primary transition-colors">
                              {sub.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 text-xs font-grotesk">
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-400 border border-purple-500/25 text-[10px] font-semibold">
                              {sub.langName || "Java"}
                            </span>
                            {sub.runtime && (
                              <span className="text-[10px] text-muted-foreground font-medium">
                                {sub.runtime}
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border mt-4 text-center">
                    <a
                      href="https://leetcode.com/u/ComradeMohan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View All Submissions on LeetCode <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>

                {/* Right: Contest History Box */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="lg:col-span-5 bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-foreground font-outfit text-base flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" /> Contest History
                      </h3>
                      <span className="text-[11px] text-muted-foreground font-grotesk">Recent events</span>
                    </div>

                    <div className="space-y-2">
                      {contestHistory.map((c, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-secondary/30 border border-border/50 flex items-center justify-between text-xs font-grotesk"
                        >
                          <div>
                            <span className="font-bold text-foreground block truncate">{c.contest.title}</span>
                            <span className="text-[10px] text-muted-foreground">
                              Solved {c.problemsSolved}/{c.totalProblems}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-extrabold text-purple-400 block">{Math.round(c.rating)}</span>
                            <span className="text-[10px] text-muted-foreground">Rank #{c.ranking?.toLocaleString?.() || c.ranking}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border mt-3 text-right">
                    <a
                      href="https://leetcode.com/u/ComradeMohan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      View All Contests <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DeveloperProfile;
