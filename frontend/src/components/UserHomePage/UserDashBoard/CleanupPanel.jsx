
import Badge from "./Badge";

export default function CleanupPanel({ cleanupTask, onViewDetails }) {
  if (!cleanupTask) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-900">Cleanup Task</h3>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          No cleanup task has been assigned to this report yet.
        </p>
      </div>
    );
  }

  const status = cleanupTask.status || "Unknown";

  const statusTone = {
    completed: "green",
    resolved: "green",
    "in progress": "blue",
    accepted: "amber",
    assigned: "amber",
    pending: "slate",
  };

  const formattedDeadline = cleanupTask.deadline
    ? new Date(cleanupTask.deadline).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  const reward =
    cleanupTask.reward !== null && cleanupTask.reward !== undefined
      ? `₹${cleanupTask.reward}`
      : "Not specified";

  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-bold">Cleanup Task</h3>

        <Badge
          tone={statusTone[status.toLowerCase()] || "slate"}
        >
          {status}
        </Badge>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Reward</span>
          <strong>{reward}</strong>
        </div>

        <div className="flex justify-between border-b border-white/10 pb-3">
          <span className="text-slate-400">Deadline</span>
          <strong>{formattedDeadline}</strong>
        </div>

        <div>
          <span className="text-slate-400">Guideline</span>

          <p className="mt-1 leading-5 text-slate-200">
            {cleanupTask.guideline ||
              "Follow the assigned cleanup instructions and safely dispose of collected waste."}
          </p>
        </div>
      </div>

      {onViewDetails && (
        <button
          type="button"
          onClick={() => onViewDetails(cleanupTask)}
          className="mt-6 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold hover:bg-emerald-400"
        >
          View Task Details
        </button>
      )}
    </div>
  );
}
