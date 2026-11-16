import {MapPin, CalendarDays, ShieldCheck, Sparkles, ArrowLeft} from "lucide-react";

import Badge from "./Badge";
import Timeline from "./Timeline";
import CleanupPanel from "./CleanupPanel";
import {getSeverityConfig} from "../../.././utils/severity";

export default function ReportDetail({setView, report}) {
    if (!report) {
        return (
            <div className="p-8">
                <p className="text-slate-500">No report selected.</p>
                <button
                    type="button"
                    onClick={() => setView("reports")}
                    className="mt-3 font-semibold text-emerald-600"
                >
                    Back to My Reports
                </button>
            </div>
        );
    }

    const latitude = report.location?.latitude;
    const longitude = report.location?.longitude;

    const hasCoordinates = latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined;

    const locationText =
        report.location?.address || (hasCoordinates ? `${latitude}, ${longitude}` : "Location not available");

    const submittedDate = report.createdAt ? new Date(report.createdAt) : null;

    const formattedDate =
        submittedDate && !Number.isNaN(submittedDate.getTime())
            ? submittedDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })
            : "Unknown date";

    const confidence = report.aiAnalysis?.confidence;
    const confidenceText = confidence !== null && confidence !== undefined ? `${confidence}%` : "N/A";

    const status = report.status || "Unknown";
    const severity = getSeverityConfig(report.aiAnalysis?.severity);

    return (
        <div className="min-h-screen bg-slate-50/70 p-5 md:p-8">
            {/* Back Button */}
            <button
                onClick={() => setView("reports")}
                className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
            >
                <ArrowLeft size={17} />
                Back to My Reports
            </button>

            {/* Report Header */}
            <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                        Report #{report._id || "N/A"}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                        {report.aiAnalysis?.wasteType || "Environmental Report"}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">Submitted on {formattedDate}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="blue">{status}</Badge>

                    <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${severity.badge}`}
                    >
                        <span className={`h-2 w-2 rounded-full ${severity.dot}`} />
                        {severity.label} Severity
                    </span>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                {/* Left Section */}
                <div className="space-y-6">
                    {/* Report Information */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                        <div className="relative">
                            <img
                                src={report.imageUrl || "/default-report.png"}
                                alt={report.title || "Environmental report"}
                                className="h-64 w-full object-cover md:h-96"
                            />

                            <div className="absolute bottom-4 left-4 rounded-xl bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                                <Sparkles size={13} className="mr-1 inline" />
                                Report Image
                            </div>
                        </div>

                        <div className="grid gap-6 p-6 md:grid-cols-2">
                            {/* Description */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</p>

                                <p className="mt-3 text-sm leading-7 text-slate-600">
                                    {report.description || "No description provided."}
                                </p>
                            </div>

                            {/* Location Details */}
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                                        <MapPin size={18} />
                                    </span>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-400">Location</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{locationText}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="rounded-xl bg-blue-50 p-2 text-blue-600">
                                        <CalendarDays size={18} />
                                    </span>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-400">Submission Date</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">{formattedDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="rounded-xl bg-purple-50 p-2 text-purple-600">
                                        <ShieldCheck size={18} />
                                    </span>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-400">Coordinates</p>
                                        <p className="mt-1 text-sm font-medium text-slate-700">
                                            {hasCoordinates ? `${latitude}°, ${longitude}°` : "Coordinates unavailable"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Environmental Analysis */}
                    <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-100">
                                <Sparkles size={20} />
                            </span>

                            <div>
                                <h3 className="font-bold text-slate-900">AI Environmental Analysis</h3>
                                <p className="text-xs text-slate-500">Analysis completed automatically</p>
                            </div>
                        </div>

                        {/* AI Metrics */}
                        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-emerald-50">
                                <p className="text-xs font-semibold text-slate-500">Waste Type</p>
                                <p className="mt-2 text-sm font-bold text-slate-800">
                                    {report.aiAnalysis?.wasteType || "N/A"}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50">
                                <p className="text-xs font-semibold text-slate-500">Confidence</p>
                                <p className="mt-2 text-sm font-bold text-slate-800">{confidenceText}</p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-amber-50">
                                <p className="text-xs font-semibold text-slate-500">AI Severity</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 rounded-full ${severity.dot}`} />
                                    <span className={`text-sm font-bold ${severity.text}`}>{severity.label}</span>
                                </div>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-4 transition hover:bg-purple-50">
                                <p className="text-xs font-semibold text-slate-500">Estimated Waste</p>
                                <p className="mt-2 text-sm font-bold text-slate-800">
                                    {report.aiAnalysis?.estimatedWasteKg ?? "N/A"}
                                    {report.aiAnalysis?.estimatedWasteKg != null ? " kg" : ""}
                                </p>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div className="mt-6 rounded-2xl bg-emerald-50/70 p-5">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                                AI Summary
                            </p>

                            <p className="text-sm leading-7 text-slate-600">
                                {report.aiAnalysis?.summary || "No AI summary available for this report."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Timeline report={report} />
                    <CleanupPanel report={report} />
                </div>
            </div>
        </div>
    );
}
