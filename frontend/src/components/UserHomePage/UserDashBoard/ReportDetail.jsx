import {MapPin, CalendarDays, ShieldCheck, Sparkles} from "lucide-react";

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

    // Centralized AI severity configuration
    const severity = getSeverityConfig(report.aiAnalysis?.severity);

    return (
        <div className="p-5 md:p-8">
            {/* Report Header */}
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                        Report #{report._id || "N/A"}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                        {report.aiAnalysis?.wasteType || "Environmental Report"}
                    </h2>
                </div>

                {/* Status and Severity Badges */}
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
                <div className="space-y-6">
                    {/* Report Information */}
                    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
                        <img
                            src={report.imageUrl || "/default-report.png"}
                            alt={report.title || "Environmental report"}
                            className="h-64 w-full object-cover md:h-80"
                        />

                        <div className="grid gap-5 p-6 sm:grid-cols-2">
                            {/* Description */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</p>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {report.description || "No description provided."}
                                </p>
                            </div>

                            {/* Location and Submission Information */}
                            <div className="space-y-3 text-sm text-slate-600">
                                <p className="flex items-start gap-2">
                                    <MapPin size={17} className="shrink-0 text-emerald-600" />

                                    <span>{locationText}</span>
                                </p>

                                <p className="flex items-center gap-2">
                                    <CalendarDays size={17} className="shrink-0 text-emerald-600" />

                                    <span>Submitted {formattedDate}</span>
                                </p>

                                <p className="flex items-center gap-2">
                                    <ShieldCheck size={17} className="shrink-0 text-emerald-600" />

                                    <span>
                                        {hasCoordinates ? `${latitude}°, ${longitude}°` : "Coordinates unavailable"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AI Environmental Analysis */}
                    <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
                        <div className="flex items-center gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white">
                                <Sparkles size={19} />
                            </span>

                            <div>
                                <h3 className="font-bold text-slate-900">AI Environmental Analysis</h3>

                                <p className="text-xs text-slate-500">Analysis completed automatically</p>
                            </div>
                        </div>

                        {/* AI Metrics */}
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {/* Waste Type */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Waste Type</p>

                                <p className="mt-1 text-sm font-bold text-slate-800">
                                    {report.aiAnalysis?.wasteType || "N/A"}
                                </p>
                            </div>

                            {/* Confidence */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Confidence</p>

                                <p className="mt-1 text-sm font-bold text-slate-800">{confidenceText}</p>
                            </div>

                            {/* Severity */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500">AI Severity</p>

                                <div className="mt-2 flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 rounded-full ${severity.dot}`} />

                                    <span className={`text-sm font-bold ${severity.text}`}>{severity.label}</span>
                                </div>
                            </div>

                            {/* Estimated Waste */}
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Estimated Waste</p>

                                <p className="mt-1 text-sm font-bold text-slate-800">
                                    {report.aiAnalysis?.estimatedWasteKg ?? "N/A"}
                                    {report.aiAnalysis?.estimatedWasteKg != null ? " kg" : ""}
                                </p>
                            </div>
                        </div>

                        {/* AI Summary */}
                        <p className="mt-5 text-sm leading-6 text-slate-600">
                            {report.aiAnalysis?.summary || "No AI summary available for this report."}
                        </p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <Timeline />

                    <CleanupPanel />
                </div>
            </div>
        </div>
    );
}
