import {useEffect, useState} from "react";
import axios from "axios";
import {ClipboardList, CalendarDays, Coins, CheckCircle2, Clock, AlertCircle, Leaf, RefreshCw} from "lucide-react";

const API_URL = "http://localhost:5001/volunteer";

export default function CleanupPanel({report}) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token") ||
                    localStorage.getItem("accessToken") ||
                    localStorage.getItem("authToken");

                const response = await axios.get(`${API_URL}/clean-up-tasks`, {
                    headers: token ? {Authorization: `Bearer ${token}`} : {},
                    withCredentials: true,
                });

                const allTasks = response.data.cleanupTasks || [];

                const reportTasks = allTasks.filter((task) => {
                    const taskReportId = task.report?._id || task.report;

                    return String(taskReportId) === String(report?._id);
                });

                setTasks(reportTasks);
            } catch (err) {
                console.error("Failed to fetch cleanup tasks:", err);
                setError(err.response?.data?.message || "Unable to load cleanup tasks.");
            } finally {
                setLoading(false);
            }
        };

        if (report?._id) {
            fetchTasks();
        } else {
            setTasks([]);
            setLoading(false);
        }
    }, [report?._id]);

    const formatDate = (date) => {
        if (!date) return "Not specified";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Not specified";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-50 text-emerald-700 border-emerald-100";

            case "In-Progress":
                return "bg-blue-50 text-blue-700 border-blue-100";

            case "Assigned":
                return "bg-purple-50 text-purple-700 border-purple-100";

            case "Completion-Submitted":
            case "Under-Review":
                return "bg-amber-50 text-amber-700 border-amber-100";

            case "Rejected":
            case "Cancelled":
                return "bg-red-50 text-red-700 border-red-100";

            default:
                return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Leaf size={21} />
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900">Cleanup Tasks</h3>
                        <p className="text-xs text-slate-500">Tasks associated with this report</p>
                    </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
                </span>
            </div>

            <div className="space-y-4 p-5">
                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                        <RefreshCw size={17} className="animate-spin" />
                        Loading cleanup tasks...
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                        <div className="flex items-center gap-2 font-semibold">
                            <AlertCircle size={17} />
                            Unable to load tasks
                        </div>
                        <p className="mt-1">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && tasks.length === 0 && (
                    <div className="rounded-2xl bg-slate-50 px-5 py-8 text-center">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                            <ClipboardList size={25} />
                        </div>

                        <h4 className="mt-4 font-bold text-slate-800">No cleanup tasks yet</h4>

                        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                            No cleanup task has been assigned to this report yet.
                        </p>
                    </div>
                )}

                {/* Task Cards */}
                {!loading &&
                    !error &&
                    tasks.map((task) => (
                        <div
                            key={task._id}
                            className="rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:shadow-md"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <ClipboardList size={18} className="text-emerald-600" />
                                    <h4 className="font-bold text-slate-900">Cleanup Assignment</h4>
                                </div>

                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyle(
                                        task.status
                                    )}`}
                                >
                                    {task.status || "Available"}
                                </span>
                            </div>

                            {/* Reward and Deadline */}
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-amber-50 p-3">
                                    <div className="flex items-center gap-2 text-amber-600">
                                        <Coins size={17} />
                                        <span className="text-xs font-semibold">Reward</span>
                                    </div>

                                    <p className="mt-2 text-xl font-black text-amber-700">
                                        {Number(task.reward?.amount || 0).toLocaleString("en-IN")}
                                        <span className="ml-1 text-xs font-semibold">Points</span>
                                    </p>
                                </div>

                                <div className="rounded-xl bg-blue-50 p-3">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <CalendarDays size={17} />
                                        <span className="text-xs font-semibold">Deadline</span>
                                    </div>

                                    <p className="mt-2 text-sm font-bold text-blue-700">{formatDate(task.deadline)}</p>
                                </div>
                            </div>

                            {/* Guidelines */}
                            {task.guideline && (
                                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Cleanup Guidelines
                                    </p>

                                    <p className="mt-2 text-sm leading-6 text-slate-600">{task.guideline}</p>
                                </div>
                            )}

                            {/* Completion Status */}
                            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                {task.status === "Completed" ? (
                                    <>
                                        <CheckCircle2 size={16} className="text-emerald-600" />
                                        Cleanup successfully completed.
                                    </>
                                ) : (
                                    <>
                                        <Clock size={16} className="text-amber-500" />
                                        Cleanup task is not yet completed.
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
