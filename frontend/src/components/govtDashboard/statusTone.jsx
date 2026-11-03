

export default function statusTone(status) {
  if (status === "Critical" || status === "Escalated") return "rose";
  if (status === "Pending Review" || status === "Under Review") return "amber";
  if (status === "Approved" || status === "Completed") return "emerald";
  if (status === "In-Progress") return "sky";
  return "slate";
}