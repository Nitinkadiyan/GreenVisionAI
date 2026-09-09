"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  FileSearch,
  Users,
  UserRound,
  Settings,
  Leaf,
  MapPin,
  Home,
  FileCheck2,
  ClipboardCheck,
  Menu,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";

const mockReports = [
  {
    _id: "GV-2026-00124",
    userId: "citizen-1042",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    description:
      "Plastic waste dumped near Sector 12 park. Immediate cleanup required.",
    location: { latitude: 29.6857, longitude: 76.9905 },
    status: "Pending Review",
    aiAnalysis: {
      wasteType: "Plastic Waste Dump",
      confidence: 98,
      severity: "Critical",
      environmentalRisk:
        "Attraction of pests and possible contamination of nearby soil and runoff.",
      possibleAction: "Dispatch municipal waste management services.",
      suggestedAuthority: "Municipal Waste Management Department",
      summary:
        "The image indicates a significant accumulation of mixed plastic waste requiring immediate intervention.",
    },
    createdAt: "2026-08-21T06:56:12.835Z",
  },
  {
    _id: "GV-2026-00123",
    userId: "citizen-0921",
    imageUrl:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1000&q=80",
    description: "Overflowing garbage containers behind the community market.",
    location: { latitude: 28.6139, longitude: 77.209 },
    status: "Approved",
    aiAnalysis: {
      wasteType: "Municipal Solid Waste",
      confidence: 95,
      severity: "High",
      environmentalRisk:
        "Foul odor, disease vectors and blocked access for collection vehicles.",
      possibleAction:
        "Schedule an urgent collection route and sanitize the area.",
      suggestedAuthority: "City Sanitation Division",
      summary:
        "Two collection bins are overflowing with household refuse near a busy public market.",
    },
    createdAt: "2026-08-20T10:20:12.835Z",
  },
  {
    _id: "GV-2026-00122",
    userId: "citizen-0874",
    imageUrl:
      "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=80",
    description: "Construction debris left on the roadside after roadwork.",
    location: { latitude: 30.7333, longitude: 76.7794 },
    status: "Pending Review",
    aiAnalysis: {
      wasteType: "Construction Debris",
      confidence: 91,
      severity: "Medium",
      environmentalRisk:
        "Dust pollution and obstruction of pedestrian drainage access.",
      possibleAction: "Issue a removal notice to the responsible contractor.",
      suggestedAuthority: "Public Works Department",
      summary:
        "A moderate pile of concrete fragments and soil is obstructing the shoulder of the road.",
    },
    createdAt: "2026-08-19T08:15:12.835Z",
  },
  {
    _id: "GV-2026-00121",
    userId: "citizen-0772",
    imageUrl:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1000&q=80",
    description: "Discarded electronic components beside a drainage canal.",
    location: { latitude: 22.5726, longitude: 88.3639 },
    status: "Rejected",
    aiAnalysis: {
      wasteType: "Electronic Waste",
      confidence: 87,
      severity: "High",
      environmentalRisk: "Potential leaching of heavy metals into groundwater.",
      possibleAction:
        "Verify site ownership and route material to an authorized recycler.",
      suggestedAuthority: "Hazardous Waste Control Office",
      summary:
        "The material appears to be e-waste, but the image does not provide enough context to verify the exact site.",
    },
    createdAt: "2026-08-17T12:42:12.835Z",
  },
  {
    _id: "GV-2026-00120",
    userId: "citizen-1139",
    imageUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=80",
    description:
      "Large pile of organic waste attracting insects near the river path.",
    location: { latitude: 19.076, longitude: 72.8777 },
    status: "Approved",
    aiAnalysis: {
      wasteType: "Organic Waste",
      confidence: 89,
      severity: "Medium",
      environmentalRisk:
        "Methane emissions and contamination risk during heavy rain.",
      possibleAction:
        "Remove waste and add the location to the compost collection route.",
      suggestedAuthority: "Parks and Environment Unit",
      summary:
        "Organic waste has accumulated along a public walking path and should be removed before rainfall.",
    },
    createdAt: "2026-08-16T09:30:12.835Z",
  },
  {
    _id: "GV-2026-00119",
    userId: "citizen-0608",
    imageUrl:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1000&q=80",
    description: "Abandoned waste bags beside a protected green belt.",
    location: { latitude: 12.9716, longitude: 77.5946 },
    status: "Pending Review",
    aiAnalysis: {
      wasteType: "Mixed Household Waste",
      confidence: 96,
      severity: "Critical",
      environmentalRisk:
        "Threat to protected vegetation and increased risk of animal ingestion.",
      possibleAction:
        "Dispatch a cleanup crew and inspect for repeat dumping activity.",
      suggestedAuthority: "Urban Forestry Authority",
      summary:
        "Several large waste bags have been dumped beside a protected green belt.",
    },
    createdAt: "2026-08-15T05:44:12.835Z",
  },
  {
    _id: "GV-2026-00118",
    userId: "citizen-1290",
    imageUrl:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80",
    description:
      "Unauthorized disposal of bottles and packaging near a bus stop.",
    location: { latitude: 17.385, longitude: 78.4867 },
    status: "Approved",
    aiAnalysis: {
      wasteType: "Plastic Packaging",
      confidence: 93,
      severity: "Low",
      environmentalRisk:
        "Litter migration into storm drains and reduced public hygiene.",
      possibleAction:
        "Clear litter and add a waste separation sign to the stop.",
      suggestedAuthority: "Transit Facilities Team",
      summary:
        "Light plastic litter is present near a high-footfall transit location.",
    },
    createdAt: "2026-08-13T14:20:12.835Z",
  },
  {
    _id: "GV-2026-00117",
    userId: "citizen-1164",
    imageUrl:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1000&q=80",
    description:
      "Discarded tires and rubber materials behind an industrial estate.",
    location: { latitude: 13.0827, longitude: 80.2707 },
    status: "Rejected",
    aiAnalysis: {
      wasteType: "Rubber Waste",
      confidence: 84,
      severity: "High",
      environmentalRisk:
        "Standing water and smoke pollution if materials are burned.",
      possibleAction:
        "Request a clearer image and exact industrial plot number.",
      suggestedAuthority: "Industrial Compliance Cell",
      summary:
        "The report is plausible but the current image cannot confirm the location or responsible party.",
    },
    createdAt: "2026-08-12T07:05:12.835Z",
  },
  {
    _id: "GV-2026-00116",
    userId: "citizen-1005",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1000&q=80",
    description:
      "Small illegal dumping spot identified beside a rural access road.",
    location: { latitude: 26.9124, longitude: 75.7873 },
    status: "Pending Review",
    aiAnalysis: {
      wasteType: "Mixed Construction Waste",
      confidence: 90,
      severity: "Critical",
      environmentalRisk:
        "Possible soil contamination and obstruction of emergency access.",
      possibleAction:
        "Coordinate removal with the district waste response team.",
      suggestedAuthority: "District Environmental Office",
      summary:
        "A recurring dumping spot has formed beside a rural access road and needs a rapid response.",
    },
    createdAt: "2026-08-10T11:10:12.835Z",
  },
];
const NAV = [
  ["Overview", Home],
  ["Reports", FileCheck2],
  ["Cleanup Tasks", ClipboardCheck],
  ["Completion Reviews", ShieldCheck],
  ["Environmental Map", Map],
  ["Analytics", Activity],
  ["Users & Contributors", Users],
  ["My Profile", UserRound],
  ["Settings", Settings],
];
const severityStyles = {
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};
const statusStyles = {
  "Pending Review": "bg-blue-50 text-blue-700 border-blue-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
const severityScore = { Low: 1, Medium: 2, High: 3, Critical: 4 };

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

export default function ReportSection() {
  const [reports, setReports] = useState(mockReports);
  const [activeTab, setActiveTab] = useState("All Reports");
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All Severities");
  const [status, setStatus] = useState("All Status");
  const [sort, setSort] = useState("Newest First");
   const [activeNav, setActiveNav] = useState("Dashboard");
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const counts = useMemo(
    () => ({
      all: reports.length,
      pending: reports.filter((r) => r.status === "Pending Review").length,
      approved: reports.filter((r) => r.status === "Approved").length,
      rejected: reports.filter((r) => r.status === "Rejected").length,
      critical: reports.filter((r) => r.aiAnalysis.severity === "Critical")
        .length,
    }),
    [reports],
  );
  const filteredReports = useMemo(() => {
    const result = reports.filter((report) => {
      const haystack =
        `${report._id} ${report.description} ${report.aiAnalysis.wasteType} ${report.location.latitude} ${report.location.longitude}`.toLowerCase();
      const tabMatch =
        activeTab === "All Reports" ||
        (activeTab === "Critical Reports"
          ? report.aiAnalysis.severity === "Critical"
          : report.status ===
            activeTab
              .replace(" Reports", "")
              .replace("Pending", "Pending Review"));
      return (
        tabMatch &&
        haystack.includes(query.toLowerCase()) &&
        (severity === "All Severities" ||
          report.aiAnalysis.severity === severity) &&
        (status === "All Status" || report.status === status)
      );
    });
    return result.sort((a, b) =>
      sort === "Oldest First"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : sort === "Highest Severity"
          ? severityScore[b.aiAnalysis.severity] -
            severityScore[a.aiAnalysis.severity]
          : sort === "Highest AI Confidence"
            ? b.aiAnalysis.confidence - a.aiAnalysis.confidence
            : new Date(b.createdAt) - new Date(a.createdAt),
    );
  }, [reports, activeTab, query, severity, status, sort]);

  const updateStatus = (id, nextStatus) => {
    // TODO: Replace with Axios PATCH /reports/${id} when the API is connected.
    setReports((current) =>
      current.map((report) =>
        report._id === id ? { ...report, status: nextStatus } : report,
      ),
    );
    setSelected((current) =>
      current && current._id === id
        ? { ...current, status: nextStatus }
        : current,
    );
  };
  const clearFilters = () => {
    setActiveTab("All Reports");
    setQuery("");
    setSeverity("All Severities");
    setStatus("All Status");
    setSort("Newest First");
  };
  // TODO: Replace mockReports with Axios GET /reports/get-reports and setIsLoading around the request.

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="flex-1 space-y-1">
        {NAV.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => {
              setActiveNav(name);
              setMobileNav(false);
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
      <main className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3">
            <button
              className="rounded-md p-2 hover:bg-muted lg:hidden"
              onClick={() => setMobileNav(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>Government Command Center</span>
              <span>/</span>
              <span className="font-medium text-foreground">Reports</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-emerald-500" />
            </button>
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
              DO
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-375 px-4 py-7 sm:px-7 lg:px-9">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Live review queue
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Environmental Reports
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Review, verify and manage environmental reports submitted by
                citizens.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 500);
                }}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold shadow-sm transition hover:bg-muted"
              >
                <RefreshCw
                  size={15}
                  className={isLoading ? "animate-spin" : ""}
                />
                Refresh queue
              </button>
              <button className="hidden rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800 sm:block">
                Export report
              </button>
            </div>
          </div>
          <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              ["All Reports", counts.all, ClipboardList, "all"],
              ["Pending Reports", counts.pending, Clock3, "pending"],
              ["Approved Reports", counts.approved, CheckCircle2, "approved"],
              ["Rejected Reports", counts.rejected, XCircle, "rejected"],
              ["Critical Reports", counts.critical, AlertTriangle, "critical"],
            ].map(([label, count, Icon, key]) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`group rounded-xl border p-4 text-left transition ${activeTab === label ? "border-emerald-300 bg-emerald-50 shadow-sm" : "border-border bg-card hover:border-emerald-200 hover:bg-muted/40"}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-8 items-center justify-center rounded-lg ${activeTab === label ? "bg-emerald-700 text-white" : "bg-muted text-muted-foreground group-hover:text-emerald-700"}`}
                  >
                    <Icon size={16} />
                  </span>
                  <span className="text-2xl font-semibold tracking-tight">
                    {count}
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-muted-foreground">
                  {label}
                </p>
              </button>
            ))}
          </section>
          <section className="mt-7 rounded-xl border border-border bg-card p-3 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search reports by ID, issue or location..."
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-emerald-500"
                >
                  <option>All Severities</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-emerald-500"
                >
                  <option>All Status</option>
                  <option>Pending Review</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="col-span-2 h-10 rounded-lg border border-input bg-background px-3 text-xs font-medium outline-none focus:border-emerald-500 sm:col-span-1"
                >
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Highest Severity</option>
                  <option>Highest AI Confidence</option>
                </select>
              </div>
            </div>
          </section>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Showing{" "}
              <span className="text-foreground">{filteredReports.length}</span>{" "}
              of {reports.length} reports
            </p>
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Clear all filters
            </button>
          </div>
          {isLoading ? (
            <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="h-44 bg-muted" />
                  <div className="space-y-3 p-5">
                    <div className="h-4 w-2/5 rounded bg-muted" />
                    <div className="h-6 w-4/5 rounded bg-muted" />
                    <div className="h-4 w-3/5 rounded bg-muted" />
                    <div className="h-10 rounded bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <FileSearch size={26} />
              </div>
              <h2 className="mt-5 text-lg font-semibold">No reports found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your filters or search query.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredReports.map((report) => (
                <article
                  key={report._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img
                      src={report.imageUrl}
                      alt={report.aiAnalysis.wasteType}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-emerald-950/55 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm">
                      <Sparkles size={12} /> AI Verified
                    </span>
                    <span className="absolute bottom-3 left-4 font-mono text-[10px] font-semibold tracking-wide text-white/90">
                      {report._id}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold tracking-tight">
                          {report.aiAnalysis.wasteType}
                        </h2>
                        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                          {report.description}
                        </p>
                      </div>
                      <Badge
                        className={severityStyles[report.aiAnalysis.severity]}
                      >
                        {report.aiAnalysis.severity}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={14} className="text-emerald-700" />
                      <span>
                        {report.location.latitude.toFixed(4)},{" "}
                        {report.location.longitude.toFixed(4)}
                      </span>
                      <span className="ml-auto">
                        {formatDate(report.createdAt)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="mb-1.5 flex justify-between text-[11px]">
                        <span className="text-muted-foreground">
                          AI confidence
                        </span>
                        <span className="font-semibold text-foreground">
                          {report.aiAnalysis.confidence}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${report.aiAnalysis.confidence}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge className={statusStyles[report.status]}>
                        {report.status}
                      </Badge>
                      <button
                        onClick={() => setSelected(report)}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                      >
                        View report <span aria-hidden="true">→</span>
                      </button>
                    </div>
                    <div className="mt-5 flex gap-2 border-t border-border pt-4">
                      <button
                        disabled={report.status === "Approved"}
                        onClick={() => updateStatus(report._id, "Approved")}
                        className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Check size={14} className="mr-1 inline" />
                        Approve
                      </button>
                      <button
                        disabled={report.status === "Rejected"}
                        onClick={() => updateStatus(report._id, "Rejected")}
                        className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <X size={14} className="mr-1 inline" />
                        Reject
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-detail-title"
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-card shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {selected._id}
                  </span>
                  <Badge className={statusStyles[selected.status]}>
                    {selected.status}
                  </Badge>
                  <Badge
                    className={severityStyles[selected.aiAnalysis.severity]}
                  >
                    {selected.aiAnalysis.severity}
                  </Badge>
                </div>
                <h2
                  id="report-detail-title"
                  className="mt-2 text-xl font-semibold"
                >
                  {selected.aiAnalysis.wasteType}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close report details"
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <img
                  src={selected.imageUrl}
                  alt={selected.aiAnalysis.wasteType}
                  className="h-64 w-full rounded-xl object-cover sm:h-80"
                />
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Issue / waste type
                    </p>
                    <p className="mt-1 font-medium">
                      {selected.aiAnalysis.wasteType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Submitted date
                    </p>
                    <p className="mt-1 font-medium">
                      {formatDate(selected.createdAt)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="mt-1 leading-6">{selected.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Latitude</p>
                    <p className="mt-1 font-mono text-xs">
                      {selected.location.latitude}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Longitude</p>
                    <p className="mt-1 font-mono text-xs">
                      {selected.location.longitude}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <Sparkles size={16} /> AI Analysis
                </div>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
                  <div>
                    <p className="text-[11px] text-emerald-800/65">
                      Waste type
                    </p>
                    <p className="mt-1 font-medium text-emerald-950">
                      {selected.aiAnalysis.wasteType}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-emerald-800/65">
                      Confidence
                    </p>
                    <p className="mt-1 font-semibold text-emerald-950">
                      {selected.aiAnalysis.confidence}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-emerald-800/65">Severity</p>
                    <p className="mt-1 font-medium text-emerald-950">
                      {selected.aiAnalysis.severity}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-emerald-800/65">
                      Suggested authority
                    </p>
                    <p className="mt-1 font-medium text-emerald-950">
                      {selected.aiAnalysis.suggestedAuthority}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[11px] text-emerald-800/65">
                      Environmental risk
                    </p>
                    <p className="mt-1 leading-5 text-emerald-950">
                      {selected.aiAnalysis.environmentalRisk}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[11px] text-emerald-800/65">
                      Possible action
                    </p>
                    <p className="mt-1 leading-5 text-emerald-950">
                      {selected.aiAnalysis.possibleAction}
                    </p>
                  </div>
                  <div className="col-span-2 border-t border-emerald-200 pt-4">
                    <p className="text-[11px] text-emerald-800/65">
                      AI summary
                    </p>
                    <p className="mt-1 leading-5 text-emerald-950">
                      {selected.aiAnalysis.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border border-border px-4 py-2.5 text-xs font-semibold hover:bg-muted"
              >
                Close
              </button>
              <button
                onClick={() => updateStatus(selected._id, "Rejected")}
                className="rounded-lg border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                Reject report
              </button>
              <button
                onClick={() => updateStatus(selected._id, "Approved")}
                className="rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800"
              >
                Approve report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
