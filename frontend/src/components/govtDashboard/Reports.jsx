import { Filter, Plus, Search } from "lucide-react";
import Badge from "./Badge";
import ReportCard from "./ReportCard";
export default function Reports({
  reports: visibleReports,
  allReports,
  search,
  setSearch,
  reportTab,
  setReportTab,
  onReview,
  onTask,
  formatDate,
}) {
  const tabs = [
    { label: "All", value: "All" },
    { label: "Pending Review", value: "Pending Review" },
    { label: "Approved", value: "Approved" },
    { label: "Assigned", value: "Assigned" },
    { label: "In Progress", value: "In-Progress" },
    { label: "Rejected", value: "Rejected" },
    { label: "Escalated", value: "Escalated" },
    { label: "Resolved", value: "Resolved" },
    { label: "Critical", value: "Critical" },
  ];
  const totalReports = allReports.length;
  const pendingReports = allReports.filter(
    (report) => report.status === "Pending Review",
  ).length;
  const approvedReports = allReports.filter(
    (report) => report.status === "Approved",
  ).length;
  const inProgressReports = allReports.filter(
    (report) => report.status === "In-Progress",
  ).length;
  const completionSubmittedReports = allReports.filter(
    (report) => report.status === "Completion-Submitted",
  ).length;
  const underReviewReports = allReports.filter(
    (report) => report.status === "Under-Review",
  ).length;
  const completedReports = allReports.filter(
    (report) => report.status === "Completed",
  ).length;
  const cancelledReports = allReports.filter(
    (report) => report.status === "Rejected",
  ).length;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm text-slate-500">
            Environmental intelligence queue
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Report management
          </h2>
        </div>
        <button
          onClick={() => onTask(null)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#056b4d]"
        >
          <Plus size={16} /> Create cleanup task
        </button>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, description, location, status..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            <Filter size={15} /> Filters
          </button>
          <select className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none">
            <option>All locations</option>
            <option>Sector 12</option>
            <option>East Riverwalk</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setReportTab(value)}
            className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition ${
              reportTab === value
                ? "bg-[#073b35] text-white"
                : "bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
            }`}
          >
            {label}

            <span
              className={`ml-1 ${
                reportTab === value ? "text-emerald-200" : "text-slate-400"
              }`}
            >
              {value === "All"
                ? visibleReports.length
                : value === "Pending Review"
                  ? pendingReports
                  : value === "Approved"
                    ? approvedReports
                    : value === "In-Progress"
                      ? inProgressReports
                      : value === "Rejected"
                        ? cancelledReports
                        : value === "Critical"
                          ? visibleReports.filter(
                              (report) => report.priority === "Critical",
                            ).length
                          : "—"}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {visibleReports.map((report) => (
          <ReportCard
            key={report._id}
            report={report}
            onReview={onReview}
            onTask={onTask}
            formatDate={formatDate}
          />
        ))}
      </div>
      {visibleReports.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search className="mx-auto text-slate-300" size={30} />
          <p className="mt-3 font-bold">No reports found</p>
          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}