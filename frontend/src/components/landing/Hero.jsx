import { motion } from "motion/react";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import heroImg from "../../assets/heroLanding.png";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/25" />
        <div
          className="blob absolute top-24 right-0 h-112 w-md rounded-full bg-secondary/20"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="blob absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/15"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-16 pb-24 lg:grid-cols-2 lg:pt-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by computer vision
          </span>

          <h1 className="mt-6 text-4xl leading-[1.05] font-bold text-foreground sm:text-5xl lg:text-6xl">
            AI-Powered{" "}
            <span className="gradient-primary bg-clip-text text-transparent">Environmental</span>{" "}
            Intelligence Platform
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Empowering citizens, volunteers, NGOs, and governments to detect, monitor, and resolve
            environmental issues using Artificial Intelligence.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="gradient-primary group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              Report an Issue
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30">
              <Users className="h-4 w-4 text-primary" />
              Explore Community
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img
            src={heroImg}
            alt="GreenVision AI dashboard showing a city map, AI waste scanning, volunteers cleaning a park and sustainability analytics"
            width={1280}
            height={1024}
            className="w-full drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}