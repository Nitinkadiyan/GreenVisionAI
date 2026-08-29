import { Star } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    name: "Ananya Sharma",
    role: "Citizen",
    quote:
      "I reported an overflowing dump near my street and it was cleared within two days. Seeing the AI verification photo was incredibly satisfying.",
  },
  {
    name: "Rahul Mehta",
    role: "Volunteer",
    quote:
      "The task map makes weekend cleanups effortless. I pick a nearby task, clean it, upload proof and the reward lands automatically.",
  },
  {
    name: "Dr. Kavita Rao",
    role: "Municipal Officer",
    quote:
      "The dashboard gives us ward-level clarity we never had. Our response time to waste complaints dropped by nearly 40%.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Trusted across the cleanup chain
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="gradient-primary flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}