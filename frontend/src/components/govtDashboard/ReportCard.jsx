
import { MoreHorizontal, MapPin } from "lucide-react";
import Badge from "./Badge";
import statusTone from "./statusTone";
import { getSeverityConfig } from "../../utils/severity";
export default function ReportCard({ report, onReview, onTask, formatDate }) {
  const severity = getSeverityConfig(report?.aiAnalysis?.severity);
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-44">
        <img
          src={report.imageUrl}
          alt={`Environmental issue for ${report.id}`}
          className="size-full object-cover"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone={statusTone(report.status)}>{report.status}</Badge>
          <span
  className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${severity.badge}`}
>
  {severity.label}
</span>
        </div>
        <button
          onClick={() => onReview(report)}
          className="absolute right-3 top-3 rounded-lg bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur hover:text-emerald-700"
        >
          <MoreHorizontal size={17} />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold">{report.aiAnalysis.wasteType}</p>
            <p className="mt-1 text-xs text-slate-500">
              Submitted by {report.userId?.name}
            </p>
          </div>
          <p className="text-right text-[10px] font-medium text-slate-400">
            {formatDate(report.createdAt)}
          </p>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-5 text-slate-700">
          {report.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={14} className="text-emerald-600" />{" "}
          {report.location?.address?.split(",").slice(0, 2).join(", ") || ""}
          <span className="text-slate-300">•</span> ({report.location.latitude},{" "}
          {report.location.longitude})
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-100 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              AI severity
            </p>
            <p className={`mt-1 text-xs font-bold ${
  severity.color === "slate"
    ? "text-slate-500"
    : `text-${severity.color}-600`
}`}>
  {severity.label}
</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Confidence
            </p>
            <p className="mt-1 text-xs font-bold">
              {report.aiAnalysis.confidence}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Est. waste
            </p>
            <p className="mt-1 text-xs font-bold">
              {report.aiAnalysis.wasteType}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Due{" "}
            <span className="font-bold text-slate-600">
              {formatDate(report.createdAt)}
            </span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onReview(report)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
            >
              Review
            </button>
            <button
              onClick={() => onTask(report)}
              className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100"
            >
              Create task
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
