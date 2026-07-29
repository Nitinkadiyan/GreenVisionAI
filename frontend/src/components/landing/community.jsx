import { MapPin, Navigation, IndianRupee, Trash2 } from "lucide-react";
import Reveal from "./Reveal";

const tasks = [
  { type: "Plastic Waste", area: "Sector 12", reward: "500", priority: "High Priority", distance: "2 km Away" },
  { type: "Construction Debris", area: "Sector 27", reward: "750", priority: "Medium Priority", distance: "4 km Away" },
  { type: "E-Waste Dump", area: "Riverfront Road", reward: "620", priority: "High Priority", distance: "6 km Away" },
];

export default function Community() {
  return (
    <section id="community" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Community</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Open cleanup tasks near you
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((t, i) => (
            <Reveal key={t.type} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Trash2 className="h-5 w-5 text-primary" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      t.priority === "High Priority"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-foreground">{t.type}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {t.area}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm">
                  <span className="flex items-center font-semibold text-foreground">
                    <IndianRupee className="mr-0.5 h-4 w-4 text-primary" />
                    {t.reward}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Navigation className="h-4 w-4" /> {t.distance}
                  </span>
                </div>

                <button className="gradient-primary mt-6 w-full rounded-full py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:shadow-lift">
                  Accept Task
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}