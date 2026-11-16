import {useEffect, useState} from "react";
import {X, Loader2} from "lucide-react";

export default function TaskModal({report, onClose, onCreated, onCreate, loading = false}) {
    const [reward, setReward] = useState("");
    const [deadline, setDeadline] = useState("");
    const [guideline, setGuideline] = useState("");
    const [reportId, setReportId] = useState(report?._id || "");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setReportId(report?._id || "");
    }, [report?._id]);

    const handleCreate = async (event) => {
        event.preventDefault();
        if (submitting || loading) return;

        const numericReward = Number(reward);
        if (!reportId.trim()) {
            setError("Please provide the report ID.");
            return;
        }
        if (reward.trim() === "" || !Number.isFinite(numericReward) || numericReward < 0) {
            setError("Please enter a valid reward amount (0 or greater).");
            return;
        }
        if (!deadline) {
            setError("Please select a deadline.");
            return;
        }
        if (!guideline.trim()) {
            setError("Please enter cleanup guidelines.");
            return;
        }

        const taskData = {
            report: reportId.trim(),
            reward: {amount: numericReward},
            guideline: guideline.trim(),
            deadline,
            // New cleanup tasks must enter the volunteer queue as Available.
            status: "Available",
        };

        try {
            setSubmitting(true);
            setError("");
            await onCreate(taskData);
            await onCreated();
        } catch (err) {
            console.error("Task creation failed:", err);
            setError(err.message || err.response?.data?.message || "Task creation failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const isLoading = submitting || loading;

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">Operations</p>
                        <h3 className="mt-1 text-xl font-bold">Create cleanup task</h3>
                        <p className="mt-1 text-xs text-slate-400">Convert an approved report into field work.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
                        aria-label="Close create task modal"
                    >
                        <X size={19} />
                    </button>
                </div>

                <form onSubmit={handleCreate}>
                    <div className="mt-6 flex flex-col gap-4">
                        <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                            Report ID
                            <input
                                value={reportId}
                                onChange={(event) => setReportId(event.target.value)}
                                placeholder="Enter the approved report ID"
                                required
                                className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                                Reward
                                <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    value={reward}
                                    onChange={(event) => setReward(event.target.value)}
                                    placeholder="Enter reward amount"
                                    required
                                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                />
                            </label>

                            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                                Deadline
                                <input
                                    value={deadline}
                                    onChange={(event) => setDeadline(event.target.value)}
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                                />
                            </label>
                        </div>

                        <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
                            Cleanup guidelines
                            <textarea
                                value={guideline}
                                onChange={(event) => setGuideline(event.target.value)}
                                placeholder="Enter suitable cleanup guidelines"
                                required
                                className="min-h-24 rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                            />
                        </label>

                        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                            New cleanup tasks are automatically published with <strong>Available</strong> status.
                        </p>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                            >
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="mt-7 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#087f5b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#056b4d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading && <Loader2 size={14} className="animate-spin" />}
                            {isLoading ? "Creating..." : "Create cleanup task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
