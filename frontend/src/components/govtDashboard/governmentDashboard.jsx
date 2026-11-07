"use client";
import axios from "axios";
import {useMemo, useState, useEffect, useRef} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import TaskModal from "./TaskModal";
import ReportModal from "./ReportModal";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Volunteers from "./Volunteers";
import VolunteerDetail from "./VolunteerDetail";
import Reports from "./Reports";
import Tasks from "./Tasks";
import Rewards from "./Rewards";
import MapView from "./MapView";
import Placeholder from "./Placeholder";
import SectionTitle from "./SectionTitle";
import Stat from "./Stat";
import {
    Activity,
    AlertTriangle,
    ArrowUpRight,
    Bell,
    Mail,
    TrendingUp,
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
import {useNavigate, useSearchParams} from "react-router-dom";
// const volunteers = [
//   {
//     name: "Aarav Menon",
//     email: "aarav.m@example.com",
//     city: "Bengaluru",
//     area: "Koramangala",
//     score: 96,
//     completed: 28,
//     accepted: 31,
//     progress: 2,
//     rate: "90%",
//     rewards: 12400,
//     status: "Active",
//     joined: "Jan 2026",
//     color: "bg-emerald-100 text-emerald-800",
//   },
//   {
//     name: "Ananya Rao",
//     email: "ananya.r@example.com",
//     city: "Bengaluru",
//     area: "HSR Layout",
//     score: 92,
//     completed: 22,
//     accepted: 25,
//     progress: 1,
//     rate: "88%",
//     rewards: 9800,
//     status: "Active",
//     joined: "Feb 2026",
//     color: "bg-violet-100 text-violet-800",
//   },
//   {
//     name: "Rahul Mehta",
//     email: "rahul.m@example.com",
//     city: "Bengaluru",
//     area: "Bellandur",
//     score: 87,
//     completed: 18,
//     accepted: 24,
//     progress: 3,
//     rate: "75%",
//     rewards: 7600,
//     status: "Active",
//     joined: "Mar 2026",
//     color: "bg-amber-100 text-amber-800",
//   },
//   {
//     name: "Priya Nair",
//     email: "priya.n@example.com",
//     city: "Bengaluru",
//     area: "Indiranagar",
//     score: 78,
//     completed: 14,
//     accepted: 18,
//     progress: 0,
//     rate: "78%",
//     rewards: 5900,
//     status: "Inactive",
//     joined: "Nov 2025",
//     color: "bg-sky-100 text-sky-800",
//   },
// ];

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

function statusTone(status) {
    if (status === "Critical" || status === "Escalated") return "rose";
    if (status === "Pending Review" || status === "Under Review") return "amber";
    if (status === "Approved" || status === "Completed") return "emerald";
    if (status === "In-Progress") return "sky";
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
    const [searchParams] = useSearchParams();
    const initialView = searchParams.get("view") || "dashboard";
    const [view, setView] = useState(initialView);
    const [reportState, setReportState] = useState([]);
    const [cleanupTasks, setCleanupTasks] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [profile, setProfile] = useState(null);
    const [volFilter, setVolFilter] = useState("All");
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const navigate = useNavigate();
    const TotalReports = reportState.length;
    const TotalCleanuptasks = cleanupTasks.length;
    const profileRef = useRef(null);
    const navItems = [
        {id: "dashboard", label: "Dashboard", icon: Activity},
        {id: "reports", label: "Reports", icon: FileSearch, count: TotalReports},
        {
            id: "tasks",
            label: "Cleanup Tasks",
            icon: ClipboardCheck,
            count: TotalCleanuptasks,
        },
        {id: "map", label: "Environmental Map", icon: Globe2},
        {id: "volunteers", label: "Volunteers", icon: Users},
        {id: "rewards", label: "Rewards", icon: Sparkles},
        {id: "notifications", label: "Notifications", icon: Bell, count: 7},
        {id: "settings", label: "Settings", icon: Settings},
    ];
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };
    const rejectReport = async (reportId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                `http://localhost:5001/volunteer/reports/${reportId}/status`,
                {status: "Rejected"},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("rejected", response);
            setReportState((currentReports) =>
                currentReports.map((report) => (report._id === reportId ? {...report, status: "Rejected"} : report))
            );
            setSelectedReport(null);
            showToast("report rejected successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const getVolunteers = async (req, res) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5001/volunteerProfile/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("API RESPONSE:", response.data);
            setVolunteers(response.data.Volunteers);
        } catch (error) {
            console.log(error);
            alert("Something is wrong.Please try again");
        }
    };
    useEffect(() => {
        getVolunteers();
    }, []);
    // getVolunteers();
    const getUserProfile = async (req, res) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5001/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);
            // console.log(response.data.user);
            setProfile(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        getUserProfile();
    }, []);
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
        // console.log("nikku doing work");
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5001/volunteer/clean-up-tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log("FULL Cleanup Response:", response.data.cleanupTasks);
        setCleanupTasks(response.data.cleanupTasks || []);
    };

    const getAllReports = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get("http://localhost:5001/reports/get-reports", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
        [reportState, search, reportTab]
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
            const response = await axios.post("http://localhost:5001/volunteer/create-cleanup-task", taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);
            console.log("Task Created :", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating cleanup task:", error.response?.data || error);
            throw error;
        }
    };
    const approveReport = async (reportId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `http://localhost:5001/volunteer/reports/${reportId}/status`,
                {
                    status: "Approved",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // console.log("Report approved:", response.data);

            // Update frontend immediately
            setReportState((currentReports) =>
                currentReports.map((report) => (report._id === reportId ? {...report, status: "Approved"} : report))
            );

            setSelectedReport(null);
            showToast("Report approved successfully");
        } catch (error) {
            console.log("Approve report error:", error.response?.data || error.message);
        }
    };
    return (
        <div className="min-h-screen bg-[#f5f8f7] text-slate-900">
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-emerald-950/10 bg-[#073b35] text-white transition-all duration-300 ${
                    collapsed ? "w-19.5" : "w-64.5"
                } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
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
                        className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/35 ${
                            collapsed ? "text-center" : ""
                        }`}
                    >
                        {collapsed ? "•" : "Operations"}
                    </p>
                    <div className="flex flex-col gap-1">
                        {navItems.map(({id, label, icon: Icon, count}) => (
                            <button
                                key={id}
                                onClick={() => chooseNav(id)}
                                title={collapsed ? label : undefined}
                                className={`group flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[13px] font-medium transition-all ${
                                    active === id
                                        ? "bg-emerald-400 text-[#073b35] shadow-lg shadow-emerald-950/20"
                                        : "text-emerald-50/65 hover:bg-white/8 hover:text-white"
                                } ${collapsed ? "justify-center" : ""}`}
                            >
                                <Icon size={18} strokeWidth={active === id ? 2.4 : 1.8} />
                                <span className={collapsed ? "hidden" : "flex-1"}>{label}</span>
                                {count && !collapsed && (
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                            active === id
                                                ? "bg-[#073b35]/15 text-[#073b35]"
                                                : "bg-white/10 text-emerald-100/70"
                                        }`}
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
                        className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-emerald-100/55 transition hover:bg-white/8 hover:text-white ${
                            collapsed ? "justify-center" : ""
                        }`}
                    >
                        <LogOut size={18} />
                        <span className={collapsed ? "hidden" : ""}>Logout</span>
                    </button>
                </div>
            </aside>

            <div className={`min-h-screen transition-all duration-300 ${collapsed ? "lg:pl-19.5" : "lg:pl-64.5"}`}>
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
                            <ChevronLeft size={19} className={collapsed ? "rotate-180 transition" : "transition"} />
                        </button>
                        <div>
                            <p className="hidden text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-700/70 sm:block">
                                City Environmental Department
                            </p>
                            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                                {active === "dashboard"
                                    ? `Good Morning , ${profile?.name || "Officer"}`
                                    : navItems.find((item) => item.id === active)?.label}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="relative hidden w-56 lg:block">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
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
                                    {profile?.name?.charAt(0).toUpperCase() || "GO"}
                                </div>
                                <div className="hidden text-left sm:block">
                                    <p className="text-xs font-bold">{profile?.name || "Government Officer"}</p>
                                    <p className="text-[10px] text-slate-400">
                                        {profile?.role || "Municipal Environmental"}
                                    </p>
                                </div>
                                <ChevronDown size={15} className="hidden text-slate-400 sm:block" />
                            </button>
                            <div ref={profileRef} className="relative">
                                {/* Your profile button */}

                                {profileOpen && (
                                    <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                                        <button
                                            onClick={() => {
                                                setProfileOpen(false);
                                                chooseNav("settings");
                                            }}
                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs hover:bg-slate-50"
                                        >
                                            <UserRound size={15} />
                                            View officer profile
                                        </button>
                                    </div>
                                )}
                            </div>
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
                            setReportTab={setReportTab}
                        />
                    )}
                    {active === "settings" && (
                        <Profile profile={profile} setProfile={setProfile} notify={showToast} chooseNav={chooseNav} />
                    )}
                    {active === "volunteers" &&
                        (selectedVolunteer ? (
                            <VolunteerDetail volunteer={selectedVolunteer} onBack={() => setSelectedVolunteer(null)} />
                        ) : (
                            <Volunteers
                                data={volunteers}
                                filter={volFilter}
                                setFilter={setVolFilter}
                                onSelect={setSelectedVolunteer}
                            />
                        ))}{" "}
                    {active === "reports" && (
                        <Reports
                            reports={filteredReports}
                            allReports={reportState}
                            search={search}
                            setSearch={setSearch}
                            reportTab={reportTab}
                            setReportTab={setReportTab}
                            onReview={setSelectedReport}
                            formatDate={formatDate}
                            onTask={(report) => {
                                setSelectedReport(report);
                                setTaskModal(true);
                            }}
                        />
                    )}
                    {active == "rewards" && <Rewards volunteers={volunteers} />}
                    {active === "tasks" && (
                        <Tasks
                            cleanupTasks={cleanupTasks}
                            onCreate={() => setTaskModal(true)}
                            onRefresh={getAllCleanups}
                        />
                    )}
                    {active == "map" && (
                        <MapView setView={setView} reports={reportState} setSelectedReport={setSelectedReport} />
                    )}
                    {active !== "dashboard" &&
                        active !== "reports" &&
                        active !== "tasks" &&
                        active !== "volunteers" &&
                        active !== "rewards" && <Placeholder active={active} setActive={chooseNav} />}
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
                    formatDate={formatDate}
                    onClose={() => setSelectedReport(null)}
                    onReject={rejectReport}
                    onTask={() => setTaskModal(true)}
                    onApprove={approveReport}
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
