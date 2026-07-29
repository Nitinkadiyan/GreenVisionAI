import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Community", href: "#community" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Impact", href: "#impact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-x-0 border-t-0 shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-soft">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight text-foreground">
            GreenVision <span className="text-primary">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted">
            Login
          </button>
          <button className="gradient-primary rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
            Sign Up
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-card border-x-0 px-6 pb-6 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3">
              <button className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold">
                Login
              </button>
              <button className="gradient-primary flex-1 rounded-full py-2.5 text-sm font-semibold text-primary-foreground">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}