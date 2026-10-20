import { useState } from "react";

export default function ReportAddress({ report }) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getAddress() {
    const lat = report?.location?.latitude;
    const lon = report?.location?.longitude;

    if (lat == null || lon == null) {
      setError("Report coordinates are missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        format: "jsonv2",
        lat: String(lat),
        lon: String(lon),
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?${params}`
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve address.");
      }

      const data = await response.json();

      if (!data.display_name) {
        throw new Error("No address found.");
      }

      setAddress(data.display_name);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        onClick={getAddress}
        disabled={loading}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        {loading ? "Loading..." : "Get Address"}
      </button>

      {address && <p className="mt-2">{address}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}