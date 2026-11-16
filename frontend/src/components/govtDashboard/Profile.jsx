import {useState} from "react";
import {MapPin, Mail, Phone, Save} from "lucide-react";
import axios from "axios";
import {useEffect} from "react";
export default function Profile({profile, setProfile, notify, chooseNav}) {
    const [stats, setStats] = useState({
        totalReportsReviewed: 0,
        totalTasksPublished: 0,
    });
    const [draft, setDraft] = useState({
        name: profile.name,

        city: profile.location?.city,
        email: profile.email,
        phone: profile.phone,
    });
    const getGovernmentStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.get("/volunteer/get-officer-stats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data.stats;
        } catch (error) {
            console.error("Failed to fetch government statistics:", error.response?.data || error.message);

            throw error;
        }
    };

    useEffect(() => {
        const fetchOfficerStats = async () => {
            try {
                const data = await getGovernmentStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch officer stats:", error);
            }
        };

        fetchOfficerStats();

        const interval = setInterval(fetchOfficerStats, 30000);

        return () => clearInterval(interval);
    }, []);
    const saveNewProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(
                "http://localhost:5001/update-user",
                {
                    name: draft.name,
                    city: draft.city,
                    email: draft.email,
                    phone: draft.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const updatedUser = response.data.user;
            console.log(response.data);
            setDraft({
                name: updatedUser.name,
                role: updatedUser.role,
                city: updatedUser.location?.city || "",
                email: updatedUser.email,
                phone: updatedUser.phone,
            });
            setProfile(updatedUser);
            notify("Profile Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="mb-6">
                <p className="text-sm font-semibold text-green-600">Account center</p>
                <h1 className="mt-1 text-3xl font-bold text-slate-900">My profile</h1>
            </div>
            <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
                <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-primary-foreground">
                        {profile?.name?.charAt(0).toUpperCase() || "GO"}
                    </div>
                    <h2 className="mt-5 text-2xl font-bold">{draft.name}</h2>

                    <div className="mt-6 flex flex-col gap-3 text-sm">
                        <p>
                            <MapPin className="mr-2 inline text-primary" size={16} />
                            {draft.city}
                        </p>
                        <p>
                            <Mail className="mr-2 inline text-primary" size={16} />
                            {draft.email}
                        </p>
                        <p>
                            <Phone className="mr-2 inline text-primary" size={16} />
                            {draft.phone}
                        </p>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-muted p-3">
                            <p className="text-xs text-muted-foreground">Reports reviewed</p>
                            <b className="text-xl">{stats.totalReportsReviewed ?? 0}</b>
                        </div>

                        <div className="rounded-xl bg-muted p-3">
                            <p className="text-xs text-muted-foreground">Tasks published</p>
                            <b className="text-xl">{stats.totalTasksPublished ?? 0}</b>
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setProfile(draft);
                        notify("Profile details saved");
                    }}
                    className="rounded-2xl border border-border bg-card p-6"
                >
                    <h3 className="text-lg font-bold">Edit account details</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Keep your civic operations profile up to date.</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {[
                            ["name", "Full name"],
                            ["city", "City"],
                            ["email", "Email"],
                            ["phone", "Phone"],
                        ].map(([key, label]) => (
                            <label className="flex flex-col gap-2 text-sm font-semibold" key={key}>
                                {label}
                                <input
                                    value={draft[key]}
                                    onChange={(e) => setDraft({...draft, [key]: e.target.value})}
                                    className="rounded-xl border border-input bg-background px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-ring"
                                />
                            </label>
                        ))}
                    </div>
                    <button
                        onClick={saveNewProfile}
                        className="mt-6 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                        <Save className="mr-2 inline" size={16} />
                        Save profile
                    </button>
                </form>
            </div>
        </>
    );
}
