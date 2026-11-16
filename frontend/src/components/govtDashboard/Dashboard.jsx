import statusTone from "./statusTone.jsx";
import {
    Activity,
    FileSearch,
    AlertTriangle,
    ArrowUpRight,
    Bell,
    CheckCircle2,
    Clock3,
    ChevronRight,
    MapPin,
    Recycle,
    Users,
} from "lucide-react";
import Badge from "./Badge.jsx";

const notifications = [
    {
        title: "Report #R-1023",
        text: "New report submitted in Indiranagar.",
        time: "2h ago",
        type: "critical",
        unread: true,
    },
    {
        title: "Volunteer Priya Nair",
        text: "Completed cleanup task in Indiranagar.",
        time: "5h ago",
        type: "success",
        unread: true,
    },
    {
        title: "Report #R-1019",
        text: "Report resolved in Koramangala.",
        time: "1d ago",
        type: "info",
        unread: false,
    },
];

export default function Dashboard({
    setActive,
    setSelectedReport,
    setReadAll,
    readAll,
    filteredReports = [],
    cleanupTasks = [],
    reports = [],
    volunteers = [],
    setReportTab,
}) {
    const totalReports = reports.length;

    const pendingReports = reports.filter((report) => report.status === "Pending Review").length;

    const resolvedReports = reports.filter((report) => report.status === "Resolved").length;

    const criticalReports = reports.filter((report) => report.status === "Critical").length;

    const inProgressReports = reports.filter((report) => report.status === "In-progress").length;

    // Dashboard metrics derived from existing data
    const registeredVolunteers = volunteers.length;

    const cleanupTasksAwaitingReview = cleanupTasks.filter(
        (task) => task.status === "Completion-Submitted" || task.status === "Under-Review"
    ).length;

    const completedCleanupTasks = cleanupTasks.filter((task) => task.status === "Completed");

    const estimatedWasteKg = completedCleanupTasks.reduce(
        (total, task) => total + Number(task.report?.aiAnalysis?.estimateWasteKg || 0),
        0
    );

    const formatWaste = (kg) => {
        if (kg >= 1000) {
            return `${(kg / 1000).toFixed(2)} t`;
        }
        return `${kg.toFixed(1)} kg`;
    };

    const stats = [
        {
            label: "Total Reports",
            value: totalReports,
            detail: "",
            icon: FileSearch,
            color: "emerald",
            tab: "All",
        },
        {
            label: "Pending Review",
            value: pendingReports,
            detail: "",
            icon: Clock3,
            color: "amber",
            tab: "Pending Review",
        },
        {
            label: "In-Progress",
            value: inProgressReports,
            detail: "",
            icon: Activity,
            color: "sky",
            tab: "In-Progress",
        },
        {
            label: "Resolved",
            value: resolvedReports,
            detail: "",
            icon: CheckCircle2,
            color: "violet",
            tab: "Resolved",
        },
        {
            label: "Critical Issues",
            value: criticalReports,
            detail: "",
            icon: AlertTriangle,
            color: "rose",
            tab: "Critical",
        },
    ];

    const colorClasses = {
        emerald: "bg-emerald-50 text-emerald-600",
        amber: "bg-amber-50 text-amber-600",
        sky: "bg-sky-50 text-sky-600",
        violet: "bg-violet-50 text-violet-600",
        rose: "bg-rose-50 text-rose-600",
    };

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-1 text-sm text-slate-500">Tuesday, September 12, 2026</p>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Operations overview</h2>
                </div>

                <button
                    onClick={() => setActive("reports")}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#056b4d]"
                >
                    <FileSearch size={16} />
                    Review reports
                    <ArrowUpRight size={15} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
                {stats.map(({label, value, detail, icon: Icon, color, tab}) => (
                    <button
                        key={label}
                        onClick={() => {
                            setReportTab(tab);
                            setActive("reports");
                        }}
                        className="rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm shadow-slate-200/30 transition hover:border-emerald-200 sm:p-5"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`flex size-9 items-center justify-center rounded-xl ${colorClasses[color]}`}
                            >
                                <Icon size={18} />
                            </div>

                            {label === "Total Reports" || label === "Resolved" ? (
                                <span className="hidden items-center gap-1 text-[10px] font-bold text-emerald-600 sm:flex">
                                    <ArrowUpRight size={12} />
                                </span>
                            ) : null}
                        </div>

                        <p className="mt-4 text-[11px] font-semibold text-slate-500 sm:text-xs">{label}</p>

                        <p className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>

                        <p className="mt-1 text-[10px] font-medium text-slate-400 sm:text-[11px]">{detail}</p>
                    </button>
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

                            <p className="mt-1 text-xs text-slate-400">Reports that need your attention today</p>
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
                                        <Badge tone={statusTone(report.priority)}>{report.severity}</Badge>
                                    </div>

                                    <p className="mt-1 truncate text-xs text-slate-600">{report.description}</p>

                                    <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                                        <MapPin size={11} />
                                        {report.location?.address?.split(",").slice(0, 3).join(", ") || ""}
                                    </p>
                                </div>

                                <ChevronRight
                                    size={16}
                                    className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
                                />
                            </button>
                        ))}

                        {filteredReports.length === 0 && (
                            <p className="py-6 text-center text-sm text-slate-400">No reports to display.</p>
                        )}
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="size-2 rounded-full bg-amber-500" />
                                <h3 className="font-bold">Recent notifications</h3>
                            </div>

                            <p className="mt-1 text-xs text-slate-400">Latest platform activity</p>
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
                                className={`flex gap-3 border-b border-slate-100 py-3 last:border-0 ${
                                    readAll ? "opacity-60" : ""
                                }`}
                            >
                                <div
                                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${
                                        item.type === "critical"
                                            ? "bg-rose-50 text-rose-600"
                                            : item.type === "success"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-sky-50 text-sky-600"
                                    }`}
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

                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">{item.text}</p>

                                    <p className="mt-1 text-[10px] text-slate-400">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Dynamic dashboard metrics */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500">Registered volunteers</p>

                            <p className="mt-2 text-3xl font-bold">{registeredVolunteers.toLocaleString("en-IN")}</p>
                        </div>

                        <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                            <Users size={19} />
                        </div>
                    </div>

                    <p className="mt-5 text-[11px] text-slate-400">Volunteers registered on the platform</p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500">Cleanup tasks awaiting review</p>

                            <p className="mt-2 text-3xl font-bold">
                                {cleanupTasksAwaitingReview.toLocaleString("en-IN")}
                            </p>
                        </div>

                        <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                            <Clock3 size={19} />
                        </div>
                    </div>

                    <p className="mt-5 text-[11px] text-slate-400">Submitted for government verification</p>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500">
                                Estimated waste from completed cleanups
                            </p>

                            <p className="mt-2 text-3xl font-bold">{formatWaste(estimatedWasteKg)}</p>
                        </div>

                        <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                            <Recycle size={19} />
                        </div>
                    </div>

                    <p className="mt-5 text-[11px] text-slate-400">
                        AI-estimated waste associated with completed tasks
                    </p>
                </div>
            </div>
        </div>
    );
}
