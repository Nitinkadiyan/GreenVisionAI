import {
    LayoutDashboard,
    FileText,
    HandHeart,
    ClipboardCheck,
    Map as MapIcon,
    Bell,
    User,
    ChevronDown,
    ChevronRight,
    Sparkles,
    X,
    Pencil,
    Trophy,
    LogOut,
} from "lucide-react";

export default function Sidebar({
    view,
    setView,
    reportsOpen,
    setReportsOpen,
    mobileOpen,
    setMobileOpen,
    setLogout,
    user,
    reportCounts,
    reports = [],
    onOpenReports,
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
        "All Reports": reportCounts?.all ?? reports.length,
        "Pending Review": reportCounts?.pending ?? 0,
        "Accepted by Government": reportCounts?.accepted ?? 0,
        "Rejected by Government": reportCounts?.rejected ?? 0,
        "Assigned Cleanup": reportCounts?.assigned ?? 0,
        "In Progress": reportCounts?.inProgress ?? 0,
        Completed: reportCounts?.completed ?? 0,
    };

    const navReports = [
        "All Reports",
        "Pending Review",
        "Accepted by Government",
        "Rejected by Government",
        "Assigned Cleanup",
        "In Progress",
        "Completed",
    ];

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
                className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform lg:translate-x-0 lg:shadow-none ${
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Logo */}
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => {
                            setView("dashboard");
                            setMobileOpen(false);
                        }}
                        className="flex items-center gap-2 text-left"
                    >
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                            <Sparkles size={20} />
                        </span>

                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            GreenVision <span className="text-emerald-600">AI</span>
                        </span>
                    </button>

                    <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-400 lg:hidden">
                        <X size={19} />
                    </button>
                </div>

                {/* User Profile */}
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-emerald-50/70 p-3">
                    <div className="relative">
                        <img
                            src={user?.profilePicture?.url || "https://via.placeholder.com/40"}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-slate-800">{user?.name || "New User"}</p>

                        <p className="truncate text-xs text-slate-500">{user?.location?.city || "User City"}</p>
                    </div>

                    <button
                        aria-label="Edit profile"
                        onClick={() => {
                            setView("profile");
                            setMobileOpen(false);
                        }}
                        className="text-emerald-600"
                    >
                        <Pencil size={15} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto">
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        Workspace
                    </p>

                    {nav.map(([key, Icon, label]) => (
                        <div key={key}>
                            <button
                                onClick={() => {
                                    if (key === "reports") {
                                        setReportsOpen(!reportsOpen);
                                    } else {
                                        setView(key);
                                        setMobileOpen(false);
                                    }
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                                    view === key || (key === "reports" && view === "reportDetail")
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
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

                            {/* Report Submenu */}
                            {key === "reports" && reportsOpen && (
                                <div className="ml-8 mt-1 space-y-0.5 border-l border-emerald-100 pl-3">
                                    {navReports.map((item) => {
                                        const selectedFilter = item === "All Reports" ? "All" : item;

                                        const isActive =
                                            view === "reports" &&
                                            new URLSearchParams(window.location.search).get("filter") ===
                                                selectedFilter;

                                        return (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    if (!onOpenReports) {
                                                        console.error(
                                                            "onOpenReports was not passed from Dashboard.jsx"
                                                        );
                                                        return;
                                                    }

                                                    onOpenReports(selectedFilter);

                                                    setMobileOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition ${
                                                    isActive
                                                        ? "bg-emerald-50 font-bold text-emerald-700"
                                                        : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                                                }`}
                                            >
                                                <span>{item}</span>

                                                <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold">
                                                    {counts[item]}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Contribution */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                    <button
                        onClick={() => {
                            setView("contribution");
                            setMobileOpen(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl bg-amber-50 px-3 py-3 text-left"
                    >
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-amber-100 text-amber-600">
                            <Trophy size={18} />
                        </span>

                        <span className="flex-1">
                            <span className="block text-xs font-bold text-slate-700">My Contribution</span>

                            <span className="block text-xs text-amber-700">{user?.volunteer?.points ?? 0} Stars</span>
                        </span>

                        <ChevronRight size={15} className="text-amber-500" />
                    </button>

                    {/* Logout */}
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
