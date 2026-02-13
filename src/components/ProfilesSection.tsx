import { motion } from "framer-motion";

const profiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mohan-reddy-39b989250/", desc: "Professional Network", icon: "in", color: "from-[hsl(210,80%,45%)] to-[hsl(210,80%,35%)]" },
  { name: "GitHub", url: "https://github.com/comrademohan", desc: "Code Repository", icon: "GH", color: "from-[hsl(0,0%,30%)] to-[hsl(0,0%,20%)]" },
  { name: "LeetCode", url: "https://leetcode.com/comrademohan/", desc: "Problem Solving", icon: "LC", color: "from-[hsl(35,90%,50%)] to-[hsl(35,90%,40%)]" },
  { name: "HackerRank", url: "https://www.hackerrank.com/mohanreddy0703", desc: "Coding Challenges", icon: "HR", color: "from-[hsl(145,60%,40%)] to-[hsl(145,60%,30%)]" },
  { name: "CodeChef", url: "https://www.codechef.com/users/comrademohan", desc: "Competitive Programming", icon: "CC", color: "from-[hsl(25,70%,45%)] to-[hsl(25,70%,35%)]" },
  { name: "InterviewBit", url: "https://www.interviewbit.com/profile/comrademohan", desc: "Interview Prep", icon: "IB", color: "from-[hsl(210,70%,50%)] to-[hsl(210,70%,40%)]" },
  { name: "GeeksforGeeks", url: "https://auth.geeksforgeeks.org/user/comrademohan", desc: "DSA Practice", icon: "GfG", color: "from-[hsl(120,50%,35%)] to-[hsl(120,50%,25%)]" },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/comrademohan", desc: "Learning Platform", icon: "fCC", color: "from-[hsl(220,15%,25%)] to-[hsl(220,15%,18%)]" },
  { name: "HackerEarth", url: "https://www.hackerearth.com/@mohanreddy0703", desc: "Hackathons", icon: "HE", color: "from-[hsl(210,85%,45%)] to-[hsl(210,85%,35%)]" },
  { name: "Replit", url: "https://replit.com/@comrademohan", desc: "Online IDE", icon: "⌘", color: "from-[hsl(14,90%,55%)] to-[hsl(14,90%,45%)]" },
  { name: "Kaggle", url: "https://www.kaggle.com/comrademohan", desc: "Data Science", icon: "K", color: "from-[hsl(195,90%,45%)] to-[hsl(195,90%,35%)]" },
  { name: "Product Hunt", url: "https://www.producthunt.com/@comrademohan", desc: "Product Discovery", icon: "PH", color: "from-[hsl(15,85%,55%)] to-[hsl(15,85%,45%)]" },
];

const ProfilesSection = () => {
  return (
    <section id="profiles" className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 font-outfit">
            Coding <span className="text-primary">Profiles</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {profiles.map((profile, i) => (
            <motion.a
              key={profile.name}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />
              
              <div className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300`}>
                <span className="text-primary-foreground font-mono font-bold text-sm tracking-tight">
                  {profile.icon}
                </span>
              </div>
              <h3 className="relative font-semibold text-sm text-foreground font-outfit">{profile.name}</h3>
              <p className="relative text-xs text-muted-foreground mt-1">{profile.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
