import { Camera, Brain, Landmark, BadgeCheck } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  { icon: Camera, title: "Step 1", desc: "Citizen uploads image." },
  { icon: Brain, title: "Step 2", desc: "AI analyzes waste." },
  { icon: Landmark, title: "Step 3", desc: "Government reviews and assigns reward." },
  { icon: BadgeCheck, title: "Step 4", desc: "Volunteer cleans the area and AI verifies completion." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Four steps from report to verified cleanup
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="gradient-primary absolute top-7 right-8 left-8 hidden h-px opacity-40 lg:block" />
          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative">
                  <span className="gradient-primary relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl shadow-soft">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </span>
                  <p className="mt-6 text-sm font-semibold tracking-wide text-primary">{s.title}</p>
                  <p className="mt-2 text-lg leading-snug font-medium text-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}