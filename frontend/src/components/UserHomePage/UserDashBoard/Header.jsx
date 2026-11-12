
import { Menu, Search, Map as MapIcon, Bell } from "lucide-react";

export default function Header({
  setView,
  setMobileOpen,
  query,
  setQuery,
  user,
}) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
      {/* Welcome Section */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Welcome back, {user?.name || "User"}
          </p>

          <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            Let's make our environment cleaner together.
          </h1>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-400 sm:flex">
          <Search size={16} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports"
            className="w-28 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </label>

        {/* Map */}
        <button
          onClick={() => setView("map")}
          className="hidden rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600 sm:block"
          aria-label="Open map"
        >
          <MapIcon size={18} />
        </button>

        {/* Notifications */}
        <button
          onClick={() => setView("notifications")}
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
          aria-label="Open notifications"
        >
          <Bell size={18} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <button
          onClick={() => setView("profile")}
          aria-label="Open profile"
        >
          <img
            src={
              user?.profilePicture?.url ||
              " "
            }
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
