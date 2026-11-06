
import {
  Leaf,
  // Github,
  // Linkedin,
  Mail,
} from "lucide-react";

const columns = [
  {
    title: "GreenVision AI",
    links: [
      { name: "About", href: "#about" },
      { name: "Mission", href: "#mission" },
      { name: "Features", href: "#features" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Report Issue", href: "#report" },
      { name: "Leaderboard", href: "#leaderboard" },
      { name: "Volunteers", href: "#volunteers" },
    ],
  },
];

const developers = [
  {
    name: "Divya Sharma",
    linkedin: "https://www.linkedin.com/in/divya-sharma435",
    github: "https://github.com/Divyasharma11245",
  },
  {
    name: "Nitin Kadiyan",
    linkedin: "https://www.linkedin.com/in/nitinkadiyan/",
    github: "https://github.com/Nitinkadiyan",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Project Information */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </span>

              <span className="font-display text-lg font-bold text-foreground">
                GreenVision{" "}
                <span className="text-primary">AI</span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An AI-powered environmental intelligence platform
              for cleaner, smarter cities.
            </p>
          </div>

          {/* Quick Links */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Meet the Developers */}
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground">
              Meet the Developers
            </h3>

            <div className="mt-5 space-y-6">

              {/* Developer 1 */}
              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Divya Sharma
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href={developers[0].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Divya Sharma LinkedIn"
                    title="LinkedIn"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {/* <Linkedin size={20} /> */}
                    Linkedin
                  </a>

                  <a
                    href={developers[0].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Divya Sharma GitHub"
                    title="GitHub"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {/* <Github size={20} /> */}
                    Github
                  </a>
                </div>
              </div>

              {/* Developer 2 */}
              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">
                  Nitin Kadiyan
                </p>

                <div className="flex items-center gap-4">
                  <a
                    href={developers[1].linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nitin Kadiyan LinkedIn"
                    title="LinkedIn"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {/* <Linkedin size={20} /> */}
                    Linkedin
                  </a>

                  <a
                    href={developers[1].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Nitin Kadiyan GitHub"
                    title="GitHub"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {/* <Github size={20} /> */}
                    Github
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row">

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GreenVision AI.
            All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Built with passion by Divya Sharma & Nitin Kadiyan.
          </p>

        </div>
      </div>
    </footer>
  );
}
