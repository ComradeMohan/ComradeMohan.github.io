import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Github, Trophy, ArrowRight, Code2, GraduationCap, Loader2, CheckCircle2, AlertCircle, Flame } from "lucide-react";
import { useGithubStats, useLeetcodeStats, deriveLanguageStats } from "@/hooks/useDeveloperStats";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const DeveloperProfile = () => {
  const { data: githubData, isLoading: isGithubLoading } = useGithubStats("developer");
  const { data: leetcodeData, isLoading: isLeetcodeLoading } = useLeetcodeStats("developer");

  // Dynamic Fallbacks for GitHub
  const githubFollowers = githubData?.followers ?? 428;
  const githubRepos = githubData?.public_repos ?? 99;
  const avatarUrl = githubData?.avatar_url ?? "/comrademohan.webp";

  // Dynamic Fallbacks for LeetCode
  const totalSolved = leetcodeData?.profile?.solvedProblem ?? 471;
  const languageStats = deriveLanguageStats(leetcodeData, totalSolved);

  const contestRating = leetcodeData?.contest?.contestRating ? Math.round(leetcodeData.contest.contestRating).toLocaleString() : "1,724";
  const topPercentage = leetcodeData?.contest?.contestTopPercentage ? `${leetcodeData.contest.contestTopPercentage}%` : "25.52%";
  const contestRank = leetcodeData?.contest?.contestGlobalRanking ? `#${leetcodeData.contest.contestGlobalRanking.toLocaleString()}` : "#102,683";
  const profileRank = leetcodeData?.baseProfile?.ranking ? `#${leetcodeData.baseProfile.ranking.toLocaleString()}` : "#262,841";

  const easySolved = leetcodeData?.profile?.easySolved ?? 156;
  const mediumSolved = leetcodeData?.profile?.mediumSolved ?? 244;
  const hardSolved = leetcodeData?.profile?.hardSolved ?? 71;
  const contestsAttended = leetcodeData?.contest?.contestAttend ?? 14;

  const quickStats = [
    { title: "Easy", desc: "Problems solved with Easy difficulty", icon: CheckCircle2, value: easySolved, color: "text-emerald-400", hover: "hover:bg-emerald-400/5" },
    { title: "Medium", desc: "Problems solved with Medium difficulty", icon: AlertCircle, value: mediumSolved, color: "text-yellow-400", hover: "hover:bg-yellow-400/5" },
    { title: "Hard", desc: "Problems solved with Hard difficulty", icon: Flame, value: hardSolved, color: "text-red-400", hover: "hover:bg-red-400/5" },
    { title: "Contests", desc: "Total coding contests attended", icon: Trophy, value: contestsAttended, color: "text-orange-500", hover: "hover:bg-orange-500/5" }
  ];

  return (
    <>
      <SEO
        title="Developer Profile & Live Stats | Mohan Reddy (ComradeMohan)"
        description="Live GitHub and LeetCode statistics dashboard for Mohan Reddy. Real-time problem solving breakdown, contest rating, and verification metrics."
        keywords="ComradeMohan LeetCode, Mohan Reddy GitHub stats, Saveetha developer profile, Mohan Reddy LeetCode rating"
      />
      <div className="min-h-screen bg-background text-foreground flex flex-col font-outfit">
        <Navbar />

        <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column (Profile & GitHub) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Profile Card */}
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

              {/* GitHub Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 text-foreground mb-6 font-medium">
                  <Github className="w-5 h-5" /> GitHub
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 text-center divide-x divide-border relative">
                  {isGithubLoading && (
                    <div className="absolute inset-0 bg-card/80 flex items-center justify-center backdrop-blur-sm z-10 rounded-lg">
                      <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
                    </div>
                  )}
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{githubFollowers}</div>
                    <div className="text-xs text-muted-foreground font-grotesk">Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">{githubRepos}</div>
                    <div className="text-xs text-muted-foreground font-grotesk">Repositories</div>
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
            </div>

            {/* Right Column (Stats & Features) */}
            <div className="lg:col-span-8 space-y-6">

              {/* LeetCode Stats Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 text-foreground font-medium mb-8">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.541l11.114 9.412a1.368 1.368 0 0 0 1.986-.188l5.12-6.65a1.365 1.365 0 0 0-.188-1.986l-11.114-9.412a1.361 1.361 0 0 0-1.986.188l-2.091 2.716 9.412-11.114a1.362 1.362 0 0 0-.419-1.854A1.368 1.368 0 0 0 13.483 0zm-2.866 12.815a1.362 1.362 0 0 0-1.986.188l-2.716 3.528a1.361 1.361 0 0 0 .188 1.986l8.809 7.458a1.362 1.362 0 0 0 1.986-.188l2.716-3.528a1.361 1.361 0 0 0-.188-1.986l-8.809-7.458z" />
                  </svg>
                  LeetCode Stats
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  {/* Circular Progress */}
                  <div className="flex flex-col items-center justify-center relative w-36 h-36 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-muted/30" strokeWidth="6" />
                      <circle
                        cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="6"
                        strokeDasharray="283" strokeDashoffset="50" className="drop-shadow-lg"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-[10px] text-muted-foreground font-grotesk leading-tight mt-2">Total<br />Solved</div>
                      <div className="text-3xl font-bold text-foreground mt-1">
                        {isLeetcodeLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto text-orange-500 my-1" /> : totalSolved}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-grotesk mt-1">Problems</div>
                    </div>
                  </div>

                  {/* Language Bars */}
                  <div className="space-y-5 relative">
                    {isLeetcodeLoading && (
                      <div className="absolute inset-0 bg-card/80 flex items-center justify-center backdrop-blur-sm z-10 rounded-lg">
                        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                      </div>
                    )}
                    {languageStats.map((lang) => (
                      <div key={lang.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2 font-medium text-foreground">
                            <Code2 className="w-3.5 h-3.5 text-muted-foreground" /> {lang.name}
                          </span>
                          <span className="text-muted-foreground font-medium">{lang.count}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${lang.color} transition-all duration-1000`} style={{ width: lang.percent }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contest Rating */}
                  <div className="md:border-l border-border md:pl-8 text-center md:text-left flex flex-col justify-center items-center md:items-start h-full relative">
                    {isLeetcodeLoading && (
                      <div className="absolute inset-0 bg-card/80 flex items-center justify-center backdrop-blur-sm z-10 rounded-lg">
                        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                      </div>
                    )}
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-4 font-medium">
                      <Trophy className="w-4 h-4 text-yellow-500" /> Contest Rating
                    </div>
                    <div className="text-4xl font-bold text-purple-400 mb-2">{contestRating}</div>
                    <div className="text-sm text-emerald-500 font-medium mb-3">Top {topPercentage}</div>
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <div>
                        <div className="text-[11px] text-muted-foreground font-grotesk">Contest Rank</div>
                        <div className="text-sm font-medium text-foreground">{contestRank}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-muted-foreground font-grotesk">Profile Rank</div>
                        <div className="text-sm font-medium text-foreground">{profileRank}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Problem Solving Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative"
              >
                {isLeetcodeLoading && (
                  <div className="absolute inset-0 bg-card/80 flex items-center justify-center backdrop-blur-sm z-10 rounded-2xl border border-border">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                  </div>
                )}
                {quickStats.map((item) => (
                  <div key={item.title} className={`bg-card p-5 rounded-2xl border border-border ${item.hover} transition-colors group flex flex-col justify-between min-h-[140px]`}>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <h3 className="font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-grotesk leading-tight mb-4">{item.desc}</p>
                    </div>
                    <div className={`text-3xl font-bold ${item.color} tracking-tight`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card rounded-2xl border border-border p-6 shadow-xl relative overflow-hidden flex flex-col h-full"
                >
                  <div className="flex items-center gap-2 text-foreground font-medium mb-6">
                    <GraduationCap className="w-5 h-5 text-yellow-500" /> Certifications
                  </div>

                  <div className="space-y-4 mb-4 z-10 relative">
                    {[
                      { name: "Java Programming - HackerRank", year: "2024" },
                      { name: "MySQL (Basic) - HackerRank", year: "2024" },
                      { name: "Python (Basic) - HackerRank", year: "2024" },
                      { name: "NPTEL - Cyber Security (Elite)", year: "2023" },
                      { name: "NPTEL - Cloud Computing (Elite)", year: "2023" },
                    ].map((cert) => (
                      <div key={cert.name} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2 text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {cert.name}
                        </div>
                        <div className="text-muted-foreground font-mono">{cert.year}</div>
                      </div>
                    ))}
                  </div>

                  {/* Laurel decoration */}
                  <div className="absolute bottom-6 right-6 flex flex-col items-center opacity-20 select-none pointer-events-none z-0">
                    <Trophy className="w-16 h-16 text-yellow-500 mb-2" />
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-pink-500 tracking-widest uppercase">Always Learning.</div>
                      <div className="text-[10px] font-bold text-pink-500 tracking-widest uppercase mt-1">Always Building.</div>
                    </div>
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card rounded-2xl border border-border p-6 shadow-xl flex flex-col h-full"
                >
                  <div className="flex items-center gap-2 text-foreground font-medium mb-6">
                    <Code2 className="w-5 h-5 text-red-400" /> Tech Stack
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { name: "Java", color: "text-orange-500 border-orange-500/20 bg-orange-500/10" },
                      { name: "MySQL", color: "text-blue-500 border-blue-500/20 bg-blue-500/10" },
                      { name: "Python", color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" },
                      { name: "Android", color: "text-foreground border-border bg-muted" },
                      { name: "Firebase", color: "text-foreground border-border bg-muted" },
                      { name: "React", color: "text-foreground border-border bg-muted" },
                      { name: "Node.js", color: "text-foreground border-border bg-muted" },
                      { name: "MongoDB", color: "text-foreground border-border bg-muted" },
                      { name: "Git", color: "text-foreground border-border bg-muted" },
                    ].map((tech) => (
                      <div key={tech.name} className={`px-3 py-1.5 rounded-lg border text-xs font-medium ${tech.color} cursor-default transition-colors`}>
                        {tech.name}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-auto font-grotesk italic pt-4">
                    And more...
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
