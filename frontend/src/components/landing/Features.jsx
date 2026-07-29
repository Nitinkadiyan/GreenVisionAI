import { ScanEye, MapPinned, LayoutDashboard, Users, Gift, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: ScanEye,
    title: "AI Waste Detection",
    desc: "Detect plastic, sewage, construction waste, and e-waste.",
  },
  { icon: MapPinned, title: "Live Environmental Map", desc: "Real-time incident tracking." },
  {
    icon: LayoutDashboard,
    title: "Government Dashboard",
    desc: "Analytics and smart management.",
  },
  {
    icon: Users,
    title: "Community Cleanup",
    desc: "Anyone can volunteer and complete cleanup tasks.",
  },
  { icon: Gift, title: "Reward System", desc: "Government-approved rewards after successful cleanup." },
  {
    icon: ShieldCheck,
    title: "AI Verification",
    desc: "AI compares before and after images for cleanup verification.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute top-1/4 -right-20 h-80 w-80 rounded-full bg-primary/12" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Features</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Everything a cleaner city needs, in one platform
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            From detection to verified cleanup — GreenVision AI closes the loop between people,
            data, and governance.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5.5 w-5.5 text-primary" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}