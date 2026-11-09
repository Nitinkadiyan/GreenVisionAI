import {useState} from "react";
import axios from "axios";

import {AlertTriangle, Check, ClipboardCheck, MapPin, Sparkles, X} from "lucide-react";

import Badge from "./Badge";
import statusTone from "./statusTone";

export default function ReportModal({report, onClose, onTask, onApprove, onReject, onEscalate, formatDate}) {
    const [escalating, setEscalating] = useState(false);
    const [escalationMessage, setEscalationMessage] = useState("");

    const handleEscalate = async () => {
        if (!report?._id || escalating) return;

        setEscalating(true);
        setEscalationMessage("");

        let statusUpdated = false;

        try {
            const token = localStorage.getItem("token");
               await axios.post(
                   `http://localhost:5001/reports/${report._id}/escalate-email`,
                   {},
                   {
                       headers: {
                           Authorization: `Bearer ${token}`,
                       },
                   }
               );
            await axios.patch(
                `http://localhost:5001/volunteer/reports/${report._id}/status`,
                {
                    status: "Escalated",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

         

            setEscalationMessage("Report escalated and municipal corporation notified successfully.");

            if (onEscalate) {
                onEscalate(report._id);
            }
        } catch (error) {
            console.error("Escalation error:", error.response?.data || error.message);

            if (statusUpdated) {
                setEscalationMessage(
                    "Report status was updated to Escalated, but the email could not be sent. Please retry the notification."
                );
            } else {
                setEscalationMessage(error.response?.data?.message || "Failed to escalate report.");
            }
        } finally {
            setEscalating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                            Report details
                        </p>

                        <h3 className="mt-1 text-lg font-bold">
                            Submitted By {report?.userId?.name || "Unknown User"}
                        </h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
                    {/* Left Section */}
                    <div>
                        <img
                            src={report?.imageUrl}
                            alt="Reported environmental issue"
                            className="aspect-4/3 w-full rounded-2xl object-cover"
                        />

                        <div className="mt-4 flex gap-2">
                            <Badge tone={statusTone(report?.status)}>{report?.status}</Badge>

                            <Badge tone={statusTone(report?.priority)}>{report?.priority} priority</Badge>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-600">{report?.description}</p>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {[
                                ["Report ID", report?._id],
                                ["User ID", report?.userId?._id || "N/A"],
                                ["Created", formatDate(report?.createdAt)],
                                ["Latitude", report?.location?.latitude ?? "N/A"],
                                ["Longitude", report?.location?.longitude ?? "N/A"],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                        {label}
                                    </p>

                                    <p className="mt-1 break-all text-xs font-semibold text-slate-700">
                                        {String(value ?? "N/A")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div>
                        {/* AI Analysis */}
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                            <div className="flex flex-wrap items-center gap-2 text-emerald-800">
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
                                        {report?.aiAnalysis?.wasteType || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                                        Confidence
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-emerald-950">
                                        {report?.aiAnalysis?.confidence ?? "N/A"}
                                        {report?.aiAnalysis?.confidence != null ? "%" : ""}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase text-emerald-800/55">Severity</p>

                                    <p className="mt-1 text-sm font-bold text-rose-700">
                                        {report?.aiAnalysis?.severity || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-semibold uppercase text-emerald-800/55">Priority</p>

                                    <p className="mt-1 text-sm font-bold text-emerald-950">
                                        {report?.priority || "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 border-t border-emerald-200/60 pt-4">
                                <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                                    Environmental risk
                                </p>

                                <p className="mt-1 text-xs leading-5 text-emerald-950/75">
                                    {report?.aiAnalysis?.environmentalRisk || "N/A"}
                                </p>

                                <p className="mt-4 text-[10px] font-semibold uppercase text-emerald-800/55">
                                    Recommended action
                                </p>

                                <p className="mt-1 text-xs leading-5 text-emerald-950/75">
                                    {report?.aiAnalysis?.possibleAction || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mt-5 rounded-2xl border border-slate-200 p-5">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-emerald-600" />

                                <p className="text-sm font-bold">Location</p>
                            </div>

                            <p className="mt-2 text-sm font-semibold">
                                {report?.location?.address?.split(",").slice(0, 4).join(", ") || "Location unavailable"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                {report?.location?.latitude ?? "N/A"}, {report?.location?.longitude ?? "N/A"}
                            </p>
                        </div>

                        {/* Escalation Feedback */}
                        {escalationMessage && (
                            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
                                <p className="text-xs font-medium leading-5 text-amber-800">{escalationMessage}</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <button
                                onClick={() => onApprove(report._id)}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#087f5b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#056b4d]"
                            >
                                <Check size={15} />
                                Approve report
                            </button>

                            <button
                                onClick={handleEscalate}
                                disabled={escalating || report?.status === "Escalated"}
                                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700 hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <AlertTriangle size={15} />

                                {escalating
                                    ? "Escalating..."
                                    : report?.status === "Escalated"
                                    ? "Already escalated"
                                    : "Escalate for manual review"}
                            </button>

                            <button
                                onClick={() => onReject(report._id)}
                                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                            >
                                <X size={15} />
                                Reject
                            </button>

                            <button
                                onClick={onTask}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                                <ClipboardCheck size={15} />
                                Create cleanup task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
