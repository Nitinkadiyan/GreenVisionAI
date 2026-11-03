
import { useNavigate } from "react-router-dom";
import {
  Activity,
  CheckCircle2,
  Clock3,
  FileText,
  Gift,
  Star,
  Zap,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import ReportCard from "./ReportCard";

export default function Dashboard2({
  setView,
  query,
  reports = [],
  setSelectedReport,
}) {
  const navigate = useNavigate();

  // Filter reports using the search query
  const filtered = reports.filter((report) =>
    `${report.title || ""} ${report.category || ""} ${report.location?.address || report.location || ""}`
      .toLowerCase()
      .includes((query || "").toLowerCase()),
  );

  // Dashboard statistics
  const pendingReports = reports.filter(
    (report) => report.status === "Pending Review",
  ).length;

  const progressReports = reports.filter(
    (report) => report.status === "In Progress",
  ).length;

  const completedReports = reports.filter(
    (report) =>
      report.status === "Completed" || report.status === "Resolved",
  ).length;

  const stats = [
    [
      "My Reports",
      reports.length,
      "Total submitted",
      FileText,
      "bg-emerald-50 text-emerald-700",
    ],
    [
      "Pending Reports",
      pendingReports,
      "Awaiting government review",
      Clock3,
      "bg-amber-50 text-amber-700",
    ],
    [
      "Active Volunteer Tasks",
      progressReports,
      "Currently in progress",
      Activity,
      "bg-sky-50 text-sky-700",
    ],
    [
      "Completed Tasks",
      completedReports,
      "Successfully completed",
      CheckCircle2,
      "bg-violet-50 text-violet-700",
    ],
    [
      "Total Rewards",
      "₹2,450",
      "Total earned",
      Gift,
      "bg-orange-50 text-orange-700",
    ],
    [
      "My Stars",
      "1,240",
      "Community contribution score",
      Star,
      "bg-amber-50 text-amber-700",
    ],
  ];

  return (
    <div className="space-y-8 p-5 md:p-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 p-6 text-white shadow-xl shadow-emerald-100 md:p-9">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
            <Zap size={14} />
            Small actions. Big impact.
          </div>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Make an Impact Today
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50 md:text-base">
            Report environmental issues, participate in cleanup activities,
            and help build cleaner communities.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/create-report")}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50"
            >
              + Add New Report
            </button>

            <button
              onClick={() => setView("volunteer")}
              className="rounded-xl bg-emerald-800/30 px-4 py-2.5 text-sm font-bold text-white ring-1 ring-white/25 hover:bg-emerald-800/50"
            >
              Explore Cleanup Tasks
            </button>
          </div>
        </div>

        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-28 border-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full border-20 border-white/10" />
      </section>

      {/* Statistics */}
      <section>
        <SectionTitle
          title="Your impact at a glance"
          subtitle="Keep up the momentum — your community is counting on you."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map(([name, value, sub, Icon, color]) => (
            <div
              key={name}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {name}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    {value}
                  </p>
                </div>

                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}
                >
                  <Icon size={19} />
                </span>
              </div>

              <p className="mt-4 text-xs text-slate-400">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* My Reports */}
      <section>
        <SectionTitle
          title="My Reports"
          subtitle="Track your latest environmental reports."
          action="View All"
          onAction={() => setView("reports")}
        />

        <div className="grid gap-4 xl:grid-cols-3">
          {filtered.slice(0, 3).map((report) => (
            <ReportCard
              key={report._id || report.id}
              report={report}
              onClick={() => {
                setSelectedReport(report);
                setView("reportDetail");
              }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
            No reports match your search.
          </div>
        )}
      </section>
    </div>
  );
}
