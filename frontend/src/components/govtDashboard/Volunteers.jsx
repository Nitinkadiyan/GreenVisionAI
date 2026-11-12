import {useMemo, useState} from "react";
import {CheckCircle2, Users, TrendingUp, Sparkles, Search} from "lucide-react";

import Header from "./Header";
import Stat from "./Stat";
import Card from "./Card";
import Badge from "./Badge";

const getStatusTone = (status) => {
    switch (status) {
        case "available":
            return "green";
        case "working":
            return "blue";
        case "under-review":
            return "amber";
        default:
            return "slate";
    }
};

const getInitials = (name = "") =>
    name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function Volunteers({data = [], filter = "All", setFilter, onSelect}) {
    const [search, setSearch] = useState("");

    // Each item is a User document containing volunteerProfile.
    const volunteers = Array.isArray(data) ? data.filter((user) => user?.volunteerProfile) : [];

    const filteredVolunteers = useMemo(() => {
        let result = [...volunteers];

        if (filter === "Active") {
            result = result.filter((user) => ["available", "working"].includes(user.volunteerProfile?.status));
        }

        if (filter === "Top contributors") {
            result.sort(
                (a, b) => (b.volunteerProfile?.totalPointsEarned || 0) - (a.volunteerProfile?.totalPointsEarned || 0)
            );
        }

        if (filter === "Recently joined") {
            result.sort(
                (a, b) =>
                    new Date(b.volunteerProfile?.createdAt || b.createdAt || 0) -
                    new Date(a.volunteerProfile?.createdAt || a.createdAt || 0)
            );
        }

        if (search.trim()) {
            const query = search.trim().toLowerCase();

            result = result.filter((user) => {
                const values = [user.name, user.email, user.phone, user.location?.city, user.location?.area];

                return values.some((value) =>
                    String(value || "")
                    .toLowerCase()
                    .includes(query)
                );
            });
        }

        return result;
    }, [volunteers, filter, search]);

    // Statistics derived from actual embedded volunteer profiles.
    const totalVolunteers = volunteers.length;

    const activeVolunteers = volunteers.filter((user) =>
        ["available", "working"].includes(user.volunteerProfile?.status)
    ).length;

    const totalReportsWorked = volunteers.reduce(
        (sum, user) => sum + (Number(user.volunteerProfile?.totalReportsWorked) || 0),
        0
    );

    const totalPointsEarned = volunteers.reduce(
        (sum, user) => sum + (Number(user.volunteerProfile?.totalPointsEarned) || 0),
        0
    );

    const averagePoints = totalVolunteers
        ? Math.round(
              volunteers.reduce((sum, user) => sum + (Number(user.volunteerProfile?.points) || 0), 0) / totalVolunteers
          )
        : 0;

    return (
        <>
            <Header
                title="Volunteers"
                description="Understand participation, reliability, and contribution from citizen cleanup teams."
            />

            {/* Volunteer statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label="Total volunteers" value={totalVolunteers} note="Registered contributors" icon={Users} />

                <Stat
                    label="Active volunteers"
                    value={activeVolunteers}
                    note="Available or working"
                    icon={CheckCircle2}
                />

                <Stat
                    label="Average points"
                    value={averagePoints.toLocaleString("en-IN")}
                    note="Current volunteer points"
                    icon={TrendingUp}
                    color="blue"
                />

                <Stat
                    label="Lifetime points earned"
                    value={totalPointsEarned.toLocaleString("en-IN")}
                    note={`${totalReportsWorked} reports worked`}
                    icon={Sparkles}
                    color="amber"
                />
            </div>

            {/* Volunteer directory */}
            <Card className="mt-6 overflow-hidden">
                {/* Filters and search */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
                    <div className="flex flex-wrap gap-2">
                        {["All", "Active", "Top contributors", "Recently joined"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter?.(item)}
                                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                    filter === item ? "bg-[#073b35] text-white" : "text-slate-500 hover:bg-slate-100"
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                        <Search size={15} className="text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search volunteers..."
                            className="w-40 bg-transparent text-xs outline-none"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="text-xs text-slate-400 hover:text-slate-700"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Volunteer table */}
                <div className="overflow-x-auto">
                    {filteredVolunteers.length === 0 ? (
                        <div className="p-12 text-center">
                            <Users size={32} className="mx-auto mb-3 text-slate-300" />

                            <p className="text-sm font-semibold text-slate-600">No volunteers found</p>

                            <p className="mt-1 text-xs text-slate-400">
                                {volunteers.length === 0
                                    ? "No volunteer profiles were returned by the backend."
                                    : "Try changing your search or filter."}
                            </p>
                        </div>
                    ) : (
                        <table className="w-full min-w-[1000px] text-left">
                            <thead>
                                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                                    <th className="px-5 py-4">Volunteer</th>
                                    <th className="px-5 py-4">Location</th>
                                    <th className="px-5 py-4">Points</th>
                                    <th className="px-5 py-4">Accepted</th>
                                    <th className="px-5 py-4">Reports worked</th>
                                    <th className="px-5 py-4">Completion</th>
                                    <th className="px-5 py-4">Rewards redeemed</th>
                                    <th className="px-5 py-4">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredVolunteers.map((user) => {
                                    const profile = user.volunteerProfile || {};

                                    const name = user.name || "Unknown volunteer";
                                    const email = user.email || "Email unavailable";
                                    const profileImage = user.profilePicture?.url;

                                    const location = [user.location?.area, user.location?.city]
                                    .filter(Boolean)
                                    .join(", ");

                                    return (
                                        <tr
                                            key={user._id}
                                            onClick={() => onSelect?.(user)}
                                            className="cursor-pointer border-b border-slate-50 transition hover:bg-emerald-50/30"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {profileImage ? (
                                                        <img
                                                            src={profileImage}
                                                            alt={name}
                                                            className="size-9 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                                                            {getInitials(name)}
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">{name}</p>

                                                        <p className="mt-1 text-[11px] text-slate-400">{email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-xs text-slate-600">
                                                {location || "Not available"}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-bold text-emerald-700">
                                                {(Number(profile.points) || 0).toLocaleString("en-IN")}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {profile.tasksAccepted ?? 0}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                                                {profile.totalReportsWorked ?? 0}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                                                {(Number(profile.completionPercentage) || 0).toFixed(1)}%
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {(Number(profile.rewardsRedeemed) || 0).toLocaleString("en-IN")}
                                            </td>

                                            <td className="px-5 py-4">
                                                <Badge tone={getStatusTone(profile.status)}>
                                                    {profile.status || "Unknown"}
                                                </Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                {filteredVolunteers.length > 0 && (
                    <div className="border-t border-slate-100 px-5 py-3">
                        <p className="text-xs text-slate-400">
                            Showing {filteredVolunteers.length} of {totalVolunteers} volunteers
                        </p>
                    </div>
                )}
            </Card>
        </>
    );
}
