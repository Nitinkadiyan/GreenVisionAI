import {Clock, FileText, Search, CheckCircle2, AlertCircle, ShieldCheck, Leaf} from "lucide-react";

export default function Timeline({report}) {
    const status = report?.status || "Submitted";

    const submittedDate = report?.createdAt ? new Date(report.createdAt) : null;

    const formatDate = (date) => {
        if (!date || Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const stages = [
        {
            title: "Report Submitted",
            description: "Your environmental report was successfully submitted.",
            icon: FileText,
            completed: true,
            date: submittedDate,
        },
        {
            title: "AI Analysis",
            description: "The submitted image was analyzed by the AI system.",
            icon: Search,
            completed: Boolean(report?.aiAnalysis),
            date: null,
        },
        {
            title: "Under Review",
            description: "The report is being reviewed by the concerned authority.",
            icon: ShieldCheck,
            completed: ["Under Review", "In Progress", "Resolved", "Completed"].includes(status),
            date: null,
        },
        {
            title: "Action in Progress",
            description: "Action is being taken to address the reported issue.",
            icon: Leaf,
            completed: ["In Progress", "Resolved", "Completed"].includes(status),
            date: null,
        },
        {
            title: "Issue Resolved",
            description: "The reported environmental issue has been resolved.",
            icon: CheckCircle2,
            completed: ["Resolved", "Completed"].includes(status),
            date: null,
        },
    ];

    const currentStageIndex = stages.findLastIndex((stage) => stage.completed);

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Report Timeline</h3>

                    <p className="mt-1 text-xs text-slate-500">Track the progress of your report</p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Clock size={21} />
                </div>
            </div>

            {/* Current Status */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Current Report Status</p>

                <div className="mt-2 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span className="text-base font-bold text-emerald-800">{status}</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="mt-7">
                {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    const isCurrent = index === currentStageIndex;
                    const isCompleted = stage.completed;

                    return (
                        <div key={stage.title} className="relative flex gap-4">
                            {/* Vertical Line */}
                            {index !== stages.length - 1 && (
                                <div
                                    className={`absolute left-[17px] top-10 h-[calc(100%-8px)] w-0.5 ${
                                        index < currentStageIndex ? "bg-emerald-400" : "bg-slate-200"
                                    }`}
                                />
                            )}

                            {/* Icon */}
                            <div
                                className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition ${
                                    isCompleted
                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                        : "border-slate-200 bg-white text-slate-400"
                                }`}
                            >
                                <Icon size={16} />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1 pb-8">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4
                                        className={`text-sm font-bold ${
                                            isCompleted ? "text-slate-900" : "text-slate-400"
                                        }`}
                                    >
                                        {stage.title}
                                    </h4>

                                    {isCurrent && (
                                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                            CURRENT
                                        </span>
                                    )}
                                </div>

                                <p className="mt-1 text-xs leading-5 text-slate-500">{stage.description}</p>

                                {stage.date && (
                                    <p className="mt-2 text-[11px] font-medium text-emerald-700">
                                        {formatDate(stage.date)}
                                    </p>
                                )}

                                {!isCompleted && <p className="mt-2 text-[11px] text-slate-400">Pending</p>}
                            </div>
                        </div>
                    );
                })}
            </div>

            
           
        </div>
    );
}
