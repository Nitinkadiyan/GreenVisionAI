"use client";

import axios from "axios";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {LogOut, X} from "lucide-react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard2 from "./Dashboard2";
import ReportsView from "./ReportsView";
import VolunteerView from "./VolunteerView";
import ReportDetail from "./ReportDetail";
import MapView from "./MapView";
import NotificationsView from "./NotificationsView";
import ProfileView from "./ProfileView";
import ContributionView from "./ContributionView";
import MyCleanupTask from "./MyCleanuptask.jsx";

export default function UserDashboard() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Existing dashboard state
    const initialView = searchParams.get("view") || "dashboard";

    const [view, setView] = useState(initialView);
    const [reportsOpen, setReportsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logout, setLogout] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [reports, setReports] = useState([]);
    const [reportsLoading, setReportsLoading] = useState(true);
    const [reportsError, setReportsError] = useState("");

    // Navigate to ReportsView with a selected filter
    const onOpenReports = (filter = "All") => {
        setSearchParams({
            view: "reports",
            filter: filter,
        });

        setView("reports");
    };

    // Fetch user's reports
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setReportsLoading(true);
                setReportsError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    setReportsError("Please log in first.");
                    return;
                }

                const response = await axios.get("http://localhost:5001/reports/my-reports", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("FULL REPORT API RESPONSE:", response.data);
                console.log("FETCHED REPORTS:", response.data.reports);

                setReports(Array.isArray(response.data.reports) ? response.data.reports : []);
            } catch (error) {
                console.error("Error fetching reports:", error);

                setReportsError(error.response?.data?.message || "Failed to fetch reports");
            } finally {
                setReportsLoading(false);
            }
        };

        fetchReports();
    }, []);

    // Fetch user profile
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) return;

                const response = await axios.get("http://localhost:5001/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("USER PROFILE:", response.data.user);

                setUser(response.data.user);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        getUserProfile();
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Report counts for Sidebar
    const reportCounts = useMemo(() => {
        return {
            all: reports.length,

            pending: reports.filter((r) => r.status === "Pending Review").length,

            accepted: reports.filter((r) => r.status === "Accepted by Government").length,

            rejected: reports.filter((r) => r.status === "Rejected by Government").length,

            assigned: reports.filter((r) => r.status === "Assigned Cleanup").length,

            inProgress: reports.filter((r) => r.status === "In Progress").length,

            completed: reports.filter((r) => r.status === "Completed" || r.status === "Resolved").length,
        };
    }, [reports]);

    // Render the selected component
    const content =
        view === "dashboard" ? (
            <Dashboard2
                setView={setView}
                query={query}
                reports={reports}
                setSelectedReport={setSelectedReport}
                user={user}
                onOpenReports={onOpenReports}
            />
        ) : view === "reports" ? (
            <ReportsView
                setView={setView}
                query={query}
                setQuery={setQuery}
                setSelectedReport={setSelectedReport}
                reports={reports}
                reportsLoading={reportsLoading}
                reportsError={reportsError}
                initialFilter={searchParams.get("filter") || "All"}
            />
        ) : view === "reportDetail" ? (
            <ReportDetail setView={setView} report={selectedReport} />
        ) : view === "volunteer" ? (
            <VolunteerView />
        ) : view === "tasks" ? (
            <MyCleanupTask user={user} />
        ) : view === "map" ? (
            <MapView setView={setView} reports={reports} setSelectedReport={setSelectedReport} />
        ) : view === "notifications" ? (
            <NotificationsView />
        ) : view === "profile" ? (
            <ProfileView setLogout={setLogout} user={user} setUser={setUser} />
        ) : (
            <ContributionView user={user} />
        );

    return (
        <div className="min-h-screen bg-[#f7faf8] text-slate-900">
            {/* Sidebar */}
            <Sidebar
                view={view}
                setView={setView}
                reportsOpen={reportsOpen}
                setReportsOpen={setReportsOpen}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                setLogout={setLogout}
                user={user}
                reportCounts={reportCounts}
                reports={reports}
                onOpenReports={onOpenReports}
            />

            {/* Main Content */}
            <div className="min-h-screen lg:pl-72">
                <Header setView={setView} setMobileOpen={setMobileOpen} query={query} setQuery={setQuery} user={user} />

                <main>{content}</main>
            </div>

            {/* Logout Confirmation */}
            {logout && (
                <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-5">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between">
                            <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
                                <LogOut size={20} />
                            </div>

                            <button onClick={() => setLogout(false)} className="text-slate-400">
                                <X size={18} />
                            </button>
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-slate-900">Are you sure you want to logout?</h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            You can always sign back in to continue your environmental impact journey.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setLogout(false)}
                                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
