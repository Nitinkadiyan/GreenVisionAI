import {useEffect, useState} from "react";
import axios from "axios";
import {Star, Trophy, Medal, Users, RefreshCw} from "lucide-react";
import SectionTitle from "./SectionTitle";

const API_URL = "http://localhost:5001/rewards";

export default function ContributionView({user}) {
    const [rewards, setRewards] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [leaderboardLoading, setLeaderboardLoading] = useState(true);
    const [error, setError] = useState("");
    const [leaderboardError, setLeaderboardError] = useState("");
    const [showAll, setShowAll] = useState(false);

    const token =
        localStorage.getItem("token") || localStorage.getItem("accessToken") || localStorage.getItem("authToken");

    const authConfig = {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchContributionData = async () => {
            if (!token) {
                setError("Authentication token not found. Please log in again.");
                setLoading(false);
                setLeaderboardLoading(false);
                return;
            }

            // Fetch personal rewards
            try {
                const response = await axios.get(`${API_URL}/my-rewards`, authConfig);

                if (!response.data?.success) {
                    throw new Error(response.data?.message || "Failed to fetch rewards.");
                }

                setRewards(response.data.rewards || {});
                setCurrentUserId(response.data.user?._id || response.data.user?.id || user?._id || user?.id || null);
            } catch (err) {
                console.error("Rewards error:", err.response?.data || err.message);
                setError(err.response?.data?.message || err.message || "Failed to load contribution details.");
            } finally {
                setLoading(false);
            }

            // Fetch community leaderboard
            try {
                const response = await axios.get(`${API_URL}/leaderboard`, authConfig);

                if (!response.data?.success) {
                    throw new Error(response.data?.message || "Failed to fetch leaderboard.");
                }

                setLeaderboard(Array.isArray(response.data.leaderboard) ? response.data.leaderboard : []);
            } catch (err) {
                console.error("Leaderboard error:", err.response?.data || err.message);
                setLeaderboardError(
                    err.response?.data?.message || err.message || "Unable to load community leaderboard."
                );
            } finally {
                setLeaderboardLoading(false);
            }
        };

        fetchContributionData();
    }, []);

    const formatPoints = (points = 0) => Number(points || 0).toLocaleString("en-IN");

    const getUserId = (entry) => String(entry?._id || entry?.id || "");

    const myIndex = leaderboard.findIndex((entry) => currentUserId && getUserId(entry) === String(currentUserId));

    const myLeaderboardEntry = myIndex >= 0 ? leaderboard[myIndex] : null;

    // Show two users above and two below the logged-in user.
    const nearbyLeaderboard =
        myIndex >= 0 ? leaderboard.slice(Math.max(0, myIndex - 2), Math.min(leaderboard.length, myIndex + 3)) : [];

    const displayedLeaderboard = showAll ? leaderboard : nearbyLeaderboard;

    if (loading) {
        return (
            <div className="p-5 md:p-8">
                <SectionTitle title="My Contribution" subtitle="Every star reflects a cleaner, healthier community." />
                <div className="mt-8 animate-pulse space-y-4">
                    <div className="h-48 rounded-3xl bg-slate-100" />
                    <div className="h-40 rounded-3xl bg-slate-100" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-5 md:p-8">
                <SectionTitle title="My Contribution" subtitle="Every star reflects a cleaner, healthier community." />
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">{error}</div>
            </div>
        );
    }

    const contribution = rewards || {};

    return (
        <div className="p-5 md:p-8">
            <SectionTitle title="My Contribution" subtitle="Every star reflects a cleaner, healthier community." />

            {/* Personal contribution dashboard */}
            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-7 text-white shadow-xl shadow-orange-100">
                    <Star size={28} fill="currentColor" />

                    <p className="mt-8 text-sm font-semibold text-orange-50">Current contribution score</p>

                    <p className="mt-1 text-5xl font-black">{formatPoints(contribution.totalPointsEarned)}</p>

                    <p className="mt-3 text-sm text-orange-50">
                        {contribution.rank
                            ? `You are ranked #${contribution.rank} in the community.`
                            : "Start contributing to earn your first stars."}
                    </p>
                </div>

                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900">Your contribution summary</h3>

                    <div className="mt-5 space-y-4">
                        {[
                            ["Current Points Balance", contribution.points],
                            ["Lifetime Points Earned", contribution.totalPointsEarned],
                            ["Cleanup Tasks Accepted", contribution.tasksAccepted],
                            ["Cleanup Tasks Completed", contribution.completedTasks],
                            ["Completion Rate", `${contribution.completionPercentage || 0}%`],
                            ["Rewards Redeemed", contribution.rewardsRedeemed],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="flex justify-between border-b border-slate-100 pb-3 text-sm last:border-0"
                            >
                                <span className="text-slate-500">{label}</span>
                                <strong className="text-emerald-600">
                                    {typeof value === "string" && value.includes("%") ? value : formatPoints(value)}
                                </strong>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Current rank */}
            <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900">Your community position</h3>
                        <p className="mt-1 text-sm text-slate-500">See how you compare with other volunteers.</p>
                    </div>
                    <Trophy size={25} className="text-amber-500" />
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-emerald-50 p-4">
                        <p className="text-sm text-slate-500">Your Rank</p>
                        <p className="mt-1 text-3xl font-black text-emerald-700">
                            #{myLeaderboardEntry?.rank || contribution.rank || "-"}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4">
                        <p className="text-sm text-slate-500">Your Points</p>
                        <p className="mt-1 text-3xl font-black text-amber-600">
                            {formatPoints(contribution.totalPointsEarned)}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-blue-50 p-4">
                        <p className="text-sm text-slate-500">Total Volunteers</p>
                        <p className="mt-1 text-3xl font-black text-blue-700">{leaderboard.length}</p>
                    </div>
                </div>
            </div>

            {/* Community leaderboard */}
            <div className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <Users size={21} className="text-emerald-600" />
                            <h3 className="font-bold text-slate-900">Community Leaderboard</h3>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">Rankings based on lifetime contribution points.</p>
                    </div>

                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
                    >
                        {showAll ? "Show nearby rankings" : "View full leaderboard"}
                    </button>
                </div>

                {leaderboardLoading ? (
                    <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                        <RefreshCw size={16} className="animate-spin" />
                        Loading leaderboard...
                    </div>
                ) : leaderboardError ? (
                    <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">{leaderboardError}</div>
                ) : leaderboard.length === 0 ? (
                    <p className="mt-6 text-sm text-slate-500">No volunteers are currently on the leaderboard.</p>
                ) : myIndex === -1 ? (
                    <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-700">
                        Your profile was not found in the leaderboard. Make sure your volunteer profile is active.
                    </p>
                ) : (
                    <div className="mt-6 space-y-3">
                        {displayedLeaderboard.map((person) => {
                            const isMe = getUserId(person) === String(currentUserId);

                            return (
                                <div
                                    key={getUserId(person)}
                                    className={`flex items-center gap-3 rounded-2xl border p-4 ${
                                        isMe ? "border-emerald-300 bg-emerald-50" : "border-slate-100 bg-slate-50"
                                    }`}
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-black text-slate-700">
                                        {person.rank <= 3 ? (
                                            <Medal
                                                size={23}
                                                className={
                                                    person.rank === 1
                                                        ? "text-amber-500"
                                                        : person.rank === 2
                                                        ? "text-slate-400"
                                                        : "text-orange-500"
                                                }
                                            />
                                        ) : (
                                            <span>#{person.rank}</span>
                                        )}
                                    </div>

                                    {person.profilePicture ? (
                                        <img
                                            src={person.profilePicture}
                                            alt={person.name || "Volunteer"}
                                            className="h-11 w-11 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                            {(person.name || "V").charAt(0).toUpperCase()}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-bold text-slate-900">
                                            {person.name || "Volunteer"}
                                            {isMe && (
                                                <span className="ml-2 text-xs font-bold text-emerald-700">YOU</span>
                                            )}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {formatPoints(person.completedTasks)} tasks completed
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-black text-emerald-700">
                                            {formatPoints(person.totalPointsEarned ?? person.points)}
                                        </p>
                                        <p className="text-xs text-slate-500">points</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
