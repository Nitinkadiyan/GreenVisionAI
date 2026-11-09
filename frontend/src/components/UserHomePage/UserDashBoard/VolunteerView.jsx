import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {MapPin, X, Sparkles, Users, CalendarDays, RefreshCw} from "lucide-react";

import SectionTitle from "./SectionTitle";
import Badge from "./Badge";

const API = "http://localhost:5001/volunteer";

const tabs = [
    {label: "Available", value: "Available"},
    {label: "Accepted", value: "Assigned"},
    {label: "In Progress", value: "In-Progress"},
    {label: "Submitted", value: "Completion-Submitted"},
    {label: "Completed", value: "completed"},
];

const statusTone = {
    Available: "green",
    Assigned: "teal",
    "In-Progress": "orange",
    "Completion-Submitted": "orange",
    completed: "green",
};

export default function VolunteerView() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("Available");
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [acceptingId, setAcceptingId] = useState(null);
    const [error, setError] = useState("");

    const getCleanupTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(`${API}/clean-up-tasks`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks(response.data.cleanupTasks || []);
        } catch (error) {
            console.error("Failed to fetch cleanup tasks:", error);
            setError(error.response?.data?.message || "Unable to load cleanup tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCleanupTasks();
    }, []);

    const acceptTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            setAcceptingId(id);

            const response = await axios.patch(
                `${API}/${id}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Replace the updated task in the existing task list.
            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task._id === id
                        ? {
                              ...task,
                              ...response.data.cleanupTask,
                              volunteer: response.data.cleanupTask.volunteer || response.data.cleanupTask.volunteer,
                          }
                        : task
                )
            );

            // Fetch again so the populated volunteer information is available.
            await getCleanupTasks();
        } catch (error) {
            console.error("Accept task error:", error);

            alert(error.response?.data?.message || "Unable to accept this task. It may already be assigned.");

            await getCleanupTasks();
        } finally {
            setAcceptingId(null);
        }
    };

    const filteredTasks = tasks.filter((task) => task.status === activeTab);

    const getLocation = (task) =>
        task.report?.location?.address
            ? task.report.location.address.split(",").slice(0, 2).join(", ")
            : "Location unavailable";

    const getVolunteerName = (task) => task.volunteer?.username || task.volunteer?.name || "Autonomus Volunteer";

    const getPriorityTone = (priority) => {
        if (priority === "Critical") return "red";
        if (priority === "High") return "orange";
        if (priority === "Medium") return "teal";
        return "green";
    };

    return (
        <div className="p-5 md:p-8">
            <SectionTitle
                title="Become a Volunteer"
                subtitle="Explore cleanup opportunities and contribute towards a cleaner environment."
            />

            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <Sparkles size={20} className="mt-0.5 shrink-0" />
                <p>
                    <span className="font-bold">Good to know:</span> Explore cleanup tasks, check their current status,
                    and accept available tasks using your existing citizen account. You can manage your accepted tasks
                    in My Cleanup Tasks.
                </p>
            </div>

            {/* Task status tabs */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                    const count = tasks.filter((task) => task.status === tab.value).length;

                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                activeTab === tab.value
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                            }`}
                        >
                            {tab.label}
                            <span className="ml-2 text-xs opacity-80">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Refresh */}
            <div className="mb-5 flex justify-end">
                <button
                    onClick={getCleanupTasks}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    Refresh tasks
                </button>
            </div>

            {error && <div className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

            {loading ? (
                <div className="py-16 text-center text-sm text-slate-500">Loading cleanup tasks...</div>
            ) : filteredTasks.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                    <Sparkles size={32} className="mx-auto mb-3 text-emerald-500" />
                    <h3 className="font-bold text-slate-800">
                        No {tabs.find((tab) => tab.value === activeTab)?.label} Tasks
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">There are currently no tasks in this category.</p>
                </div>
            ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                    {filteredTasks.map((task) => (
                        <div
                            key={task._id}
                            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-bold text-slate-900">{task.title}</h3>

                                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                                        <MapPin size={15} className="text-emerald-600" />
                                        {getLocation(task)}
                                    </p>
                                </div>

                                <Badge tone={getPriorityTone(task.report?.priority)}>
                                    {task.report?.priority || "Normal"}
                                </Badge>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-xs text-slate-400">Reward</p>
                                    <p className="mt-1 font-bold text-emerald-700">
                                        {task.reward?.amount != null ? `₹${task.reward.amount}` : "Not specified"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">Deadline</p>
                                    <p className="mt-1 font-semibold text-slate-700">
                                        {task.deadline
                                            ? new Date(task.deadline).toLocaleDateString("en-IN")
                                            : "Not specified"}
                                    </p>
                                </div>
                            </div>

                            {/* Public assignment information */}
                            {task.status !== "Available" && task.volunteer && (
                                <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
                                    <Users size={16} />
                                    <span>
                                        Accepted by: <strong>{getVolunteerName(task)}</strong>
                                    </span>
                                </div>
                            )}

                            <div className="mt-5 flex gap-3">
                                {task.status === "Available" ? (
                                    <button
                                        onClick={() => acceptTask(task._id)}
                                        disabled={acceptingId === task._id}
                                        className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {acceptingId === task._id ? "Accepting..." : "Accept Task"}
                                    </button>
                                ) : (
                                    <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600">
                                        {task.status === "Assigned"
                                            ? "Already Accepted"
                                            : task.status === "In-Progress"
                                            ? "Work In Progress"
                                            : task.status === "Completion-Submitted"
                                            ? "Awaiting Verification"
                                            : "Task Completed"}
                                    </div>
                                )}

                                <button
                                    onClick={() => setSelectedTask(task)}
                                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
                                >
                                    View Task
                                </button>
                            </div>

                            <p className="mt-3 text-center text-xs font-semibold text-slate-400">
                                Current status: {task.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Task details modal */}
            {selectedTask && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedTask(null)}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5 md:p-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                    GreenVision AI · Task Details
                                </p>
                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    {selectedTask.title || "Cleanup Task"}
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelectedTask(null)}
                                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                                aria-label="Close task details"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6 p-5 md:p-6">
                            <div className="overflow-hidden rounded-2xl bg-slate-100">
                                {selectedTask.report?.imageUrl ? (
                                    <img
                                        src={selectedTask.report.imageUrl}
                                        alt={selectedTask.report.aiAnalysis?.wasteType || "Reported waste"}
                                        className="max-h-96 w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                                        No report image available.
                                    </div>
                                )}
                            </div>

                            <section>
                                <h3 className="mb-3 text-lg font-bold text-slate-900">Cleanup Task Overview</h3>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <div className="rounded-xl bg-emerald-50 p-4">
                                        <p className="text-xs text-slate-500">Reward</p>
                                        <p className="mt-1 text-xl font-bold text-emerald-700">
                                            {selectedTask.reward?.amount != null
                                                ? `₹${selectedTask.reward.amount}`
                                                : "Not specified"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 p-4">
                                        <p className="text-xs text-slate-500">Deadline</p>
                                        <p className="mt-1 font-bold text-slate-800">
                                            {selectedTask.deadline
                                                ? new Date(selectedTask.deadline).toLocaleDateString("en-IN")
                                                : "Not specified"}
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 p-4">
                                        <p className="text-xs text-slate-500">Task Status</p>
                                        <p className="mt-1 font-bold text-slate-800">{selectedTask.status}</p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-slate-200 p-5">
                                <h3 className="text-lg font-bold text-slate-900">Original Environmental Report</h3>

                                <div className="mt-4 space-y-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-400">Report ID</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-800">
                                            {selectedTask.report?._id || selectedTask.report || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
                                            <MapPin size={15} />
                                            Location
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-slate-700">
                                            {selectedTask.report?.location?.address || "Location not available"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-400">
                                            Report Description
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-slate-600">
                                            {selectedTask.report?.description || "No report description available."}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase text-slate-400">Report Status</p>
                                        <p className="mt-1 text-sm font-semibold text-slate-700">
                                            {selectedTask.report?.status || "Unknown"}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={20} className="text-emerald-600" />
                                    <h3 className="text-lg font-bold text-slate-900">AI Environmental Analysis</h3>
                                </div>

                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-slate-500">Waste Type</p>
                                        <p className="mt-1 font-semibold text-slate-800">
                                            {selectedTask.report?.aiAnalysis?.wasteType || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">Severity</p>
                                        <p className="mt-1 font-semibold text-slate-800">
                                            {selectedTask.report?.aiAnalysis?.severity || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">AI Confidence</p>
                                        <p className="mt-1 font-semibold text-slate-800">
                                            {selectedTask.report?.aiAnalysis?.confidence != null
                                                ? `${selectedTask.report.aiAnalysis.confidence}%`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-500">Estimated Waste</p>
                                        <p className="mt-1 font-semibold text-slate-800">
                                            {selectedTask.report?.aiAnalysis?.estimatedWasteKg != null
                                                ? `${selectedTask.report.aiAnalysis.estimatedWasteKg} kg`
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-emerald-100 pt-4">
                                    <p className="text-xs font-semibold uppercase text-slate-500">AI Summary</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-700">
                                        {selectedTask.report?.aiAnalysis?.summary ||
                                            "No AI analysis summary available."}
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-lg font-bold text-slate-900">Cleanup Guidelines</h3>
                                <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                                    {selectedTask.guideline ||
                                        selectedTask.guidelines ||
                                        "Follow the local authority's safety and waste-segregation guidelines."}
                                </p>
                            </section>

                            <div className="flex justify-end border-t border-slate-100 pt-4">
                                <button
                                    onClick={() => setSelectedTask(null)}
                                    className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
