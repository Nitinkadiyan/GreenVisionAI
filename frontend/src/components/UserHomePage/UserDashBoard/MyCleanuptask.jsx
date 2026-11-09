import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    MapPin,
    Upload,
    Clock,
    CheckCircle2,
    RefreshCw,
    ImagePlus,
    ShieldCheck,
    Award,
    Play,
    RotateCcw,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import Badge from "./Badge";

const API = "http://localhost:5001/volunteer";

const tabs = [
    {label: "Accepted", value: "accepted", icon: Clock},
    {label: "In Progress", value: "inProgress", icon: Play},
    {label: "Under Government Review", value: "review", icon: ShieldCheck},
    {label: "Approved", value: "completed", icon: CheckCircle2},
];

export default function MyCleanupTask({user}) {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("accepted");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [startingId, setStartingId] = useState(null);
    const [releasingId, setReleasingId] = useState(null);
    const [submittingId, setSubmittingId] = useState(null);

    const [completionTask, setCompletionTask] = useState(null);
    const [description, setDescription] = useState("");
  
    const [afterImage, setAfterImage] = useState(null);

    const userId = user?._id;

    // Fetch all cleanup tasks and filter tasks belonging to logged-in user.
    const getMyTasks = async () => {
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

            const allTasks = response.data.cleanupTasks || [];

            const myTasks = allTasks.filter((task) => {
                const assignedUserId = typeof task.volunteer === "object" ? task.volunteer?._id : task.volunteer;

                return assignedUserId && userId && assignedUserId.toString() === userId.toString();
            });

            setTasks(myTasks);
        } catch (error) {
            console.error("Fetch my cleanup tasks error:", error);

            setError(error.response?.data?.message || "Unable to fetch your cleanup tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) return;
        getMyTasks();
    }, [userId]);

    // 1. Accepted tasks
    const acceptedTasks = useMemo(() => tasks.filter((task) => task.status === "Assigned"), [tasks]);

    // 2. In-progress tasks
    const inProgressTasks = useMemo(() => tasks.filter((task) => task.status === "In-Progress"), [tasks]);

    // 3. Tasks awaiting government verification
    const reviewTasks = useMemo(
        () => tasks.filter((task) => ["Completion-Submitted", "Under-Review"].includes(task.status)),
        [tasks]
    );

    // 4. Government-approved tasks
    const completedTasks = useMemo(
        () => tasks.filter((task) => ["Completed", "completed"].includes(task.status)),
        [tasks]
    );

    // Tasks displayed according to selected tab
    const displayedTasks =
        activeTab === "accepted"
            ? acceptedTasks
            : activeTab === "inProgress"
            ? inProgressTasks
            : activeTab === "review"
            ? reviewTasks
            : completedTasks;

    const counts = {
        accepted: acceptedTasks.length,
        inProgress: inProgressTasks.length,
        review: reviewTasks.length,
        completed: completedTasks.length,
    };

    // Get task location
    const getLocation = (task) =>
        task.report?.location?.address
            ? task.report.location.address.split(",").slice(0, 2).join(", ")
            : "Location unavailable";

    // Get task reward
    const getReward = (task) => {
        if (task.reward?.amount != null) {
            return `₹${task.reward.amount}`;
        }

        return "Not specified";
    };

    // Get status badge color
    const getStatusTone = (status) => {
        if (["Completed", "completed"].includes(status)) return "green";

        if (status === "In-Progress") return "orange";

        if (["Completion-Submitted", "Under-Review"].includes(status)) {
            return "teal";
        }

        return "green";
    };

    // Start an accepted task
    const startTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            setStartingId(id);

            await axios.patch(
                `${API}/${id}/start`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await getMyTasks();
            setActiveTab("inProgress");
        } catch (error) {
            console.error("Start cleanup task error:", error);

            alert(error.response?.data?.message || "Unable to start this cleanup task.");
        } finally {
            setStartingId(null);
        }
    };

    // Release an accepted task
    const releaseTask = async (id) => {
        try {
            const token = localStorage.getItem("token");

            setReleasingId(id);

            await axios.patch(
                `${API}/${id}/release`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await getMyTasks();

            alert("Task released successfully.");
            setActiveTab("accepted");
        } catch (error) {
            console.error("Release cleanup task error:", error);

            alert(error.response?.data?.message || "Unable to release this task.");
        } finally {
            setReleasingId(null);
        }
    };

    // Open completion submission form
    const openCompletionForm = (task) => {
        setCompletionTask(task);
        setDescription("");
       
        setAfterImage(null);
    };

    // Close completion submission form
    const closeCompletionForm = () => {
        setCompletionTask(null);
        setDescription("");
        
        setAfterImage(null);
    };

    // Submit completion evidence for AI analysis and government review
    const submitCompletion = async (event) => {
        event.preventDefault();

        if (!afterImage) {
            alert("Please upload both before and after images.");
            return;
        }

        if (!description.trim()) {
            alert("Please describe the cleanup work completed.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            
            formData.append("afterImage", afterImage);
            formData.append("description", description.trim());

            setSubmittingId(completionTask._id);

            await axios.patch(`${API}/${completionTask._id}/submit-completed-task`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            closeCompletionForm();

            await getMyTasks();
            setActiveTab("review");
        } catch (error) {
            console.error("Submit completion error:", error);

            alert(error.response?.data?.message || "Unable to submit task completion.");
        } finally {
            setSubmittingId(null);
        }
    };

    if (!userId) {
        return (
            <div className="p-5 md:p-8">
                <SectionTitle title="My Cleanup Tasks" subtitle="Manage your cleanup assignments and history." />

                <div className="mt-6 rounded-2xl bg-amber-50 p-5 text-sm text-amber-800">
                    User information is not available. Please reload your dashboard.
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 md:p-8">
            {/* Page heading */}
            <SectionTitle
                title="My Cleanup Tasks"
                subtitle="Manage your accepted tasks, track government verification, and view your approved cleanup work."
            />

            {/* Summary cards */}
            <div className="mb-7 grid grid-cols-2 gap-4 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Accepted</p>
                        <Clock size={19} className="text-blue-600" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-blue-600">{counts.accepted}</p>

                    <p className="mt-1 text-xs text-slate-400">Waiting to be started</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">In Progress</p>
                        <Play size={19} className="text-orange-500" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-orange-500">{counts.inProgress}</p>

                    <p className="mt-1 text-xs text-slate-400">Currently working</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Under Review</p>
                        <ShieldCheck size={19} className="text-purple-600" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-purple-600">{counts.review}</p>

                    <p className="mt-1 text-xs text-slate-400">Awaiting government approval</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">Approved</p>
                        <Award size={19} className="text-emerald-600" />
                    </div>

                    <p className="mt-3 text-3xl font-bold text-emerald-600">{counts.completed}</p>

                    <p className="mt-1 text-xs text-slate-400">Successfully verified tasks</p>
                </div>
            </div>

            {/* Four task sections */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                activeTab === tab.value
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                            }`}
                        >
                            <Icon size={16} />

                            {tab.label}

                            <span className="text-xs opacity-80">{counts[tab.value]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Refresh button */}
            <div className="mb-5 flex justify-end">
                <button
                    onClick={getMyTasks}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* Error message */}
            {error && <div className="mb-5 rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}

            {/* Task list */}
            {loading ? (
                <div className="py-16 text-center text-sm text-slate-500">Loading your cleanup tasks...</div>
            ) : displayedTasks.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                    {activeTab === "accepted" ? (
                        <>
                            <Clock size={36} className="mx-auto mb-3 text-blue-500" />

                            <h3 className="font-bold text-slate-800">No Accepted Tasks</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Tasks you accept from the Volunteer section will appear here.
                            </p>
                        </>
                    ) : activeTab === "inProgress" ? (
                        <>
                            <Play size={36} className="mx-auto mb-3 text-orange-500" />

                            <h3 className="font-bold text-slate-800">No Tasks In Progress</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Start an accepted task to begin your cleanup work.
                            </p>
                        </>
                    ) : activeTab === "review" ? (
                        <>
                            <ShieldCheck size={36} className="mx-auto mb-3 text-purple-500" />

                            <h3 className="font-bold text-slate-800">Nothing Under Government Review</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Tasks submitted for government verification will appear here.
                            </p>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-500" />

                            <h3 className="font-bold text-slate-800">No Approved Tasks Yet</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Your successfully approved cleanup tasks will appear here.
                            </p>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                    {displayedTasks.map((task) => (
                        <div key={task._id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                            {/* Task heading */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="font-bold text-slate-900">{task.title}</h3>

                                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                                        <MapPin size={15} className="text-emerald-600" />
                                        {getLocation(task)}
                                    </p>
                                </div>

                                <Badge tone={getStatusTone(task.status)}>
                                    {task.status === "Assigned"
                                        ? "Accepted"
                                        : task.status === "In-Progress"
                                        ? "In Progress"
                                        : ["Completion-Submitted", "Under-Review"].includes(task.status)
                                        ? "Under Government Review"
                                        : "Approved"}
                                </Badge>
                            </div>

                            {/* Task information */}
                            <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
                                <div>
                                    <p className="text-xs text-slate-400">
                                        {["Completed", "completed"].includes(task.status)
                                            ? "Reward Earned"
                                            : "Expected Reward"}
                                    </p>

                                    <p className="mt-1 font-bold text-emerald-700">{getReward(task)}</p>
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

                            {/* Accepted: Start or Release */}
                            {task.status === "Assigned" && (
                                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                    <button
                                        onClick={() => startTask(task._id)}
                                        disabled={startingId === task._id || releasingId === task._id}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                                    >
                                        <Play size={16} />

                                        {startingId === task._id ? "Starting..." : "Start Task"}
                                    </button>

                                    <button
                                        onClick={() => releaseTask(task._id)}
                                        disabled={releasingId === task._id || startingId === task._id}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                                    >
                                        <RotateCcw size={15} />

                                        {releasingId === task._id ? "Releasing..." : "Release Task"}
                                    </button>
                                </div>
                            )}

                            {/* In Progress: Submit Completion */}
                            {task.status === "In-Progress" && (
                                <button
                                    onClick={() => openCompletionForm(task)}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                                >
                                    <Upload size={16} />
                                    Submit Completion
                                </button>
                            )}

                            {/* Under Government Review */}
                            {["Completion-Submitted", "Under-Review"].includes(task.status) && (
                                <div className="mt-5 rounded-xl bg-purple-50 p-4">
                                    <div className="flex items-center gap-2 font-semibold text-purple-700">
                                        <ShieldCheck size={18} />
                                        Awaiting Government Approval
                                    </div>

                                    <p className="mt-2 text-sm text-purple-600">
                                        Your cleanup evidence has been submitted successfully. The government team is
                                        reviewing your submission.
                                    </p>
                                </div>
                            )}

                            {/* Approved */}
                            {["Completed", "completed"].includes(task.status) && (
                                <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                                    <CheckCircle2 size={18} />
                                    Your cleanup task has been approved!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Completion submission modal */}
            {completionTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
                    <form
                        onSubmit={submitCompletion}
                        className="max-h-[90vh] w-full max-w-xl space-y-5 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
                    >
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Submit Task Completion</h2>

                            <p className="mt-1 text-sm text-slate-500">{completionTask.title}</p>
                        </div>

                        
                        {/* After image */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                After Cleanup Image
                            </label>

                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 hover:border-emerald-400">
                                <ImagePlus size={22} className="text-emerald-600" />

                                <span className="min-w-0 truncate text-sm text-slate-600">
                                    {afterImage ? afterImage.name : "Choose after image"}
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => setAfterImage(event.target.files?.[0] || null)}
                                />
                            </label>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Describe the cleanup work
                            </label>

                            <textarea
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                placeholder="Describe what you cleaned, the work performed, and the result..."
                                rows={4}
                                className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-400"
                            />
                        </div>

                        <p className="text-xs text-slate-500">
                            Both images and a description are required. Your submitted evidence will be processed by the
                            existing AI verification workflow and sent for government review.
                        </p>

                        {/* Modal actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={closeCompletionForm}
                                disabled={submittingId === completionTask._id}
                                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submittingId === completionTask._id}
                                className="flex-1 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {submittingId === completionTask._id
                                    ? "Analyzing & Submitting..."
                                    : "Submit for Review"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
