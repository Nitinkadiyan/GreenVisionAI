import {
    UserRound,
    Mail,
    Phone,
    MapPin,
    Award,
    Target,
    TrendingUp,
    CheckCircle2,
    Clock,
    CalendarDays,
    Gift,
} from "lucide-react";

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

const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatNumber = (value) => (Number(value) || 0).toLocaleString("en-IN");

function DetailStat({label, value, icon: Icon, color = "green"}) {
    const iconColors = {
        green: "bg-emerald-50 text-emerald-700",
        blue: "bg-sky-50 text-sky-700",
        amber: "bg-amber-50 text-amber-700",
        purple: "bg-purple-50 text-purple-700",
    };

    return (
        <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
                </div>

                <div className={`rounded-xl p-3 ${iconColors[color] || iconColors.green}`}>
                    <Icon size={20} />
                </div>
            </div>
        </Card>
    );
}

export default function VolunteerDetail({volunteer}) {
    // volunteer is a complete User document.
    if (!volunteer || !volunteer.volunteerProfile) {
        return (
            <Card className="p-10 text-center">
                <UserRound size={36} className="mx-auto mb-3 text-slate-300" />

                <h2 className="text-lg font-semibold text-slate-700">Volunteer profile unavailable</h2>

                <p className="mt-1 text-sm text-slate-400">The selected user does not have a volunteer profile.</p>
            </Card>
        );
    }

    const profile = volunteer.volunteerProfile;

    const name = volunteer.name || "Unknown volunteer";
    const email = volunteer.email || "Email unavailable";
    const phone = volunteer.phone || "Phone unavailable";

    const profileImage = volunteer.profilePicture?.url;

    const location = [volunteer.location?.address, volunteer.location?.area, volunteer.location?.city]
    .filter(Boolean)
    .join(", ");

    const currentTask = profile.currentTask;

    const currentTaskId = typeof currentTask === "object" ? currentTask?._id : currentTask;

    const hasCurrentTask = Boolean(currentTaskId);

    const metrics = [
        {
            label: "Available points",
            value: formatNumber(profile.points),
            icon: Award,
            color: "green",
        },
        {
            label: "Lifetime points earned",
            value: formatNumber(profile.totalPointsEarned),
            icon: TrendingUp,
            color: "blue",
        },
        {
            label: "Tasks accepted",
            value: formatNumber(profile.tasksAccepted),
            icon: Target,
            color: "purple",
        },
        {
            label: "Reports worked",
            value: formatNumber(profile.totalReportsWorked),
            icon: CheckCircle2,
            color: "green",
        },
        {
            label: "Completion percentage",
            value: `${Number(profile.completionPercentage || 0).toFixed(1)}%`,
            icon: TrendingUp,
            color: "blue",
        },
        {
            label: "Rewards redeemed",
            value: formatNumber(profile.rewardsRedeemed),
            icon: Gift,
            color: "amber",
        },
    ];

    return (
        <div className="space-y-6 pb-7">
            {/* Volunteer profile header */}
            <Card className="p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        {profileImage ? (
                            <img src={profileImage} alt={name} className="size-16 shrink-0 rounded-full object-cover" />
                        ) : (
                            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-800">
                                {getInitials(name)}
                            </div>
                        )}

                        <div className="min-w-0">
                            <h2 className="text-xl font-bold text-slate-800">{name}</h2>

                            <p className="mt-1 text-sm text-slate-500">{email}</p>

                            <p className="mt-1 text-xs text-slate-400">User ID: {volunteer._id}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge tone={getStatusTone(profile.status)}>{profile.status || "Unknown"}</Badge>
                    </div>
                </div>
            </Card>

            {/* Volunteer statistics */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {metrics.map((metric) => (
                    <DetailStat
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                        icon={metric.icon}
                        color={metric.color}
                    />
                ))}
            </div>

            {/* Personal information */}
            <Card className="p-6">
                <div className="mb-5">
                    <h3 className="font-bold text-slate-800">Personal information</h3>

                    <p className="mt-1 text-xs text-slate-500">Contact and location details from the user profile.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                        <Mail size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-400">Email</p>
                            <p className="mt-1 break-all text-sm font-medium text-slate-700">{email}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Phone size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-400">Phone</p>
                            <p className="mt-1 text-sm font-medium text-slate-700">{phone}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                        <MapPin size={18} className="mt-0.5 text-slate-400" />

                        <div>
                            <p className="text-xs text-slate-400">Location</p>
                            <p className="mt-1 text-sm font-medium text-slate-700">
                                {location || "Location unavailable"}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Current cleanup task */}
            <Card className="p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-sky-50 p-3 text-sky-700">
                        <Clock size={20} />
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-800">Current cleanup task</h3>

                        <p className="mt-1 text-xs text-slate-500">Task reference stored in the volunteer profile.</p>
                    </div>
                </div>

                {hasCurrentTask ? (
                    <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50/50 p-4">
                        <p className="text-xs font-medium text-sky-700">Assigned task ID</p>

                        <p className="mt-2 break-all text-sm font-semibold text-slate-700">
                            {currentTaskId.toString()}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                            The task reference is available. Task details can be displayed once the backend populates
                            the CleanupTask document.
                        </p>
                    </div>
                ) : (
                    <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-5 text-center">
                        <CheckCircle2 size={28} className="mx-auto mb-2 text-emerald-500" />

                        <p className="text-sm font-semibold text-slate-700">No current task assigned</p>

                        <p className="mt-1 text-xs text-slate-400">
                            This volunteer currently has no active task reference.
                        </p>
                    </div>
                )}
            </Card>

            {/* Volunteer account information */}
            <Card className="p-6">
                <div className="mb-5 flex items-center gap-3">
                    <CalendarDays size={20} className="text-slate-400" />

                    <div>
                        <h3 className="font-bold text-slate-800">Volunteer profile information</h3>

                        <p className="mt-1 text-xs text-slate-500">Profile creation and last update.</p>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <p className="text-xs text-slate-400">Volunteer since</p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(profile.createdAt)}</p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400">Last profile update</p>

                        <p className="mt-1 text-sm font-semibold text-slate-700">{formatDate(profile.updatedAt)}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}
