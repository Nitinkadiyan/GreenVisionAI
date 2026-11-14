import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {
    Activity,
    Award,
    Search,
    Users,
    Sparkles,
    Target,
    TrendingUp,
    Clock3,
    ChevronRight,
    ArrowUpDown,
    X,
    Mail,
    Phone,
    MapPin,
    CheckCircle2,
    RefreshCw,
    Gift,
    Coins,
    ClipboardList,
    UserRound,
    Eye,
    Filter,
} from "lucide-react";

import Header from "./Header";
import Stat from "./Stat";
import Card from "./Card";
import Badge from "./Badge";

const API_URL = "http://localhost:5001/rewards";

const formatNumber = (value = 0) => Number(value || 0).toLocaleString("en-IN");

const getCompletedTasks = (volunteer) => Number(volunteer.tasksCompleted ?? volunteer.completedTasks ?? 0);

const getCompletionRate = (volunteer) => Number(volunteer.completionRate ?? volunteer.completionPercentage ?? 0);

const getVolunteerName = (volunteer) =>
    volunteer.name || volunteer.userId?.name || `Volunteer ${volunteer._id?.slice(-6) || ""}`;

const getVolunteerEmail = (volunteer) => volunteer.email || volunteer.userId?.email || "Not available";

const getVolunteerPhone = (volunteer) => volunteer.phone || volunteer.userId?.phone || "Not available";

const getVolunteerLocation = (volunteer) => {
    const location = volunteer.location || volunteer.userId?.location;

    if (!location) return "Not available";

    if (typeof location === "string") return location;

    return [location.area, location.city].filter(Boolean).join(", ") || location.address || "Not available";
};

const getVolunteerImage = (volunteer) =>
    volunteer.profilePicture?.url ||
    volunteer.userId?.profilePicture?.url ||
    volunteer.profilePicture ||
    "/default-avatar.png";

const getStatusColor = (status) => {
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

function Modal({title, onClose, children}) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
                    <h2 className="font-bold text-slate-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                        aria-label="Close"
                    >
                        <X size={19} />
                    </button>
                </div>
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}

function DetailItem({icon: Icon, label, value}) {
    return (
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
            <Icon size={17} className="mt-0.5 shrink-0 text-slate-400" />
            <div className="min-w-0">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-slate-700">{value ?? "Not adhbjhvailable"}</p>
            </div>
        </div>
    );
}

function VolunteerProfile({volunteer}) {
    const currentTask = volunteer.currentTask;
    const completionRate = getCompletionRate(volunteer);

    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img
                    src={getVolunteerImage(volunteer)}
                    alt={getVolunteerName(volunteer)}
                    className="size-20 rounded-2xl border border-slate-100 object-cover"
                />

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900">{getVolunteerName(volunteer)}</h3>
                    <p className="mt-1 text-sm text-slate-500">{getVolunteerEmail(volunteer)}</p>
                    <div className="mt-2">
                        <Badge tone={getStatusColor(volunteer?.status)}>{volunteer?.status || "Unknown"}</Badge>
                    </div>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                {[
                    {
                        label: "Current points",
                        value: volunteer.points,
                        icon: Coins,
                    },
                    {
                        label: "Tasks completed",
                        value: getCompletedTasks(volunteer),
                        icon: CheckCircle2,
                    },
                    {
                        label: "Completion rate",
                        value: `${completionRate}%`,
                        icon: TrendingUp,
                    },
                ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-slate-100 p-4">
                        <item.icon size={18} className="text-emerald-600" />
                        <p className="mt-3 text-xl font-bold text-slate-900">{formatNumber(item.value)}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.label}</p>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="mb-3 font-semibold text-slate-800">Contact and account information</h4>

                <div className="grid gap-3 sm:grid-cols-2">
                    <DetailItem icon={Mail} label="Email" value={getVolunteerEmail(volunteer)} />
                    <DetailItem icon={Phone} label="Phone" value={getVolunteerPhone(volunteer)} />
                    <DetailItem icon={MapPin} label="Location" value={getVolunteerLocation(volunteer)} />
                    <DetailItem
                        icon={Award}
                        label="Lifetime points earned"
                        value={formatNumber(volunteer.totalPointsEarned)}
                    />
                    <DetailItem
                        icon={ClipboardList}
                        label="Tasks accepted"
                        value={formatNumber(volunteer.tasksAccepted)}
                    />
                    <DetailItem icon={Gift} label="Rewards redeemed" value={formatNumber(volunteer.rewardsRedeemed)} />
                    <DetailItem
                        icon={Activity}
                        label="Reports worked on"
                        value={formatNumber(volunteer.totalReportsWorked)}
                    />
                    <DetailItem icon={UserRound} label="Volunteer ID" value={volunteer._id} />
                </div>
            </div>

            <div>
                <h4 className="mb-3 font-semibold text-slate-800">Task information</h4>

                {currentTask ? (
                    <div className="rounded-xl border border-slate-200 p-4">
                        <p className="font-semibold text-slate-900">
                            {currentTask.report?.title || "Assigned cleanup task"}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            {currentTask.report?.description ||
                                currentTask.description ||
                                "No task description available."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Badge tone="blue">{currentTask.status || "Assigned"}</Badge>
                            {currentTask.report?.status && <Badge>{currentTask.report.status}</Badge>}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
                        <ClipboardList size={24} className="mx-auto text-slate-300" />
                        <p className="mt-2 text-sm font-medium text-slate-600">No current task assigned</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Rewards() {
    const [stats, setStats] = useState(null);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("points");

    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [activeStat, setActiveStat] = useState(null);

    const fetchRewardsData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Session expired. Please log in again.");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const [statsResponse, leaderboardResponse] = await Promise.all([
                axios.get(`${API_URL}/stats`, config),
                axios.get(`${API_URL}/leaderboard`, config),
            ]);

            setStats(statsResponse.data?.stats || {});

            const list = leaderboardResponse.data?.leaderboard || [];

            setVolunteers(Array.isArray(list) ? list : []);
        } catch (err) {
            console.error("Rewards fetching error:", err.response?.data || err.message);

            setError(err.response?.data?.message || err.message || "Unable to load rewards data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewardsData();
    }, []);

    const filteredVolunteers = useMemo(() => {
        let result = volunteers.filter((volunteer) => {
            const name = getVolunteerName(volunteer).toLowerCase();
            const email = getVolunteerEmail(volunteer).toLowerCase();
            const location = getVolunteerLocation(volunteer).toLowerCase();

            const matchesSearch =
                name.includes(search.toLowerCase()) ||
                email.includes(search.toLowerCase()) ||
                location.includes(search.toLowerCase());

            const matchesStatus = statusFilter === "all" || volunteer.status === statusFilter;

            return matchesSearch && matchesStatus;
        });

        result = [...result].sort((a, b) => {
            if (sortBy === "points") {
                return (b.totalPointsEarned || 0) - (a.totalPointsEarned || 0);
            }

            if (sortBy === "completed") {
                return getCompletedTasks(b) - getCompletedTasks(a);
            }

            if (sortBy === "completion") {
                return getCompletionRate(b) - getCompletionRate(a);
            }

            if (sortBy === "name") {
                return getVolunteerName(a).localeCompare(getVolunteerName(b));
            }

            return 0;
        });

        return result;
    }, [volunteers, search, statusFilter, sortBy]);

    const averageCompletion = volunteers.length
        ? Math.round(volunteers.reduce((sum, volunteer) => sum + getCompletionRate(volunteer), 0) / volunteers.length)
        : 0;

    const topVolunteers = [...filteredVolunteers].slice(0, 5);

    const statDetails = {
        volunteers: {
            title: "Volunteer records",
            description: "All registered volunteer profiles.",
            items: volunteers.map((v) => ({
                id: v._id,
                name: getVolunteerName(v),
                detail: getVolunteerEmail(v),
                value: `${formatNumber(v.points)} points`,
                volunteer: v,
            })),
        },
        points: {
            title: "Volunteer point distribution",
            description: "Lifetime points earned by volunteers.",
            items: volunteers.map((v) => ({
                id: v._id,
                name: getVolunteerName(v),
                detail: getVolunteerLocation(v),
                value: formatNumber(v.totalPointsEarned),
                volunteer: v,
            })),
        },
        completed: {
            title: "Volunteer task contributions",
            description: "Task completion counts by volunteer.",
            items: volunteers.map((v) => ({
                id: v._id,
                name: getVolunteerName(v),
                detail: `${v.tasksAccepted || 0} accepted`,
                value: `${getCompletedTasks(v)} completed`,
                volunteer: v,
            })),
        },
        pending: {
            title: "Pending reviews",
            description: "Pending review count from rewards statistics.",
            items: [],
        },
    };

    if (loading) {
        return (
            <div>
                <Header title="Rewards" description="Volunteer performance and reward management." />
                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header title="Rewards" description="Volunteer performance and reward management." />
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-5">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        onClick={fetchRewardsData}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        <RefreshCw size={15} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header
                title="Rewards"
                description="Monitor volunteer performance, contributions and reward distribution."
            />

            {/* STATISTICS */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <button
                    onClick={() => setActiveStat("volunteers")}
                    className="rounded-xl text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                    <Stat
                        label="Total Volunteers"
                        value={formatNumber(stats?.totalVolunteers ?? volunteers.length)}
                        note="View volunteer records"
                        icon={Users}
                    />
                </button>

                <button
                    onClick={() => setActiveStat("points")}
                    className="rounded-xl text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                    <Stat
                        label="Total Points Earned"
                        value={formatNumber(stats?.totalPointsDistributed)}
                        note="View point distribution"
                        icon={Sparkles}
                    />
                </button>

                <button
                    onClick={() => setActiveStat("completed")}
                    className="rounded-xl text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                    <Stat
                        label="Completed Tasks"
                        value={formatNumber(stats?.totalCompletedTasks)}
                        note="View volunteer contributions"
                        icon={Target}
                        color="blue"
                    />
                </button>

                <button
                    onClick={() => setActiveStat("pending")}
                    className="rounded-xl text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                    <Stat
                        label="Pending Reviews"
                        value={formatNumber(stats?.totalPendingReviews)}
                        note="View review count"
                        icon={Clock3}
                        color="amber"
                    />
                </button>

                <button
                    onClick={() => setActiveStat("completed")}
                    className="rounded-xl text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                    <Stat
                        label="Average Completion"
                        value={`${averageCompletion}%`}
                        note="View volunteer performance"
                        icon={TrendingUp}
                    />
                </button>
            </div>

            {/* TOP CONTRIBUTORS */}
            <div className="mt-7 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
                <Card className="p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h3 className="font-bold text-slate-900">Top volunteer contributions</h3>
                            <p className="mt-1 text-xs text-slate-500">Select a volunteer to view their profile.</p>
                        </div>
                        <Award className="text-emerald-600" />
                    </div>

                    <div className="mt-7 space-y-5">
                        {topVolunteers.length === 0 ? (
                            <p className="py-10 text-center text-sm text-slate-400">
                                No volunteer contributions available.
                            </p>
                        ) : (
                            topVolunteers.map((volunteer, index) => (
                                <button
                                    key={volunteer._id}
                                    onClick={() => setSelectedVolunteer(volunteer)}
                                    className="w-full rounded-xl p-2 text-left transition hover:bg-slate-50"
                                >
                                    <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                                        <span className="font-semibold text-slate-700">
                                            #{index + 1} {getVolunteerName(volunteer)}
                                        </span>
                                        <span className="font-bold text-emerald-600">
                                            {formatNumber(volunteer.totalPointsEarned)} points
                                        </span>
                                    </div>

                                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className="h-full rounded-full bg-emerald-400"
                                            style={{
                                                width: `${
                                                    (Number(volunteer.totalPointsEarned || 0) /
                                                        Math.max(
                                                            ...topVolunteers.map((v) =>
                                                                Number(v.totalPointsEarned || 0)
                                                            ),
                                                            1
                                                        )) *
                                                    100
                                                }%`,
                                            }}
                                        />
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="font-bold text-slate-900">Volunteer performance summary</h3>
                    <p className="mt-1 text-xs text-slate-500">Click any contributor to inspect their details.</p>

                    <div className="mt-5 space-y-3">
                        {topVolunteers.length === 0 ? (
                            <p className="py-8 text-center text-sm text-slate-400">No volunteers found.</p>
                        ) : (
                            topVolunteers.map((volunteer) => (
                                <button
                                    key={volunteer._id}
                                    onClick={() => setSelectedVolunteer(volunteer)}
                                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50"
                                >
                                    <img
                                        src={getVolunteerImage(volunteer)}
                                        alt={getVolunteerName(volunteer)}
                                        className="size-10 rounded-full object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold text-slate-800">
                                            {getVolunteerName(volunteer)}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {getCompletedTasks(volunteer)} completed tasks
                                            {" · "}
                                            {getCompletionRate(volunteer)}% rate
                                        </p>
                                    </div>

                                    <ChevronRight size={17} className="text-slate-400" />
                                </button>
                            ))
                        )}
                    </div>
                </Card>
            </div>

            {/* LEADERBOARD */}
            <Card className="mt-7 overflow-hidden">
                <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900">Volunteer leaderboard</h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Search, filter, sort and inspect volunteer records.
                        </p>
                    </div>

                    <button
                        onClick={fetchRewardsData}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        <RefreshCw size={14} />
                        Refresh data
                    </button>
                </div>

                <div className="grid gap-3 border-b border-slate-100 p-5 md:grid-cols-[1fr_180px_180px]">
                    <div className="relative">
                        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, email or location..."
                            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                    >
                        <option value="all">All statuses</option>
                        <option value="available">Available</option>
                        <option value="working">Working</option>
                        <option value="under-review">Under review</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                    >
                        <option value="points">Sort: Points</option>
                        <option value="completed">Sort: Completed tasks</option>
                        <option value="completion">Sort: Completion rate</option>
                        <option value="name">Sort: Name</option>
                    </select>
                </div>

                <div className="flex items-center justify-between px-5 py-3">
                    <p className="text-xs text-slate-500">
                        Showing {filteredVolunteers.length} of {volunteers.length} volunteers
                    </p>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Filter size={13} />
                        Interactive records
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left">
                        <thead>
                            <tr className="border-y border-slate-100 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
                                <th className="px-5 py-4">Rank</th>
                                <th className="px-5 py-4">Volunteer</th>
                                <th className="px-5 py-4">Status</th>
                                <th className="px-5 py-4">Accepted</th>
                                <th className="px-5 py-4">Completed</th>
                                <th className="px-5 py-4">Completion</th>
                                <th className="px-5 py-4">Total points</th>
                                <th className="px-5 py-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredVolunteers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                                        No matching volunteer records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredVolunteers.map((volunteer, index) => (
                                    <tr
                                        key={volunteer._id}
                                        onClick={() => setSelectedVolunteer(volunteer)}
                                        className="cursor-pointer border-b border-slate-50 transition hover:bg-emerald-50/50"
                                    >
                                        <td className="px-5 py-4 text-sm font-bold text-slate-600">#{index + 1}</td>

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={getVolunteerImage(volunteer)}
                                                    alt={getVolunteerName(volunteer)}
                                                    className="size-9 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {getVolunteerName(volunteer)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {getVolunteerEmail(volunteer)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <Badge tone={getStatusColor(volunteer.status)}>
                                                {volunteer.status || "Unknown"}
                                            </Badge>
                                        </td>

                                        <td className="px-5 py-4 text-sm">{formatNumber(volunteer.tasksAccepted)}</td>

                                        <td className="px-5 py-4 text-sm">
                                            {formatNumber(getCompletedTasks(volunteer))}
                                        </td>

                                        <td className="px-5 py-4">
                                            <Badge tone="green">{getCompletionRate(volunteer)}%</Badge>
                                        </td>

                                        <td className="px-5 py-4 text-sm font-bold text-emerald-600">
                                            {formatNumber(volunteer.totalPointsEarned)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedVolunteer(volunteer);
                                                }}
                                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                <Eye size={14} />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* TRANSACTION HISTORY */}
            <Card className="mt-7 overflow-hidden">
                <div className="border-b border-slate-100 p-5">
                    <h3 className="font-bold text-slate-900">Reward transaction history</h3>
                    <p className="mt-1 text-xs text-slate-500">Reward credits, redemptions and payment records.</p>
                </div>

                <div className="px-5 py-12 text-center">
                    <Gift size={32} className="mx-auto text-slate-300" />
                    <p className="mt-3 text-sm font-semibold text-slate-700">Transaction ledger not configured</p>
                    <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-400">
                        Actual reward transactions cannot be displayed until the backend provides transaction records.
                        No dummy transaction data is shown.
                    </p>
                </div>
            </Card>

            {/* VOLUNTEER PROFILE MODAL */}
            {selectedVolunteer && (
                <Modal title="Volunteer profile" onClose={() => setSelectedVolunteer(null)}>
                    <VolunteerProfile volunteer={selectedVolunteer} />
                </Modal>
            )}

            {/* STAT DETAILS MODAL */}
            {activeStat && (
                <Modal title={statDetails[activeStat].title} onClose={() => setActiveStat(null)}>
                    <p className="mb-4 text-sm text-slate-500">{statDetails[activeStat].description}</p>

                    {activeStat === "pending" ? (
                        <div className="rounded-xl bg-amber-50 p-5 text-sm text-amber-800">
                            Pending review total: <strong>{formatNumber(stats?.totalPendingReviews)}</strong>
                            <p className="mt-2 text-xs">
                                Individual pending review records require a backend endpoint that returns those records.
                            </p>
                        </div>
                    ) : statDetails[activeStat].items.length === 0 ? (
                        <p className="py-10 text-center text-sm text-slate-400">No records available.</p>
                    ) : (
                        <div className="max-h-[55vh] space-y-2 overflow-y-auto">
                            {statDetails[activeStat].items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveStat(null);
                                        setSelectedVolunteer(item.volunteer);
                                    }}
                                    className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/50"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                                        <p className="mt-1 truncate text-xs text-slate-400">{item.detail}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-2">
                                        <span className="text-sm font-bold text-emerald-600">{item.value}</span>
                                        <ChevronRight size={16} className="text-slate-400" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}
