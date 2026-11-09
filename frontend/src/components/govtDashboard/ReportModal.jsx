import {useState} from "react";
import axios from "axios";

import {AlertTriangle, Check, ClipboardCheck, MapPin, Sparkles, X} from "lucide-react";

import Badge from "./Badge";
import statusTone from "./statusTone";
import { getSeverityConfig } from "../../utils/severity";

export default function ReportModal({
  report,
  onClose,
  onTask,
  onAction,
  onApprove,
  onReject,
  formatDate,
}) {
  const severity = getSeverityConfig(report?.aiAnalysis?.severity);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              Report details
            </p>
            <h3 className="mt-1 text-lg font-bold">#{report._id}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <img
              src={report.imageUrl}
              alt="Reported environmental issue"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
            <div className="mt-4 flex gap-2">
              <Badge tone={statusTone(report.status)}>
  {report.status}
</Badge>

<span
  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${severity.badge}`}
>
  {severity.label} Severity
</span>
                
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {report.description}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Report ID", report._id],
                ["User ID", report.userId],
                ["Created", formatDate(report.createdAt)],
                ["Deadline", formatDate(report.createdAt)],
                ["Latitude", report.location.latitude],
                ["Longitude", report.location.longitude],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex items-center gap-2 text-emerald-800">
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
                  <p className="text-sm font-bold text-emerald-950">
  {report.aiAnalysis?.wasteType || "Not detected"}
</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Confidence
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-950">
                    {report.aiAnalysis.confidence}
                  </p>
                </div>
                <div>
  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
    Severity
  </p>

  <div className="mt-1 flex items-center gap-2">
    <span className={`h-2.5 w-2.5 rounded-full ${severity.dot}`} />

    <p className={`text-sm font-bold ${severity.text}`}>
      {severity.label}
    </p>
  </div>
</div>
                <div>
                  <p className="text-[10px] font-semibold uppercase text-emerald-800/55">
                    Est. waste
                  </p>
                  <p className="mt-1 text-sm font-bold text-emerald-950">
                    {report.aiAnalysis.wasteType}
                  </p>
                </div>
            </div>
        </div>
    );
}
