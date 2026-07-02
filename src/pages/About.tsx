import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Github, Trophy, ArrowRight, Code2, GraduationCap, Loader2, CheckCircle2, AlertCircle, Flame, Mail, Award, Target, BookOpen, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";

const About = () => {
  // Fetch GitHub Stats
  const { data: githubData, isLoading: isGithubLoading } = useQuery({
    queryKey: ['githubProfileAbout'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/users/ComradeMohan');
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch LeetCode Stats
  const { data: leetcodeData, isLoading: isLeetcodeLoading } = useQuery({
    queryKey: ['leetcodeStatsAbout'],
    queryFn: async () => {
      const [baseProfileRes, profileRes, contestRes, skillRes] = await Promise.all([
        fetch('https://alfa-leetcode-api.onrender.com/ComradeMohan'),
        fetch('https://alfa-leetcode-api.onrender.com/ComradeMohan/solved'),
        fetch('https://alfa-leetcode-api.onrender.com/ComradeMohan/contest'),
        fetch('https://alfa-leetcode-api.onrender.com/ComradeMohan/language')
      ]);
      const baseProfile = await baseProfileRes.json();
      const profile = await profileRes.json();
      const contest = await contestRes.json();
      const skill = await skillRes.json();
      return { baseProfile, profile, contest, skill };
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fallbacks
  const githubFollowers = githubData?.followers ?? 428;
  const githubRepos = githubData?.public_repos ?? 98;
  const avatarUrl = githubData?.avatar_url ?? "/mohan-reddy-full-stack-developer.webp";
  const totalSolved = leetcodeData?.profile?.solvedProblem ?? 426;

  const rawLangData = leetcodeData?.skill?.languageProblemCount;
  const languageStats = [
    { name: "Java", color: "bg-orange-500" },
    { name: "MySQL", color: "bg-blue-400" },
    { name: "Python3", color: "bg-emerald-500" },
  ].map(lang => {
    const defaultCount = lang.name === "Java" ? 373 : lang.name === "MySQL" ? 40 : 13;
    const count = rawLangData 
      ? (rawLangData.find((l: any) => l.languageName === lang.name)?.problemsSolved || 0) 
      : defaultCount;
    const percent = totalSolved > 0 ? `${Math.round((count / totalSolved) * 100)}%` : "0%";
    return { ...lang, count, percent };
  });

  const contestRating = leetcodeData?.contest?.contestRating ? Math.round(leetcodeData.contest.contestRating).toLocaleString() : "1,724";
  const topPercentage = leetcodeData?.contest?.contestTopPercentage ? `${leetcodeData.contest.contestTopPercentage}%` : "25.52%";
  const contestRank = leetcodeData?.contest?.contestGlobalRanking ? `#${leetcodeData.contest.contestGlobalRanking.toLocaleString()}` : "#102,683";
  const profileRank = leetcodeData?.baseProfile?.ranking ? `#${leetcodeData.baseProfile.ranking.toLocaleString()}` : "#262,841";

  const easySolved = leetcodeData?.profile?.easySolved ?? 145;
  const mediumSolved = leetcodeData?.profile?.mediumSolved ?? 225;
  const hardSolved = leetcodeData?.profile?.hardSolved ?? 60;
  const contestsAttended = leetcodeData?.contest?.contestAttend ?? 14;

  const quickStats = [
    { title: "Easy", desc: "Easy problems", icon: CheckCircle2, value: easySolved, color: "text-emerald-400" },
    { title: "Medium", desc: "Medium problems", icon: AlertCircle, value: mediumSolved, color: "text-yellow-400" },
    { title: "Hard", desc: "Hard problems", icon: Flame, value: hardSolved, color: "text-red-400" },
    { title: "Contests", desc: "Contests attended", icon: Trophy, value: contestsAttended, color: "text-orange-500" }
  ];

  // Schema generation
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mohanreddy.me/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://mohanreddy.me/about"
      }
    ]
  };

  const personSchema = {
    "@type": "Person",
    "@id": "https://mohanreddy.me/#person",
    "name": "Mohan Reddy",
    "alternateName": "Comrade Mohan",
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer specializing in React, TypeScript, Java, and Kotlin.",
    "url": "https://mohanreddy.me/",
    "image": "https://mohanreddy.me/mohan-reddy-full-stack-developer.webp",
    "email": "madhiremohanreddy@gmail.com",
    "gender": "Male",
    "nationality": { "@type": "Country", "name": "India" },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Saveetha School of Engineering (SIMATS)",
      "url": "https://saveetha.com/"
    },
    "sameAs": [
      "https://github.com/ComradeMohan",
      "https://www.linkedin.com/in/mmohanreddy/",
      "https://www.instagram.com/comrade_mohan666/"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Oracle Certified Professional: Java SE 17 Developer",
        "credentialCategory": "Certification",
        "recognizedBy": { "@type": "Organization", "name": "Oracle University" }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "HackerRank Frontend Developer (React)",
        "credentialCategory": "Certification",
        "recognizedBy": { "@type": "Organization", "name": "HackerRank" }
      }
    ]
  };

  const aboutPageSchema = {
    "@type": "AboutPage",
    "@id": "https://mohanreddy.me/about#webpage",
    "url": "https://mohanreddy.me/about",
    "name": "About Mohan Reddy | Full Stack Software Engineer",
    "description": "Long-form biography of Mohan Reddy, his education, programming certifications, technical projects, achievements, and career goals.",
    "mainEntity": { "@id": "https://mohanreddy.me/#person" }
  };

  const profilePageSchema = {
    "@type": "ProfilePage",
    "@id": "https://mohanreddy.me/about#profile",
    "url": "https://mohanreddy.me/about",
    "name": "Mohan Reddy Professional Developer Profile",
    "mainEntity": { "@id": "https://mohanreddy.me/#person" }
  };

  return (
    <>
      <SEO
        title="About Mohan Reddy | Full Stack Developer & Software Engineer"
        description="Learn more about Mohan Reddy, a Full Stack Developer student at Saveetha School of Engineering. Check out his programming languages, certificates, and coding accomplishments."
        keywords="Mohan Reddy biography, Mohan Reddy Saveetha, Comrade Mohan, Java Developer India, React Developer Chennai, Saveetha School of Engineering CGPA, Oracle Certified Java, UniVault creator"
        schema={[breadcrumbSchema, personSchema, aboutPageSchema, profilePageSchema]}
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-outfit">
        <Navbar />

        <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Top Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-gray-500 font-grotesk">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-gray-300 font-semibold">About</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Profile Info Card & stats) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Profile Photo Section (Optimized Image representation) */}
              <figure className="bg-[#14151a] rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                <div className="h-64 w-full bg-gradient-to-b from-indigo-900/20 to-[#14151a] relative">
                  <img 
                    src={avatarUrl} 
                    alt="Mohan Reddy, Full Stack Developer and Android engineer" 
                    title="Mohan Reddy Profile Photo"
                    width="400"
                    height="400"
                    loading="eager"
                    className="w-full h-full object-cover object-top opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151a] via-[#14151a]/20 to-transparent" />
                </div>
                
                <figcaption className="p-6 relative -mt-12 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Mohan Reddy</h1>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                      <BadgeCheck className="w-3.5 h-3.5" /> Verified Developer
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 font-grotesk">Full Stack Developer • Software Engineer</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-6 font-grotesk">
                    <MapPin className="w-4 h-4 text-primary" /> <span>India</span>
                  </div>
                  
                  <div className="w-full py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Job Roles & Internships
                  </div>
                </figcaption>
              </figure>

              {/* GitHub Card */}
              <div className="bg-[#14151a] rounded-2xl border border-white/5 p-6 shadow-xl relative overflow-hidden">
                {isGithubLoading && (
                  <div className="absolute inset-0 bg-[#14151a]/85 flex items-center justify-center backdrop-blur-sm z-10">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-200 mb-6 font-medium">
                  <Github className="w-5 h-5" /> <h2>GitHub Performance</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-white/5">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{githubFollowers}</div>
                    <div className="text-xs text-gray-400 font-grotesk">Followers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">{githubRepos}</div>
                    <div className="text-xs text-gray-400 font-grotesk">Repositories</div>
                  </div>
                </div>
                <a 
                  href="https://github.com/ComradeMohan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
                >
                  Visit GitHub Profile <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* LeetCode Card */}
              <div className="bg-[#14151a] rounded-2xl border border-white/5 p-6 shadow-xl relative overflow-hidden">
                {isLeetcodeLoading && (
                  <div className="absolute inset-0 bg-[#14151a]/85 flex items-center justify-center backdrop-blur-sm z-10">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-200 mb-6 font-medium">
                  <Trophy className="w-5 h-5 text-orange-500" /> <h2>LeetCode Standing</h2>
                </div>
                <div className="text-center mb-6">
                  <div className="text-4xl font-extrabold text-white mb-1">{totalSolved}</div>
                  <div className="text-xs text-gray-400 font-grotesk">Total Solved Problems</div>
                </div>
                <div className="space-y-4 mb-6">
                  {languageStats.map(lang => (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-grotesk">
                        <span>{lang.name}</span>
                        <span className="text-gray-400">{lang.count} solved</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${lang.color}`} style={{ width: lang.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 text-center border-t border-white/5 pt-4 text-xs font-grotesk">
                  <div>
                    <div className="text-gray-500">Rating</div>
                    <div className="text-purple-400 font-bold">{contestRating}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Global Rank</div>
                    <div className="text-gray-300 font-semibold">{contestRank}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Long-form details) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Biography Section */}
              <section className="bg-[#14151a] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-white/5 pb-2 text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Professional Overview & Goals
                </h2>
                <div className="font-grotesk text-gray-300 leading-relaxed space-y-4 text-sm sm:text-base">
                  <p>
                    I am a final-year <strong>Computer Science & Engineering student</strong> at the <strong>Saveetha School of Engineering (SIMATS)</strong>, Chennai, India. Driven by a passion for backend logic, web interfaces, and security pipelines, I focus on building complete digital products that solve academic and structural problems.
                  </p>
                  <p>
                    Over my academic journey, I have completed two full scale applications: <strong>SaveethaHub</strong>, an academic collaboration web platform integrating AI functionalities, and <strong>UniVault</strong>, a secure, offline-first exam preparation Android application published on the Google Play Store. My technical proficiency covers languages like <strong>Java, Python, Kotlin, TypeScript, and SQL</strong>.
                  </p>
                  <p>
                    <strong>Career Goals:</strong> I aim to secure a Software Engineering role where I can build scalable architectures, optimize web application loading latency, and enforce high standards of database safety. I am committed to continuous learning, which is demonstrated by my certifications including <strong>Oracle Certified Professional: Java SE 17 Developer</strong>.
                  </p>
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-[#14151a] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-white/5 pb-2 text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" /> Academic History
                </h2>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    <span className="text-xs font-bold text-primary font-jetbrains bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">2022 - 2026</span>
                    <h3 className="text-lg font-bold text-white font-outfit">B.E. Computer Science & Engineering</h3>
                    <p className="text-sm font-medium text-gray-300 font-grotesk">Saveetha School of Engineering (SIMATS) — Chennai, India</p>
                    <p className="text-xs text-gray-400 font-grotesk">Focus on Data Structures, Algorithms, Database Management Systems, and Web Application Architectures. Achieved a CGPA of <strong>8.61 / 10</strong>.</p>
                  </div>

                  <div className="border-l-2 border-primary/20 pl-4 space-y-2">
                    <span className="text-xs font-bold text-primary font-jetbrains bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">2020 - 2022</span>
                    <h3 className="text-lg font-bold text-white font-outfit">Intermediate (MPC + Computer Science)</h3>
                    <p className="text-sm font-medium text-gray-300 font-grotesk">Loyola Public School — Guntur, Andhra Pradesh, India</p>
                    <p className="text-xs text-gray-400 font-grotesk">Graduated with a cumulative percentage of <strong>81.6%</strong>.</p>
                  </div>
                </div>
              </section>

              {/* Tech Stack & Skills */}
              <section className="bg-[#14151a] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-white/5 pb-2 text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" /> Technical Skills & Tools
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm font-grotesk">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-white border-b border-white/5 pb-1 font-outfit">Programming Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Kotlin", "TypeScript", "JavaScript", "Python", "SQL (MySQL, PostgreSQL)", "HTML5 / CSS3"].map(lang => (
                        <span key={lang} className="px-2.5 py-1 rounded bg-[#0a0a0a] border border-white/5 text-gray-300 text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-white border-b border-white/5 pb-1 font-outfit">Frameworks & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TailwindCSS", "Node.js", "Express.js", "Firebase (Auth, Firestore, Storage)", "Supabase", "Git & GitHub", "Docker", "REST APIs"].map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded bg-[#0a0a0a] border border-white/5 text-gray-300 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Achievements & Certifications */}
              <section className="bg-[#14151a] rounded-2xl border border-white/5 p-6 sm:p-8 shadow-xl space-y-6">
                <h2 className="text-2xl font-bold font-outfit border-b border-white/5 pb-2 text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" /> Achievements & Credentials
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-grotesk">
                  {[
                    { name: "Oracle Certified Professional: Java SE 17 Developer", issuer: "Oracle University", year: "2024" },
                    { name: "Oracle Cloud Infrastructure Certified Foundations Associate", issuer: "Oracle", year: "2024" },
                    { name: "Frontend Developer (React)", issuer: "HackerRank", year: "2024" },
                    { name: "Programming in Java (Elite)", issuer: "NPTEL / IIT", year: "2023" },
                    { name: "Cloud Computing (Elite)", issuer: "NPTEL / IIT", year: "2023" },
                    { name: "Cyber Security (Elite)", issuer: "NPTEL / IIT", year: "2023" },
                  ].map((cert, index) => (
                    <div key={index} className="p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-primary/20 transition-all flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-white leading-tight mb-1 text-sm font-outfit">{cert.name}</h3>
                        <p className="text-gray-500">Issued by {cert.issuer}</p>
                      </div>
                      <span className="text-primary font-jetbrains mt-2 block self-end">{cert.year}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Core Projects Link */}
              <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left space-y-2">
                  <h2 className="text-xl font-bold text-white font-outfit flex items-center justify-center sm:justify-start gap-2">
                    <BookOpen className="w-5 h-5 text-primary" /> Real-World Products
                  </h2>
                  <p className="text-xs text-gray-400 font-grotesk leading-relaxed">
                    Read the detailed architectural case studies for SaveethaHub and UniVault, documenting problems, solutions, tech stack, and design lifecycles.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="bg-primary hover:bg-primary/80">
                    <Link to="/case-study/saveethahub">SaveethaHub</Link>
                  </Button>
                  <Button asChild variant="secondary" className="bg-[#14151a] hover:bg-[#20222a] border border-white/5 text-white">
                    <Link to="/case-study/univault">UniVault</Link>
                  </Button>
                </div>
              </section>

            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;

