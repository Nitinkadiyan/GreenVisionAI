import { useState } from "react";
import { X } from "lucide-react"; 
export default function TaskModal({ report, onClose, onCreated, onCreate }) {
  const [reward, setReward] = useState("");
  const [deadline, setDeadline] = useState("");
  const [guideline, setGuideline] = useState("");
  const [status, setStatus] = useState("Available");
  const [reportId, setReportId] = useState(report?._id || "");
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    try {
      // console.log("nikku");
      const taskData = {
        report: reportId,
        reward: { amount: Number(reward) },
        guideline: guideline,
        deadline: deadline,
        status: status,
      };

      console.log("creating task", taskData);
      await onCreate(taskData);
      console.log("onCreate created");
      await onCreated();
    } catch (error) {
      console.log("task creation failed : ", error);
    }
  };
  return (
    <div className="fixed inset-0 z-55 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
              Operations
            </p>
            <h3 className="mt-1 text-xl font-bold">Create cleanup task</h3>
            <p className="mt-1 text-xs text-slate-400">
              Convert an approved report into field work.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Report ID
            <input
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="Select an approved report"
              defaultValue={report?._id || ""}
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
              Reward
              <input
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="Enter the reward"
                className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
              Deadline
              <input
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                }}
                type="date"
                placeholder="Enter the deadline"
                className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Cleanup guidelines
            <textarea
              value={guideline}
              onChange={(e) => setGuideline(e.target.value)}
              placeholder="Enter Suitable Guidelines"
              className="min-h-24 rounded-xl border border-slate-200 p-3 text-sm font-normal outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-600">
            Task status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-emerald-400"
            >
              <option>Available</option>
              <option>Assigned</option>
              <option>In-Progress</option>
            </select>
          </label>
        </div>
        <div className="mt-7 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="rounded-xl bg-[#087f5b] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#056b4d]"
          >
            Create cleanup task
          </button>
        </div>
      </div>
    </div>
  );
}