
  import { useState } from "react";
  import { Plus } from "lucide-react";
  import Badge from "./Badge";
  import statusTone from "./statusTone";
  export default function Tasks({ onCreate, cleanupTasks, handleCreate }) {
    const [taskFilter, setTaskFilter] = useState("All");
    const filters = [
      "All",
      "Available",
      "Assigned",
      "In-Progress",
      "Completion-Submitted",
      "Under-Review",
      "Completed",
      "Cancelled",
    ];

    const filteredTasks =
      taskFilter === "All"
        ? cleanupTasks
        : cleanupTasks.filter((task) => task.status === taskFilter);
    console.log(filteredTasks);
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-sm text-slate-500">
              Volunteer operations and field work
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Cleanup tasks
            </h2>
          </div>
          <button
            onClick={onCreate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#087f5b] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#056b4d]"
          >
            <Plus size={16} /> New cleanup task
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setTaskFilter(filter)}
              className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold ${filter === taskFilter ? "bg-[#073b35] text-white" : "bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30">
          <div className="hidden grid-cols-[1fr_1fr_1.4fr_0.8fr_1fr_1fr] gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
            <span>Task / Report</span>
            <span>Reward</span>
            <span>Guidelines</span>
            <span>Deadline</span>
            <span>Status</span>
            <span>Volunteer</span>
          </div>
          <div className="flex flex-col">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="grid gap-3 border-b border-slate-100 px-5 py-4 last:border-0 md:grid-cols-[1fr_1fr_1.4fr_0.8fr_1fr_1fr] md:items-center md:gap-4"
              >
                <div>
                  <p className="text-xs font-bold">
                    {task.report?.location?.latitude}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {task.report?._id}
                  </p>
                </div>
                <p className="text-sm font-bold text-emerald-700">
                  {task.reward.amount}
                </p>
                <p className="text-xs text-slate-500">{task.guideline}</p>
                <p className="text-xs text-slate-600">{task.deadline}</p>
                <p>
                  <Badge tone={statusTone(task.status)}>{task.status}</Badge>
                </p>
                <p className="text-xs font-semibold text-slate-600">
  {task.volunteer?.name ||
    task.volunteer?.email ||
    "Not assigned"}
</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
