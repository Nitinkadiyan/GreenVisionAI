import { CheckCircle2, MapPin } from "lucide-react";
import Badge from "./Badge";
import Card from "./Card";
import statusTone from "./statusTone";
export default function VolunteerDetail({ volunteer: v }) {
  const rewards = [
    {
      volunteer: "Aarav Menon",
      task: "Koramangala plastic cleanup",
      location: "Koramangala",
      reward: 1800,
      date: "22 Sep 2026",
      status: "Paid",
      verification: "Verified",
    },
    {
      volunteer: "Ananya Rao",
      task: "HSR community bin cleanup",
      location: "HSR Layout",
      reward: 1200,
      date: "20 Sep 2026",
      status: "Paid",
      verification: "Verified",
    },
    {
      volunteer: "Rahul Mehta",
      task: "Bellandur lake cleanup",
      location: "Bellandur",
      reward: 2200,
      date: "19 Sep 2026",
      status: "Pending",
      verification: "Under review",
    },
    {
      volunteer: "Priya Nair",
      task: "Indiranagar road cleanup",
      location: "Indiranagar",
      reward: 950,
      date: "15 Sep 2026",
      status: "Paid",
      verification: "Verified",
    },
  ];

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
    <div className="px-6 pb-7">
      <div className="flex items-center gap-4">
        <div
          className={`flex size-16 items-center justify-center rounded-full text-xl font-bold ${v.color}`}
        >
          {v.name}
        </div>
        <div>
          <h2 className="text-xl font-bold">{v.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{v.email}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <MapPin size={12} />
            {v.area}, {v.city}
          </p>
        </div>
        <Badge tone={tone(v.status)}>{v.status}</Badge>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Score", v.score],
          ["Completed", v.completed],
          ["Accepted", v.accepted],
          ["Rewards", v.rewards],
        ].map((x) => (
          <div key={x[0]} className="rounded-xl bg-slate-50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              {x[0]}
            </p>
            <p className="mt-2 text-lg font-bold">{x[1]}</p>
          </div>
        ))}
      </div>
      <h3 className="mt-6 font-bold">Recent work</h3>
      <div className="mt-3 space-y-3">
        {rewards.slice(0, 3).map((r) => (
          <div
            key={r.task}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
          >
            <CheckCircle2 size={16} className="text-emerald-600" />
            <div className="flex-1">
              <p className="text-xs font-semibold">{r.task}</p>
              <p className="mt-1 text-[11px] text-slate-400">
                {r.location} · {r.date}
              </p>
            </div>
            <p className="text-xs font-bold text-emerald-700">
              {money(r.reward)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}