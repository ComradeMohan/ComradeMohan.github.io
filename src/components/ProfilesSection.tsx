import { motion } from "framer-motion";

const profiles = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/mohan-reddy-39b989250/", desc: "Professional Network", favicon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64" },
  { name: "GitHub", url: "https://github.com/comrademohan", desc: "Code Repository", favicon: "https://www.google.com/s2/favicons?domain=github.com&sz=64" },
  { name: "LeetCode", url: "https://leetcode.com/comrademohan/", desc: "Problem Solving", favicon: "https://www.google.com/s2/favicons?domain=leetcode.com&sz=64" },
  { name: "HackerRank", url: "https://www.hackerrank.com/mohanreddy0703", desc: "Coding Challenges", favicon: "https://www.google.com/s2/favicons?domain=hackerrank.com&sz=64" },
  { name: "CodeChef", url: "https://www.codechef.com/users/comrademohan", desc: "Competitive Programming", favicon: "https://www.google.com/s2/favicons?domain=codechef.com&sz=64" },
  { name: "InterviewBit", url: "https://www.interviewbit.com/profile/comrademohan", desc: "Interview Prep", favicon: "https://www.google.com/s2/favicons?domain=interviewbit.com&sz=64" },
  { name: "GeeksforGeeks", url: "https://auth.geeksforgeeks.org/user/comrademohan", desc: "DSA Practice", favicon: "https://www.google.com/s2/favicons?domain=geeksforgeeks.org&sz=64" },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/comrademohan", desc: "Learning Platform", favicon: "https://www.google.com/s2/favicons?domain=freecodecamp.org&sz=64" },
  { name: "HackerEarth", url: "https://www.hackerearth.com/@mohanreddy0703", desc: "Hackathons", favicon: "https://www.google.com/s2/favicons?domain=hackerearth.com&sz=64" },
  { name: "Replit", url: "https://replit.com/@comrademohan", desc: "Online IDE", favicon: "https://www.google.com/s2/favicons?domain=replit.com&sz=64" },
  { name: "Kaggle", url: "https://www.kaggle.com/comrademohan", desc: "Data Science", favicon: "https://www.google.com/s2/favicons?domain=kaggle.com&sz=64" },
  { name: "Product Hunt", url: "https://www.producthunt.com/@comrademohan", desc: "Product Discovery", favicon: "https://www.google.com/s2/favicons?domain=producthunt.com&sz=64" },
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
          <h2 className="text-4xl font-extrabold mb-4 font-outfit">
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />
              
              <div className="relative w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-shadow duration-300 overflow-hidden">
                <img
                  src={profile.favicon}
                  alt={`${profile.name} icon`}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
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
