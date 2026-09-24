"use client";
import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Trash2,
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Coins,
  FileText,
  Filter,
  Gift,
  HandHeart,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Map as MapIcon,
  MapPin,
  Menu,
  MoreHorizontal,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import api from "../../api/axios"



const cleanupTasks = [
  {
    id: 1,
    title: "Plastic Waste Cleanup",
    location: "Koramangala, Bangalore",
    reward: "₹500",
    priority: "High",
    deadline: "Aug 30, 2026",
    status: "Available",
    guideline:
      "Collect, segregate, and safely hand over plastic waste to the partner collection center.",
  },
  {
    id: 2,
    title: "Lake Shore Restoration",
    location: "Bellandur Lake, Bangalore",
    reward: "₹750",
    priority: "Medium",
    deadline: "Sep 04, 2026",
    status: "Available",
    guideline:
      "Remove visible litter from the marked shoreline area without disturbing the habitat.",
  },
  {
    id: 3,
    title: "Community Bin Reset",
    location: "Indiranagar, Bangalore",
    reward: "₹350",
    priority: "Low",
    deadline: "Sep 08, 2026",
    status: "Assigned",
    guideline:
      "Clean the collection point and attach the provided segregation reminder.",
  },
];

const navReports = [
  "All Reports",
  "Pending Review",
  "Accepted by Government",
  "Rejected by Government",
  "Assigned Cleanup",
  "In Progress",
  "Completed",
];


function Badge({ children, tone = "slate" }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    blue: "bg-sky-50 text-sky-700 ring-sky-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Avatar({ small = false }) {
  return (
    <div
      className={`${small ? "h-9 w-9" : "h-11 w-11"} overflow-hidden rounded-full bg-emerald-100 ring-2 ring-white`}
    >
      <img
        className="h-full w-full object-cover"
        src="https://i.pravatar.cc/120?img=12"
        alt="Jatin Kumar"
      />
    </div>
  );
}

function Sidebar({
  view,
  setView,
  reportsOpen,
  setReportsOpen,
  mobileOpen,
  setMobileOpen,
  setLogout,
}) {
  const nav = [
    ["dashboard", LayoutDashboard, "Dashboard"],
    ["reports", FileText, "My Reports"],
    ["volunteer", HandHeart, "Become a Volunteer"],
    ["tasks", ClipboardCheck, "My Cleanup Tasks"],
    ["map", MapIcon, "Map"],
    ["notifications", Bell, "Notifications"],
    ["profile", User, "My Profile"],
  ];
  const counts = {
    "Pending Review": 2,
    "Accepted by Government": 4,
    "Rejected by Government": 1,
    "Assigned Cleanup": 2,
    "In Progress": 1,
    Completed: 7,
  };
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform lg:translate-x-0 lg:shadow-none ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-left"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <Sparkles size={20} />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              GreenVision <span className="text-emerald-600">AI</span>
            </span>
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-400 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>
        <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50/70 p-3">
          <div className="relative">
            <Avatar small />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-800">
              Jatin Kumar
            </p>
            <p className="truncate text-xs text-slate-500">Bangalore, India</p>
          </div>
          <button
            aria-label="Edit profile"
            onClick={() => setView("profile")}
            className="text-emerald-600"
          >
            <Pencil size={15} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>
          {nav.map(([key, Icon, label]) => (
            <div key={key}>
              <button
                onClick={() =>
                  key === "reports"
                    ? setReportsOpen(!reportsOpen)
                    : (setView(key), setMobileOpen(false))
                }
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${view === key || (key === "reports" && view === "reportDetail") ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{label}</span>
                {key === "reports" ? (
                  <ChevronDown
                    size={15}
                    className={`transition ${reportsOpen ? "rotate-180" : ""}`}
                  />
                ) : (
                  key === "notifications" && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                      3
                    </span>
                  )
                )}
              </button>
              {key === "reports" && reportsOpen && (
                <div className="ml-8 mt-1 space-y-0.5 border-l border-emerald-100 pl-3">
                  {navReports.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setView("reports");
                        setMobileOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <span>{item}</span>
                      {counts[item] && (
                        <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold">
                          {counts[item]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-5 border-t border-slate-100 pt-4">
          <button
            onClick={() => setView("contribution")}
            className="flex w-full items-center gap-3 rounded-xl bg-amber-50 px-3 py-3 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
              <Trophy size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-bold text-slate-700">
                My Contribution
              </span>
              <span className="block text-xs text-amber-700">1,240 Stars</span>
            </span>
            <ChevronRight size={15} className="text-amber-500" />
          </button>
          <button
            onClick={() => setLogout(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ setView, setMobileOpen, query, setQuery }) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
        >
          <Menu size={19} />
        </button>
        <div>
          <p className="text-sm font-medium text-slate-500">
            Welcome back, Jatin
          </p>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            Let&apos;s make our environment cleaner together.
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 sm:flex">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports"
            className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>
        <button
          onClick={() => setView("map")}
          className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 sm:block"
          aria-label="Open map"
        >
          <MapIcon size={18} />
        </button>
        <button
          onClick={() => setView("notifications")}
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
          aria-label="Open notifications"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <button onClick={() => setView("profile")} aria-label="Open profile">
          <Avatar small />
        </button>
      </div>
    </header>
  );
}

function SectionTitle({ title, subtitle, action, onAction }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={onAction}
          className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
        >
          {action}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}

// if (loading) {
//   return (
//     <div className="p-8 text-sm text-slate-500">
//       Loading your dashboard...
//     </div>
//   );
// }
function Dashboard({ setView, query, reports, loading, setSelectedReport, reportsError }) {
    const navigate = useNavigate();
const filtered = reports.filter((r) => {
  const searchText = `
    ${r.aiAnalysis?.wasteType || ""}
    ${r.description || ""}
    ${r.location?.address || ""}
  `.toLowerCase();

  return searchText.includes(query.toLowerCase());
});

const totalReports = reports.length;

const pendingReports = reports.filter(
  (r) => r.status === "Pending Review"
).length;

const acceptedReports = reports.filter(
  (r) => r.status === "Approved"
).length;

const inProgressReports = reports.filter(
  (r) => r.status === "In Progress"
).length;

const resolvedReports = reports.filter(
  (r) => r.status === "Resolved"
).length;

const dashboardStats = [
  [
    "My Reports",
    totalReports,
    "Total submitted",
    FileText,
    "bg-emerald-50 text-emerald-700",
  ],
  [
    "Pending Reports",
    pendingReports,
    "Awaiting government review",
    Clock3,
    "bg-amber-50 text-amber-700",
  ],
  [
    "Accepted Reports",
    acceptedReports,
    "Accepted by government",
    ShieldCheck,
    "bg-sky-50 text-sky-700",
  ],
  [
    "In Progress",
    inProgressReports,
    "Cleanup currently in progress",
    Activity,
    "bg-violet-50 text-violet-700",
  ],
  [
    "Resolved Reports",
    resolvedReports,
    "Successfully resolved",
    CheckCircle2,
    "bg-orange-50 text-orange-700",
  ],
];
  return (
    <div className="space-y-8 p-5 md:p-8">
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 p-6 text-white shadow-xl shadow-emerald-100 md:p-9">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
            <Zap size={14} /> 
            Small actions. Big impact.
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Make an Impact Today
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50 md:text-base">
            Report environmental issues, participate in cleanup activities, and
            help build cleaner communities.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/create-report")
              }
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50"
            >
              + Add New Report
            </button>
            <button
              onClick={() => setView("volunteer")}
              className="rounded-xl bg-emerald-800/30 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-emerald-800/50"
            >
              Explore Cleanup Tasks
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-28 border-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full border-20 border-white/10" />
      </section>
      <section>
        <SectionTitle
          title="Your impact at a glance"
          subtitle="Keep up the momentum — your community is counting on you."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardStats.map(([name, value, sub, Icon, color]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{name}</p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>
                </div>
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
                >
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <SectionTitle
          title="My Reports"
          subtitle="Track your latest environmental reports."
          action="View All"
          onAction={() => setView("reports")}
        />
        <div className="grid gap-4 xl:grid-cols-3">
          {filtered.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              onClick={() => {
                setSelectedReport(report);
                setView("reportDetail")}}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            No reports match your search.
          </div>
        )}
      </section>
    </div>
  );
}

function ReportCard({ report, onClick }) {
  const tone =
    report.status === "Resolved"
      ? "green"
      : report.status === "Pending Review"
        ? "amber"
        : "blue";
  return (
    <button
      onClick={onClick}
      className="group flex w-full gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <img
        src={report.imageUrl}
        alt={report.aiAnalysis?.wasteType || "Waste report"}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="truncate font-bold text-slate-800">{report.aiAnalysis?.wasteType || "Environmental Report"}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              {report.aiAnalysis?.severity || "Unknown"}Severity
            </p>
          </div>
          <MoreHorizontal size={18} className="shrink-0 text-slate-300" />
        </div>
        <p className="mt-3 flex items-center gap-1 truncate text-xs text-slate-500">
          <MapPin size={13} />
          {report.location?.address ||
            `${report.location?.latitude ?? "N/A"}, ${report.location?.longitude ?? "N/A"}`}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={tone}>{report.status|| "Unknown"}</Badge>
          <span className="text-[11px] text-slate-400">{report.createdAt
              ? new Date(report.createdAt).toLocaleDateString()
              : ""}</span>
        </div>
      </div>
    </button>
  );
}

function ReportsView({reports, loading, error, setView, query, setQuery, setSelectedReport }) {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
    const list = reports.filter(
    (r) =>{
      const statusMatch = filter === "All" || r.status?.includes(filter) 
    const searchText = ` ${r.title || ""} ${r.description || ""} ${r.location?.address || ""} ${r.aiAnalysis?.wasteType || ""} `.toLowerCase();
    const searchMatch = searchText.includes(query.toLowerCase()); 
    return (statusMatch && searchMatch);
});

  if (loading) {
    return <div className="p-8">Loading reports...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Reports"
        subtitle="A complete record of the issues you have helped surface."
        action="Add New Report"
        onAction={() => navigate("/create-report")}
      />
      <div className="mb-5 flex flex-wrap gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
          <Filter size={15} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent font-semibold outline-none"
          >
            <option value="All">All</option>
  <option value="Pending Review">Pending Review</option>
  <option value="Approved">Approved</option>
  <option value="Assigned">Assigned</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
  <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-36 outline-none"
          />
        </div>
      </div>
      <div className="space-y-4">
  {list.map((r) => (
    <ReportCard
      key={r._id}
      report={r}
      onClick={() => {
        setSelectedReport(r);
        setView("reportDetail");
      }}
    />
  ))}
</div>
 {list.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
          No reports found.
        </div>
      )}
    </div>
  );
};

function getStatusTone(status) {
  switch (status) {
    case "Resolved":
      return "green";

    case "Rejected":
      return "red";

    case "Pending Review":
      return "amber";

    case "Approved":
    case "Assigned":
    case "In Progress":
    case "Escalated":
      return "blue";

    default:
      return "slate";
  }
}

function ReportDetail({ setView, report }) {
if (!report) {
    return (
      <div className="p-8">
        <p className="text-slate-500">No report selected.</p>
        <button
          onClick={() => setView("reports")}
          className="mt-3 text-emerald-600 font-semibold"
        >
          Back to My Reports
        </button>
      </div>
      );
     }
     return(
      <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Report #{report._id}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {report.aiAnalysis?.wasteType || "Environmental Report"}
          </h2>
        </div>
        <Badge tone={getStatusTone(report.status)}>{report.status}</Badge>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
            <img
              src={report.imageUrl}
              alt={report.title}
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {report.description}
                </p>
              </div>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex gap-2">
                  <MapPin size={17} className="text-emerald-600" />
                  {report.location?.address ||
  `${report.location?.latitude}, ${report.location?.longitude}`}
                </p>
                <p className="flex gap-2">
                  <CalendarDays size={17} className="text-emerald-600" />
                  Submitted{" "}
{report.createdAt
  ? new Date(report.createdAt).toLocaleDateString()
  : "Unknown date"}
                </p>
                <p className="flex gap-2">
                  <ShieldCheck size={17} className="text-emerald-600" />
                  {report.location?.latitude}° N,{" "}
{report.location?.longitude}° E
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
                <Sparkles size={19} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">
                  AI Environmental Analysis
                </h3>
                <p className="text-xs text-slate-500">
                  Analysis completed automatically
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
<div>
  <p>Waste Type</p>
  <p>{report.aiAnalysis?.wasteType || "N/A"}</p>
</div>

<div>
  <p>Confidence</p>
  <p>{report.aiAnalysis?.confidence ?? 0}%</p>
</div>

<div>
  <p>Severity</p>
  <p>{report.aiAnalysis?.severity || "N/A"}</p>
</div>

<div>
  <p>Estimated Waste</p>
  <p>
    {report.aiAnalysis?.estimateWasteKg  ?? 0} kg
  </p>
</div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-600">
             {report.aiAnalysis?.summary ||
    "No AI summary available for this report."}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Timeline report={report}/>
          <CleanupPanel  report = {report}/>
        </div>
        </div>
        </>
      
 );
}


function Timeline({report}) {
  const steps = [
    {
      label: "Report Submitted",
      done: true,
    },
    {
      label: "AI Analysis Completed",
      done: !!report.aiAnalysis,
    },

    {
  label: "Accepted by Government",
  done: [
    "Approved",
    "Assigned",
    "In Progress",
    "Resolved",
    "Escalated",
  ].includes(report.status),
},
    {
  label: "Cleanup Task Assigned",
  done:
    ["Assigned", "In Progress", "Resolved"].includes(report.status) ||
    !!report.assignedTo ||
    !!report.assignedAt,
},
    "Volunteer Accepted",
    {
  label: "Cleanup In Progress",
  done: ["In Progress", "Resolved"].includes(report.status),
},
    "Completion Submitted",
    "Government Review",
    {
  label: "Resolved",
  done: report.status === "Resolved",
},
  ];
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="font-bold text-slate-900">Government Response</h3>
      <div className="mt-5 space-y-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full ${i < 6 ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
              >
                {i < 6 ? (
                  <Check size={13} />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                )}
              </span>
              {step.done && (
                <span
                  className={`h-6 w-px ${i < 5 ? "bg-emerald-200" : "bg-slate-200"}`}
                />
              )}
            </div>
            <p
              className={`pb-2 text-sm ${step.done ? "font-semibold text-slate-700" : "text-slate-400"}`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleanupPanel({report}) {
  const [showDetails, setShowDetails] = useState(false);
  const isRejected = report.status === "Rejected";
const isEscalated = report.status === "Escalated";
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">
  {isRejected ? "Report Rejected" : isEscalated ? "Report Escalated" : "Cleanup Task"}
</h3>
        <Badge tone="green">{report.status}</Badge>
      </div>
      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Reward</span>
          <strong>₹{report.rewardAmount ?? 0}</strong>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Deadline</span>
          <strong>{report.deadline
  ? new Date(report.deadline).toLocaleDateString()
  : "Not assigned"}</strong>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-3">
  <span className="text-slate-400">Department</span>
  <strong>{report.assignedDepartment || "Not assigned"}</strong>
</div>
        <div>
          <span className="text-slate-400">{isRejected ? "Rejection Reason" : isEscalated ? "Escalation Reason" : "Guideline"}</span>
          <p className="mt-1 leading-5 text-slate-200">
             {isRejected
      ? report.rejectionReason || "No rejection reason provided."
      : isEscalated
      ? report.escalateReason || "This report has been escalated."
      : report.aiAnalysis?.possibleAction ||
        "Cleanup instructions not available."}
          </p>
        </div>
      </div>
      <button
  onClick={() => setShowDetails(!showDetails)}
  className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold hover:bg-emerald-400"
>
  {showDetails ? "Hide Task Details" : "View Task Details"}
</button>
{showDetails && (
  <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm">
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-slate-400">Report ID</span>
        <span>{report._id}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Department</span>
        <span>{report.assignedDepartment || "Not assigned"}</span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">Assigned</span>
        <span>
          {report.assignedAt
            ? new Date(report.assignedAt).toLocaleDateString()
            : "Not assigned"}
        </span>
      </div>
    </div>
  </div>
)}
    </div>
  );
}


function VolunteerView() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available cleanup tasks
  const fetchCleanupTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/cleanup/clean-up-tasks");

      if (response.data.success) {
        setTasks(response.data.cleanupTasks || []);
      }
    } catch (error) {
      console.error("Error fetching cleanup tasks:", error);

      setError(
        error.response?.data?.message ||
          "Unable to fetch cleanup tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCleanupTasks();
  }, []);

  // Accept cleanup task
  const handleAcceptTask = async (taskId) => {
    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cleanup/${taskId}/accept`
      );
  
      if (response.data.success) {
        alert("Cleanup task accepted successfully!");

        // Refresh available tasks
        await fetchCleanupTasks();

        // Open the accepted task
        setActiveTask(response.data.cleanupTask);
      }
    } catch (error) {
      console.error("Accept task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to accept cleanup task."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Start cleanup task
  const handleStartTask = async (taskId) => {
    try {
      setActionLoading(true);

      const response = await api.patch(
        `/cleanup/${taskId}/start`
      );

      if (response.data.success) {
        alert("Cleanup task started!");

        setActiveTask(response.data.cleanupTask);

        // Refresh available tasks
        await fetchCleanupTasks();
      }
    } catch (error) {
      console.error("Start task error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to start cleanup task."
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 md:p-8">
        <SectionTitle
          title="Become a Volunteer"
          subtitle="Find nearby cleanup tasks and contribute to your community."
        />

        <div className="mt-10 flex justify-center">
          <div className="text-sm text-slate-500">
            Loading cleanup tasks...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Become a Volunteer"
        subtitle="Find cleanup tasks and contribute to your community."
      />

      <div className="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
        <span className="font-bold">Good to know:</span>{" "}
        There is no separate volunteer role. You can use your
        existing GreenVision citizen account to accept cleanup
        tasks.
      </div>

      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
            <Trash2 className="text-emerald-600" size={25} />
          </div>

          <h3 className="mt-4 font-bold text-slate-900">
            No Cleanup Tasks Available
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            There are currently no approved cleanup tasks available
            for volunteers.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    Cleanup Task
                  </h3>

                  <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin
                      size={15}
                      className="text-emerald-600"
                    />

                    {task.report?.description ||
                      "Cleanup required at reported location"}
                  </p>
                </div>

                <Badge tone="green">
                  {task.status}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Reward
                  </p>

                  <p className="mt-1 font-bold text-emerald-700">
                    ₹{task.reward?.amount ?? 0}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Deadline
                  </p>

                  <p className="mt-1 font-semibold text-slate-700">
                    {task.deadline
                      ? new Date(
                          task.deadline
                        ).toLocaleDateString()
                      : "Not assigned"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Cleanup Guideline
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {task.guideline ||
                    "Follow the cleanup instructions provided for this task."}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                {task.status === "available" && (
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      handleAcceptTask(task._id)
                    }
                    className="flex-1 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading
                      ? "Accepting..."
                      : "Accept Task"}
                  </button>
                )}

                {task.status === "assigned" && (
                  <button
                    disabled={actionLoading}
                    onClick={() =>
                      handleStartTask(task._id)
                    }
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {actionLoading
                      ? "Starting..."
                      : "Start Cleanup"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Task */}
      {activeTask && (
        <div className="mt-8 rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">
                Your Active Cleanup Task
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Task ID: {activeTask._id}
              </p>
            </div>

            <Badge tone="green">
              {activeTask.status}
            </Badge>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-400">
                Reward
              </p>

              <p className="mt-1 font-bold">
                ₹{activeTask.reward?.amount ?? 0}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Deadline
              </p>

              <p className="mt-1 font-semibold">
                {activeTask.deadline
                  ? new Date(
                      activeTask.deadline
                    ).toLocaleDateString()
                  : "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Status
              </p>

              <p className="mt-1 font-semibold">
                {activeTask.status}
              </p>
            </div>
          </div>

          {activeTask.status === "in-progress" && (
            <button
              onClick={() => {
                // Completion UI will be implemented next
                alert(
                  "Next step: submit before and after cleanup images."
                );
              }}
              className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-400"
            >
              Submit Cleanup Completion
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function MapView({ setView }) {
  const [selected, setSelected] = useState(0);
  const markers = [
    {
      color: "bg-rose-500",
      x: "30%",
      y: "40%",
      title: "Plastic Waste",
      place: "Bangalore",
      severity: "High Severity",
      date: "Reported Aug 24",
    },
    {
      color: "bg-orange-500",
      x: "62%",
      y: "28%",
      title: "Illegal Dumping",
      place: "Bellandur",
      severity: "Medium Severity",
      date: "Reported Aug 18",
    },
    {
      color: "bg-emerald-500",
      x: "74%",
      y: "65%",
      title: "Overflowing Bin",
      place: "Indiranagar",
      severity: "Resolved",
      date: "Reported Aug 10",
    },
  ];
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Environmental Issues Map"
        subtitle="Explore community reports and cleanup activity around Bangalore."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
        <div className="relative min-h-125 overflow-hidden rounded-3xl border border-emerald-100 bg-[#dcefe4] shadow-inner">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(30deg, transparent 48%, #b8dac6 49%, #b8dac6 50%, transparent 51%), linear-gradient(115deg, transparent 48%, #c1dfce 49%, #c1dfce 50%, transparent 51%)",
              backgroundSize: "100px 100px",
            }}
          />
          <div className="absolute inset-x-0 top-5 text-center text-xs font-bold uppercase tracking-[0.2em] text-emerald-800/50">
            Bangalore community map
          </div>
          {markers.map((m, i) => (
            <button
              key={m.title}
              onClick={() => setSelected(i)}
              style={{ left: m.x, top: m.y }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 shadow-lg ring-4 ring-white/60 transition hover:scale-110 ${m.color}`}
              aria-label={`Select ${m.title}`}
            >
              <MapPin size={20} fill="currentColor" className="text-white" />
            </button>
          ))}
          <div className="absolute bottom-5 left-5 w-56 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
            <p className="font-bold text-slate-800">
              {markers[selected].title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {markers[selected].place} · {markers[selected].date}
            </p>
            <Badge
              tone={selected === 0 ? "red" : selected === 1 ? "amber" : "green"}
            >
              {markers[selected].severity}
            </Badge>
            <button
              onClick={() => setView("reportDetail")}
              className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-600"
            >
              View Report <ArrowRight size={13} />
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Filter Issues</h3>
            <ListFilter size={18} className="text-slate-400" />
          </div>
          <div className="mt-5 space-y-4">
            {[
              "High Severity",
              "Medium Severity",
              "Low Severity",
              "Resolved",
              "In Progress",
            ].map((item, i) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-emerald-600"
                />
                {item}
                <span
                  className={`ml-auto h-2.5 w-2.5 rounded-full ${["bg-rose-500", "bg-orange-500", "bg-yellow-400", "bg-emerald-500", "bg-sky-500"][i]}`}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsView() {
  const [items, setItems] = useState([
    {
      title: "Government accepted your report",
      body: "Plastic Waste Report #GV-1024 has been accepted.",
      time: "2 minutes ago",
      unread: true,
      icon: ShieldCheck,
    },
    {
      title: "Cleanup task assigned",
      body: "You have been assigned a cleanup task near Koramangala.",
      time: "1 hour ago",
      unread: true,
      icon: ClipboardCheck,
    },
    {
      title: "Reward received",
      body: "You earned ₹500 for completing a cleanup task.",
      time: "Yesterday",
      unread: true,
      icon: Gift,
    },
    {
      title: "Report resolved",
      body: "Your reported environmental issue has been resolved.",
      time: "2 days ago",
      unread: false,
      icon: CheckCircle2,
    },
  ]);
  const mark = (i) =>
    setItems(items.map((n, x) => (x === i ? { ...n, unread: false } : n)));
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Notifications"
        subtitle="Stay updated on your reports and cleanup activities."
        action="Mark all as read"
        onAction={() => setItems(items.map((n) => ({ ...n, unread: false })))}
      />
      <div className="max-w-3xl space-y-3">
        {items.map((n, i) => {
          const Icon = n.icon;
          return (
            <button
              key={n.title}
              onClick={() => mark(i)}
              className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition hover:border-emerald-200 ${n.unread ? "border-emerald-100 bg-emerald-50/50" : "border-slate-100 bg-white"}`}
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${n.unread ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap justify-between gap-2">
                  <strong className="text-sm text-slate-800">{n.title}</strong>
                  <small className="text-xs text-slate-400">{n.time}</small>
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {n.body}
                </span>
              </span>
              {n.unread && (
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProfileView({ setLogout }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Profile"
        subtitle="Manage your citizen profile and personal information."
      />
      <div className="max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-5 border-b border-slate-100 pb-7">
          <Avatar />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">Jatin Kumar</h2>
            <p className="mt-1 text-sm text-slate-500">
              Bangalore, India · Citizen
            </p>
            <button className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
              <Upload size={14} />
              Change Photo
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(!editing)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700"
            >
              {editing ? "Save Changes" : "Edit Profile"}
            </button>
            <button
              onClick={() => setLogout(true)}
              className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {[
            ["Full Name", "Jatin Kumar"],
            ["Email", "jatin.kumar@example.com"],
            ["Phone Number", "+91 98765 43210"],
            ["City", "Bangalore"],
            ["Location", "Karnataka, India"],
            ["Member Since", "January 2026"],
            ["Role", "Citizen"],
          ].map(([label, value]) => (
            <label key={label} className="text-sm font-semibold text-slate-600">
              {label}
              <input
                disabled={!editing}
                defaultValue={value}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none disabled:opacity-80 focus:border-emerald-400"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContributionView() {
  const rows = [
    ["Reports Submitted", "+240"],
    ["Cleanup Tasks Completed", "+700"],
    ["Community Actions", "+200"],
    ["Resolved Issues", "+100"],
  ];
  const leaders = [
    ["Ananya Sharma", "2,450"],
    ["Rahul Mehta", "2,180"],
    ["Jatin Kumar", "1,240"],
    ["Priya Singh", "1,120"],
  ];
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Contribution"
        subtitle="Every star reflects a cleaner, healthier community."
      />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-7 text-white shadow-xl shadow-orange-100">
          <Star size={28} fill="currentColor" />
          <p className="mt-8 text-sm font-semibold text-orange-50">
            Current contribution score
          </p>
          <p className="mt-1 text-5xl font-black">1,240</p>
          <p className="mt-3 text-sm text-orange-50">
            You&apos;re in the top 12% of contributors in Bangalore.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">
            How you earned your stars
          </h3>
          <div className="mt-5 space-y-4">
            {rows.map(([a, b]) => (
              <div
                key={a}
                className="flex justify-between border-b border-slate-100 pb-3 text-sm"
              >
                <span className="text-slate-500">{a}</span>
                <strong className="text-emerald-600">{b}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Community leaderboard</h3>
          <Trophy size={19} className="text-amber-500" />
        </div>
        <div className="mt-4 space-y-2">
          {leaders.map(([name, score], i) => (
            <div
              key={name}
              className={`flex items-center gap-4 rounded-xl p-3 ${name === "Jatin Kumar" ? "bg-emerald-50 ring-1 ring-emerald-100" : ""}`}
            >
              <span className="w-5 text-center font-bold text-slate-400">
                #{i + 1}
              </span>
              <Avatar small />
              <span className="flex-1 text-sm font-semibold text-slate-700">
                {name}
              </span>
              <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                {score} <Star size={14} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get("view") || "dashboard";
  const [view, setView] = useState(initialView);
  const [reportsOpen, setReportsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState("");

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        setReportsLoading(true);
        const response = await api.get("/reports/my-reports");
        console.log("Dashboard reports:", response.data);
        setReports(response.data.reports || []);
      } catch (error) {
        console.error(
          "Error fetching dashboard reports:",
          error.response?.data || error.message
        );
        setReportsError(
          error.response?.data?.message ||
            "Failed to fetch your reports"
        );
      } finally {
        setReportsLoading(false);
      }
    };
    fetchMyReports();
  }, []);

  const content =
    view === "dashboard" ? (
      <Dashboard setView={setView} query={query} reports={reports} loading={reportsLoading} setSelectedReport={setSelectedReport} reportsError={reportsError}/>
    ) : view === "reports" ? (
      <ReportsView reports={reports} loading={reportsLoading} error={reportsError} setView={setView} query={query} setQuery={setQuery} setSelectedReport={setSelectedReport}/>
    ) : view === "reportDetail" ? (
      <ReportDetail setView={setView} report={selectedReport}/>
    ) : view === "volunteer" || view === "tasks" ? (
      <VolunteerView  reports={reports}/>
    ) : view === "map" ? (
      <MapView setView={setView} />
    ) : view === "notifications" ? (
      <NotificationsView />
    ) : view === "profile" ? (
      <ProfileView setLogout={setLogout} />
    ) : (
      <ContributionView />
    );
  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900">
      <Sidebar
        {...{
          view,
          setView,
          reportsOpen,
          setReportsOpen,
          mobileOpen,
          setMobileOpen,
          setLogout,
        }}
      />
      <div className="min-h-screen lg:pl-72">
        <Header {...{ setView, setMobileOpen, query, setQuery }} />
        <main>{content}</main>
      </div>
      {logout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <LogOut size={20} />
              </div>
              <button
                onClick={() => setLogout(false)}
                className="text-slate-400"
              >
                <X size={18} />
              </button>
            </div>
            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Are you sure you want to logout?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You can always sign back in to continue your environmental impact
              journey.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setLogout(false)}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => setLogout(false)}
                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
