import { Check } from "lucide-react";
import Reveal from "./Reveal";
import earthImg from "../../assets/earth.png";

const points = [
  "Reduce pollution.",
  "Improve city cleanliness.",
  "Enable community participation.",
  "Support smart governance.",
];

export default function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-muted/40 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -bottom-24 -left-20 h-96 w-96 rounded-full bg-secondary/18" />
      </div>
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <img
            src={earthImg}
            alt="Earth surrounded by trees with AI monitoring rings"
            width={1024}
            height={1024}
            loading="lazy"
            className="mx-auto w-full max-w-lg drop-shadow-xl"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Environmental impact
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-foreground sm:text-4xl lg:text-5xl">
            Our mission is a measurably cleaner planet
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            GreenVision AI turns everyday observations into verified environmental action. Every
            photo becomes data, every task becomes cleaner air, water and streets.
          </p>

          <ul className="mt-9 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-base font-medium text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12">
                  <Check className="h-3.5 w-3.5 text-primary" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}