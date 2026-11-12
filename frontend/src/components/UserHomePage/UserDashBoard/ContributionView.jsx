import {useEffect, useState} from "react";
import axios from "axios";
import {Star, Trophy} from "lucide-react";
import SectionTitle from "./SectionTitle";

const API_URL = "http://localhost:5001/rewards";

export default function ContributionView({user}) {
    const [rewards, setRewards] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMyRewards = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await axios.get(`${API_URL}/my-rewards`, {
                    withCredentials: true,
                });

                setRewards(response.data.rewards);
            } catch (error) {
                console.error("Failed to fetch rewards:", error);

                setError(error.response?.data?.message || "Failed to load contribution details");
            } finally {
                setLoading(false);
            }
        };

        fetchMyRewards();
    }, []);

    const currentUserName = user?.name?.trim().toLowerCase();

    const formatPoints = (points = 0) => Number(points).toLocaleString("en-IN");

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

            <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                {/* Contribution Score */}
                <div className="rounded-3xl bg-linear-to-br from-amber-400 to-orange-500 p-7 text-white shadow-xl shadow-orange-100">
                    <Star size={28} fill="currentColor" />

                    <p className="mt-8 text-sm font-semibold text-orange-50">Current contribution score</p>

                    <p className="mt-1 text-5xl font-black">{formatPoints(contribution.totalPointsEarned)}</p>

                    <p className="mt-3 text-sm text-orange-50">
                        {contribution.rank
                            ? `You are currently ranked #${contribution.rank} on the community leaderboard.`
                            : "Start contributing to earn your first stars."}
                    </p>
                </div>

                {/* Contribution Breakdown */}
                <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900">Your contribution summary</h3>

                    <div className="mt-5 space-y-4">
                        <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                            <span className="text-slate-500">Current Points Balance</span>
                            <strong className="text-emerald-600">{formatPoints(contribution.points)}</strong>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                            <span className="text-slate-500">Lifetime Points Earned</span>
                            <strong className="text-emerald-600">{formatPoints(contribution.totalPointsEarned)}</strong>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                            <span className="text-slate-500">Cleanup Tasks Accepted</span>
                            <strong className="text-emerald-600">{formatPoints(contribution.tasksAccepted)}</strong>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                            <span className="text-slate-500">Cleanup Tasks Completed</span>
                            <strong className="text-emerald-600">{formatPoints(contribution.completedTasks)}</strong>
                        </div>

                        <div className="flex justify-between border-b border-slate-100 pb-3 text-sm">
                            <span className="text-slate-500">Completion Rate</span>
                            <strong className="text-emerald-600">{contribution.completionPercentage || 0}%</strong>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Rewards Redeemed</span>
                            <strong className="text-emerald-600">{formatPoints(contribution.rewardsRedeemed)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contribution Rank */}
            <div className="mt-8 max-w-2xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Community leaderboard position</h3>

                    <Trophy size={19} className="text-amber-500" />
                </div>

                <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                    <p className="text-sm text-slate-500">Your current position</p>

                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-2xl font-black text-emerald-700">#{contribution.rank || "-"}</span>

                        <span className="text-sm font-bold text-amber-600">
                            {formatPoints(contribution.totalPointsEarned)} points
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
