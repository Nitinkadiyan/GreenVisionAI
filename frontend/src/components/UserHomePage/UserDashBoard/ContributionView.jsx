
import { Star, Trophy } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ContributionView({ user }) {
  const rows = [
    ["Reports Submitted", "+240"],
    ["Cleanup Tasks Completed", "+700"],
    ["Community Actions", "+200"],
    ["Resolved Issues", "+100"],
  ];

  const leaders = [
    { name: "Ananya Sharma", score: "2,450" },
    { name: "Rahul Mehta", score: "2,180" },
    { name: "Jatin Kumar", score: "1,240" },
    { name: "Priya Singh", score: "1,120" },
  ];

  const currentUserName = user?.name?.trim().toLowerCase();

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Contribution"
        subtitle="Every star reflects a cleaner, healthier community."
      />

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">

        {/* Contribution Score */}
        <div className="rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-7 text-white shadow-xl shadow-orange-100">
          <Star size={28} fill="currentColor" />

          <p className="mt-8 text-sm font-semibold text-orange-50">
            Current contribution score
          </p>

          <p className="mt-1 text-5xl font-black">1,240</p>

          <p className="mt-3 text-sm text-orange-50">
            You&apos;re in the top 12% of contributors in Bangalore.
          </p>
        </div>

        {/* Contribution Breakdown */}
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">
            How you earned your stars
          </h3>

          <div className="mt-5 space-y-4">
            {rows.map(([label, points]) => (
              <div
                key={label}
                className="flex justify-between border-b border-slate-100 pb-3 text-sm"
              >
                <span className="text-slate-500">{label}</span>
                <strong className="text-emerald-600">{points}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Leaderboard */}
      <div className="mt-8 max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">
            Community leaderboard
          </h3>

          <Trophy size={19} className="text-amber-500" />
        </div>

        <div className="mt-4 space-y-2">
          {leaders.map((leader, index) => {
            const isCurrentUser =
              leader.name.trim().toLowerCase() === currentUserName;

            return (
              <div
                key={leader.name}
                className={`flex items-center gap-4 rounded-xl p-3 ${
                  isCurrentUser
                    ? "bg-emerald-50 ring-1 ring-emerald-100"
                    : ""
                }`}
              >
                <span className="w-5 text-center font-bold text-slate-400">
                  #{index + 1}
                </span>

                <img
                  src={
                    isCurrentUser
                      ? user?.profilePicture?.url || "/default-avatar.png"
                      : "/default-avatar.png"
                  }
                  alt={`${leader.name}'s profile`}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <span className="flex-1 text-sm font-semibold text-slate-700">
                  {leader.name}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-emerald-600">
                      You
                    </span>
                  )}
                </span>

                <span className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  {leader.score}
                  <Star size={14} fill="currentColor" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
