
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Search } from "lucide-react";

import SectionTitle from "./SectionTitle";
import ReportCard from "./ReportCard";

export default function ReportsView({
  setView,
  query,
  setQuery,
  setSelectedReport,
  reports = [],
  reportsLoading,
  reportsError,
  initialFilter = "All",
}) {
  const [filter, setFilter] = useState(initialFilter);
  const navigate = useNavigate();

  // Update the dropdown when a dashboard card is clicked.
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const list = reports.filter((report) => {
    const statusMatch =
      filter === "All" || report.status === filter;

    const searchText = `
      ${report.title || ""}
      ${report.description || ""}
      ${report.location?.address || ""}
      ${report.aiAnalysis?.wasteType || ""}
    `.toLowerCase();

    const searchMatch = searchText.includes(
      (query || "").trim().toLowerCase()
    );

    return statusMatch && searchMatch;
  });

  if (reportsLoading) {
    return <div className="p-8">Loading reports...</div>;
  }

  if (reportsError) {
    return (
      <div className="p-8 text-red-500">
        {reportsError}
      </div>
    );
  }

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Reports"
        subtitle="A complete record of the issues you have helped surface."
        action="Add New Report"
        onAction={() => navigate("/create-report")}
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {/* Status Filter */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
          <Filter size={15} />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent font-semibold outline-none"
          >
            <option value="All">All</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Accepted by Government">
              Accepted by Government
            </option>
            <option value="Assigned Cleanup">
              Assigned Cleanup
            </option>
            <option value="In Progress">In Progress</option>
            <option value="Completion Submitted">
              Completion Submitted
            </option>
            <option value="Government Review">
              Government Review
            </option>
            <option value="Completed">Completed</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected by Government">
              Rejected by Government
            </option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-400">
          <Search size={15} />

          <input
            value={query || ""}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-36 outline-none"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((report) => (
            <ReportCard
              key={report._id}
              report={report}
              onClick={() => {
                setSelectedReport(report);
                setView("reportDetail");
              }}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No reports found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
