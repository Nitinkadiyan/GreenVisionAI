"use client";
import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {MapContainer,TileLayer,Marker,Popup,}from "react-leaflet";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard2 from "./Dashboard2";
import SectionTitle from "./SectionTitle";
import ReportCard from "./ReportCard";
import ReportsView from "./ReportsView";
import VolunteerView from "./VolunteerView";
import ReportDetail from "./ReportDetail";
import CleanupPanel from "./CleanupPanel";
import Timeline from "./Timeline";
import MyReports from "../MyReports";
import ReportIssue from "../ReportIssue.jsx";
import MapView from "./MapView";
import NotificationsView from "./NotificationsView";
import ProfileView from "./ProfileView";
import ContributionView from "./ContributionView";
import Avatar from "./Avatar";
import Badge from "./Badge";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Coins,
  FileText,
  Filter,
  Gift,
  HandHeart,
  LayoutDashboard,
  ListFilter,
  LogOut,
  Map as MapIcon,
  MapPin,
  Menu,
  MoreHorizontal,
  Pencil,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import api from "../../../api/axios";

export default function UserDashboard() {
  const [searchParams] = useSearchParams();
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

        const response = await axios.get(
          "http://localhost:5001/reports/my-reports",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setReports(response.data.reports || []);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReportsError(
          error.response?.data?.message || "Failed to fetch reports",
        );
      } finally {
        setReportsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const getUserProfile = async (req, res) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const handleLogout = async () => {
    console.log("logout function started");
    try {
      localStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };
  const content =
    view === "dashboard" ? (
      <Dashboard2
  setView={setView}
  query={query}
  reports={reports}
  setSelectedReport={setSelectedReport}
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
      />
    ) : view === "reportDetail" ? (
      <ReportDetail setView={setView} report={selectedReport} />
    ) : view === "volunteer" || view === "tasks" ? (
      <VolunteerView />
    ) : view === "map" ? (
      <MapView
        setView={setView}
        reports={reports}
        setSelectedReport={setSelectedReport}
      />
    ) : view === "notifications" ? (
      <NotificationsView />
    ) : view === "profile" ? (
      <ProfileView setLogout={setLogout} user={user} setUser={setUser} />
    ) : (
      <ContributionView user={user} />
    );

  const reportCounts = useMemo(() => {
    return {
      all: reports.length,

      pending: reports.filter((r) => r.status === "Pending Review").length,

      accepted: reports.filter((r) => r.status === "Accepted by Government")
        .length,

      rejected: reports.filter((r) => r.status === "Rejected by Government")
        .length,

      assigned: reports.filter((r) => r.status === "Assigned Cleanup").length,

      inProgress: reports.filter((r) => r.status === "In Progress").length,

      completed: reports.filter(
        (r) => r.status === "Completed" || r.status === "Resolved",
      ).length,
    };
  }, [reports]);
  return (
    <div className="min-h-screen bg-[#f7faf8] text-slate-900">
      <Sidebar
        {...{
          view,
          setView,
          reportsOpen,
          setReportsOpen,
          mobileOpen,
          setMobileOpen,
          setLogout,
          user,
          reportCounts,
          reports,
        }}
      />
      <div className="min-h-screen lg:pl-72">
        <Header {...{ setView, setMobileOpen, query, setQuery, user }} />
        <main>{content}</main>
      </div>
      {logout && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/30 p-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <LogOut size={20} />
              </div>
              <button
                onClick={() => setLogout(false)}
                className="text-slate-400"
              >
                <X size={18} />
              </button>
            </div>
            <h2 className="mt-5 text-lg font-bold text-slate-900">
              Are you sure you want to logout?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You can always sign back in to continue your environmental impact
              journey.
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
