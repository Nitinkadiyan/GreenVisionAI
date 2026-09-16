"use client";
import axios from "axios";
import { useMemo, useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bell,
  Mail,
  Phone,
  
  Save,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Filter,
  Flame,
  Globe2,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  MoreHorizontal,
  Plus,
  Recycle,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const notifications = [
  {
    title: "New critical report submitted",
    text: "Plastic waste near Sector 12 park needs review.",
    time: "8 min ago",
    type: "critical",
    unread: true,
  },
  {
    title: "Cleanup completion submitted",
    text: "USR-2144 uploaded before and after evidence.",
    time: "24 min ago",
    type: "success",
    unread: true,
  },
  {
    title: "AI verification needs review",
    text: "Report GV-1018 has a 76% match confidence.",
    time: "1 hr ago",
    type: "ai",
    unread: true,
  },
  {
    title: "Cleanup deadline approaching",
    text: "Task CL-4090 is due in less than 12 hours.",
    time: "2 hrs ago",
    type: "clock",
    unread: false,
  },
];

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    sky: "bg-sky-50 text-sky-700",
    violet: "bg-violet-50 text-violet-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone] || tones.slate}`}
    >
      {children}
    </span>
  );
}

function statusTone(status) {
  if (status === "Critical" || status === "Escalated") return "rose";
  if (status === "Pending Review" || status === "Under Review") return "amber";
  if (status === "Approved" || status === "Completed") return "emerald";
  if (status === "In Progress") return "sky";
  return "slate";
}

export default function governmentDashboard() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [reportTab, setReportTab] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [taskModal, setTaskModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const [toast, setToast] = useState("");
  const [reportState, setReportState] = useState([]);
  const [cleanupTasks, setCleanupTasks] = useState([]);
  const [profile, setProfile] = useState({
    name: "Governement Officer",
    role: "Municipal Environmental Officer",
    district: "Karnal",
    email: "kadiyanjatin99@gmail.com",
    phone: "8295048494",
  });
  const navigate = useNavigate();
  const TotalReports = reportState.length;
  const TotalCleanuptasks = cleanupTasks.length;
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "reports", label: "Reports", icon: FileSearch, count: TotalReports },
    {
      id: "tasks",
      label: "Cleanup Tasks",
      icon: ClipboardCheck,
      count: TotalCleanuptasks,
    },
    { id: "map", label: "Environmental Map", icon: Globe2 },
    { id: "volunteers", label: "Volunteers", icon: Users },
    { id: "rewards", label: "Rewards", icon: Sparkles },
    { id: "notifications", label: "Notifications", icon: Bell, count: 7 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = async () => {
    console.log("logout function started");
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(showToast("Logged Out Successfully"), 2000);
      navigate("/login");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      showToast("Please Login First");
      return;
    }
    getAllReports();
    getAllCleanups();
  }, []);
  const getAllCleanups = async () => {
    console.log("nikku doing work");
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5001/volunteer/clean-up-tasks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("FULL Cleanup Response:", response.data.cleanupTasks);
    setCleanupTasks(response.data.cleanupTasks || []);
  };

  const getAllReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5001/reports/get-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("FULL RESPONSE:", response.data);
      // console.log("REPORTS:", response.data.reports);

      setReportState(response.data.reports || []);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredReports = useMemo(
    () =>
      reportState.filter((report) => {
        const matchesSearch = [
          report.id,
          report.userId,
          report.description,
          report.address,
          report.priority,
          report.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesTab =
          reportTab === "All" ||
          report.status === reportTab ||
          (reportTab === "Critical" && report.priority === "Critical");
        return matchesSearch && matchesTab;
      }),
    [reportState, search, reportTab],
  );
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };
  const chooseNav = (id) => {
    setActive(id);
    setMobileOpen(false);
  };
  const createCleanupTask = async (taskData) => {
    try {
      console.log("Post request starting");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5001/volunteer/create-cleanup-task",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      console.log("Task Created :", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating cleanup task:",
        error.response?.data || error,
      );
      throw error;
    }
  };
  return (
    <div className="min-h-screen bg-[#f5f8f7] text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-emerald-950/10 bg-[#073b35] text-white transition-all duration-300 ${collapsed ? "w-19.5" : "w-64.5"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex h-19.5 items-center gap-3 border-b border-white/10 px-5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-[#073b35] shadow-lg shadow-emerald-950/20">
            <Leaf size={22} strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold tracking-tight">
                GreenVision <span className="text-emerald-300">AI</span>
              </p>
              <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-100/55">
                Command Center
              </p>
            </div>
          )}
        </div>
        <nav className="flex-1 px-3 py-6">
          <p
            className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/35 ${collapsed ? "text-center" : ""}`}
          >
            {collapsed ? "•" : "Operations"}
          </p>
          <div className="flex flex-col gap-1">
            {navItems.map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => chooseNav(id)}
                title={collapsed ? label : undefined}
                className={`group flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[13px] font-medium transition-all ${active === id ? "bg-emerald-400 text-[#073b35] shadow-lg shadow-emerald-950/20" : "text-emerald-50/65 hover:bg-white/8 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
              >
                <Icon size={18} strokeWidth={active === id ? 2.4 : 1.8} />
                <span className={collapsed ? "hidden" : "flex-1"}>{label}</span>
                {count && !collapsed && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${active === id ? "bg-[#073b35]/15 text-[#073b35]" : "bg-white/10 text-emerald-100/70"}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-emerald-100/55 transition hover:bg-white/8 hover:text-white ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut size={18} />
            <span className={collapsed ? "hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>

      <div
        className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:pl-19.5" : "lg:pl-64.5"}`}
      >
        <header className="sticky top-0 z-30 flex h-19.5 items-center justify-between border-b border-slate-200/80 bg-[#f5f8f7]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-9">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-slate-500 hover:bg-white lg:hidden"
            >
              <Menu size={21} />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-lg p-2 text-slate-400 hover:bg-white lg:block"
            >
              <ChevronLeft
                size={19}
                className={collapsed ? "rotate-180 transition" : "transition"}
              />
            </button>
            <div>
              <p className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-700/70 sm:block">
                City Environmental Department
              </p>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                {active === "dashboard"
                  ? "Good morning, Officer"
                  : navItems.find((item) => item.id === active)?.label}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden w-56 lg:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <button
              onClick={() => chooseNav("notifications")}
              className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-white hover:text-emerald-700"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-[#f5f8f7] bg-rose-500" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-white"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                  GO
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold">Government Officer</p>
                  <p className="text-[10px] text-slate-400">
                    Municipal Environmental
                  </p>
                </div>
                <ChevronDown
                  size={15}
                  className="hidden text-slate-400 sm:block"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <button
                    onClick={() => chooseNav("settings")}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50"
                  >
                    <UserRound size={15} /> View officer profile
                  </button>
                  <button
                    onClick={() => showToast("Preferences saved")}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50"
                  >
                    <Settings size={15} /> Account settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-375 p-4 sm:p-6 lg:p-9">
          {active === "dashboard" && (
            <Dashboard
              setActive={chooseNav}
              setSelectedReport={setSelectedReport}
              setReadAll={setReadAll}
              readAll={readAll}
              filteredReports={filteredReports}
              cleanupTasks={cleanupTasks}
              reports={reportState}
            />
          )}
          {active === "settings" && (
            <Profile
              profile={profile}
              setProfile={setProfile}
              notify={showToast}
              chooseNav={chooseNav}
            />
          )}
          {active === "reports" && (
            <Reports
              reports={filteredReports}
              search={search}
              setSearch={setSearch}
              reportTab={reportTab}
              setReportTab={setReportTab}
              onReview={setSelectedReport}
              onTask={(report) => {
                setSelectedReport(report);
                setTaskModal(true);
              }}
            />
          )}
          {active === "tasks" && (
            <Tasks
              cleanupTasks={cleanupTasks}
              onCreate={() => setTaskModal(true)}
            />
          )}
          {active !== "dashboard" &&
            active !== "reports" &&
            active !== "tasks" && (
              <Placeholder active={active} setActive={chooseNav} />
            )}
        </main>
      </div>

      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/25 lg:hidden"
        />
      )}
      {selectedReport && !taskModal && (
        <ReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onTask={() => setTaskModal(true)}
          onAction={(message) => {
            setSelectedReport(null);
            showToast(message);
          }}
        />
      )}
      {taskModal && (
        <TaskModal
          report={selectedReport}
          onClose={() => {
            setTaskModal(false);
            setSelectedReport(null);
          }}
          onCreate={createCleanupTask}
          onCreated={async () => {
            await getAllCleanups();
            setTaskModal(false);
            setSelectedReport(null);
            showToast("Cleanup task created successfully");
          }}
        />
      )}
      {toast && (
        <div className="fixed bottom-5 right-5 z-60 flex items-center gap-2 rounded-xl bg-[#073b35] px-4 py-3 text-sm font-semibold text-white shadow-2xl">
          <CheckCircle2 size={17} className="text-emerald-300" />
          {toast}
        </div>
      )}
    </div>
  );
}

function Dashboard({
  setActive,
  setSelectedReport,
  setReadAll,
  readAll,
  filteredReports,
  cleanupTasks,
  reports,
}) {
  const totalReports = reports.length;
  const pendingReports = reports.filter(
    (report) => report.status == "Pending Review",
  ).length;
  const resolvedReports = reports.filter(
    (report) => report.status == "Resolved",
  ).length;
  const criticalReports = reports.filter(
    (report) => report.status == "Critical",
  ).length;
  const inProgressReports = reports.filter(
    (report) => report.status == "In progress",
  ).length;

  const stats = [
    {
      label: "Total Reports",
      value: totalReports,
      detail: "+12.4% this month",
      icon: FileSearch,
      color: "emerald",
    },
    {
      label: "Pending Review",
      value: pendingReports,
      detail: "Requires attention",
      icon: Clock3,
      color: "amber",
    },
    {
      label: "In Progress",
      value: inProgressReports,
      detail: "Active operations",
      icon: Activity,
      color: "sky",
    },
    {
      label: "Resolved",
      value: resolvedReports,
      detail: "+18.2% this month",
      icon: CheckCircle2,
      color: "violet",
    },
    {
      label: "Critical Issues",
      value: criticalReports,
      detail: "Immediate attention",
      icon: AlertTriangle,
      color: "rose",
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm text-slate-500">
            Tuesday, September 12, 2026
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Operations overview
          </h2>
        </div>
        <button
          onClick={() => setActive("reports")}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#056b4d]"
        >
          <FileSearch size={16} /> Review reports <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {stats.map(({ label, value, detail, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 sm:p-5"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-9 items-center justify-center rounded-xl bg-${color}-50 text-${color}-600`}
              >
                <Icon size={18} />
              </div>
              {label === "Total Reports" || label === "Resolved" ? (
                <span className="hidden items-center gap-1 text-[10px] font-bold text-emerald-600 sm:flex">
                  <ArrowUpRight size={12} /> +12%
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-[11px] font-semibold text-slate-500 sm:text-xs">
              {label}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">
              {detail}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <h3 className="font-bold">Priority queue</h3>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Reports that need your attention today
              </p>
            </div>
            <button
              onClick={() => setActive("reports")}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {filteredReports.slice(0, 3).map((report) => (
              <button
                onClick={() => setSelectedReport(report)}
                key={report._id}
                className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <img
                  src={report.imageUrl}
                  alt="Environmental issue"
                  className="size-14 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold">{report.id}</p>
                    <Badge tone={statusTone(report.priority)}>
                      {report.severity}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-600">
                    {report.description}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin size={11} /> {report.location.latitude}
                  </p>
                </div>
                <ChevronRight
                  size={16}
                  className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
                />
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-amber-500" />
                <h3 className="font-bold">Recent notifications</h3>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Latest platform activity
              </p>
            </div>
            <button
              onClick={() => setReadAll(true)}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Mark all read
            </button>
          </div>
          <div className="mt-4 flex flex-col">
            {notifications.slice(0, 3).map((item) => (
              <div
                key={item.title}
                className={`flex gap-3 border-b border-slate-100 py-3 last:border-0 ${readAll ? "opacity-60" : ""}`}
              >
                <div
                  className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${item.type === "critical" ? "bg-rose-50 text-rose-600" : item.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-sky-50 text-sky-600"}`}
                >
                  <Bell size={13} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-bold">{item.title}</p>
                    {item.unread && !readAll && (
                      <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">
                    {item.text}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
        <div className="rounded-2xl bg-[#0b6651] p-5 text-white shadow-lg shadow-emerald-900/10 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-100/70">
                Resolution rate
              </p>
              <p className="mt-2 text-3xl font-bold">78.7%</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2.5">
              <Target size={19} />
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[79%] rounded-full bg-emerald-300" />
          </div>
          <p className="mt-2 text-[11px] text-emerald-100/70">
            +6.8% compared to last month
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Active volunteers
              </p>
              <p className="mt-2 text-3xl font-bold">2,841</p>
            </div>
            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
              <Users size={19} />
            </div>
          </div>
          <p className="mt-5 text-[11px] text-slate-400">
            <span className="font-bold text-emerald-600">+112</span> new this
            month
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Waste diverted
              </p>
              <p className="mt-2 text-3xl font-bold">4.8t</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
              <Recycle size={19} />
            </div>
          </div>
          <p className="mt-5 text-[11px] text-slate-400">
            <span className="font-bold text-emerald-600">+18.2%</span> this
            quarter
          </p>
        </div>
      </div>
    </div>
  );
}

function Reports({
  reports: visibleReports,
  search,
  setSearch,
  reportTab,
  setReportTab,
  onReview,
  onTask,
}) {
  const tabs = [
    "All",
    "Pending Review",
    "Approved",
    "Assigned",
    "In Progress",
    "Rejected",
    "Escalated",
    "Resolved",
    "Critical",
  ];
  const totalReports = visibleReports.length;
  const pendingReports = visibleReports.filter(
    (report) => report.status === "Pending Review",
  ).length;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm text-slate-500">
            Environmental intelligence queue
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Report management
          </h2>
        </div>
        <button
          onClick={() => onTask(null)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#056b4d]"
        >
          <Plus size={16} /> Create cleanup task
        </button>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, description, location, status..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <Filter size={15} /> Filters
          </button>
          <select className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none">
            <option>All locations</option>
            <option>Sector 12</option>
            <option>East Riverwalk</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setReportTab(tab)}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition ${reportTab === tab ? "bg-[#073b35] text-white" : "bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"}`}
          >
            {tab}{" "}
            <span
              className={`ml-1 ${reportTab === tab ? "text-emerald-200" : "text-slate-400"}`}
            >
              {tab === "All"
                ? visibleReports.length
                : tab === "Pending Review"
                  ? pendingReports
                  : tab === "Critical"
                    ? "24"
                    : "—"}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {visibleReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onReview={onReview}
            onTask={onTask}
          />
        ))}
      </div>
      {visibleReports.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search className="mx-auto text-slate-300" size={30} />
          <p className="mt-3 font-bold">No reports found</p>
          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

function ReportCard({ report, onReview, onTask }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-44">
        <img
          src={report.imageUrl}
          alt={`Environmental issue for ${report.id}`}
          className="size-full object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone={statusTone(report.status)}>{report.status}</Badge>
          <Badge tone={statusTone(report.priority)}>{report.severity}</Badge>
        </div>
        <button
          onClick={() => onReview(report)}
          className="absolute right-3 top-3 rounded-lg bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur hover:text-emerald-700"
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold">{report.aiAnalysis.wasteType}</p>
            <p className="mt-1 text-xs text-slate-500">
              Submitted by {report.userId}
            </p>
          </div>
          <p className="text-right text-[10px] font-medium text-slate-400">
            {report.createdAt}
          </p>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-5 text-slate-700">
          {report.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={14} className="text-emerald-600" />{" "}
          {report.location.latitude}
          <span className="text-slate-300">•</span> {report.location.latitude},{" "}
          {report.location.longitude}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              AI severity
            </p>
            <p className="mt-1 text-xs font-bold text-rose-600">
              {report.aiAnalysis.severity}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Confidence
            </p>
            <p className="mt-1 text-xs font-bold">
              {report.aiAnalysis.confidence}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Est. waste
            </p>
            <p className="mt-1 text-xs font-bold">
              {report.aiAnalysis.wasteType}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Due{" "}
            <span className="font-bold text-slate-600">{report.createdAt}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onReview(report)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
            >
              Review
            </button>
            <button
              onClick={() => onTask(report)}
              className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
            >
              Create task
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Tasks({ onCreate, cleanupTasks, handleCreate }) {
  const [taskFilter, setTaskFilter] = useState("All");
  const filters = [
    "All",
    "available",
    "assigned",
    "in-progress",
    "completion-submitted",
    "under-review",
    "completed",
    "cancelled",
  ];

  const filteredTasks =
    taskFilter === "All"
      ? cleanupTasks
      : cleanupTasks.filter((task) => task.status === taskFilter);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm text-slate-500">
            Volunteer operations and field work
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Cleanup tasks
          </h2>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#056b4d]"
        >
          <Plus size={16} /> New cleanup task
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setTaskFilter(filter)}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold ${filter === taskFilter ? "bg-[#073b35] text-white" : "bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"}`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30">
        <div className="hidden grid-cols-[1fr_1fr_1.4fr_0.8fr_1fr_1fr] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
          <span>Task / Report</span>
          <span>Reward</span>
          <span>Guidelines</span>
          <span>Deadline</span>
          <span>Status</span>
          <span>Volunteer</span>
        </div>
        <div className="flex flex-col">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 md:grid-cols-[1fr_1fr_1.4fr_0.8fr_1fr_1fr] md:items-center md:gap-4"
            >
              <div>
                <p className="text-xs font-bold">{task._id}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Report {task.report?.id}
                </p>
              </div>
              <p className="text-sm font-bold text-emerald-700">
                {task.reward.amount}
              </p>
              <p className="text-xs text-slate-500">{task.guideline}</p>
              <p className="text-xs text-slate-600">{task.deadline}</p>
              <p>
                <Badge tone={statusTone(task.status)}>{task.status}</Badge>
              </p>
              <p className="text-xs font-semibold text-slate-600">
                {task.volunteer == null ? "not assigned" : task.volunteer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Placeholder({ active, setActive }) {
  const content = {
    map: {
      title: "Environmental map",
      sub: "Live issue density across the city",
      icon: Globe2,
    },
    volunteers: {
      title: "Volunteer network",
      sub: "Manage verified community responders",
      icon: Users,
    },
    rewards: {
      title: "Rewards center",
      sub: "Track volunteer incentives and eligibility",
      icon: Sparkles,
    },
    notifications: {
      title: "Notifications",
      sub: "Stay ahead of platform activity",
      icon: Bell,
    },
    settings: {
      title: "Officer settings",
      sub: "Manage your command center preferences",
      icon: Settings,
    },
  }[active];
  const Icon = content.icon;
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon size={29} />
        </div>
        <h2 className="mt-5 text-2xl font-bold">{content.title}</h2>
        <p className="mt-2 text-sm text-slate-500">{content.sub}</p>
        <p className="mt-4 text-xs leading-5 text-slate-400">
          This operational workspace is ready for live API data. Connect your
          backend to replace the realistic command center preview.
        </p>
        <button
          onClick={() => setActive("dashboard")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#073b35] px-4 py-2.5 text-xs font-bold text-white"
        >
          <ChevronLeft size={15} /> Back to dashboard
        </button>
      </div>
    </div>
  );
}
function Profile({ profile, setProfile, notify, chooseNav }) {
  const [draft, setDraft] = useState(profile);
  return (
    <>
      <div className="mb-6">
  <p className="text-sm font-semibold text-green-600">
    Account center
  </p>
  <h1 className="mt-1 text-3xl font-bold text-slate-900">
    My profile
  </h1>
</div>
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-primary-foreground">
            GO
          </div>
          <h2 className="mt-5 text-2xl font-bold">{profile.name}</h2>
          <p className="mt-1 text-muted-foreground">{profile.role}</p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <p>
              <MapPin className="mr-2 inline text-primary" size={16} />
              {profile.district}
            </p>
            <p>
              <Mail className="mr-2 inline text-primary" size={16} />
              {profile.email}
            </p>
            <p>
              <Phone className="mr-2 inline text-primary" size={16} />
              {profile.phone}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-xs text-muted-foreground">Reports reviewed</p>
              <b className="text-xl">128</b>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <p className="text-xs text-muted-foreground">Tasks published</p>
              <b className="text-xl">46</b>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setProfile(draft);
            notify("Profile details saved");
          }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-lg font-bold">Edit account details</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Keep your civic operations profile up to date.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["name", "Full name"],
              ["role", "Role"],
              ["district", "District"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([key, label]) => (
              <label
                className="flex flex-col gap-2 text-sm font-semibold"
                key={key}
              >
                {label}
                <input
                  value={draft[key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                  className="rounded-xl border border-input bg-background px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            ))}
          </div>
          <button className="mt-6 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Save className="mr-2 inline" size={16} />
            Save profile
          </button>
        </form>
      </div>
    </>
  );
}
function ReportModal({ report, onClose, onTask, onAction }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              Report details
            </p>
            <h3 className="mt-1 text-lg font-bold">#{report._id}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <img
              src={report.imageUrl}
              alt="Reported environmental issue"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <div className="mt-4 flex gap-2">
              <Badge tone={statusTone(report.status)}>{report.status}</Badge>
              <Badge tone={statusTone(report.priority)}>
                {report.aiAnalysis.severity} priority
              </Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {report.description}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Report ID", report._id],
                ["User ID", report.userId],
                ["Created", report.createdAt],
                ["Deadline", report.createdAt],
                ["Latitude", report.location.latitude],
                ["Longitude", report.location.longitude],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex items-center gap-2 text-emerald-800">
                <div className="flex size-8 items-center justify-center rounded-lg bg-white">
                  <Sparkles size={16} />
                </div>
                <p className="text-sm font-bold">AI analysis</p>
                <Badge tone="emerald">Vision verified</Badge>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Waste type
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-950">
                    Plastic & mixed waste
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Confidence
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-950">
                    {report.aiAnalysis.confidence}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Severity
                  </p>
                  <p className="mt-1 text-sm font-bold text-rose-700">
                    {report.aiAnalysis.severity}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Est. waste
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-950">
                    {report.aiAnalysis.wasteType}
                  </p>
                </div>
              </div>
              <div className="mt-5 border-t border-emerald-200/60 pt-4">
                <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                  Environmental risk
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-950/75">
                  {report.aiAnalysis.environmentalRisk}
                </p>
                <p className="mt-4 text-[10px] font-semibold uppercase text-emerald-800/55">
                  Recommended action
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-950/75">
                  {report.aiAnalysis.possibleAction}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                <p className="text-sm font-bold">Location</p>
              </div>
              <p className="mt-2 text-sm font-semibold">
                {report.location.latitude}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {report.location.latitude}, {report.location.longitude}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => onAction("Report approved")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#087f5b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#056b4d]"
              >
                <Check size={15} /> Approve report
              </button>
              <button
                onClick={() => onAction("Report escalated for review")}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700 hover:bg-amber-100"
              >
                <AlertTriangle size={15} /> Escalate
              </button>
              <button
                onClick={() => onAction("Report rejected")}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
              >
                <X size={15} /> Reject
              </button>
              <button
                onClick={onTask}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                <ClipboardCheck size={15} /> Create cleanup task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskModal({ report, onClose, onCreated, onCreate }) {
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [guideline, setGuideline] = useState("");
  const [status, setStatus] = useState("Available");
  const [reportId, setReportId] = useState(report?._id || "");
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    try {
      console.log("nikku");
      const taskData = {
        report: reportId,
        reward: { amount: Number(reward) },
        guideline: guideline,
        deadline: deadline,
        status: status,
      };

      console.log("creating task", taskData);
      await onCreate(taskData);
      console.log("onCreate created");
      await onCreated();
    } catch (error) {
      console.log("task creation failed : ", error);
    }
  };
  return (
    <div className="fixed inset-0 z-55 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              Operations
            </p>
            <h3 className="mt-1 text-xl font-bold">Create cleanup task</h3>
            <p className="mt-1 text-xs text-slate-400">
              Convert an approved report into field work.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Report ID
            <input
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="Select an approved report"
              defaultValue={report?._id || ""}
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
              Reward
              <input
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Enter the reward"
                className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
              Deadline
              <input
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
                type="date"
                placeholder="Enter the deadline"
                className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Cleanup guidelines
            <textarea
              value={guideline}
              onChange={(e) => setGuideline(e.target.value)}
              placeholder="Enter Suitable Guidelines"
              className="min-h-24 rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Task status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-emerald-400"
            >
              <option>Available</option>
              <option>Assigned</option>
              <option>In Progress</option>
            </select>
          </label>
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-xl bg-[#087f5b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#056b4d]"
          >
            Create cleanup task
          </button>
        </div>
      </div>
    </div>
  );
}
