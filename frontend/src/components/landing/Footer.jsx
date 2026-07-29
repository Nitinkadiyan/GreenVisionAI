// import { Leaf, Mail, Github, Linkedin } from "lucide-react";

const columns = [
  { title: "GreenVision AI", links: ["About", "Mission", "Features"] },
  { title: "Community", links: ["Report Issue", "Leaderboard", "Volunteers"] },
  { title: "Platform", links: ["Live Map", "Dashboard", "Rewards"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
                {/* <Leaf className="h-5 w-5 text-primary-foreground" /> */}
              </span>
              <span className="font-display text-lg font-bold text-foreground">
                GreenVision <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An AI-powered environmental intelligence platform for cleaner, smarter cities.
            </p>
          </div>

          {columns.slice(0, 2).map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#home"
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:hello@greenvision.ai"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {/* <Mail className="h-4 w-4" /> hello@greenvision.ai */}
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {/* <Github className="h-4 w-4" /> GitHub */}
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {/* <Linkedin className="h-4 w-4" /> LinkedIn */}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GreenVision AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}