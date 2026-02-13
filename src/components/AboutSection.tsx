import { motion } from "framer-motion";
import { Palette, Smartphone, Server, Globe } from "lucide-react";

const services = [
  { icon: Palette, title: "UI/UX Designer", desc: "Creating intuitive and beautiful user interfaces." },
  { icon: Smartphone, title: "App Development", desc: "Building cross-platform mobile applications." },
  { icon: Server, title: "API Development", desc: "Designing robust and scalable backend APIs." },
  { icon: Globe, title: "Web Development", desc: "Full-stack web solutions with modern frameworks." },
];

const useInView = () => {
  return { ref: undefined, inView: true };
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold mb-4 font-outfit">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
             <p className="text-muted-foreground leading-relaxed mb-6 font-grotesk">
              I'm a <span className="text-primary font-semibold">Creative Director & Full Stack Developer</span> based in 
              Andhra Pradesh, India. I specialize in building exceptional digital experiences 
              that live on the internet.
            </p>
            <p className="text-muted-foreground leading-relaxed font-grotesk">
              Whether it's web development, app development, or UI/UX design, I bring a unique blend 
              of creativity and technical expertise to every project. I'm passionate about turning 
              complex problems into simple, beautiful, and intuitive solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <service.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2 font-outfit">{service.title}</h3>
                <p className="text-sm text-muted-foreground font-grotesk">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
