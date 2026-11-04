export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,61,52,.04)] ${className}`}
    >
      {children}
    </div>
  );
}
