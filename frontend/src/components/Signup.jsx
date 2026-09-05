"use client";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import {
  ArrowRight,
  Camera,
  Check,
  Eye,
  EyeOff,
  // Facebook,
  Leaf,
  Lock,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  TreePine,
  User,
  Users,
} from "lucide-react";
import axios from "axios";
export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    city: "",
    area: "",
    accessCode: "",
  });

  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.area.trim()) nextErrors.area = "area is required.";
    if (!role) nextErrors.role = "Please select a role.";

    if (role === "government" && !form.accessCode.trim()) {
      nextErrors.accessCode = "Government access code is required.";
    }

    return nextErrors;
  };

  const handleProfilePicture = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfilePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("function called");
    setSubmitted(true);

    const nextErrors = validate();
    console.log(nextErrors);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      formData.append("confirmPassword", form.confirmPassword);
      formData.append("city", form.city);
      formData.append("area", form.area);
      if (form.latitude) {
        formData.append("latitude", form.latitude);
      }
      if (form.longitude) {
        formData.append("longitude", form.longitude);
      }
      formData.append("role", role);
      if (form.role === "government" && form.accessCode) {
        formData.append("accessCode", form.aczcessCode);
      }
      // if (form.profilePicture) {
      //   formData.append(
      //     "profilePicture",
      //     form.profilePicture
      //   );
      // }

      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
      );
      console.log("response :  ", response);
      console.log("nikku");
      console.log(form.email);
      navigate("/verify-email", {
        state: {
          email: form.email,
          role: response.data.role,
        },
      });
      console.log("Signup successful:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Signup failed:", error);
      setLoading(false);

      setErrors({
        submit:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const Field = ({
    id,
    label,
    placeholder,
    icon: Icon,
    type = "text",
    required = true,
    rightElement,
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
        {!required && (
          <span className="ml-2 text-xs font-normal text-slate-400">
            Optional
          </span>
        )}
      </label>

      <div className="relative">
        <Icon
          aria-hidden="true"
          className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
        />
        <input
          id={id}
          name={id}
          type={type}
          value={form[id]}
          onChange={updateField}
          placeholder={placeholder}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-error` : undefined}
          className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
            errors[id] ? "border-red-400" : "border-slate-200"
          }`}
        />
        {rightElement}
      </div>

      {errors[id] && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-500">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <section className="relative hidden w-[46%] overflow-hidden bg-emerald-950 px-12 py-12 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.3),transparent_35%),linear-gradient(145deg,#064e3b,#022c22)]" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950 shadow-lg shadow-emerald-950/30">
              <Leaf className="size-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              GreenVision AI
            </span>
          </div>

          <div className="relative z-10 mt-24 max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="size-4" />
              Technology for thriving communities
            </p>

            <h1 className="text-balance text-6xl font-bold leading-[1.05] tracking-tight">
              Build a Cleaner,
              <span className="block text-emerald-300">Smarter Future.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-emerald-100/80">
              Join GreenVision AI and help communities identify, report, and
              resolve environmental issues using AI-powered technology.
            </p>
          </div>

          <div className="relative z-10 my-14 flex min-h-67.5 items-center justify-center">
            <div className="relative flex size-64 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 shadow-2xl shadow-emerald-950/40">
              <div className="absolute inset-5 rounded-full border border-emerald-300/20" />
              <div className="flex size-28 items-center justify-center rounded-[2rem] bg-emerald-400 text-emerald-950 shadow-xl shadow-emerald-950/40">
                <TreePine className="size-16" />
              </div>

              <div className="absolute -right-5 top-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <Recycle className="size-5 text-emerald-300" />
                Clean streets
              </div>

              <div className="absolute -bottom-5 -left-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <ShieldCheck className="size-5 text-emerald-300" />
                AI monitoring
              </div>

              <div className="absolute -left-10 top-10 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium backdrop-blur-md">
                <Users className="size-5 text-emerald-300" />
                Community action
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto grid gap-4">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Detection",
                text: "Identify environmental issues with computer vision.",
              },
              {
                icon: Users,
                title: "Community Action",
                text: "Turn environmental reports into real cleanup activities.",
              },
              {
                icon: TreePine,
                title: "Cleaner Cities",
                text: "Track issues from reporting to resolution.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-emerald-100/70">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex w-full items-center justify-center px-5 py-8 sm:px-8 lg:w-[54%] lg:px-14 lg:py-12">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Leaf className="size-5" />
              </div>
              <span className="text-xl font-bold text-emerald-950">
                GreenVision AI
              </span>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-9">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Create Your Account
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Join GreenVision AI and start making a difference.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    icon={User}
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    icon={Mail}
                    type="email"
                  />
                  <Field
                    id="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    icon={Phone}
                  />
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={updateField}
                        placeholder="Create a strong password"
                        aria-invalid={Boolean(errors.password)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.password
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      Minimum 8 characters
                    </p>
                    {errors.password && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        onChange={updateField}
                        placeholder="Re-enter your password"
                        aria-invalid={Boolean(errors.confirmPassword)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.confirmPassword
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirmed password"
                            : "Show confirmed password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-emerald-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
                    Location
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="city"
                      label="City"
                      placeholder="Enter your city"
                      icon={MapPin}
                    />
                    <Field
                      id="area"
                      label="Location / Area"
                      placeholder="Enter your area or locality"
                      icon={MapPin}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-emerald-200 bg-emerald-50 text-emerald-500">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <User className="size-8" />
                    )}
                    <label
                      htmlFor="profilePicture"
                      className="absolute bottom-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-emerald-600 text-white shadow-md transition hover:bg-emerald-700"
                    >
                      <Camera className="size-4" />
                      <span className="sr-only">Change profile picture</span>
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicture}
                      className="sr-only"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-700">
                      Profile Picture{" "}
                      <span className="font-normal text-slate-400">
                        Optional
                      </span>
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Add a photo to personalize your profile.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-700">
                      Select Your Role
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Choose how you will participate in GreenVision AI.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        id: "citizen",
                        title: "Citizen",
                        text: "Report environmental issues and participate in cleanup activities.",
                        icon: Users,
                      },
                      {
                        id: "government",
                        title: "Government Officer",
                        text: "Review environmental reports and manage cleanup operations.",
                        icon: ShieldCheck,
                      },
                    ].map(({ id, title, text, icon: Icon }) => {
                      const selected = role === id;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => {
                            setRole(id);
                            setErrors((current) => ({
                              ...current,
                              role: "",
                              accessCode: "",
                            }));
                          }}
                          className={`relative rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100"
                              : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"
                          }`}
                          aria-pressed={selected}
                        >
                          {selected && (
                            <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                              <Check className="size-3" />
                            </span>
                          )}
                          <Icon
                            className={`mb-3 size-6 ${
                              selected ? "text-emerald-600" : "text-slate-400"
                            }`}
                          />
                          <h3 className="text-sm font-bold text-slate-800">
                            {title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {text}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {errors.role && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.role}
                    </p>
                  )}
                </div>

                {role === "government" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="accessCode"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Government Access Code
                    </label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                      <input
                        id="accessCode"
                        name="accessCode"
                        value={form.accessCode}
                        onChange={updateField}
                        placeholder="Enter government access code"
                        aria-invalid={Boolean(errors.accessCode)}
                        className={`h-13 w-full rounded-2xl border bg-white pl-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                          errors.accessCode
                            ? "border-red-400"
                            : "border-slate-200"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      A valid authorization code is required for government
                      accounts.
                    </p>
                    {errors.accessCode && (
                      <p className="text-xs font-medium text-red-500">
                        {errors.accessCode}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <span className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="size-5" />
                    </>
                  )}
                </button>

                {submitted && Object.keys(errors).length === 0 && !loading && (
                  <p className="text-center text-sm font-medium text-emerald-600">
                    Your account is ready to be created.
                  </p>
                )}

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-semibold text-slate-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <span className="text-base font-bold text-red-500">G</span>
                    Continue with Google
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    {/* <Facebook className="size-5 fill-blue-600 text-blue-600" /> */}
                    Continue with Facebook
                  </button>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
