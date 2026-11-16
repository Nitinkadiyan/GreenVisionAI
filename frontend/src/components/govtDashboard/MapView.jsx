import {useMemo, useState} from "react";

import {MapContainer, TileLayer, Popup, CircleMarker, useMap} from "react-leaflet";

import {
    MapPin,
    Search,
    Filter,
    AlertTriangle,
    CheckCircle2,
    Clock,
    XCircle,
    LocateFixed,
    RotateCcw,
    X,
    Eye,
    List,
    Map as MapIcon,
    ChevronRight,
    Layers,
    Navigation,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import {getSeverityConfig} from "../../utils/severity";

// Default map center
const DEFAULT_CENTER = [22.5, 79];
const DEFAULT_ZOOM = 4;

// Severity colors
const severityColors = {
    low: "#22c55e",
    medium: "#eab308",
    high: "#f97316",
    critical: "#ef4444",
    unknown: "#64748b",
};

// Normalize status values
const normalizeStatus = (status = "") => status.toLowerCase().trim();

const getSeverity = (report) => normalizeStatus(report.aiAnalysis?.severity || "unknown");

const getStatusCategory = (status = "") => {
    const value = normalizeStatus(status);

    if (value.includes("escalat")) return "Escalated";
    if (value.includes("reject")) return "Rejected";
    if (value.includes("complet") || value.includes("resolved")) {
        return "Completed";
    }
    if (value.includes("accept") || value.includes("assign")) {
        return "Accepted";
    }
    if (value.includes("progress")) return "In Progress";
    return "Pending";
};

// Validate report coordinates
const hasValidCoordinates = (report) => {
    const lat = Number(report.location?.latitude);
    const lng = Number(report.location?.longitude);

    return (
        report.location?.latitude !== "" &&
        report.location?.longitude !== "" &&
        report.location?.latitude != null &&
        report.location?.longitude != null &&
        Number.isFinite(lat) &&
        Number.isFinite(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
};

// Fit map to all reports
function FitReports({reports, resetKey}) {
    const map = useMap();

    useMemo(() => {
        if (!reports.length) return;

        const coordinates = reports.map((report) => [
            Number(report.location.latitude),
            Number(report.location.longitude),
        ]);

        if (coordinates.length === 1) {
            map.setView(coordinates[0], 13, {animate: true});
        } else {
            map.fitBounds(coordinates, {
                padding: [50, 50],
                maxZoom: 12,
                animate: true,
            });
        }
    }, [reports, map, resetKey]);

    return null;
}

// Move map to selected report
function FocusReport({report}) {
    const map = useMap();

    useMemo(() => {
        if (!report) return;

        map.flyTo([Number(report.location.latitude), Number(report.location.longitude)], 14, {duration: 0.8});
    }, [report, map]);

    return null;
}

export default function MapView({reports = [], setView, setSelectedReport}) {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [severityFilter, setSeverityFilter] = useState("All");
    const [resetKey, setResetKey] = useState(0);
    const [mobilePanel, setMobilePanel] = useState("map");

    // Only reports with valid coordinates
    const mappedReports = useMemo(() => reports.filter(hasValidCoordinates), [reports]);

    // Search and filtering
    const filteredReports = useMemo(() => {
        return mappedReports.filter((report) => {
            const searchText = search.toLowerCase();

            const matchesSearch =
                !searchText ||
                [
                    report.aiAnalysis?.wasteType,
                    report.location?.address,
                    report.description,
                    report.userId?.name,
                    report.status,
                ]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(searchText));

            const matchesStatus = statusFilter === "All" || getStatusCategory(report.status) === statusFilter;

            const matchesSeverity = severityFilter === "All" || getSeverity(report) === severityFilter.toLowerCase();

            return matchesSearch && matchesStatus && matchesSeverity;
        });
    }, [mappedReports, search, statusFilter, severityFilter]);

    // Statistics
    const stats = useMemo(() => {
        return {
            total: reports.length,
            mapped: mappedReports.length,
            critical: mappedReports.filter((report) => getSeverity(report) === "critical").length,
            escalated: mappedReports.filter((report) => getStatusCategory(report.status) === "Escalated").length,
            pending: mappedReports.filter((report) => getStatusCategory(report.status) === "Pending").length,
        };
    }, [reports, mappedReports]);

    const selectReport = (report) => {
        setSelected(report);
        setMobilePanel("details");
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("All");
        setSeverityFilter("All");
        setSelected(null);
    };

    const resetMap = () => {
        setResetKey((previous) => previous + 1);
        setSelected(null);
    };

    const openFullReport = (report) => {
        if (!report) return;

        setSelectedReport(report);
        setView("reportDetail");
    };

    const getStatusColor = (status) => {
        const category = getStatusCategory(status);

        const colors = {
            Pending: "bg-yellow-100 text-yellow-700",
            Accepted: "bg-blue-100 text-blue-700",
            "In Progress": "bg-purple-100 text-purple-700",
            Escalated: "bg-orange-100 text-orange-700",
            Rejected: "bg-red-100 text-red-700",
            Completed: "bg-emerald-100 text-emerald-700",
        };

        return colors[category] || "bg-slate-100 text-slate-600";
    };

    return (
        <div className="space-y-6 p-5 md:p-8">
            {/* Header */}
            <SectionTitle
                title="Environmental Monitoring Map"
                subtitle="Monitor reported environmental issues, identify critical locations, and explore reports across different regions."
            />

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {[
                    {
                        label: "Total Reports",
                        value: stats.total,
                        icon: Layers,
                        color: "text-slate-700",
                        bg: "bg-slate-100",
                    },
                    {
                        label: "Mapped Reports",
                        value: stats.mapped,
                        icon: MapPin,
                        color: "text-emerald-700",
                        bg: "bg-emerald-100",
                    },
                    {
                        label: "Pending",
                        value: stats.pending,
                        icon: Clock,
                        color: "text-yellow-700",
                        bg: "bg-yellow-100",
                    },
                    {
                        label: "Critical",
                        value: stats.critical,
                        icon: AlertTriangle,
                        color: "text-red-700",
                        bg: "bg-red-100",
                    },
                    {
                        label: "Escalated",
                        value: stats.escalated,
                        icon: Navigation,
                        color: "text-orange-700",
                        bg: "bg-orange-100",
                    },
                ].map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className={`rounded-xl p-2 ${item.bg}`}>
                                    <Icon size={17} className={item.color} />
                                </div>

                                <p className="text-2xl font-bold text-slate-800">{item.value}</p>
                            </div>

                            <p className="mt-3 text-xs font-medium text-slate-500">{item.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="relative flex-1">
                        <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by location, waste type, description..."
                            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-600 outline-none focus:border-emerald-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Escalated">Escalated</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <select
                            value={severityFilter}
                            onChange={(event) => setSeverityFilter(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-600 outline-none focus:border-emerald-500"
                        >
                            <option value="All">All Severities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            <RotateCcw size={14} />
                            Reset
                        </button>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>
                        Showing {filteredReports.length} of {mappedReports.length} mapped reports
                    </span>

                    {reports.length !== mappedReports.length && (
                        <span>{reports.length - mappedReports.length} without valid coordinates</span>
                    )}
                </div>
            </div>

            {/* Mobile View Switch */}
            <div className="grid grid-cols-2 gap-2 lg:hidden">
                <button
                    type="button"
                    onClick={() => setMobilePanel("map")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold ${
                        mobilePanel === "map" ? "bg-emerald-600 text-white" : "bg-white text-slate-600"
                    }`}
                >
                    <MapIcon size={16} />
                    Map
                </button>

                <button
                    type="button"
                    onClick={() => setMobilePanel("list")}
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold ${
                        mobilePanel === "list" ? "bg-emerald-600 text-white" : "bg-white text-slate-600"
                    }`}
                >
                    <List size={16} />
                    Reports ({filteredReports.length})
                </button>
            </div>

            {/* Main Layout */}
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
                {/* Map */}
                <div
                    className={`relative z-0 overflow-hidden rounded-3xl border border-emerald-100 bg-slate-100 shadow-sm ${
                        mobilePanel !== "map" ? "hidden lg:block" : "block"
                    }`}
                >
                    <div className="h-[550px] md:h-[650px]">
                        <MapContainer
                            center={DEFAULT_CENTER}
                            zoom={DEFAULT_ZOOM}
                            minZoom={2}
                            maxZoom={19}
                            scrollWheelZoom
                            worldCopyJump
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <FitReports reports={filteredReports} resetKey={resetKey} />

                            <FocusReport report={selected} />

                            {filteredReports.map((report) => {
                                const severity = getSeverityConfig(report.aiAnalysis?.severity);

                                const severityKey = getSeverity(report);

                                const markerColor = severityColors[severityKey] || severityColors.unknown;

                                const isSelected = selected?._id === report._id;

                                return (
                                    <CircleMarker
                                        key={report._id}
                                        center={[Number(report.location.latitude), Number(report.location.longitude)]}
                                        radius={isSelected ? 12 : 8}
                                        pathOptions={{
                                            color: isSelected ? "#0f172a" : markerColor,
                                            fillColor: markerColor,
                                            fillOpacity: 0.9,
                                            weight: isSelected ? 4 : 2,
                                        }}
                                        eventHandlers={{
                                            click: () => selectReport(report),
                                        }}
                                    >
                                        <Popup>
                                            <div className="min-w-48 space-y-2">
                                                <p className="font-bold text-slate-800">
                                                    {report.aiAnalysis?.wasteType || "Environmental Report"}
                                                </p>

                                                <p className="text-xs text-slate-500">
                                                    {report.location?.address || "Location unavailable"}
                                                </p>

                                                <p className="text-xs">Status: {report.status || "Unknown"}</p>

                                                <p className="text-xs font-semibold">
                                                    Severity: {severity.label || "Unknown"}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => openFullReport(report)}
                                                    className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white"
                                                >
                                                    View Full Report
                                                </button>
                                            </div>
                                        </Popup>
                                    </CircleMarker>
                                );
                            })}
                        </MapContainer>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={resetMap}
                            title="Fit all visible reports"
                            className="rounded-xl bg-white p-3 text-slate-700 shadow-md transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            <LocateFixed size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setSelected(null);
                                setResetKey((previous) => previous + 1);
                            }}
                            title="Reset map"
                            className="rounded-xl bg-white p-3 text-slate-700 shadow-md transition hover:bg-slate-50"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>

                    {/* Marker Count */}
                    <div className="absolute left-4 top-4 z-[1000] rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-md">
                        <MapPin size={14} className="mr-1 inline text-emerald-600" />
                        {filteredReports.length} visible reports
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                        <p className="mb-2 text-xs font-bold text-slate-700">AI Severity</p>

                        {Object.entries(severityColors)
                        .filter(([key]) => key !== "unknown")
                        .map(([key, color]) => (
                            <div key={key} className="mb-1 flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full" style={{backgroundColor: color}} />

                                <span className="text-xs capitalize text-slate-600">{key}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reports List / Details Panel */}
                <div
                    className={`rounded-3xl border border-slate-100 bg-white p-5 shadow-sm ${
                        mobilePanel === "map" ? "hidden lg:block" : "block"
                    }`}
                >
                    {selected ? (
                        <>
                            {/* Selected Report */}
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">Selected Report</h3>

                                <button
                                    type="button"
                                    onClick={() => setSelected(null)}
                                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                    aria-label="Close selected report"
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            {selected.imageUrl && (
                                <img
                                    src={selected.imageUrl}
                                    alt="Environmental issue"
                                    className="mt-4 h-44 w-full rounded-xl object-cover"
                                />
                            )}

                            <div className="mt-4">
                                <h4 className="text-lg font-bold text-slate-800">
                                    {selected.aiAnalysis?.wasteType || "Environmental Report"}
                                </h4>

                                <p className="mt-1 text-sm text-slate-500">
                                    {selected.location?.address || "Location unavailable"}
                                </p>
                            </div>

                            <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs text-slate-500">Status</span>

                                    <span
                                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusColor(
                                            selected.status
                                        )}`}
                                    >
                                        {selected.status || "Unknown"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">AI Severity</span>

                                    <span className="text-xs font-bold text-slate-700">
                                        {getSeverityConfig(selected.aiAnalysis?.severity).label}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">Confidence</span>

                                    <span className="text-xs font-bold text-slate-700">
                                        {selected.aiAnalysis?.confidence ?? "N/A"}
                                        {typeof selected.aiAnalysis?.confidence === "number" ? "%" : ""}
                                    </span>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                {selected.description || selected.aiAnalysis?.summary || "No description available."}
                            </p>

                            <button
                                type="button"
                                onClick={() => openFullReport(selected)}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                            >
                                <Eye size={16} />
                                View Full Report
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelected(null)}
                                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Clear Selection
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Reports List */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900">Reports Explorer</h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Select a report to locate it on the map.
                                    </p>
                                </div>

                                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                    {filteredReports.length}
                                </span>
                            </div>

                            <div className="mt-4 max-h-[590px] space-y-3 overflow-y-auto pr-1">
                                {filteredReports.length === 0 ? (
                                    <div className="rounded-xl bg-slate-50 p-5 text-center">
                                        <Filter size={25} className="mx-auto text-slate-300" />

                                        <p className="mt-2 text-sm font-semibold text-slate-700">No reports found</p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Try changing your search or filters.
                                        </p>
                                    </div>
                                ) : (
                                    filteredReports.map((report) => {
                                        const severity = getSeverityConfig(report.aiAnalysis?.severity);

                                        return (
                                            <button
                                                type="button"
                                                key={report._id}
                                                onClick={() => selectReport(report)}
                                                className="w-full rounded-xl border border-slate-100 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
                                            >
                                                <div className="flex items-start gap-3">
                                                    {report.imageUrl ? (
                                                        <img
                                                            src={report.imageUrl}
                                                            alt=""
                                                            className="h-14 w-14 shrink-0 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                                            <MapPin size={20} className="text-slate-400" />
                                                        </div>
                                                    )}

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-bold text-slate-800">
                                                            {report.aiAnalysis?.wasteType || "Environmental Report"}
                                                        </p>

                                                        <p className="mt-1 truncate text-xs text-slate-500">
                                                            {report.location?.address || "Location unavailable"}
                                                        </p>

                                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                                            <span
                                                                className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${getStatusColor(
                                                                    report.status
                                                                )}`}
                                                            >
                                                                {report.status || "Unknown"}
                                                            </span>

                                                            <span className="text-[10px] font-semibold text-slate-500">
                                                                {severity.label || "Unknown"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ChevronRight size={16} className="mt-2 shrink-0 text-slate-400" />
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
