
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload } from "lucide-react";
import SectionTitle from "./SectionTitle";

export default function ProfileView({ setLogout, user, setUser }) {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    area: "",
  });

  // Sync form whenever the parent updates the user.
  useEffect(() => {
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      city: user?.location?.city || "",
      area: user?.location?.area || "",
    });
  }, [user]);

  const handleLogout = () => {
    if (typeof setLogout === "function") {
      setLogout(true);
      return;
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

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
        throw new Error("The server did not return the updated user.");
      }

      setUser(updatedUser);
      setEditing(false);
      setSuccess("Profile updated successfully.");
    } catch (error) {
      console.error("Update Profile Error:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

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

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN")
    : "Not available";

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="My Profile"
        subtitle="Manage your citizen profile and personal information."
      />

      <div className="max-w-3xl rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">

        {/* Profile Header */}
        <div className="flex flex-wrap items-center gap-5 border-b border-slate-100 pb-7">

          <img
            src={user?.profilePicture?.url || "/default-avatar.png"}
            alt="Profile"
            className="h-[72px] w-[72px] rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900">
              {user?.name || "User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {user?.location?.city || "City not added"} · {user?.role || "Citizen"}
            </p>

            <button
              type="button"
              disabled
              title="Profile photo upload is not implemented yet"
              className="mt-3 flex cursor-not-allowed items-center gap-2 text-xs font-bold text-slate-400"
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
              onClick={editing ? handleSave : () => setEditing(true)}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editing
                  ? "Save Changes"
                  : "Edit Profile"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={saving}
              className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Feedback */}
        {error && (
          <p className="mt-5 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">
            {error}
          </p>
        )}

        {success && (
          <p className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-600">
            {success}
          </p>
        )}

        {/* Profile Fields */}
        <div className="mt-7 grid gap-5 sm:grid-cols-2">

          {[
            ["Full Name", "name"],
            ["Email", "email"],
            ["Phone Number", "phone"],
            ["City", "city"],
            ["Area / Location", "area"],
          ].map(([label, field]) => (
            <label
              key={field}
              className="text-sm font-semibold text-slate-600"
            >
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
