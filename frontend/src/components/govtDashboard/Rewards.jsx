import { Activity, Bell, ClipboardCheck, FileSearch, Globe2, Settings, Sparkles, Target, TrendingUp, Users, Clock3 } from "lucide-react";
import Header from "./Header";
import Stat from "./Stat";
import Card from "./Card";
import Badge from "./Badge";
export default function Rewards({ volunteers = [] }) {
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

  const money = (n) => `₹${n.toLocaleString("en-IN")}`;
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
  const nav = [
    ["dashboard", "Dashboard", Activity],
    ["reports", "Reports", FileSearch],
    ["tasks", "Cleanup Tasks", ClipboardCheck],
    ["map", "Environmental Map", Globe2],
    ["volunteers", "Volunteers", Users],
    ["rewards", "Rewards", Sparkles],
    ["notifications", "Notifications", Bell],
    ["settings", "Settings", Settings],
  ];
  return (
    <>
      <Header
        title="Rewards"
        description="Track verified cleanup contributions and reward distribution across the city."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat
          label="Total distributed"
          value="₹4.82L"
          note="Since launch"
          icon={Sparkles}
        />
        <Stat
          label="This month"
          value="₹38,450"
          note="↑ 18.2% vs Aug"
          icon={TrendingUp}
          color="blue"
        />
        <Stat
          label="This year"
          value="₹3.94L"
          note="82% of annual budget"
          icon={Target}
        />
        <Stat
          label="Volunteers rewarded"
          value="184"
          note="12 added this month"
          icon={Users}
        />
        <Stat
          label="Pending rewards"
          value="₹12,800"
          note="7 awaiting review"
          icon={Clock3}
          color="amber"
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="p-6">
          <h3 className="font-bold">Monthly rewards distribution</h3>
          <p className="mt-1 text-xs text-slate-500">
            Verified reward value in INR
          </p>
          <div className="mt-8 flex h-56 items-end gap-2">
            {[42, 56, 48, 68, 61, 82, 76, 91, 72, 88, 96, 84].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-emerald-400"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-slate-400">
                  {
                    [
                      "J",
                      "F",
                      "M",
                      "A",
                      "M",
                      "J",
                      "J",
                      "A",
                      "S",
                      "O",
                      "N",
                      "D",
                    ][i]
                  }
                </span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold">Volunteer reward summary</h3>
          <p className="mt-1 text-xs text-slate-500">
            Top contributors this year
          </p>
          <div className="mt-5 space-y-4">
            {(Array.isArray(volunteers) ? volunteers : []).map((v) => (
              <div key={v.name} className="flex items-center gap-3">
                <div
                  className={`flex size-9 items-center justify-center rounded-full text-xs font-bold ${v.color}`}
                >
                  {v.name}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{v.name}</p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {v.completed} completed tasks · {v.rate} rate
                  </p>
                </div>
                <p className="text-sm font-bold">{v.rewards}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold">Reward transaction history</h3>
          <p className="mt-1 text-xs text-slate-500">
            Every reward is tied to verified cleanup evidence.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4">Volunteer</th>
                <th className="px-5 py-4">Cleanup task</th>
                <th className="px-5 py-4">Reward</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Verification</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((r) => (
                <tr key={r.task} className="border-b border-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold">
                    {r.volunteer}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {r.task}
                    <p className="mt-1 text-[11px] text-slate-400">
                      {r.location}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm font-bold">
                    {money(r.reward)}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">{r.date}</td>
                  <td className="px-5 py-4">
                    <Badge tone={tone(r.status)}>{r.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={tone(r.verification)}>{r.verification}</Badge>
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