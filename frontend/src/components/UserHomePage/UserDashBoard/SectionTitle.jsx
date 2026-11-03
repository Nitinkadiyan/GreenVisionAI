
import { ArrowRight } from "lucide-react";

export default function SectionTitle({
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
        >
          {action}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
