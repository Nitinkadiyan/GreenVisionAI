const severityConfig = {
  low: {
    label: "Low",
    color: "green",
    badge: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
    marker: "#22c55e",
    text: "text-green-600",
  },

  medium: {
    label: "Medium",
    color: "yellow",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
    marker: "#eab308",
    text: "text-yellow-600",
  },

  high: {
    label: "High",
    color: "orange",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    marker: "#f97316",
    text: "text-orange-600",
  },

  critical: {
    label: "Critical",
    color: "red",
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    marker: "#ef4444",
    text: "text-red-600",
  },
};

export const getSeverityConfig = (severity) => {
  const normalized = String(severity || "")
    .trim()
    .toLowerCase();

  const aliases = {
    minor: "low",
    moderate: "medium",
    severe: "critical",
  };

  const key = aliases[normalized] || normalized;

  return (
    severityConfig[key] || {
      label: "Unknown",
      color: "slate",
      badge: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
      marker: "#94a3b8",
    }
  );
};
