"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  CloudRain,
  Database,
  FileCheck2,
  Filter,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  Users,
  X,
  Zap,
  Recycle,
  Award,
  LayoutDashboard,
  ListFilter,
  Map,
  LineChart,
  Siren,
  WalletCards,
  CheckCircle2,
  CircleX,
  Timer,
  Navigation,
  Eye,
  SlidersHorizontal,
} from "lucide-react";

const navItems = [
  ["Dashboard", LayoutDashboard],
  ["Reports", FileCheck2],
  ["Priority Queue", Siren],
  ["Cleanup Tasks", ClipboardCheck],
  ["Volunteers", Users],
  ["Users", UserRound],
  ["Rewards", Award],
  ["Live Environmental Map", Map],
  ["Analytics", LineChart],
  ["Notifications", Bell],
  ["Settings", Settings],
];
const chartData = [68, 84, 72, 108, 96, 128, 118, 142, 130, 164, 151, 178];
const reports = [
  {
    id: "GV-2026-00128",
    issue: "Plastic Waste",
    location: "Sector 21",
    severity: "High",
    confidence: "96%",
    date: "16 Aug 2026",
    status: "Pending",
    priority: "Critical",
    image:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=160&q=80",
    summary:
      "Large plastic accumulation near a public drain with likely waterway contamination risk.",
  },
  {
    id: "GV-2026-00131",
    issue: "Construction Debris",
    location: "Model Town",
    severity: "High",
    confidence: "91%",
    date: "16 Aug 2026",
    status: "Pending",
    priority: "High",
    image:
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=160&q=80",
    summary:
      "Unsegregated construction material blocking a pedestrian corridor.",
  },
  {
    id: "GV-2026-00120",
    issue: "Sewage Overflow",
    location: "Civil Lines",
    severity: "Critical",
    confidence: "98%",
    date: "15 Aug 2026",
    status: "Approved",
    priority: "Critical",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=160&q=80",
    summary:
      "Overflow detected across a residential lane; immediate response recommended.",
  },
];
const operations = [
  {
    task: "Plastic Cleanup",
    location: "Sector 21",
    volunteer: "Rahul Mehta",
    progress: 65,
    deadline: "18 Aug 2026",
    reward: "₹250",
    color: "bg-emerald-500",
  },
  {
    task: "E-waste Collection",
    location: "Green Park",
    volunteer: "Aisha Khan",
    progress: 42,
    deadline: "20 Aug 2026",
    reward: "₹400",
    color: "bg-blue-500",
  },
  {
    task: "Drain Clearing",
    location: "Civil Lines",
    volunteer: "Vikram Singh",
    progress: 84,
    deadline: "17 Aug 2026",
    reward: "₹300",
    color: "bg-amber-500",
  },
];

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-600",
    orange: "bg-orange-50 text-orange-700",
    yellow: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-violet-50 text-violet-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
function Section({ title, eyebrow, children, action }) {
  return (
    <section className="rounded-2xl border border-emerald-100/80 bg-white p-5 shadow-[0_12px_34px_rgba(20,83,45,0.06)] md:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
            {eyebrow}
          </p>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            {title}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
function StatCard({ label, value, note, trend, icon: Icon, tone }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_10px_26px_rgba(20,83,45,0.05)]"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}
        >
          <Icon size={19} />
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={13} />
          {trend}
        </span>
      </div>
      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </motion.div>
  );
}
function MiniBars({ values = chartData, color = "bg-emerald-500" }) {
  return (
    <div className="flex h-28 items-end gap-1.5">
      {values.map((v, i) => (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${v / 2}%` }}
          transition={{ delay: i * 0.035 }}
          key={i}
          className={`flex-1 rounded-t-md ${color} opacity-${i % 3 === 0 ? "70" : "90"}`}
        />
      ))}
    </div>
  );
}

export default function GovernmentDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard"),
    [mobileOpen, setMobileOpen] = useState(false),
    [search, setSearch] = useState("");
  const [period, setPeriod] = useState("30 Days"),
    [reviewTab, setReviewTab] = useState("All"),
    [selected, setSelected] = useState(null);
  const [rewardOpen, setRewardOpen] = useState(false),
    [notifications, setNotifications] = useState(false),
    [toast, setToast] = useState("");
  const [reportState, setReportState] = useState(reports);
  const filtered = useMemo(
    () =>
      reportState.filter(
        (r) =>
          `${r.id} ${r.issue} ${r.location}`
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (reviewTab === "All" ||
            r.status === reviewTab ||
            (reviewTab === "Critical" && r.priority === "Critical")),
      ),
    [search, reviewTab, reportState],
  );
  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  };
  const updateReport = (id, status) => {
    setReportState((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    setSelected(null);
    notify(`Report ${id} marked ${status.toLowerCase()}.`);
  };

  return (
    <div className="min-h-screen bg-[#f5faf7] text-slate-800">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-63.5 flex-col border-r border-emerald-100 bg-white px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-green-800 text-white shadow-lg shadow-emerald-200">
            <Leaf size={21} />
          </div>
          <div>
            <p className="text-[15px] font-extrabold tracking-tight text-slate-900">
              GreenVision <span className="text-emerald-600">AI</span>
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Government Portal
            </p>
          </div>
        </div>
        <div className="my-6 h-px bg-emerald-50" />
        <nav className="flex-1 space-y-1">
          {navItems.map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => {
                setActiveNav(name);
                setMobileOpen(false);
                notify(`${name} workspace selected`);
              }}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${activeNav === name ? "bg-linear-to-r from-emerald-500 to-green-700 text-white shadow-lg shadow-emerald-200" : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"}`}
            >
              <Icon
                size={17}
                className={
                  activeNav === name
                    ? "text-white"
                    : "text-slate-400 group-hover:text-emerald-600"
                }
              />
              {name}
            </button>
          ))}
        </nav>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
                AS
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-800">
                Arjun Sharma
              </p>
              <p className="truncate text-[10px] text-slate-500">
                Municipal Corporation
              </p>
            </div>
          </div>
          <button
            onClick={() => notify("Logout demo action")}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-white py-2 text-[11px] font-semibold text-slate-500 hover:text-red-600"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/20 lg:hidden"
        />
      )}
      <div className="lg:pl-63.5">
        <header className="sticky top-0 z-20 border-b border-emerald-100 bg-white/90 px-4 py-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 lg:hidden"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                  Government Command Center
                </h1>
                <p className="hidden text-xs text-slate-500 sm:block">
                  Monitor and manage environmental issues across your
                  jurisdiction.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                <Search size={15} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reports..."
                  className="w-36 bg-transparent text-xs outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className="relative rounded-xl p-2.5 text-slate-500 hover:bg-emerald-50"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
              </button>
              <button
                onClick={() => notify("Help center opened")}
                className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-emerald-50 sm:block"
              >
                <CircleHelp size={18} />
              </button>
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
                  AS
                </div>
                <div className="hidden text-right md:block">
                  <p className="text-xs font-bold text-slate-800">
                    Arjun Sharma
                  </p>
                  <Badge tone="green">Government Officer</Badge>
                </div>
              </div>
            </div>
          </div>
          {notifications && (
            <div className="absolute right-5 top-16 w-72 rounded-2xl border border-emerald-100 bg-white p-4 shadow-2xl">
              <p className="font-bold text-slate-900">
                Notifications{" "}
                <span className="ml-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-600">
                  4 new
                </span>
              </p>
              {[
                "Critical report requires attention.",
                "Volunteer deadline expires tomorrow.",
                "Reward approval required.",
              ].map((n, i) => (
                <button
                  key={n}
                  onClick={() => notify(n)}
                  className="mt-3 flex w-full gap-2 text-left text-xs text-slate-600"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  {n}
                  <span className="ml-auto text-[10px] text-slate-400">
                    {i + 1}h
                  </span>
                </button>
              ))}
            </div>
          )}
        </header>
        <main className="mx-auto max-w-[1540px] space-y-6 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-orange-200 bg-linear-to-r from-orange-50 via-white to-red-50 p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <AlertTriangle size={22} />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  7 Critical Environmental Reports Require Attention
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  These reports have exceeded the recommended response priority.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setReviewTab("Critical");
                  document
                    .getElementById("review")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white shadow-sm hover:bg-orange-600"
              >
                Review Critical Reports
              </button>
              <button
                onClick={() => notify("Priority queue opened")}
                className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-xs font-bold text-orange-700 hover:bg-orange-50"
              >
                View Queue
              </button>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
            <StatCard
              label="Total Reports"
              value="1,248"
              trend="12.4%"
              note="vs. last month"
              icon={FileCheck2}
              tone="bg-emerald-100 text-emerald-700"
            />
            <StatCard
              label="Pending Review"
              value="184"
              trend="8.2%"
              note="Requires government review"
              icon={Clock3}
              tone="bg-amber-100 text-amber-700"
            />
            <StatCard
              label="In Progress"
              value="326"
              trend="14.8%"
              note="Currently being handled"
              icon={Activity}
              tone="bg-blue-100 text-blue-700"
            />
            <StatCard
              label="Resolved"
              value="738"
              trend="22.6%"
              note="59.1% resolution rate"
              icon={CheckCircle2}
              tone="bg-emerald-100 text-emerald-700"
            />
            <StatCard
              label="Critical Issues"
              value="27"
              trend="3.1%"
              note="Require immediate action"
              icon={Siren}
              tone="bg-red-100 text-red-600"
            />
            <StatCard
              label="Rewards Assigned"
              value="₹1,84,500"
              trend="18.4%"
              note="This month"
              icon={WalletCards}
              tone="bg-yellow-100 text-yellow-700"
            />
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
            <Section
              title="Environmental Reports Overview"
              eyebrow="City activity"
              action={
                <div className="flex rounded-lg bg-slate-100 p-1">
                  {["7 Days", "30 Days", "6 Months", "1 Year"].map((x) => (
                    <button
                      key={x}
                      onClick={() => setPeriod(x)}
                      className={`rounded-md px-2 py-1.5 text-[10px] font-semibold ${period === x ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              }
            >
              <div className="mb-4 flex items-center gap-5 text-xs text-slate-500">
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-emerald-500" />
                  Submitted
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-blue-500" />
                  Resolved
                </span>
                <span className="flex items-center gap-2">
                  <i className="h-2 w-2 rounded-full bg-amber-400" />
                  Pending
                </span>
              </div>
              <div className="relative h-52">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[200, 150, 100, 50, 0].map((n) => (
                    <div
                      key={n}
                      className="flex items-center gap-3 border-t border-dashed border-slate-100 text-[10px] text-slate-400"
                    >
                      <span className="w-6">{n}</span>
                      <div className="flex-1" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-9 bottom-0 top-2 flex items-end gap-2">
                  {chartData.map((v, i) => (
                    <div key={i} className="flex flex-1 items-end gap-0.5">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${v / 2}%` }}
                        className="w-1/2 rounded-t bg-emerald-400"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(v - 22) / 2}%` }}
                        className="w-1/2 rounded-t bg-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-between px-8 text-[10px] text-slate-400">
                <span>Sep</span>
                <span>Nov</span>
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
              </div>
            </Section>
            <Section
              title="Waste Category Distribution"
              eyebrow="AI classification"
            >
              <div className="flex items-center justify-center gap-8 py-3">
                <div
                  className="relative flex h-40 w-40 items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#10b981 0 34%, #3b82f6 34% 54%, #f59e0b 54% 68%, #8b5cf6 68% 79%, #f97316 79% 91%, #cbd5e1 91% 100%)",
                  }}
                >
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                    <strong className="text-2xl text-slate-900">1,248</strong>
                    <span className="text-[10px] text-slate-400">
                      total reports
                    </span>
                  </div>
                </div>
                <div className="space-y-2.5 text-xs">
                  {[
                    ["Plastic", "34%", "bg-emerald-500"],
                    ["Construction", "20%", "bg-blue-500"],
                    ["Sewage", "14%", "bg-amber-500"],
                    ["E-Waste", "11%", "bg-violet-500"],
                    ["Organic", "12%", "bg-orange-500"],
                    ["Other", "9%", "bg-slate-300"],
                  ].map(([a, b, c]) => (
                    <div key={a} className="flex items-center gap-2">
                      <i className={`h-2 w-2 rounded-full ${c}`} />
                      <span className="w-20 text-slate-500">{a}</span>
                      <b className="text-slate-800">{b}</b>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>
          <Section
            title="High Priority Reports"
            eyebrow="Immediate attention"
            action={
              <button
                onClick={() => notify("All priority reports loaded")}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700"
              >
                View all <ArrowUpRight size={14} />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-212.5 text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-wider text-slate-400">
                    <th className="pb-3">Report</th>
                    <th className="pb-3">Issue</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Severity</th>
                    <th className="pb-3">AI Confidence</th>
                    <th className="pb-3">Submitted</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3" />
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={r.image}
                            alt="environmental report"
                            className="h-9 w-11 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-bold text-slate-800">{r.id}</p>
                            <p className="text-[10px] text-slate-400">
                              AI analyzed
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-slate-700">
                        {r.issue}
                      </td>
                      <td className="text-slate-500">{r.location}</td>
                      <td>
                        <Badge
                          tone={r.severity === "Critical" ? "red" : "orange"}
                        >
                          {r.severity}
                        </Badge>
                      </td>
                      <td className="font-bold text-emerald-700">
                        {r.confidence}
                      </td>
                      <td className="text-slate-500">{r.date}</td>
                      <td>
                        <Badge
                          tone={r.status === "Approved" ? "green" : "yellow"}
                        >
                          {r.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge tone="red">{r.priority}</Badge>
                      </td>
                      <td>
                        <button
                          onClick={() => setSelected(r)}
                          className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
          <div id="review">
            <Section
              title="Reports Requiring Review"
              eyebrow="Verification workflow"
              action={
                <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                  {["All", "Pending", "Approved", "Rejected", "Critical"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setReviewTab(tab)}
                        className={`rounded-md px-2.5 py-1.5 text-[10px] font-semibold ${reviewTab === tab ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
                      >
                        {tab}
                      </button>
                    ),
                  )}
                </div>
              }
            >
              <div className="grid gap-4 lg:grid-cols-3">
                {filtered.map((r) => (
                  <motion.div
                    layout
                    key={r.id}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex gap-3">
                      <img
                        src={r.image}
                        alt="report"
                        className="h-16 w-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="text-xs font-bold text-slate-900">
                            {r.id}
                          </p>
                          <Badge
                            tone={r.severity === "Critical" ? "red" : "orange"}
                          >
                            {r.severity}
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {r.issue}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                          <MapPin size={10} />
                          {r.location} · {r.date}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                      {r.summary}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-[11px] font-bold text-emerald-700">
                        {r.confidence} AI confidence
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => updateReport(r.id, "Approved")}
                          className="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[10px] font-bold text-white"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateReport(r.id, "Rejected")}
                          className="rounded-lg border border-red-100 px-2.5 py-1.5 text-[10px] font-bold text-red-600"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => setSelected(r)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-[10px] font-bold text-slate-600"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-400">
                  No reports match this filter.
                </p>
              )}
            </Section>
          </div>
          <div className="grid gap-6 xl:grid-cols-2">
            <Section
              title="Government Reward Management"
              eyebrow="Verified cleanup incentives"
            >
              <div className="rounded-xl bg-linear-to-br from-emerald-50 to-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-slate-800">
                      Plastic Waste Cleanup
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Sector 21 · Estimated waste: 35 kg
                    </p>
                  </div>
                  <Badge tone="green">Volunteer available</Badge>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Reward</span>
                    <p className="text-2xl font-bold text-emerald-700">₹250</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRewardOpen(true)}
                      className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      Assign Reward
                    </button>
                    <button
                      onClick={() => notify("Reward editor opened")}
                      className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-700"
                    >
                      Edit Reward
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Government authorities can assign rewards to verified
                environmental cleanup tasks.
              </p>
            </Section>
            <Section
              title="Active Cleanup Operations"
              eyebrow="Volunteer execution"
            >
              <div className="space-y-4">
                {operations.map((o) => (
                  <div
                    key={o.task}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {o.task}{" "}
                          <span className="font-normal text-slate-400">
                            — {o.location}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {o.volunteer} · Deadline {o.deadline}
                        </p>
                      </div>
                      <Badge tone="blue">In Progress</Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          animate={{ width: `${o.progress}%` }}
                          className={`h-full rounded-full ${o.color}`}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {o.progress}%
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {o.reward}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
          <Section
            title="Tasks Approaching Deadline"
            eyebrow="Escalation monitoring"
          >
            <p className="mb-4 max-w-2xl text-xs leading-5 text-slate-500">
              Tasks remain available to volunteers until their deadline.
              Unresolved tasks are automatically escalated to the government
              priority queue.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                [
                  "Plastic Waste Cleanup",
                  "18 Aug 2026",
                  "2 days remaining",
                  "Rahul Mehta",
                  "green",
                ],
                [
                  "Drain Clearing",
                  "17 Aug 2026",
                  "Tomorrow",
                  "Vikram Singh",
                  "yellow",
                ],
                [
                  "Illegal Dumping Review",
                  "15 Aug 2026",
                  "Escalated to Government",
                  "Unassigned",
                  "red",
                ],
              ].map(([task, date, time, person, tone]) => (
                <div
                  key={task}
                  className="rounded-xl border border-slate-100 p-4"
                >
                  <div className="flex justify-between gap-3">
                    <p className="text-xs font-bold text-slate-800">{task}</p>
                    <Badge tone={tone}>
                      {tone === "red" ? "Escalated" : "Open"}
                    </Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                    <span>
                      Deadline <b className="block text-slate-700">{date}</b>
                    </span>
                    <span>
                      Remaining <b className="block text-slate-700">{time}</b>
                    </span>
                    <span>
                      Volunteer <b className="block text-slate-700">{person}</b>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <div className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
            <Section
              title="Government Priority Queue"
              eyebrow="Direct action required"
            >
              <div className="space-y-3">
                {[
                  [
                    "Critical",
                    "GV-2026-00120",
                    "Civil Lines",
                    "Volunteer deadline exceeded.",
                    "Today",
                    "red",
                  ],
                  [
                    "High",
                    "GV-2026-00128",
                    "Sector 21",
                    "Public drain contamination risk.",
                    "18 Aug",
                    "orange",
                  ],
                  [
                    "Medium",
                    "GV-2026-00115",
                    "Green Park",
                    "Awaiting verification.",
                    "20 Aug",
                    "yellow",
                  ],
                  [
                    "Low",
                    "GV-2026-00098",
                    "Model Town",
                    "Routine inspection requested.",
                    "24 Aug",
                    "green",
                  ],
                ].map(([p, id, loc, reason, deadline, tone]) => (
                  <div
                    key={id}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                  >
                    <Badge tone={tone}>{p}</Badge>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800">
                        {id} · {loc}
                      </p>
                      <p className="truncate text-[10px] text-slate-500">
                        {reason}
                      </p>
                    </div>
                    <span className="hidden text-[10px] text-slate-400 sm:block">
                      {deadline}
                    </span>
                    <button
                      onClick={() => notify(`Opening ${id}`)}
                      className="rounded-lg bg-slate-50 p-2 text-slate-500 hover:text-emerald-700"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </Section>
            <Section
              title="Environmental Hotspots"
              eyebrow="Live intelligence"
              action={
                <button
                  onClick={() => notify("Full map demo opened")}
                  className="text-xs font-bold text-emerald-700"
                >
                  Open full map <ArrowUpRight size={14} className="inline" />
                </button>
              }
            >
              <div
                className="relative h-56 overflow-hidden rounded-xl border border-emerald-100 bg-[#dcefe4]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, transparent 20%, rgba(255,255,255,.5) 20%, rgba(255,255,255,.5) 23%, transparent 23%, transparent 55%, rgba(255,255,255,.5) 55%, rgba(255,255,255,.5) 58%, transparent 58%), linear-gradient(55deg, rgba(52,118,84,.14) 1px, transparent 1px)",
                }}
              >
                <div className="absolute left-[22%] top-[28%] h-20 w-40 rotate-12 rounded-[45%] border-2 border-white/70 bg-emerald-200/40" />
                <div className="absolute right-[15%] top-[18%] h-28 w-24 -rotate-45 rounded-[45%] border-2 border-white/70 bg-emerald-200/50" />
                {[
                  ["18%", "35%", "bg-red-500"],
                  ["48%", "54%", "bg-orange-500"],
                  ["73%", "30%", "bg-amber-400"],
                  ["60%", "78%", "bg-emerald-600"],
                  ["30%", "70%", "bg-orange-500"],
                ].map(([x, y, c], i) => (
                  <div
                    key={i}
                    className={`absolute ${c} flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-lg`}
                    style={{ left: x, top: y }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                ))}
                <div className="absolute bottom-3 left-3 flex gap-2 rounded-lg bg-white/90 px-3 py-2 text-[10px] font-semibold shadow-sm">
                  <span className="text-red-600">● Critical</span>
                  <span className="text-orange-600">● High</span>
                  <span className="text-amber-600">● Medium</span>
                  <span className="text-emerald-700">● Resolved</span>
                </div>
              </div>
            </Section>
          </div>
          <Section title="User Management" eyebrow="Community network">
            <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["Total Users", "4,821"],
                ["Active Volunteers", "1,284"],
                ["NGOs", "84"],
                ["Government Officers", "32"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-xl bg-emerald-50/70 p-3">
                  <p className="text-[11px] text-slate-500">{a}</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{b}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 text-left text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Reports</th>
                    <th className="pb-3">Eco Points</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Joined</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Rahul Mehta",
                      "Citizen / Volunteer",
                      "14 Reports",
                      "840 Eco Points",
                      "Active",
                      "Apr 2026",
                    ],
                    [
                      "Aisha Khan",
                      "Citizen / Volunteer",
                      "9 Reports",
                      "620 Eco Points",
                      "Active",
                      "May 2026",
                    ],
                    [
                      "Neha Kapoor",
                      "NGO Coordinator",
                      "32 Reports",
                      "1,420 Eco Points",
                      "Active",
                      "Jan 2026",
                    ],
                  ].map((u) => (
                    <tr key={u[0]} className="border-t border-slate-50">
                      <td className="py-3 font-bold text-slate-800">{u[0]}</td>
                      <td className="text-slate-500">{u[1]}</td>
                      <td>{u[2]}</td>
                      <td className="font-semibold text-emerald-700">{u[3]}</td>
                      <td>
                        <Badge tone="green">{u[4]}</Badge>
                      </td>
                      <td className="text-slate-400">{u[5]}</td>
                      <td>
                        <button
                          onClick={() => notify(`${u[0]} profile opened`)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-600"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
          <Section
            title="Environmental Intelligence"
            eyebrow="Performance analytics"
            action={
              <div className="flex gap-2">
                <select className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-600">
                  <option>All Districts</option>
                  <option>Karnal</option>
                  <option>Panipat</option>
                </select>
                <select className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-600">
                  <option>August 2026</option>
                  <option>July 2026</option>
                </select>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              {[
                ["Reports This Month", "+18%", "text-emerald-600"],
                ["Average Response Time", "2.4 Days", "text-blue-600"],
                ["Resolution Rate", "78.6%", "text-emerald-600"],
                ["Plastic Waste Collected", "4.8 Tons", "text-amber-600"],
                ["Volunteer Participation", "1,284", "text-violet-600"],
                ["Critical Issues Resolved", "92%", "text-red-600"],
              ].map(([a, b, c]) => (
                <div key={a} className="rounded-xl border border-slate-100 p-4">
                  <p className="text-[10px] leading-4 text-slate-500">{a}</p>
                  <p className={`mt-2 text-xl font-bold ${c}`}>{b}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div>
                <div className="mb-3 flex justify-between">
                  <p className="text-xs font-bold text-slate-700">
                    Reports by month
                  </p>
                  <span className="text-[10px] text-slate-400">2026 trend</span>
                </div>
                <MiniBars />
              </div>
              <div>
                <div className="mb-3 flex justify-between">
                  <p className="text-xs font-bold text-slate-700">
                    Volunteer activity
                  </p>
                  <span className="text-[10px] text-slate-400">
                    Tasks accepted
                  </span>
                </div>
                <MiniBars
                  values={[45, 52, 63, 58, 74, 67, 82, 77, 91, 85, 101, 110]}
                  color="bg-blue-500"
                />
              </div>
            </div>
          </Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="District-wise Performance"
              eyebrow="Jurisdiction comparison"
            >
              <div className="space-y-3">
                {[
                  ["Karnal", "328", "264", "64", "80.4%", "2.1 Days"],
                  ["Panipat", "284", "219", "65", "77.1%", "2.8 Days"],
                  ["Ambala", "218", "181", "37", "83.0%", "1.9 Days"],
                  ["Rohtak", "196", "145", "51", "74.0%", "3.2 Days"],
                ].map((d) => (
                  <div
                    key={d[0]}
                    className="grid grid-cols-[1fr_repeat(3,auto)] items-center gap-3 border-b border-slate-50 pb-3 text-xs last:border-0"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{d[0]}</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-slate-100">
                        <div
                          style={{ width: d[4] }}
                          className="h-full rounded-full bg-emerald-500"
                        />
                      </div>
                    </div>
                    <span>
                      {d[1]}{" "}
                      <small className="block text-[9px] text-slate-400">
                        reports
                      </small>
                    </span>
                    <span className="font-bold text-emerald-700">{d[4]}</span>
                    <span className="text-slate-400">{d[5]}</span>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Recent Activity" eyebrow="Audit timeline">
              <div className="space-y-4">
                {[
                  [
                    "Government Officer approved report GV-2026-00128.",
                    "2 minutes ago",
                    "bg-emerald-500",
                  ],
                  [
                    "Rahul accepted Plastic Cleanup Task.",
                    "15 minutes ago",
                    "bg-blue-500",
                  ],
                  [
                    "Reward ₹250 assigned to cleanup task.",
                    "1 hour ago",
                    "bg-amber-500",
                  ],
                  [
                    "GV-2026-00120 escalated to Priority Queue.",
                    "2 hours ago",
                    "bg-red-500",
                  ],
                  [
                    "AI analysis completed for GV-2026-00131.",
                    "3 hours ago",
                    "bg-violet-500",
                  ],
                ].map(([a, b, c]) => (
                  <div key={a} className="flex gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${c}`}
                    />
                    <div>
                      <p className="text-xs text-slate-700">{a}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{b}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="Notifications"
              eyebrow="Notification center preview"
            >
              <div className="space-y-3">
                {[
                  "Critical report requires attention.",
                  "Volunteer deadline expires tomorrow.",
                  "New cleanup task submitted.",
                  "Reward approval required.",
                  "Government response received.",
                ].map((n, i) => (
                  <div
                    key={n}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${i < 3 ? "bg-emerald-500" : "bg-slate-300"}`}
                    />
                    <p className="flex-1 text-xs text-slate-600">{n}</p>
                    <span className="text-[10px] text-slate-400">
                      {i + 1}h ago
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => notify("All notifications opened")}
                className="mt-4 w-full rounded-lg border border-emerald-200 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
              >
                View All Notifications
              </button>
            </Section>
            <Section
              title="Quick Government Actions"
              eyebrow="Decision shortcuts"
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Review Reports", "184 pending", FileCheck2],
                  ["Priority Queue", "27 critical", Siren],
                  ["Manage Rewards", "18 awaiting approval", Award],
                  ["Manage Volunteers", "1,284 active", Users],
                ].map(([a, b, Icon]) => (
                  <button
                    key={a}
                    onClick={() => notify(`${a} opened`)}
                    className="group rounded-xl border border-slate-100 p-4 text-left transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                  >
                    <Icon size={18} className="text-emerald-600" />
                    <p className="mt-3 text-xs font-bold text-slate-800">{a}</p>
                    <p className="mt-1 text-[10px] text-slate-500">{b}</p>
                    <span className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                      Open <ArrowUpRight size={12} />
                    </span>
                  </button>
                ))}
              </div>
            </Section>
          </div>
          <footer className="flex flex-col justify-between gap-3 border-t border-emerald-100 py-5 text-[11px] text-slate-400 sm:flex-row">
            <div>
              <p className="font-bold text-slate-700">
                GreenVision <span className="text-emerald-600">AI</span>
              </p>
              <p className="mt-1">
                Environmental Intelligence & Community Cleanup Platform
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button>Privacy</button>
              <button>Terms</button>
              <button>Support</button>
              <button>Government Guidelines</button>
              <span>v1.0.0</span>
            </div>
          </footer>
        </main>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
          >
            <motion.div
              initial={{ y: 24, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                    Government verification
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {selected.id}
                  </h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid gap-5 p-5 md:grid-cols-[.9fr_1.1fr]">
                <img
                  src={selected.image}
                  alt="Report evidence"
                  className="h-52 w-full rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">
                      {selected.issue}
                    </h3>
                    <Badge tone="green">AI analyzed</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {selected.summary}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400">Location</span>
                      <b className="mt-1 block text-slate-800">
                        {selected.location}
                      </b>
                    </div>
                    <div>
                      <span className="text-slate-400">AI confidence</span>
                      <b className="mt-1 block text-emerald-700">
                        {selected.confidence}
                      </b>
                    </div>
                    <div>
                      <span className="text-slate-400">Severity</span>
                      <b className="mt-1 block text-red-600">
                        {selected.severity}
                      </b>
                    </div>
                    <div>
                      <span className="text-slate-400">Estimated waste</span>
                      <b className="mt-1 block text-slate-800">35 kg</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-5 rounded-xl bg-emerald-50 p-4">
                <p className="text-xs font-bold text-emerald-800">
                  AI analysis
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  High environmental risk detected. Suggested authority:
                  Municipal Solid Waste Department. Recommended response: within
                  24 hours.
                </p>
              </div>
              <div className="flex flex-wrap justify-end gap-2 p-5">
                <button
                  onClick={() => updateReport(selected.id, "Rejected")}
                  className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600"
                >
                  Reject Report
                </button>
                <button
                  onClick={() => notify("Priority set to Critical")}
                  className="rounded-lg border border-amber-200 px-3 py-2 text-xs font-bold text-amber-700"
                >
                  Set Priority
                </button>
                <button
                  onClick={() => {
                    setSelected(null);
                    setRewardOpen(true);
                  }}
                  className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700"
                >
                  Assign Reward
                </button>
                <button
                  onClick={() => updateReport(selected.id, "Approved")}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Approve Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {rewardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                    Reward approval
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Assign cleanup reward
                  </h2>
                </div>
                <button onClick={() => setRewardOpen(false)}>
                  <X size={18} className="text-slate-400" />
                </button>
              </div>
              <label className="mt-5 block text-xs font-bold text-slate-700">
                Reward Amount ₹
                <input
                  defaultValue="250"
                  className="mt-2 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
                />
              </label>
              <label className="mt-4 block text-xs font-bold text-slate-700">
                Reason
                <textarea
                  defaultValue="Verified environmental cleanup requirement."
                  className="mt-2 h-20 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
                />
              </label>
              <label className="mt-4 flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" className="accent-emerald-600" /> I
                approve this reward.
              </label>
              <button
                onClick={() => {
                  setRewardOpen(false);
                  notify("₹250 reward assigned successfully");
                }}
                className="mt-5 w-full rounded-lg bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Assign Reward
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 z-60 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
