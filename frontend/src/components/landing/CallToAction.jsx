import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function CallToAction() {
  return (
    <section className="px-6 pb-24">
      <Reveal className="mx-auto max-w-7xl">
        <div className="gradient-primary relative overflow-hidden rounded-4xl px-8 py-20 text-center shadow-lift sm:px-16">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="blob absolute -top-16 left-10 h-72 w-72 rounded-full bg-primary-foreground/40" />
            <div
              className="blob absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary-foreground/30"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Together We Can Build Cleaner Cities
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
              Join thousands of citizens using AI to create a healthier environment.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-primary-foreground/40 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/10">
                Explore Reports
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}