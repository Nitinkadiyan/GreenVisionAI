
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MapPin,
  Upload,
  X,
  Sparkles,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import Badge from "./Badge";



export default function VolunteerView() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
  };

  const update = (id, status) =>
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status } : t)));
  const getCleanupTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5001/volunteer/clean-up-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.cleanupTasks);
      console.log("i have some issue with bat");
      setTasks(response.data.cleanupTasks);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    getCleanupTasks();
  }, []);
  const acceptTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.patch(
        `http://localhost:5001/volunteer/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      setTasks((currentTasks) =>
        currentTasks.map((task) => {
          task._id === id ? response.data.cleanupTask : task;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Become a Volunteer"
        subtitle="Your citizen account can participate in meaningful local cleanup work."
      />
      <div className="mb-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
        <span className="font-bold">Good to know:</span> There is no separate
        volunteer role. Accept tasks using your existing GreenVision citizen
        account.
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">{task.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={15} className="text-emerald-600" />
                  {task.report?.location?.address
                    .split(",")
                    .slice(0, 2)
                    .join(", ")}
                </p>
              </div>
              <Badge
                tone={
                  task.report.priority === "Critical"
                    ? "red"
                    : task.priority === "High"
                      ? "orange"
                      : task.priority === "Medium"
                        ? "teal"
                        : "green"
                }
              >
                {task.report.priority}
              </Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
              <div>
                <p className="text-xs text-slate-400">Reward</p>
                <p className="mt-1 font-bold text-emerald-700">
                  {task.reward.amount}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Deadline</p>
                <p className="mt-1 font-semibold text-slate-700">
                  {new Date(task.deadline).toLocaleDateString("en-IN")}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              {task.status === "Available" && (
                <button
                  onClick={() => acceptTask(task._id)}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Accept Task
                </button>
              )}
              {task.status === "Accepted" && (
                <button
                  onClick={() => update(task._id, "In Progress")}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Start Task
                </button>
              )}
              {task.status === "In Progress" && (
                <button
                  onClick={() => setActive(task._id)}
                  className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Submit Completion
                </button>
              )}
              {task.status === "Assigned" && (
                <button
                  onClick={() => update(task._id, "Accepted")}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Accept Assigned Task
                </button>
              )}

              <button
                onClick={() => openTaskDetails(task)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-emerald-400 hover:text-emerald-700"
              >
                View Task
              </button>
            </div>
            {task.status !== "Available" && (
              <p className="mt-3 text-center text-xs font-semibold text-emerald-600">
                {task.status}
              </p>
            )}
            {active === task._id && (
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-emerald-300 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                  <Upload size={16} />
                  Add before / after images
                  <input type="file" className="hidden" />
                </label>
                <textarea
                  placeholder="Describe the work completed..."
                  className="min-h-20 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-400"
                />
                <button
                  onClick={() => {
                    update(task._id, "Under Government Review");
                    setActive(null);
                  }}
                  className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Submit Completion
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeTaskDetails}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-5 md:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  GreenVision AI · Task Details
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedTask.title || "Cleanup Task"}
                </h2>
              </div>

              <button
                onClick={closeTaskDetails}
                className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close task details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5 md:p-6">
              {/* Report image */}
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                {selectedTask.report?.imageUrl ? (
                  <img
                    src={selectedTask.report.imageUrl}
                    alt={
                      selectedTask.report.aiAnalysis?.wasteType ||
                      "Reported waste"
                    }
                    className="max-h-96 w-full object-contain"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                    No report image available.
                  </div>
                )}
              </div>

              {/* Task overview */}
              <section>
                <h3 className="mb-3 text-lg font-bold text-slate-900">
                  Cleanup Task Overview
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <p className="text-xs font-medium text-slate-500">Reward</p>
                    <p className="mt-1 text-xl font-bold text-emerald-700">
                      {selectedTask.reward?.amount != null
                        ? `₹${selectedTask.reward.amount}`
                        : "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Deadline
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {selectedTask.deadline
                        ? new Date(selectedTask.deadline).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )
                        : "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">
                      Task Status
                    </p>
                    <p className="mt-1 font-bold text-slate-800">
                      {selectedTask.status || "Unknown"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Original report information */}
              <section className="rounded-2xl border border-slate-200 p-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Original Environmental Report
                </h3>

                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Report ID
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedTask.report?._id || selectedTask.report || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      <MapPin size={15} />
                      Location
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {selectedTask.report?.location?.address ||
                        "Location not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Report Description
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {selectedTask.report?.description ||
                        "No report description available."}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Report Status
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {selectedTask.report?.status || "Unknown"}
                    </p>
                  </div>
                </div>
              </section>

              {/* AI analysis */}
              <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">
                    AI Environmental Analysis
                  </h3>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Waste Type
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedTask.report?.aiAnalysis?.wasteType || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Severity
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedTask.report?.aiAnalysis?.severity || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      AI Confidence
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedTask.report?.aiAnalysis?.confidence != null
                        ? `${selectedTask.report.aiAnalysis.confidence}%`
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Estimated Waste
                    </p>
                    <p className="mt-1 font-semibold text-slate-800">
                      {selectedTask.report?.aiAnalysis?.estimatedWasteKg != null
                        ? `${selectedTask.report.aiAnalysis.estimatedWasteKg} kg`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-emerald-100 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    AI Summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {selectedTask.report?.aiAnalysis?.summary ||
                      "No AI analysis summary available."}
                  </p>
                </div>
              </section>

              {/* Cleanup instructions */}
              <section>
                <h3 className="text-lg font-bold text-slate-900">
                  Cleanup Guidelines
                </h3>

                <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  {selectedTask.guideline ||
                    selectedTask.guidelines ||
                    "Follow the local authority's safety and waste-segregation guidelines."}
                </p>
              </section>

              {/* Footer */}
              <div className="flex justify-end border-t border-slate-100 pt-4">
                <button
                  onClick={closeTaskDetails}
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}