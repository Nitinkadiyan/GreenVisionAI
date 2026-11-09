import {useEffect, useState} from "react";
import axios from "axios";
import {
    Plus,
    X,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    MapPin,
    CalendarDays,
    User,
    Gift,
    FileText,
    Image as ImageIcon,
    Loader2,
    RefreshCw,
    ClipboardCheck,
    MapPinned,
} from "lucide-react";

import Badge from "./Badge";
import statusTone from "./statusTone";

const API_BASE = "http://localhost:5001/volunteer";

const FILTERS = [
    "All",
    "Available",
    "Assigned",
    "In-Progress",
    "Completion-Submitted",
    "Under-Review",
    "Completed",
    "Rejected",
    "Cancelled",
];

const getAuthConfig = () => {
    const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");

    return {
        withCredentials: true,
        headers: token ? {Authorization: `Bearer ${token}`} : {},
    };
};

// Short location for the task list.
const getLocation = (location) => {
    if (!location) return "Location unavailable";

    if (typeof location === "string") {
        return location.length > 35 ? `${location.slice(0, 35)}...` : location;
    }

    const address = location.address || location.name || location.formattedAddress;

    if (address) {
        return address.length > 35 ? `${address.slice(0, 35)}...` : address;
    }

    if (location.latitude != null && location.longitude != null) {
        return `${Number(location.latitude).toFixed(4)}, ${Number(location.longitude).toFixed(4)}`;
    }

    return "Location unavailable";
};

// Full location for the review modal.
const getFullLocation = (location) => {
    if (!location) return "Location unavailable";

    if (typeof location === "string") return location;

    const address = location.address || location.name || location.formattedAddress;

    if (address) return address;

    if (location.latitude != null && location.longitude != null) {
        return `${location.latitude}, ${location.longitude}`;
    }

    return "Location unavailable";
};

const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Not specified";
    }

    return parsedDate.toLocaleString();
};

const getTaskStatusTone = (status) => {
    const tones = {
        Available: "success",
        Assigned: "info",
        "In-Progress": "warning",
        "Completion-Submitted": "warning",
        "Under-Review": "warning",
        Completed: "success",
        Rejected: "danger",
        Cancelled: "danger",
    };

    return tones[status] || statusTone(status);
};

function InfoItem({icon: Icon, label, value}) {
    return (
        <div className="flex items-start gap-3">
            <div className="shrink-0 rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                <Icon size={17} />
            </div>

            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-700">{value || "Not available"}</p>
            </div>
        </div>
    );
}

function EvidenceImage({title, imageUrl}) {
    return (
        <div>
            <p className="mb-2 text-xs font-bold text-slate-600">{title}</p>

            {imageUrl ? (
                <a href={imageUrl} target="_blank" rel="noreferrer">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-52 w-full rounded-xl border border-slate-200 object-cover transition-transform duration-200 hover:opacity-90"
                    />
                </a>
            ) : (
                <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                        <ImageIcon size={25} />
                        Image not submitted
                    </div>
                </div>
            )}
        </div>
    );
}

function AIVerificationSection({ai}) {
    if (!ai || Object.values(ai).every((value) => value == null || value === "")) {
        return (
            <section>
                <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                        <ClipboardCheck size={17} />
                    </div>
                    <div>
                        <h3 className="text-sm font-extrabold text-slate-900">AI verification report</h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                            No AI verification result is stored for this submission.
                        </p>
                    </div>
                </div>
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                    The AI report will appear here after the volunteer submits the completion and the backend saves the
                    AI response to
                    <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-xs">completion.aiVerification</code>.
                </div>
            </section>
        );
    }

    const recommendation = String(ai.recommendation || "not available").toLowerCase();
    const recommendationStyle =
        {
            approve: "border-emerald-200 bg-emerald-50 text-emerald-800",
            reject: "border-red-200 bg-red-50 text-red-800",
            manual_review: "border-amber-200 bg-amber-50 text-amber-800",
        }[recommendation] || "border-slate-200 bg-slate-50 text-slate-700";

    const quality = ai.cleanupQuality ? String(ai.cleanupQuality).replace(/[-_]/g, " ") : "Not available";

    const yesNo = (value) => (value === true ? "Yes" : value === false ? "No" : "Not evaluated");
    const yesNoTone = (value) =>
        value === true
            ? "bg-emerald-50 text-emerald-700"
            : value === false
            ? "bg-red-50 text-red-700"
            : "bg-slate-100 text-slate-600";

    const confidence =
        typeof ai.confidence === "number"
            ? `${(ai.confidence <= 1 ? ai.confidence * 100 : ai.confidence).toFixed(1)}%`
            : "Not available";

    return (
        <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                        <ClipboardCheck size={17} />
                    </div>
                    <div>
                        <h3 className="text-sm font-extrabold text-slate-900">AI verification report</h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                            Automated assessment of the volunteer's evidence
                        </p>
                    </div>
                </div>
                <span
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${recommendationStyle}`}
                >
                    AI: {recommendation.replace(/_/g, " ")}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Confidence</p>
                    <p className="mt-1 text-xl font-extrabold text-slate-900">{confidence}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cleanup quality</p>
                    <p className="mt-1 text-sm font-extrabold capitalize text-slate-900">{quality}</p>
                </div>
                <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-3 sm:col-span-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI verified</p>
                    <p
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${yesNoTone(
                            ai.verified
                        )}`}
                    >
                        {yesNo(ai.verified)}
                    </p>
                </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-extrabold text-slate-700">Verification checks</p>
                </div>
                <div className="divide-y divide-slate-100">
                    {[
                        ["Same location in both images", ai.sameLocation],
                        ["Waste reduced", ai.wasteReduced],
                        ["Evidence matches description", ai.evidenceMatchesDescription],
                    ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                            <span className="text-xs font-medium text-slate-600">{label}</span>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${yesNoTone(value)}`}>
                                {yesNo(value)}
                            </span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <span className="text-xs font-medium text-slate-600">Remaining waste</span>
                        <span className="text-xs font-bold capitalize text-slate-800">
                            {ai.remainingWaste || "Not evaluated"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AI assessment summary</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {ai.summary || "No summary was provided by the AI service."}
                </p>
            </div>

            <p className="mt-2 text-[11px] text-slate-400">
                AI checked at: {ai.verifiedAt ? formatDate(ai.verifiedAt) : "Timestamp unavailable"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
                This is an automated recommendation, not the final government decision.
            </p>
        </section>
    );
}

function GovernmentReviewResult({completion}) {
    if (!completion?.reviewDecision && !completion?.reviewedAt && !completion?.reviewReason) {
        return null;
    }

    return (
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-extrabold text-slate-900">Government officer decision</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <InfoItem
                    icon={ClipboardCheck}
                    label="Final decision"
                    value={completion.reviewDecision || "Not recorded"}
                />
                <InfoItem icon={CalendarDays} label="Reviewed at" value={formatDate(completion.reviewedAt)} />
            </div>
            {completion.reviewReason && (
                <div className="mt-3 rounded-xl bg-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Officer's note</p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{completion.reviewReason}</p>
                </div>
            )}
        </section>
    );
}

function TaskReviewModal({task, onClose, onAction, loading}) {
    const [rejectionReason, setRejectionReason] = useState("");
    const [manualReviewReason, setManualReviewReason] = useState("");

    if (!task) return null;

    const report = task.report || {};
    const completion = task.completion || {};
    const volunteer = task.volunteer || {};

    const canReview = ["Completion-Submitted", "Under-Review"].includes(task.status);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6"
            onClick={onClose}
        >
            <div
                className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white px-5 py-5 sm:px-7">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700">
                            <ClipboardCheck size={15} />
                            GOVERNMENT TASK REVIEW
                        </div>

                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Cleanup task details</h2>

                        <p className="mt-1 max-w-[240px] truncate text-xs text-slate-400 sm:max-w-md">
                            Task ID: {task._id}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:bg-slate-100"
                        aria-label="Close modal"
                    >
                        <X size={19} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-7 overflow-y-auto p-5 sm:p-7">
                    {/* Status and reward */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Current task status
                            </p>

                            <Badge tone={getTaskStatusTone(task.status)}>{task.status}</Badge>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                Volunteer reward
                            </p>

                            <p className="mt-1 text-2xl font-extrabold text-emerald-800">{task.reward?.amount ?? 0}</p>
                        </div>
                    </div>

                    {/* Original report */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                                <FileText size={17} />
                            </div>

                            <h3 className="text-sm font-extrabold text-slate-900">Original report information</h3>
                        </div>

                        {report.imageUrl && (
                            <a href={report.imageUrl} target="_blank" rel="noreferrer">
                                <img
                                    src={report.imageUrl}
                                    alt="Original cleanup report"
                                    className="mb-5 h-56 w-full rounded-2xl border border-slate-200 object-cover"
                                />
                            </a>
                        )}

                        <div className="grid gap-5 sm:grid-cols-2">
                            <InfoItem icon={MapPin} label="Full location" value={getFullLocation(report.location)} />

                            <InfoItem icon={AlertTriangle} label="Report priority" value={report.priority} />

                            <InfoItem icon={FileText} label="Report ID" value={report._id} />

                            <InfoItem icon={CalendarDays} label="Task deadline" value={formatDate(task.deadline)} />
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Report description
                            </p>

                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                {report.description || "No report description available."}
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Task details */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700">
                                <ClipboardCheck size={17} />
                            </div>

                            <h3 className="text-sm font-extrabold text-slate-900">Cleanup task information</h3>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <InfoItem icon={Gift} label="Reward amount" value={task.reward?.amount} />

                            <InfoItem icon={CalendarDays} label="Created on" value={formatDate(task.createdAt)} />
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Government guidelines
                            </p>

                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                {task.guideline || "No guidelines provided."}
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Volunteer */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-violet-50 p-2 text-violet-700">
                                <User size={17} />
                            </div>

                            <h3 className="text-sm font-extrabold text-slate-900">Assigned volunteer</h3>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <p className="text-sm font-bold text-slate-800">{volunteer.name || "Not assigned"}</p>

                            <p className="mt-1 text-xs text-slate-500">
                                {volunteer.email || "No volunteer email available"}
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-slate-100" />

                    {/* Completion evidence */}
                    <section>
                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
                                <ImageIcon size={17} />
                            </div>

                            <h3 className="text-sm font-extrabold text-slate-900">Volunteer completion evidence</h3>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <EvidenceImage title="Before cleanup" imageUrl={completion.beforeImageUrl} />

                            <EvidenceImage title="After cleanup" imageUrl={completion.afterImageUrl} />
                        </div>

                        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Volunteer completion description
                            </p>

                            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                {completion.description || "No completion description submitted."}
                            </p>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                            <InfoItem
                                icon={CalendarDays}
                                label="Submitted at"
                                value={formatDate(completion.submittedAt)}
                            />

                            <InfoItem
                                icon={MapPinned}
                                label="Completion coordinates"
                                value={
                                    completion.latitude != null && completion.longitude != null
                                        ? `${completion.latitude}, ${completion.longitude}`
                                        : "Not available"
                                }
                            />
                        </div>
                    </section>

                    {/* AI assessment is visible for submitted, manually reviewed, completed and rejected tasks */}
                    <div className="border-t border-slate-100" />
                    <AIVerificationSection ai={completion.aiVerification} />

                    {/* Preserve and display the final government decision after the task is closed */}
                    <GovernmentReviewResult completion={completion} />

                    {/* Review decision */}
                    {canReview && (
                        <>
                            <div className="border-t border-slate-100" />

                            <section>
                                <div className="mb-4">
                                    <h3 className="text-sm font-extrabold text-slate-900">
                                        Government review decision
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Provide a reason where necessary before taking action.
                                    </p>
                                </div>

                                <label className="mb-2 block text-xs font-bold text-slate-600">
                                    Manual review note (optional)
                                </label>

                                <textarea
                                    value={manualReviewReason}
                                    onChange={(event) => setManualReviewReason(event.target.value)}
                                    rows={3}
                                    placeholder="Explain why this task needs manual verification..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                />

                                <label className="mb-2 mt-4 block text-xs font-bold text-slate-600">
                                    Rejection reason (required when rejecting)
                                </label>

                                <textarea
                                    value={rejectionReason}
                                    onChange={(event) => setRejectionReason(event.target.value)}
                                    rows={3}
                                    placeholder="Explain why this completion is being rejected..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                                />
                            </section>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-7">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                    >
                        Close
                    </button>

                    {canReview && (
                        <>
                            <button
                                onClick={() => onAction("manual", task._id, manualReviewReason.trim())}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600 disabled:opacity-50"
                            >
                                <Clock size={15} />
                                Manual Review
                            </button>

                            <button
                                onClick={() => {
                                    if (!rejectionReason.trim()) {
                                        alert("Please provide a rejection reason.");
                                        return;
                                    }

                                    onAction("reject", task._id, rejectionReason.trim());
                                }}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-50"
                            >
                                <XCircle size={15} />
                                Reject
                            </button>

                            <button
                                onClick={() => onAction("approve", task._id)}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-50"
                            >
                                {loading ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle size={15} />}
                                Approve & Complete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Tasks({onCreate, cleanupTasks = [], onRefresh}) {
    const [taskFilter, setTaskFilter] = useState("All");
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [localTasks, setLocalTasks] = useState(cleanupTasks);
    const [error, setError] = useState("");

    useEffect(() => {
        setLocalTasks(cleanupTasks || []);
    }, [cleanupTasks]);

    const filteredTasks = taskFilter === "All" ? localTasks : localTasks.filter((task) => task.status === taskFilter);

    const refreshTasks = async () => {
        if (!onRefresh || refreshing) return;

        try {
            setRefreshing(true);
            await onRefresh();
        } catch (err) {
            console.error("Unable to refresh tasks:", err);
            setError("Unable to refresh cleanup tasks.");
        } finally {
            setRefreshing(false);
        }
    };

    const handleTaskAction = async (action, taskId, reason = "") => {
        if (loading) return;

        const endpoints = {
            approve: `${API_BASE}/${taskId}/complete-cleanup-task`,
            manual: `${API_BASE}/${taskId}/manual-review`,
            reject: `${API_BASE}/${taskId}/reject-cleanup-task`,
        };

        try {
            setLoading(true);
            setError("");

            const body = action === "reject" || action === "manual" ? {reason} : {};

            const response = await axios.patch(endpoints[action], body, getAuthConfig());

            if (!response.data?.success) {
                throw new Error(response.data?.message || "Unable to update task.");
            }

            const newStatus = {
                approve: "Completed",
                manual: "Under-Review",
                reject: "Rejected",
            }[action];

            const updatedTask = response.data.task;

            setLocalTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task._id === taskId
                        ? {
                              ...task,
                              ...(updatedTask || {}),
                              status: updatedTask?.status || newStatus,
                          }
                        : task
                )
            );

            setSelectedTask(null);

            alert(response.data.message || "Task updated successfully.");

            await refreshTasks();
        } catch (err) {
            console.error("Task review error:", err);

            const message =
                err.response?.data?.message || err.message || "Something went wrong while reviewing this task.";

            setError(message);
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const statusCount = (status) => localTasks.filter((task) => task.status === status).length;

    return (
        <div className="flex flex-col gap-6">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                        <ClipboardCheck size={15} />
                        Volunteer management
                    </div>

                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Cleanup tasks</h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                        Monitor field operations, verify volunteer submissions, and manage cleanup activities.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={refreshTasks}
                        disabled={refreshing}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>

                    <button
                        onClick={onCreate}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-md shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-[#056b4d]"
                    >
                        <Plus size={16} />
                        New cleanup task
                    </button>
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold text-slate-500">Total tasks</p>
                    <p className="mt-2 text-2xl font-extrabold text-slate-900">{localTasks.length}</p>
                </div>

                <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 shadow-sm">
                    <p className="text-xs font-semibold text-amber-700">Awaiting review</p>
                    <p className="mt-2 text-2xl font-extrabold text-amber-800">{statusCount("Completion-Submitted")}</p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 shadow-sm">
                    <p className="text-xs font-semibold text-blue-700">Manual review</p>
                    <p className="mt-2 text-2xl font-extrabold text-blue-800">{statusCount("Under-Review")}</p>
                </div>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 shadow-sm">
                    <p className="text-xs font-semibold text-emerald-700">Completed</p>
                    <p className="mt-2 text-2xl font-extrabold text-emerald-800">{statusCount("Completed")}</p>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertTriangle size={17} />
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {FILTERS.map((filter) => {
                    const count = filter === "All" ? localTasks.length : statusCount(filter);

                    return (
                        <button
                            key={filter}
                            onClick={() => setTaskFilter(filter)}
                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                                filter === taskFilter
                                    ? "bg-[#073b35] text-white shadow-md shadow-emerald-900/15"
                                    : "border border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                            }`}
                        >
                            {filter} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Tasks table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/40">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-4">
                    <div>
                        <h3 className="text-sm font-extrabold text-slate-800">Task directory</h3>
                        <p className="mt-1 text-xs text-slate-400">Review and manage cleanup activities</p>
                    </div>

                    <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        {filteredTasks.length} tasks
                    </span>
                </div>

                <div className="hidden grid-cols-[1.2fr_0.7fr_1.2fr_1fr_1fr_1fr_0.8fr] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 lg:grid">
                    <span>Task / Report</span>
                    <span>Reward</span>
                    <span>Guidelines</span>
                    <span>Deadline</span>
                    <span>Status</span>
                    <span>Volunteer</span>
                    <span>Action</span>
                </div>

                <div className="flex flex-col">
                    {filteredTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                            <div className="rounded-2xl bg-slate-100 p-4">
                                <FileText size={30} className="text-slate-400" />
                            </div>

                            <h3 className="mt-4 text-sm font-bold text-slate-700">No cleanup tasks found</h3>

                            <p className="mt-1 text-xs text-slate-400">There are no tasks in the selected status.</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div
                                key={task._id}
                                className="group grid gap-4 border-b border-slate-100 px-5 py-5 transition-all duration-200 last:border-0 hover:bg-emerald-50/40 lg:grid-cols-[1.2fr_0.7fr_1.2fr_1fr_1fr_1fr_0.8fr] lg:items-center"
                            >
                                {/* Task / Report */}
                                <div className="min-w-0">
                                    <div className="flex items-start gap-2">
                                        <div className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-700">
                                            <MapPin size={15} />
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                className="truncate text-xs font-bold text-slate-800"
                                                title={getFullLocation(task.report?.location)}
                                            >
                                                {getLocation(task.report?.location)}
                                            </p>

                                            <p className="mt-1 truncate text-[10px] text-slate-400">Task: {task._id}</p>

                                            <p className="mt-1 truncate text-[10px] text-slate-400">
                                                Report: {task.report?._id || "Not linked"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Reward */}
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
                                        Reward
                                    </p>

                                    <p className="text-sm font-extrabold text-emerald-700">
                                        {task.reward?.amount ?? 0}
                                    </p>
                                </div>

                                {/* Guidelines */}
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
                                        Guidelines
                                    </p>

                                    <p className="line-clamp-2 text-xs leading-5 text-slate-500">
                                        {task.guideline || "No guidelines"}
                                    </p>
                                </div>

                                {/* Deadline */}
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
                                        Deadline
                                    </p>

                                    <p className="text-xs font-medium text-slate-600">{formatDate(task.deadline)}</p>
                                </div>

                                {/* Status */}
                                <div>
                                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
                                        Status
                                    </p>

                                    <Badge tone={getTaskStatusTone(task.status)}>{task.status}</Badge>
                                    {task.completion?.aiVerification?.recommendation && (
                                        <p className="mt-1 text-[10px] font-bold text-violet-700">
                                            AI:{" "}
                                            {String(task.completion.aiVerification.recommendation).replace(/_/g, " ")}
                                        </p>
                                    )}
                                </div>

                                {/* Volunteer */}
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 lg:hidden">
                                        Volunteer
                                    </p>

                                    <p className="text-xs font-bold text-slate-700">
                                        {task.volunteer?.name || task.volunteer?.email || "Not assigned"}
                                    </p>

                                    {task.volunteer?.email && task.volunteer?.name && (
                                        <p className="mt-1 truncate text-[10px] text-slate-400">
                                            {task.volunteer.email}
                                        </p>
                                    )}
                                </div>

                                {/* Review button */}
                                <div>
                                    <button
                                        onClick={() => setSelectedTask(task)}
                                        className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-2.5 text-xs font-bold text-emerald-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-700 hover:text-white hover:shadow-md"
                                    >
                                        <Eye size={14} />
                                        Review Task
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Review modal */}
            {selectedTask && (
                <TaskReviewModal
                    task={selectedTask}
                    onClose={() => {
                        if (!loading) setSelectedTask(null);
                    }}
                    onAction={handleTaskAction}
                    loading={loading}
                />
            )}
        </div>
    );
}
