import { useEffect } from "react";  
import { CheckCircle2, Sparkles, TrendingUp, Users } from "lucide-react";
import axios from "axios";
import Header from "./Header";
import Stat from "./Stat";
import Card from "./Card";
import Badge from "./Badge";
import statusTone from "./statusTone";

export default function Volunteers({ data, filter, setFilter, onSelect }) {
  useEffect(() => {
    const getAllVolunteers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5001/volunteerProfile/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("FULL RESPONSE:", response.data);
      } catch (error) {
        console.log("ERROR:", error.response?.data || error);
      }
    };

    getAllVolunteers();
  }, []);
  const volunteerList = Array.isArray(data) ? data : [];
  const money = (n) => `₹${n.toLocaleString("en-IN")}`;
  const tone = (s) =>
    ["Critical", "Escalated", "Rejected"].includes(s)
      ? "red"
      : ["Pending Review", "Pending", "Under review"].includes(s)
        ? "amber"
        : ["Approved", "Resolved", "Paid", "Verified", "Active"].includes(s)
          ? "green"
          : s === "In Progress"
            ? "blue"
            : "slate";
  return (
    <>
      <Header
        title="Volunteers"
        description="Understand participation, reliability, and contribution from citizen cleanup teams."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Active volunteers"
          value="126"
          note="18 new this month"
          icon={Users}
        />
        <Stat
          label="Tasks completed"
          value="842"
          note="↑ 14.8% this month"
          icon={CheckCircle2}
        />
        <Stat
          label="Average score"
          value="86.4"
          note="Across contributors"
          icon={TrendingUp}
          color="blue"
        />
        <Stat
          label="Total rewards"
          value="₹4.82L"
          note="Distributed to date"
          icon={Sparkles}
          color="amber"
        />
      </div>
      <Card className="mt-6 overflow-hidden">
        <div className="flex flex-wrap gap-2 border-b border-slate-100 p-4">
          {["All", "Active", "Top contributors", "Recently joined"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold ${filter === f ? "bg-[#073b35] text-white" : "text-slate-500"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-237.5 text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">Volunteer</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Score</th>
                <th className="px-5 py-4">Completed</th>
                <th className="px-5 py-4">In progress</th>
                <th className="px-5 py-4">Completion</th>
                <th className="px-5 py-4">Rewards</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {volunteerList.map((v) => (
                <tr
                  key={v._id}
                  onClick={() => onSelect(v)}
                  className="cursor-pointer border-b border-slate-50 hover:bg-emerald-50/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${v.color}`}
                      >
                        {v._id}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{v.name}</p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {v.completionPercentage}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {v.area}, {v.city}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-emerald-700">
                    {v.points}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {v.status}
                  </td>
                  <td className="px-5 py-4 text-sm">{v.tasksAccepted}</td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {v.tasksCompleted}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold">
                    {v.rewardsRedeemed}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={tone(v.status)}>{v.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}