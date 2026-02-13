import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const certs = [
  { title: "Data Analytics", org: "Cisco", link: "#" },
  { title: "Python", org: "Kaggle", link: "#" },
  { title: "Frontend Developer (React)", org: "HackerRank", link: "#" },
  { title: "Programming in Java", org: "NPTEL", link: "#" },
  { title: "Oracle Cloud Infrastructure", org: "Oracle", link: "#" },
  { title: "Software Engineering Simulation", org: "JPMorgan Chase", link: "#" },
];

const CertificationsSection = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 font-outfit">
            <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <Award className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1 font-outfit">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 font-grotesk">{cert.org}</p>
              <a
                href={cert.link}
                className="inline-flex items-center text-xs text-primary hover:underline"
              >
                View Credential <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
