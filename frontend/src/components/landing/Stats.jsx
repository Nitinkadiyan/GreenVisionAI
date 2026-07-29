import { FileText, CheckCircle2, Recycle, HeartHandshake } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { icon: FileText, value: "12,458+", label: "Reports Submitted" },
  { icon: CheckCircle2, value: "9,872+", label: "Cleanup Tasks Completed" },
  { icon: Recycle, value: "15 Tons", label: "Plastic Removed" },
  { icon: HeartHandshake, value: "1,240+", label: "Active Volunteers" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-24">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                <s.icon className="h-5 w-5 text-primary" />
              </span>
              <p className="mt-6 font-display text-3xl font-bold text-foreground">{s.value}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}