
import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";

import GoogleLogin from "./googleLogin";

import Navbar from "./Navbar";

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

} from "lucide-react";

import { useNavigate } from "react-router-dom";
import loginIllustration from "../assets/loginpage.jpg";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  // Common authentication success handler
  const handleAuthSuccess = (user, token) => {
    if (!token) {
      setFormError("Authentication token not received.");
      return;
    }

    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    window.dispatchEvent(new Event("auth:changed"));

    // Navigate according to the actual backend role
    if (user?.role === "government") {
      navigate("/government-page");
    } else {
      navigate("/user-home-page");
    }
  };

  // Google login success
  const handleGoogleSuccess = (data) => {
    setFormError("");

    if (!data?.success || !data?.token) {
      setFormError(
        data?.message || "Google authentication failed."
      );
      return;
    }

    handleAuthSuccess(data.user, data.token);
  };

  // Google login error
  const handleGoogleError = (message) => {
    setFormError(message || "Google login failed.");
  };

  // Email validation
  const validate = () => {
    const next = {};

    if (!email.trim()) {
      next.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    ) {
      next.email = "Enter a valid email address.";
    }

    if (!password) {
      next.password = "Password is required.";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters.";
    }

    return next;
  };

  // Email/password login
  const onSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email: email.trim(),
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { token, user, message } = response.data;

      if (!token) {
        throw new Error(
          message || "Authentication token not received."
        );
      }

      handleAuthSuccess(user, token);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to login. Please try again.";

      setFormError(message);

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Input styling
  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-card/80 py-3 pl-11 pr-11 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/70 focus:ring-4 ${
      hasError
        ? "border-destructive/60 focus:border-destructive focus:ring-destructive/15"
        : "border-border focus:border-primary focus:ring-primary/15"
    }`;



  return (
    <>
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Background effects */}
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
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
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
              Sign in to continue building a cleaner and smarter
              environment with AI.
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
              alt="Green city with parks, wind turbines, solar panels and AI analytics dashboard"
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
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
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

              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Login
              </h2>

              <p className="mt-1.5 text-sm text-muted-foreground">
                Access your GreenVision AI account.
              </p>

              {/* Email and password form */}
              <form
                onSubmit={onSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                {/* Email */}
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          email: "",
                        }));
                      }}
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

                {/* Password */}
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }}
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

                {/* Forgot password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-semibold text-primary transition-opacity duration-200 hover:opacity-75"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error message */}
                {formError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/8 px-3.5 py-3 text-xs font-medium text-destructive"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {formError}
                  </div>
                )}

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="gradient-primary group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Login
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />

                <span className="text-[11px] font-semibold tracking-widest text-muted-foreground">
                  OR
                </span>

                <span className="h-px flex-1 bg-border" />
              </div>

              {/* Google and mobile login */}
              {/* Google Login */}
<div className="w-full">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={handleGoogleError}
  />
</div>

              {/* Signup */}
              <p className="mt-7 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="font-semibold text-primary transition-opacity duration-200 hover:opacity-75"
                >
                  Create Account
                </button>
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
