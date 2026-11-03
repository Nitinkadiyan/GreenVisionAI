
import { Bell, ChevronLeft, Settings, Sparkles, Users } from "lucide-react";
export default function Placeholder({ active, setActive }) {
  const content = {
    volunteers: {
      title: "Volunteer network",
      sub: "Manage verified community responders",
      icon: Users,
    },
    map: {
      title: " ",
      sub: " ",
      icon: Users,
    },
    rewards: {
      title: "Rewards center",
      sub: "Track volunteer incentives and eligibility",
      icon: Sparkles,
    },
    notifications: {
      title: "Notifications",
      sub: "Stay ahead of platform activity",
      icon: Bell,
    },
    settings: {
      title: "Officer settings",
      sub: "Manage your command center preferences",
      icon: Settings,
    },
  }[active];
  // const Icon = content.icon;
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <button
        onClick={() => setActive("dashboard")}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#073b35] px-4 py-2.5 text-xs font-bold text-white"
      >
        <ChevronLeft size={15} /> Back to dashboard
      </button>
    </div>
  );
}