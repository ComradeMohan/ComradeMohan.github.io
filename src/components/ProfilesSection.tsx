import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const profiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mohan-reddy-39b989250/", desc: "Professional Network" },
  { name: "GitHub", url: "https://github.com/comrademohan", desc: "Code Repository" },
  { name: "LeetCode", url: "https://leetcode.com/comrademohan/", desc: "Problem Solving" },
  { name: "HackerRank", url: "https://www.hackerrank.com/mohanreddy0703", desc: "Coding Challenges" },
  { name: "CodeChef", url: "https://www.codechef.com/users/comrademohan", desc: "Competitive Programming" },
  { name: "InterviewBit", url: "https://www.interviewbit.com/profile/comrademohan", desc: "Interview Prep" },
  { name: "GeeksforGeeks", url: "https://auth.geeksforgeeks.org/user/comrademohan", desc: "DSA Practice" },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/comrademohan", desc: "Learning Platform" },
  { name: "HackerEarth", url: "https://www.hackerearth.com/@mohanreddy0703", desc: "Hackathons" },
  { name: "Replit", url: "https://replit.com/@comrademohan", desc: "Online IDE" },
  { name: "Kaggle", url: "https://www.kaggle.com/comrademohan", desc: "Data Science" },
  { name: "Product Hunt", url: "https://www.producthunt.com/@comrademohan", desc: "Product Discovery" },
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
          <h2 className="text-4xl font-bold mb-4">
            Coding <span className="text-primary">Profiles</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
              className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{profile.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
