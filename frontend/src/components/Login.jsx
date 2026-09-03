import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sprout,
  MapPin,
  Trophy,
  User,
  Landmark,
  HeartHandshake,
} from "lucide-react";
import loginIllustration from "../assets/loginpage.jpg";

const perks = [
  {
    icon: Sprout,
    title: "AI Waste Detection",
    text: "Instantly identify environmental issues using AI.",
  },
  {
    icon: MapPin,
    title: "Live Environmental Monitoring",
    text: "Track reports and community cleanup in real time.",
  },
  {
    icon: Trophy,
    title: "Community Rewards",
    text: "Earn Eco Points and rewards by contributing to cleaner cities.",
  },
];

const roles = [
  { id: "citizen", label: "Citizen" },
  { id: "government", label: "Government Officer" },
];

function GoogleIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.86-.08-1.7-.22-2.5H12v4.73h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.85Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.9l-3.87-3a7.2 7.2 0 0 1-10.72-3.77H1.36v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.36 14.33a7.2 7.2 0 0 1 0-4.6V6.64H1.36a12 12 0 0 0 0 10.78l4-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.42C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.36 6.64l4 3.09A7.2 7.2 0 0 1 12 4.75Z"
      />
    </svg>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [role, setRole] = useState("citizen");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
        role: role,
      });
      console.log("Login response:", response);
    } catch (error) {
      console.log("login failed");
      console.log(error.message);
    } finally {git 
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-card/80 py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:ring-4 ${
      hasError
        ? "border-destructive/60 focus:border-destructive focus:ring-destructive/15"
        : "border-border focus:border-primary focus:ring-primary/15"
    }`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/25" />
        <div
          className="blob absolute top-1/3 right-0 h-104 w-104 rounded-full bg-secondary/20"
          style={{ animationDelay: "4s" }}
        />
        <div
          className="blob absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-accent/12"
          style={{ animationDelay: "8s" }}
        />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
        {/* Left panel */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex lg:flex-col"
        >
          <a href="/" className="flex items-center gap-2.5">
            <span className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl shadow-soft">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              GreenVision <span className="text-primary">AI</span>
            </span>
          </a>

          <h1 className="mt-10 text-4xl leading-tight font-bold text-foreground xl:text-5xl">
            Welcome{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Back
            </span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Sign in to continue building a cleaner and smarter environment with
            AI.
          </p>

          <div className="mt-9 flex flex-col gap-3">
            {perks.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass-card group flex items-start gap-4 rounded-2xl p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <p.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <img
            src={loginIllustration}
            alt="Illustration of a green city with parks, wind turbines, solar panels and an AI analytics dashboard"
            width={1024}
            height={640}
            loading="lazy"
            className="mt-10 w-full rounded-2xl object-cover opacity-95 mix-blend-multiply"
          />
        </motion.section>

        {/* Right panel */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full justify-center"
        >
          <div className="glass-card w-full max-w-107.5 rounded-2xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-9">
            <div className="flex items-center gap-2.5 lg:hidden">
              <span className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl shadow-soft">
                <Leaf className="h-4.5 w-4.5 text-primary-foreground" />
              </span>
              <span className="font-display text-base font-bold tracking-tight text-foreground">
                GreenVision <span className="text-primary">AI</span>
              </span>
            </div>
            <span className="gradient-primary hidden h-11 w-11 items-center justify-center rounded-2xl shadow-soft lg:flex">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </span>

            <h2 className="mt-6 text-2xl font-bold text-foreground">Login</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Access your GreenVision AI account.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@greenvision.ai"
                    className={inputClass(Boolean(errors.email))}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass(Boolean(errors.password))}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded-sm border-border accent-primary"
                  />
                  Remember me
                </label>
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-primary transition-opacity duration-200 hover:opacity-75"
                >
                  Forgot password?
                </a>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold tracking-wide text-foreground">
                  Login As
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {roles.map((r) => {
                    const active = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setRole(r.id)}
                        className={`flex justify-around align-middle justify-items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 sm:flex-col sm:items-start ${
                          active
                            ? "border-primary bg-primary/10 text-primary shadow-soft"
                            : "border-border bg-card/70 text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {/* <r.icon className="h-4 w-4 shrink-0" /> */}
                        <span className="leading-snug">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {formError && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/8 px-3.5 py-3 text-xs font-medium text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="gradient-primary group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                OR
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/30"
              >
                {/* <GoogleIcon className="h-4 w-4" /> */}
                Google
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/30"
              >
                {/* <Github className="h-4 w-4" /> */}
                GitHub
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="#create-account"
                className="font-semibold text-primary transition-opacity duration-200 hover:opacity-75"
              >
                Create Account
              </a>
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
