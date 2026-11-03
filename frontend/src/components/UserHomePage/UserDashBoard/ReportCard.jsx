
import { MoreHorizontal, MapPin } from "lucide-react";
import Badge from "./Badge";
export default function ReportCard({ report, onClick }) {
  const tone =
    report.status === "Resolved"
      ? "green"
      : report.status === "Pending Review"
        ? "amber"
        : "blue";
  return (
    <button
      onClick={onClick}
      className="group flex w-full gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <img
        src={report.imageUrl}
        alt={report.aiAnalysis?.wasteType || "Waste report"}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="truncate font-bold text-slate-800">
              {report.aiAnalysis?.wasteType || "Environmental Report"}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              {report.aiAnalysis?.severity || "Unknown"}Severity
            </p>
          </div>
          <MoreHorizontal size={18} className="shrink-0 text-slate-300" />
        </div>
        <p className="mt-3 flex items-center gap-1 truncate text-xs text-slate-500">
          <MapPin size={13} />
          {report.location?.address?.split(",").slice(0, 2).join(", ") || ""}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone={tone}>{report.status || "Unknown"}</Badge>
          <span className="text-[11px] text-slate-400">
            {report.createdAt
              ? new Date(report.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </button>
  );
}
