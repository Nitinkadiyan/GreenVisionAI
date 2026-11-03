
import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import { MapPin } from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function MapView({
  reports = [],
  setView,
  setSelectedReport,
}) {
  const [selected, setSelected] = useState(null);

  // Validate geographic coordinates
  const mappedReports = reports.filter((report) => {
    const latitude = report.location?.latitude;
    const longitude = report.location?.longitude;

    // Reject null, undefined and empty values
    if (
      latitude === null ||
      latitude === undefined ||
      latitude === "" ||
      longitude === null ||
      longitude === undefined ||
      longitude === ""
    ) {
      return false;
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    return (
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  });

  // Open complete report details
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setView("reportDetail");
  };

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Environmental Issues Map"
        subtitle="Explore environmental reports across India and worldwide. Zoom in to find individual reports."
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">

        {/* Interactive Map */}
        <div className="relative z-0 h-[550px] overflow-hidden rounded-3xl border border-emerald-100 shadow-sm">
          <MapContainer
            center={[22.5, 79]}
            zoom={4}
            minZoom={2}
            maxZoom={19}
            scrollWheelZoom={true}
            worldCopyJump={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mappedReports.map((report) => (
              <Marker
                key={report._id}
                position={[
                  Number(report.location.latitude),
                  Number(report.location.longitude),
                ]}
                eventHandlers={{
                  click: () => setSelected(report),
                }}
              >
                <Popup>
                  <div className="min-w-40">
                    <strong>
                      {report.aiAnalysis?.wasteType ||
                        "Environmental Report"}
                    </strong>

                    <p className="mt-1 text-sm">
                      {report.location?.address ||
                        "Location unavailable"}
                    </p>

                    <p className="mt-1 text-sm">
                      Status: {report.status || "Unknown"}
                    </p>

                    <button
                      onClick={() => handleViewReport(report)}
                      className="mt-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white"
                    >
                      View Report
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Counter */}
          <div className="absolute left-4 top-4 z-[1000] rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow">
            <MapPin
              size={15}
              className="mr-1 inline text-emerald-600"
            />

            {mappedReports.length} mapped reports
          </div>
        </div>

        {/* Report Details Panel */}
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">
            Report Details
          </h3>

          {!selected ? (
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Click any marker on the map to see its report details.
            </p>
          ) : (
            <div className="mt-4 space-y-4">

              {/* Report Image */}
              {selected.imageUrl && (
                <img
                  src={selected.imageUrl}
                  alt={
                    selected.aiAnalysis?.wasteType ||
                    "Reported issue"
                  }
                  className="h-40 w-full rounded-xl object-cover"
                />
              )}

              {/* Report Information */}
              <div>
                <p className="text-lg font-bold text-slate-800">
                  {selected.aiAnalysis?.wasteType ||
                    "Environmental Report"}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {selected.location?.address ||
                    "Location unavailable"}
                </p>
              </div>

              {/* Status and Severity */}
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">
                  Status
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selected.status || "Unknown"}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  Severity
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {selected.aiAnalysis?.severity || "Unknown"}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-6 text-slate-600">
                {selected.description ||
                  selected.aiAnalysis?.summary ||
                  "No description available."}
              </p>

              {/* View Full Report */}
              <button
                onClick={() => handleViewReport(selected)}
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                View Full Report
              </button>

              {/* Clear Selection */}
              <button
                onClick={() => setSelected(null)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Clear Selection
              </button>
            </div>
          )}

          <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
            Zoom or drag the map to explore other locations.
          </p>
        </div>
      </div>
    </div>
  );
}
