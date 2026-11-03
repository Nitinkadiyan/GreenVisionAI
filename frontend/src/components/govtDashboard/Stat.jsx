import Card from "./Card";

export default function Stat({ label, value, note, icon: Icon, color = "green" }) {
  return (
    <Card className="p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-700">
            {note}
          </p>
        </div>
        <div
          className={`rounded-xl p-2.5 ${color === "amber" ? "bg-amber-50 text-amber-600" : color === "blue" ? "bg-sky-50 text-sky-600" : "bg-emerald-50 text-emerald-700"}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </Card>
  );
}