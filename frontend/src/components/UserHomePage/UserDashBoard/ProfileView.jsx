import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Upload, Camera} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function ProfileView({setLogout, user, setUser}) {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const previewUrlRef = useRef(null);

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        city: "",
        area: "",
    });

    // Synchronize form with the latest user data
    useEffect(() => {
        setForm({
            name: user?.name || "",
            phone: user?.phone || "",
            email: user?.email || "",
            city: user?.location?.city || "",
            area: user?.location?.area || "",
        });
    }, [user]);

    // Clean up preview URL
    useEffect(() => {
        return () => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
            }
        };
    }, []);

    // Logout
    const handleLogout = () => {
        if (typeof setLogout === "function") {
            setLogout(true);
            return;
        }

        localStorage.removeItem("token");
        window.dispatchEvent(new Event("auth:changed"));
        navigate("/login");
    };

    // Handle profile form changes
    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    // Open image picker
    const handlePhotoClick = () => {
        setError("");
        setSuccess("");
        fileInputRef.current?.click();
    };

    // Select and validate image
    const handlePhotoSelect = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setError("");
        setSuccess("");

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            setError("Please select a JPG, PNG, or WEBP image.");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        // Remove previous temporary preview
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
        }

        const previewURL = URL.createObjectURL(file);

        previewUrlRef.current = previewURL;

        setSelectedFile(file);
        setPreview(previewURL);
    };

    // Upload profile image
    const handlePhotoUpload = async () => {
        if (!selectedFile) {
            setError("Please select an image first.");
            return;
        }

        try {
            setUploadingPhoto(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Please login again.");
            }

            const formData = new FormData();

            formData.append("profilePicture", selectedFile);

            const response = await axios.patch("http://localhost:5001/update-profile-picture", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedUser = response.data?.user;

            if (!updatedUser?.profilePicture?.url) {
                throw new Error("Server did not return the updated profile picture.");
            }

            // Update parent dashboard user state
            setUser(updatedUser);

            setSelectedFile(null);
            setPreview("");

            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setSuccess("Profile photo updated successfully.");
        } catch (error) {
            console.error("Profile Photo Upload Error:", error);

            setError(error.response?.data?.message || error.message || "Unable to upload profile photo.");
        } finally {
            setUploadingPhoto(false);
        }
    };

    // Cancel selected photo
    const handleCancelPhoto = () => {
        setSelectedFile(null);
        setPreview("");

        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setError("");
    };

    // Update profile information
    const handleSave = async () => {
        setError("");
        setSuccess("");

        if (!form.name.trim() || !form.email.trim()) {
            setError("Name and email are required.");
            return;
        }

        try {
            setSaving(true);

            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Please login again.");
            }

            const response = await axios.patch(
                "http://localhost:5001/update-user",
                {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    city: form.city.trim(),
                    area: form.area.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const updatedUser = response.data.user;

            if (!updatedUser) {
                throw new Error("Server did not return the updated user.");
            }

            setUser(updatedUser);
            setEditing(false);

            setSuccess("Profile updated successfully.");
        } catch (error) {
            console.error("Update Profile Error:", error);

            setError(error.response?.data?.message || error.message || "Unable to update your profile.");
        } finally {
            setSaving(false);
        }
    };

    // Cancel profile editing
    const handleCancel = () => {
        setForm({
            name: user?.name || "",
            phone: user?.phone || "",
            email: user?.email || "",
            city: user?.location?.city || "",
            area: user?.location?.area || "",
        });

        setEditing(false);
        setError("");
        setSuccess("");
    };

    const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "Not available";

    const displayedPhoto = preview || user?.profilePicture?.url || "/default-avatar.png";

    return (
        <div className="p-5 md:p-8">
            <SectionTitle title="My Profile" subtitle="Manage your citizen profile and personal information." />

            <div className="max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                {/* Profile Header */}
                <div className="flex flex-wrap items-center gap-5 border-b border-slate-100 pb-7">
                    <div className="relative">
                        <img
                            src={displayedPhoto}
                            alt="Profile"
                            className="h-[72px] w-[72px] rounded-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={handlePhotoClick}
                            disabled={uploadingPhoto}
                            title="Choose a new profile photo"
                            className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow hover:bg-emerald-700 disabled:opacity-50"
                        >
                            <Camera size={14} />
                        </button>
                    </div>

                    <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-bold text-slate-900">{user?.name || "User"}</h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {user?.location?.city || "City not added"} · {user?.role || "Citizen"}
                        </p>

                        <button
                            type="button"
                            onClick={handlePhotoClick}
                            disabled={uploadingPhoto}
                            className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-50"
                        >
                            <Upload size={14} />
                            Change Photo
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {editing && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={
                                editing
                                    ? handleSave
                                    : () => {
                                          setError("");
                                          setSuccess("");
                                          setEditing(true);
                                      }
                            }
                            disabled={saving}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : editing ? "Save Changes" : "Edit Profile"}
                        </button>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={saving || uploadingPhoto}
                            className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Hidden Image Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoSelect}
                    className="hidden"
                />

                {/* Image Preview and Upload */}
                {selectedFile && (
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-emerald-900">{selectedFile.name}</p>

                            <p className="mt-1 text-xs text-emerald-700">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleCancelPhoto}
                                disabled={uploadingPhoto}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handlePhotoUpload}
                                disabled={uploadingPhoto}
                                className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {uploadingPhoto ? "Uploading..." : "Upload Photo"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Feedback Messages */}
                {error && <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</p>}

                {success && <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-600">{success}</p>}

                {/* Profile Fields */}
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    {[
                        ["Full Name", "name"],
                        ["Email", "email"],
                        ["Phone Number", "phone"],
                        ["City", "city"],
                        ["Area / Location", "area"],
                    ].map(([label, field]) => (
                        <label key={field} className="text-sm font-semibold text-slate-600">
                            {label}

                            <input
                                name={field}
                                type={field === "email" ? "email" : "text"}
                                value={form[field]}
                                onChange={handleChange}
                                disabled={!editing || saving}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-800 outline-none focus:border-emerald-400 disabled:opacity-80"
                            />
                        </label>
                    ))}

                    <label className="text-sm font-semibold text-slate-600">
                        Member Since
                        <input
                            value={memberSince}
                            disabled
                            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-normal text-slate-500"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
