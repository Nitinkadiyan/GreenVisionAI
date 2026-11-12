import { ChevronLeft } from "lucide-react";

export default function BackToDashboard({ setActive }) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center">
      <button
        onClick={() => setActive("dashboard")}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#073b35] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0a5148]"
      >
        <ChevronLeft size={15} />
        Back to dashboard
      </button>
    </div>
  );
}