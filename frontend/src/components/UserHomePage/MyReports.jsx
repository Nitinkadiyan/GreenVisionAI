"use client";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  Check,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Info,
  Leaf,
  Loader2,
  MapPin,
  Navigation,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";


const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

function FieldLabel({ children, required = false }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-slate-700">
      {children} {required && <span className="text-emerald-600">*</span>}
    </label>
  );
}

function ProcessingPanel() {
  const stages = [
    "Image uploaded",
    "Image processed",
    "Detecting environmental issue",
    "Estimating severity",
    "Generating recommendations",
  ];
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <Loader2 className="size-6 animate-spin" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Analyzing Your Report
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            GreenVision AI is analyzing your image and environmental
            information.
          </p>
        </div>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-emerald-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all duration-700"
          style={{ width: "68%" }}
        />
      </div>
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3 text-sm">
            <span
              className={`flex size-5 items-center justify-center rounded-full ${index < 2 ? "bg-emerald-600 text-white" : index === 2 ? "border-2 border-emerald-600 text-emerald-600" : "border border-slate-300 text-slate-400"}`}
            >
              {index < 2 ? (
                <Check className="size-3" />
              ) : index === 2 ? (
                <span className="size-1.5 rounded-full bg-emerald-600" />
              ) : null}
            </span>
            <span
              className={
                index <= 2 ? "font-medium text-slate-800" : "text-slate-500"
              }
            >
              {stage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisResults({ response, setResult }) {
  const update = (key, value) =>
    setResult((current) => ({ ...current, [key]: value }));
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900">
              AI Environmental Analysis
            </h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Review the AI-generated information before submitting your report.
            You can edit the results if necessary.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
          <Sparkles className="size-3" /> AI Generated
        </span>
      </div>
      <div className="space-y-5">
        <div>
          <FieldLabel>Waste Type</FieldLabel>
          <div className="relative">
            <Trash2 className="pointer-events-none absolute left-3 top-3.5 size-4 text-emerald-600" />
            <input
              value={response?.wasteType || ""}
              onChange={(e) => update("wasteType", e.target.value)}
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between">
            <FieldLabel>Confidence</FieldLabel>
            <span className="text-sm font-bold text-emerald-700">
              {response?.confidence ?? 0}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${response?.confidence ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">AI Confidence</p>
        </div>
        <div>
          <FieldLabel>Estimated Quantity</FieldLabel>
          <input
            value={response?.estimatedWasteKg || ""}
            onChange={(e) => update("estimatedWasteKg", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel>Severity</FieldLabel>
          <select
            value={response?.severity || "Low"}
            onChange={(e) => update("severity", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        {/* <div>
          <FieldLabel>Environmental Impact</FieldLabel>
          <textarea
            value={result.environmentalImpact}
            onChange={(e) => update("environmentalImpact", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div> */}

        <div>
          <FieldLabel>Recommended Action</FieldLabel>
          <textarea
            value={response?.possibleAction || ""}
            onChange={(e) => update("possibleAction", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <FieldLabel>Environmental Risk</FieldLabel>
          <textarea
            value={response?.environmentalRisk || ""}
            onChange={(e) => update("environmentalRisk", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <FieldLabel>Suggested Authority</FieldLabel>
          <textarea
            value={response?.suggestedAuthority || ""}
            onChange={(e) => update("suggestedAuthority", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        {/* <div>
          <FieldLabel>Recommended Priority</FieldLabel>
          <select
            value={response?.recommendedPriority ||"Medium"}
            onChange={(e) => update("recommendedPriority", e.target.value)}
            className={inputClass}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </select>
        </div> */}
        <div>
          <FieldLabel>AI Summary</FieldLabel>
          <textarea
            value={response?.summary || ""}
            onChange={(e) => update("summary", e.target.value)}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-xl bg-white/70 p-4 text-xs leading-5 text-slate-600">
        <Info className="mt-0.5 size-4 shrink-0 text-emerald-600" />{" "}
        AI-generated information should be reviewed before submission. You are
        responsible for confirming that the information accurately represents
        the environmental issue.
      </div>
    </div>
  );
}

export default function CreateReport() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Plastic Waste");
  const [additionalOpen, setAdditionalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [errors, setErrors] = useState({});
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(
    () => () => image?.preview && URL.revokeObjectURL(image.preview),
    [image],
  );

  const chooseImage = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage({ file, preview: URL.createObjectURL(file) });
    setErrors((e) => ({ ...e, image: "" }));
  };
  const validate = () => {
    const next = {};
    if (!image) next.image = "Please upload an image.";
    if (!address.trim()) next.address = "Address is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!description.trim()) next.description = "Description is required.";
    setErrors(next);
    return !Object.keys(next).length;
  };
  const analyze = async () => {
    if (!validate()) return;

    if (!coordinates.latitude || !coordinates.longitude) {
      alert("Please provide your location");
      return;
    }

    try {
      setProcessing(true);

      const formData = new FormData();

      formData.append("image", image.file);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("description", description);
      formData.append("latitude", coordinates.latitude);
      formData.append("longitude", coordinates.longitude);

      const response = await api.post("/analyzeReport/analyze", formData);

      console.log("AI Response:", response.data);

      setResult(response.data.analysis);

      setProcessing(false);
      setAnalyzed(true);
    } catch (error) {
      console.error("AI analysis error:", error);

      setProcessing(false);

      alert(error.response?.data?.message || "Failed to analyze the report");
    }
  };
  const locate = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        // 1. Save the coordinates in React state
        setCoordinates({
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        });

        try {
          // 2. Convert coordinates into a readable address
          const params = new URLSearchParams({
            format: "jsonv2",
            lat: String(latitude),
            lon: String(longitude),
            addressdetails: "1",
          });

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?${params}`,
          );

          if (!response.ok) {
            throw new Error("Address lookup failed.");
          }

          const data = await response.json();
          console.log("data:", data);
          const details = data.address || {};
          // console.log(data.address);
          // 3. Automatically fill the address
          // console.log("dispaly:" ,data.display_name);
          // console.log("display2:",data.address,display_name);
          setAddress(data.display_name || "");

          // 4. Extract the city or nearest available locality
          const detectedCity =
            details.city ||
            details.town ||
            details.village ||
            details.municipality ||
            details.city_district ||
            details.county ||
            "";
          console.log("detected city:", detectedCity);
          setCity(detectedCity);

          if (!data.display_name) {
            setLocationError(
              "Coordinates detected, but no readable address was found.",
            );
          } else if (!detectedCity) {
            setLocationError(
              "Address detected, but the city could not be identified. Please enter it manually.",
            );
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);

          setLocationError(
            "Coordinates detected, but the address lookup failed. Please enter the address and city manually.",
          );
        } finally {
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);

        if (error.code === 1) {
          setLocationError("Please allow location access in your browser.");
        } else if (error.code === 2) {
          setLocationError("Your current location could not be detected.");
        } else {
          setLocationError("Location request timed out. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const submit = async () => {
    if (!result) {
      alert("Please analyze the report first");
      return;
    }

    if (!image) {
      alert("Please upload an image");
      return;
    }

    if (!description.trim()) {
      alert("Please give the description");
      return;
    }

    if (!coordinates.latitude || !coordinates.longitude) {
      alert("Please provide your location");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("image", image.file);
      formData.append("description", description);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("latitude", coordinates.latitude);
      formData.append("longitude", coordinates.longitude);
      console.log(city);
      formData.append("aiAnalysis", JSON.stringify(result));

      const response = await api.post("/reports/create-report", formData);

      console.log("Report created:", response.data);

      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Report submission error:", error);

      setSubmitting(false);

      alert(error.response?.data?.message || "Failed to submit report");
    }
  };
  if (submitted)
    return (
      <main className="min-h-screen bg-[#f7fbf8] px-5 py-8 text-slate-900 sm:px-8">
        <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/5 sm:p-12">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="size-10" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Report Submitted Successfully!
            </h1>
            <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
              Your report has been submitted and is now waiting for government
              review.
            </p>
            <div className="mt-8 rounded-2xl bg-emerald-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Report ID
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">
                GV-1024
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate("/user-home-page?view=reports")}
                className="rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                {" "}
                View My Reports{" "}
              </button>{" "}
              {/* Dashboard */}{" "}
              <button
                type="button"
                onClick={() => navigate("/user-home-page")}
                className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                {" "}
                Back to Dashboard{" "}
              </button>
            </div>
          </div>
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f7fbf8] px-4 py-5 text-slate-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between border-b border-emerald-100 pb-5">
          <button
            onClick={() => navigate("/user-home-page")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
          >
            <ArrowLeft className="size-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-emerald-700">
            <Leaf className="size-5 fill-emerald-100" /> GreenVision AI
          </div>
        </header>
        <section className="py-10 text-center sm:py-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Community powered environmental care
          </p>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Report an Environmental Issue
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-7 text-slate-600">
            Help your community identify environmental problems and make your
            neighborhood cleaner.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                01
              </span>
              <span className="hidden sm:inline">Report Details</span>
            </div>
            <span className="h-px w-8 bg-emerald-200 sm:w-14" />
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${analyzed ? "text-emerald-700" : "text-slate-400"}`}
            >
              <span
                className={`flex size-7 items-center justify-center rounded-full text-xs ${analyzed ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}
              >
                02
              </span>
              <span className="hidden sm:inline">AI Analysis</span>
            </div>
            <span className="h-px w-8 bg-slate-200 sm:w-14" />
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
              <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500">
                03
              </span>
              <span className="hidden sm:inline">Submit</span>
            </div>
          </div>
        </section>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)] lg:items-start">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-7 flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <FileText className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Report Details</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Tell us about the environmental issue you found.
                </p>
              </div>
            </div>
            <div className="space-y-7">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <FieldLabel required>Upload Image</FieldLabel>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Required
                  </span>
                </div>
                <p className="mb-3 text-sm text-slate-500">
                  Upload a clear photo of the environmental issue.
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => chooseImage(e.target.files?.[0])}
                />
                {image ? (
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50">
                    <img
                      src={image.preview}
                      alt="Selected environmental issue"
                      className="h-52 w-full object-cover"
                    />
                    <div className="flex items-center justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {image.file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(image.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          aria-label="Remove image"
                          onClick={() => {
                            URL.revokeObjectURL(image.preview);
                            setImage(null);
                          }}
                          className="rounded-lg bg-white p-2 text-slate-500 shadow-sm hover:text-red-600"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/40 px-5 py-10 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
                  >
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                      <ImageIcon className="size-7" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      Drag & drop your image here
                    </p>
                    <p className="my-1 text-sm text-slate-500">
                      or{" "}
                      <span className="font-semibold text-emerald-700">
                        Browse from your device
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      PNG, JPG or WEBP • Max 10MB
                    </p>
                    <Upload className="mt-4 size-4 text-emerald-500" />
                  </button>
                )}
                {errors.image && (
                  <p className="mt-2 text-xs text-red-600">{errors.image}</p>
                )}
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <FieldLabel required>Location</FieldLabel>
                    <p className="text-sm text-slate-500">
                      Where did you find the issue?
                    </p>
                  </div>
                  <MapPin className="size-5 text-emerald-600" />
                </div>
                <div className="space-y-4">
                  <div>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter the location where you found the issue"
                      className={inputClass}
                    />
                    {errors.address && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className={inputClass}
                    />
                    {errors.city && (
                      <p className="mt-2 text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={coordinates.latitude}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          latitude: e.target.value,
                        })
                      }
                      placeholder="Latitude"
                      className={inputClass}
                    />
                    <input
                      value={coordinates.longitude}
                      onChange={(e) =>
                        setCoordinates({
                          ...coordinates,
                          longitude: e.target.value,
                        })
                      }
                      placeholder="Longitude"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={locate}
                    disabled={locating}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 disabled:opacity-50"
                  >
                    <Navigation className="size-4" />{" "}
                    {locating
                      ? "Detecting Location..."
                      : "Use My Current Location"}
                    {locationError && (
                      <p className="mt-2 text-sm text-red-600">
                        {locationError}
                      </p>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <FieldLabel required>Description</FieldLabel>
                <textarea
                  value={description}
                  maxLength={500}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you observed..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                {errors.description && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.description}
                  </p>
                )}
                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>
                    Tell us what you noticed, where it is located, and any
                    details that might help identify the problem.
                  </span>
                  <span className="shrink-0 pl-3">
                    {description.length} / 500
                  </span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setAdditionalOpen(!additionalOpen)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span>
                    <span className="font-semibold text-slate-800">
                      Additional Information
                    </span>
                    <span className="ml-2 text-xs text-slate-400">
                      Optional
                    </span>
                  </span>
                  <span className="text-xl text-emerald-600">
                    {additionalOpen ? "−" : "+"}
                  </span>
                </button>
                {additionalOpen && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Estimated Quantity</FieldLabel>
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Example: 20 kg"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <FieldLabel>Issue Category</FieldLabel>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={inputClass}
                      >
                        <option>Plastic Waste</option>
                        <option>Organic Waste</option>
                        <option>Construction Waste</option>
                        <option>Water Pollution</option>
                        <option>Air Pollution</option>
                        <option>E-Waste</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              disabled={processing || analyzed}
              onClick={analyze}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <BrainCircuit className="size-5" />{" "}
              {processing
                ? "Analyzing..."
                : analyzed
                  ? "Report Analyzed"
                  : "Analyze Report"}{" "}
              <Sparkles className="size-4" />
            </button>
          </section>
          <aside className="lg:sticky lg:top-6">
            {processing ? (
              <ProcessingPanel />
            ) : analyzed ? (
              <>
                <AnalysisResults response={result} setResult={setResult} />
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        Everything looks correct?
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Submit your report to GreenVision AI.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={
                      submitting ||
                      !result?.wasteType ||
                      !result?.estimatedWasteKg ||
                      !result?.possibleAction
                    }
                    onClick={submit}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-green-700 px-5 py-4 text-sm font-bold text-white transition hover:from-emerald-700 hover:to-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" /> Submitting
                        Report...
                      </>
                    ) : (
                      <>
                        <Send className="size-5" /> Submit Report
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <BrainCircuit className="size-8" />
                </div>
                <h2 className="mt-5 text-xl font-bold">AI Analysis</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Upload your report and click &quot;Analyze Report&quot; to see
                  AI-generated insights.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                  <AlertTriangle className="size-4" /> Results are editable
                  before submission
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
