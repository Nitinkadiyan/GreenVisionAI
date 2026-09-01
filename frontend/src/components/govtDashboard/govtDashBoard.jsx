"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Filter,
  Home,
  Leaf,
  Map,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Target,
  UserRound,
  Users,
  X,
  MapPin,
  Mail,
  Phone,
  Save,
  ChevronRight,
} from "lucide-react";

const STATUSES = [
  "Pending review",
  "In progress",
  "Assigned",
  "Resolved",
  "Accepted",
  "Volunteer initiated",
];
const PEOPLE = [
  {
    id: "VOL-01",
    name: "Maya Chen",
    role: "Volunteer lead",
    district: "North District",
    availability: "On task",
    tasks: ["CL-102 · Riverbend Park debris removal"],
    total: 28,
    phone: "+1 555 0101",
    email: "maya.chen@example.org",
    joined: "March 2024",
    bio: "Coordinates neighborhood cleanup crews and park restoration teams.",
  },
  {
    id: "VOL-02",
    name: "Daniel Okafor",
    role: "Water quality volunteer",
    district: "East District",
    availability: "On task",
    tasks: ["CL-101 · East Creek containment inspection"],
    total: 19,
    phone: "+1 555 0102",
    email: "daniel.okafor@example.org",
    joined: "June 2024",
    bio: "Monitors waterways and documents changes in creek health.",
  },
  {
    id: "VOL-03",
    name: "Priya Nair",
    role: "Community reporter",
    district: "Central District",
    availability: "Available",
    tasks: ["CL-098 · Tree replacement survey"],
    total: 14,
    phone: "+1 555 0103",
    email: "priya.nair@example.org",
    joined: "January 2025",
    bio: "Leads local habitat surveys and volunteer education.",
  },
  {
    id: "VOL-04",
    name: "Lena Ortiz",
    role: "Neighborhood coordinator",
    district: "West District",
    availability: "On task",
    tasks: ["CL-099 · Stormwater drain clearance"],
    total: 34,
    phone: "+1 555 0104",
    email: "lena.ortiz@example.org",
    joined: "August 2023",
    bio: "Connects residents with practical flood-prevention projects.",
  },
  {
    id: "VOL-05",
    name: "Jon Bell",
    role: "Air quality volunteer",
    district: "South District",
    availability: "Available",
    tasks: [],
    total: 22,
    phone: "+1 555 0105",
    email: "jon.bell@example.org",
    joined: "October 2024",
    bio: "Supports air quality observations around industrial corridors.",
  },
];
const REPORTS = [
  [
    "GV-2408",
    "Illegal dumping near Riverbend Park",
    "North District",
    "Waste",
    "Critical",
    "Pending review",
    "Maya Chen",
  ],
  [
    "GV-2407",
    "Oil sheen observed on East Creek",
    "East District",
    "Water quality",
    "High",
    "In progress",
    "Daniel Okafor",
  ],
  [
    "GV-2406",
    "Unpermitted tree removal",
    "Central District",
    "Deforestation",
    "Medium",
    "Assigned",
    "Priya Nair",
  ],
  [
    "GV-2405",
    "Excessive smoke from industrial site",
    "South District",
    "Air quality",
    "High",
    "Resolved",
    "Jon Bell",
  ],
  [
    "GV-2404",
    "Blocked stormwater drain",
    "West District",
    "Infrastructure",
    "Low",
    "Accepted",
    "Lena Ortiz",
  ],
  [
    "GV-2403",
    "Community garden compost overflow",
    "South District",
    "Waste",
    "Medium",
    "Volunteer initiated",
    "Maya Chen",
  ],
  [
    "GV-2402",
    "Fish distress reported at Mill Pond",
    "East District",
    "Water quality",
    "Critical",
    "Pending review",
    "Daniel Okafor",
  ],
  [
    "GV-2401",
    "Damaged native planting area",
    "Central District",
    "Habitat",
    "Low",
    "In progress",
    "Priya Nair",
  ],
].map(([id, title, location, type, priority, status, reporter], i) => ({
  id,
  title,
  location,
  type,
  priority,
  status,
  reporter,
  submitted: `${18 + i * 11} min ago`,
}));
const TASKS = [
  {
    id: "CL-102",
    title: "Riverbend Park debris removal",
    location: "North District",
    assignee: "Maya Chen",
    due: "2026-08-29",
    status: "Awaiting review",
    source: "GV-2408",
    progress: 100,
  },
  {
    id: "CL-101",
    title: "East Creek containment inspection",
    location: "East District",
    assignee: "Daniel Okafor",
    due: "2026-08-28",
    status: "In progress",
    source: "GV-2407",
    progress: 62,
  },
  {
    id: "CL-099",
    title: "Stormwater drain clearance",
    location: "West District",
    assignee: "Lena Ortiz",
    due: "2026-08-27",
    status: "Completed",
    source: "GV-2404",
    progress: 100,
  },
  {
    id: "CL-098",
    title: "Tree replacement survey",
    location: "Central District",
    assignee: "Priya Nair",
    due: "2026-09-02",
    status: "Assigned",
    source: "GV-2406",
    progress: 18,
  },
];
const NAV = [
  ["Overview", Home],
  ["Reports", FileCheck2],
  ["Cleanup Tasks", ClipboardCheck],
  ["Completion Reviews", ShieldCheck],
  ["Environmental Map", Map],
  ["Analytics", Activity],
  ["Users & Contributors", Users],
  ["My Profile", UserRound],
  ["Settings", Settings],
];
const tone = (v) =>
  ["Critical"].includes(v)
    ? "red"
    : ["High", "Pending review", "Awaiting review"].includes(v)
      ? "amber"
      : ["Resolved", "Accepted", "Completed"].includes(v)
        ? "green"
        : "blue";
function Badge({ children }) {
  const c = tone(children);
  return (
    <span
      className={`rounded-full bg-${c}-50 px-2.5 py-1 text-xs font-semibold text-${c}-700 dark:bg-${c}-950 dark:text-${c}-300`}
    >
      {children}
    </span>
  );
}
function Title({ eyebrow, children, action }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold">{children}</h2>
      </div>
      {action}
    </div>
  );
}
function Empty({
  title,
  text = "Sample operational data will appear here as your team works.",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <Activity className="mx-auto text-primary" size={28} />
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export default function GovernmentDashboard() {
  const [active, setActive] = useState("Overview"),
    [dark, setDark] = useState(false),
    [drawer, setDrawer] = useState(false),
    [reports, setReports] = useState(REPORTS),
    [tasks, setTasks] = useState(TASKS),
    [people, setPeople] = useState(PEOPLE),
    [query, setQuery] = useState(""),
    [tab, setTab] = useState("All"),
    [selectedReport, setSelectedReport] = useState(null),
    [selectedPerson, setSelectedPerson] = useState(null),
    [modal, setModal] = useState(false),
    [toast, setToast] = useState(""),
    [district, setDistrict] = useState("All districts"),
    [profile, setProfile] = useState({
      name: "Government Officer",
      role: "Environmental Authority",
      district: "Central District",
      email: "officer@greenvision.gov",
      phone: "+1 555 0199",
    }),
    [form, setForm] = useState({
      title: "",
      location: "",
      assignee: "Maya Chen",
      due: "",
      source: "",
    });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  const notify = (t) => {
      setToast(t);
      setTimeout(() => setToast(""), 2600);
    },
    go = (x) => {
      setActive(x);
      setDrawer(false);
    };
  const visible = useMemo(
    () =>
      reports.filter(
        (r) =>
          (tab === "All" || r.status === tab) &&
          `${r.id} ${r.title} ${r.location} ${r.reporter}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [reports, tab, query],
  );
  const publish = (e) => {
    e.preventDefault();
    if (!form.title || !form.location || !form.due)
      return notify("Title, location, and due date are required");
    const id = `CL-${103 + tasks.length}`;
    setTasks([{ ...form, id, status: "Assigned", progress: 0 }, ...tasks]);
    setForm({
      title: "",
      location: "",
      assignee: "Maya Chen",
      due: "",
      source: "",
    });
    setModal(false);
    notify(`${id} published and assigned to ${form.assignee}`);
  };
  const changeReport = (r, status) => {
    setReports(reports.map((x) => (x.id === r.id ? { ...x, status } : x)));
    setSelectedReport(null);
    notify(`${r.id} moved to ${status}`);
  };
  const review = (t, accepted) => {
    setTasks(
      tasks.map((x) =>
        x.id === t.id
          ? { ...x, status: accepted ? "Accepted" : "Needs rework" }
          : x,
      ),
    );
    notify(
      accepted ? `${t.id} completion accepted` : `${t.id} sent back for rework`,
    );
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-card p-5 transition-transform lg:translate-x-0 ${drawer ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf size={22} />
          </div>
          <div>
            <b>GreenVision AI</b>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Government Portal
            </p>
          </div>
          <button
            className="ml-auto lg:hidden"
            onClick={() => setDrawer(false)}
          >
            <X size={19} />
          </button>
        </div>
        <div className="my-6 border-t border-border" />
        <button
          onClick={() => go("My Profile")}
          className="flex w-full items-center gap-3 rounded-xl bg-muted p-3 text-left"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            GO
          </div>
          <div>
            <b className="text-sm">{profile.name}</b>
            <p className="text-xs text-muted-foreground">{profile.role}</p>
          </div>
        </button>
        <p className="mb-2 mt-7 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        <nav className="flex flex-col gap-1">
          {NAV.map(([label, Icon]) => (
            <button
              key={label}
              onClick={() => go(label)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm ${active === label ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Icon size={18} />
              <span className="flex-1">{label}</span>
              {label === "Reports" && reports.length}
              {label === "Cleanup Tasks" && tasks.length}
            </button>
          ))}
        </nav>
      </aside>
      {drawer && (
        <button
          className="fixed inset-0 z-30 bg-foreground/20 lg:hidden"
          onClick={() => setDrawer(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-border bg-background/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setDrawer(true)}>
              <Menu />
            </button>
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3 top-2.5 text-muted-foreground"
                size={17}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports, volunteers, districts"
                className="w-72 rounded-xl border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => notify("You have 3 report updates")}
              className="rounded-xl border border-border bg-card p-2.5 text-muted-foreground"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="rounded-xl border border-border bg-card p-2.5 text-primary"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => go("My Profile")}
              className="hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold sm:flex"
            >
              <div className="flex size-7 items-center justify-center rounded-full bg-accent text-xs text-primary">
                GO
              </div>
              {profile.name}
            </button>
          </div>
        </header>
        <div className="mx-auto max-w-375 p-5 md:p-8">
          {active === "Overview" && (
            <Overview
              reports={reports}
              tasks={tasks}
              go={go}
              setModal={setModal}
              setSelected={setSelectedReport}
              people={people}
            />
          )}{" "}
          {active === "Reports" && (
            <Reports
              reports={reports}
              visible={visible}
              tab={tab}
              setTab={setTab}
              setSelected={setSelectedReport}
            />
          )}{" "}
          {active === "Cleanup Tasks" && (
            <Tasks tasks={tasks} setModal={setModal} />
          )}{" "}
          {active === "Completion Reviews" && (
            <Reviews tasks={tasks} review={review} />
          )}{" "}
          {active === "Users & Contributors" && (
            <Contributors
              people={people}
              query={query}
              setSelected={setSelectedPerson}
            />
          )}{" "}
          {active === "Environmental Map" && (
            <EnvironmentalMap
              reports={reports}
              tasks={tasks}
              district={district}
              setDistrict={setDistrict}
              setSelected={setSelectedReport}
            />
          )}{" "}
          {active === "Analytics" && (
            <Analytics reports={reports} tasks={tasks} people={people} />
          )}{" "}
          {active === "My Profile" && (
            <Profile
              profile={profile}
              setProfile={setProfile}
              notify={notify}
            />
          )}{" "}
          {active === "Settings" && (
            <SettingsView dark={dark} setDark={setDark} notify={notify} />
          )}
        </div>
      </main>
      {selectedReport && (
        <ReportModal
          report={selectedReport}
          close={() => setSelectedReport(null)}
          change={changeReport}
        />
      )}{" "}
      {selectedPerson && (
        <PersonModal
          person={selectedPerson}
          close={() => setSelectedPerson(null)}
          setSelected={setSelectedReport}
        />
      )}{" "}
      {modal && (
        <TaskModal
          form={form}
          setForm={setForm}
          reports={reports}
          close={() => setModal(false)}
          publish={publish}
        />
      )}{" "}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-60 -translate-x-1/2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
function Overview({ reports, tasks, go, setModal, setSelected, people }) {
  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
            AI-assisted operations
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Good morning, Officer.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review reports, coordinate volunteers, and publish cleanup work from
            one place.
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="mr-2 inline" size={17} />
          New cleanup task
        </button>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Reports this month", "248", FileCheck2],
          [
            "Pending review",
            reports.filter((r) => r.status === "Pending review").length,
            ShieldCheck,
          ],
          [
            "Active tasks",
            tasks.filter((t) => ["In progress", "Assigned"].includes(t.status))
              .length,
            ClipboardCheck,
          ],
          [
            "Volunteers active",
            people.filter((p) => p.tasks.length).length,
            Users,
          ],
        ].map(([l, v, I]) => (
          <div
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            key={l}
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
              <I size={19} />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">{l}</p>
            <p className="mt-1 text-2xl font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <section>
          <Title
            eyebrow="Needs attention"
            action={
              <button
                onClick={() => go("Reports")}
                className="text-sm font-semibold text-primary"
              >
                View all
              </button>
            }
          >
            Recent reports
          </Title>
          <div className="flex flex-col gap-3">
            {reports.slice(0, 4).map((r) => (
              <button
                onClick={() => setSelected(r)}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left"
                key={r.id}
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <FileCheck2 size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <b className="block truncate">{r.title}</b>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.id} · {r.location} · {r.reporter}
                  </p>
                </div>
                <Badge>{r.status}</Badge>
              </button>
            ))}
          </div>
        </section>
        <section>
          <Title eyebrow="Field pulse">Volunteer activity</Title>
          <div className="flex flex-col gap-3">
            {people.slice(0, 4).map((p) => (
              <button
                onClick={() => go("Users & Contributors")}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left"
                key={p.id}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {p.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <div className="flex-1">
                  <b>{p.name}</b>
                  <p className="text-xs text-muted-foreground">
                    {p.tasks[0] || "Available for a new task"}
                  </p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
function Reports({ reports, visible, tab, setTab, setSelected }) {
  return (
    <>
      <Title
        eyebrow="Intelligence feed"
        action={
          <span className="text-sm text-muted-foreground">
            {visible.length} shown
          </span>
        }
      >
        Environmental reports
      </Title>
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", ...STATUSES].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-3 py-2 text-xs font-semibold ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}
          >
            {t}{" "}
            <span className="ml-1 opacity-70">
              {t === "All"
                ? reports.length
                : reports.filter((r) => r.status === t).length}
            </span>
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {visible.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm hover:border-primary/50 md:flex-row md:items-center"
          >
            <div className="flex-1">
              <b>{r.title}</b>
              <p className="mt-1 text-xs text-muted-foreground">
                {r.id} · {r.location} · {r.type} · initiated by {r.reporter}
              </p>
            </div>
            <Badge>{r.priority}</Badge>
            <Badge>{r.status}</Badge>
          </button>
        ))}
        {!visible.length && <Empty title="No reports match this view" />}
      </div>
    </>
  );
}
function Tasks({ tasks, setModal }) {
  return (
    <>
      <Title
        eyebrow="Field operations"
        action={
          <button
            onClick={() => setModal(true)}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="mr-2 inline" size={17} />
            New cleanup task
          </button>
        }
      >
        Cleanup tasks
      </Title>
      <div className="grid gap-4 lg:grid-cols-2">
        {tasks.map((t) => (
          <div
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            key={t.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {t.id}
                </p>
                <h3 className="mt-2 font-bold">{t.title}</h3>
              </div>
              <Badge>{t.status}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {t.location} · <b className="text-foreground">{t.assignee}</b>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Due {t.due} · Source {t.source || "Officer created"}
            </p>
            <div className="mt-4 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${t.progress}%` }}
              />
            </div>
            <p className="mt-2 text-right text-xs text-muted-foreground">
              {t.progress}% complete
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
function Reviews({ tasks, review }) {
  const list = tasks.filter((t) =>
    ["Awaiting review", "Completed"].includes(t.status),
  );
  return (
    <>
      <Title eyebrow="Quality control">Completion reviews</Title>
      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((t) => (
          <div
            className="rounded-2xl border border-border bg-card p-5"
            key={t.id}
          >
            <Badge>{t.status}</Badge>
            <h3 className="mt-3 font-bold">{t.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submitted by {t.assignee} · {t.id}
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => review(t, true)}
                className="flex-1 rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
              >
                <Check className="mr-1 inline" size={15} />
                Accept completion
              </button>
              <button
                onClick={() => review(t, false)}
                className="rounded-xl border border-border px-3 py-2 text-sm font-semibold"
              >
                Send back
              </button>
            </div>
          </div>
        ))}
      </div>
      {!list.length && <Empty title="No completion reviews pending" />}
    </>
  );
}
function Contributors({ people, query, setSelected }) {
  const list = people.filter((p) =>
    `${p.name} ${p.role} ${p.district}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <Title
        eyebrow="Community network"
        action={
          <span className="text-sm text-muted-foreground">
            {list.length} sample volunteers
          </span>
        }
      >
        Users & contributors
      </Title>
      <div className="mb-5 flex flex-wrap gap-2">
        <Badge>
          On task: {people.filter((p) => p.availability === "On task").length}
        </Badge>
        <Badge>
          Available:{" "}
          {people.filter((p) => p.availability === "Available").length}
        </Badge>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          Search with the header
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <button
            onClick={() => setSelected(p)}
            className="rounded-2xl border border-border bg-card p-5 text-left shadow-sm hover:border-primary/50"
            key={p.id}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {p.name
                  .split(" ")
                  .map((x) => x[0])
                  .join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold">{p.name}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {p.role}
                </p>
              </div>
              <Badge>{p.availability}</Badge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">
                  Reports resolved
                </p>
                <b className="text-lg">{p.total}</b>
              </div>
              <div className="rounded-xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Active tasks</p>
                <b className="text-lg">{p.tasks.length}</b>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">
              Working on
            </p>
            <p className="mt-2 text-sm font-medium">
              {p.tasks[0] || "Ready for assignment"}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
function EnvironmentalMap({
  reports,
  tasks,
  district,
  setDistrict,
  setSelected,
}) {
  const districts = [
    "All districts",
    "North District",
    "East District",
    "Central District",
    "South District",
    "West District",
  ];
  const points = [
    { x: 25, y: 26, d: "North District", r: reports[0] },
    { x: 76, y: 32, d: "East District", r: reports[1] },
    { x: 48, y: 50, d: "Central District", r: reports[2] },
    { x: 65, y: 74, d: "South District", r: reports[3] },
    { x: 22, y: 70, d: "West District", r: reports[4] },
  ].filter((p) => district === "All districts" || p.d === district);
  return (
    <>
      <Title
        eyebrow="Spatial intelligence"
        action={
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-xl border border-input bg-card px-3 py-2 text-sm"
          >
            {districts.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        }
      >
        Environmental map
      </Title>
      <div className="grid gap-5 xl:grid-cols-[1.5fr_.5fr]">
        <div className="relative min-h-125 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
          <div className="absolute inset-5 rounded-2xl bg-[linear-gradient(135deg,transparent_49%,hsl(var(--border))_50%,transparent_51%),linear-gradient(45deg,transparent_49%,hsl(var(--border))_50%,transparent_51%)] bg-size-[80px_80px] opacity-50" />
          <div className="absolute left-[34%] top-[10%] h-[78%] w-[34%] rotate-12 rounded-[45%] border-2 border-primary/30 bg-accent/40" />
          <div className="absolute left-[45%] top-[18%] h-[60%] w-1 rotate-22 bg-primary/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto text-primary" size={28} />
              <p className="mt-2 text-sm font-bold">
                GreenVision district monitor
              </p>
              <p className="text-xs text-muted-foreground">
                Click a live incident marker
              </p>
            </div>
          </div>
          {points.map((p) => (
            <button
              key={p.r.id}
              onClick={() => setSelected(p.r)}
              title={p.r.title}
              className="absolute z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground shadow-lg"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <MapPin size={17} />
            </button>
          ))}
          <div className="absolute bottom-5 left-5 rounded-xl border border-border bg-card/95 p-3 text-xs shadow">
            <p className="mb-2 font-bold">Environmental health</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-primary" />
                Healthy
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-amber-500" />
                Watch
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-red-500" />
                Critical
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Live coverage
            </p>
            <p className="mt-2 text-3xl font-bold">{points.length}</p>
            <p className="text-sm text-muted-foreground">
              active district markers
            </p>
            <div className="my-5 border-t border-border" />
            <p className="text-sm font-semibold">Field tasks nearby</p>
            <div className="mt-3 flex flex-col gap-3">
              {tasks.slice(0, 3).map((t) => (
                <div key={t.id} className="rounded-xl bg-muted p-3">
                  <p className="text-xs text-primary">{t.id}</p>
                  <p className="mt-1 text-sm font-semibold">{t.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t.location} · {t.assignee}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-accent p-5">
            <p className="text-sm font-bold text-primary">Map note</p>
            <p className="mt-2 text-sm leading-6 text-accent-foreground">
              Sample coordinates reflect the five service districts and connect
              directly to seeded reports.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
function Analytics({ reports, tasks, people }) {
  const counts = STATUSES.map((s) => [
    s,
    reports.filter((r) => r.status === s).length,
  ]);
  return (
    <>
      <Title eyebrow="Performance center">Analytics</Title>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Resolution rate</p>
          <b className="mt-2 block text-3xl">86%</b>
          <div className="mt-4 h-2 rounded-full bg-muted">
            <div className="h-2 w-[86%] rounded-full bg-primary" />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Tasks completed</p>
          <b className="mt-2 block text-3xl">
            {tasks.filter((t) => t.progress === 100).length + 18}
          </b>
          <p className="mt-2 text-xs text-primary">+12% this month</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Volunteer hours</p>
          <b className="mt-2 block text-3xl">342</b>
          <p className="mt-2 text-xs text-primary">
            Across {people.length} contributors
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-bold">Report pipeline</h3>
        <div className="mt-5 flex flex-col gap-4">
          {counts.map(([s, n]) => (
            <div key={s}>
              <div className="flex justify-between text-sm">
                <span>{s}</span>
                <b>{n}</b>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${Math.max(12, n * 14)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function Profile({ profile, setProfile, notify }) {
  const [draft, setDraft] = useState(profile);
  return (
    <>
      <Title eyebrow="Account center">My profile</Title>
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-primary-foreground">
            GO
          </div>
          <h2 className="mt-5 text-2xl font-bold">{profile.name}</h2>
          <p className="mt-1 text-muted-foreground">{profile.role}</p>
          <div className="mt-6 flex flex-col gap-3 text-sm">
            <p>
              <MapPin className="mr-2 inline text-primary" size={16} />
              {profile.district}
            </p>
            <p>
              <Mail className="mr-2 inline text-primary" size={16} />
              {profile.email}
            </p>
            <p>
              <Phone className="mr-2 inline text-primary" size={16} />
              {profile.phone}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-xs text-muted-foreground">Reports reviewed</p>
              <b className="text-xl">128</b>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <p className="text-xs text-muted-foreground">Tasks published</p>
              <b className="text-xl">46</b>
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
          <p className="mt-1 text-sm text-muted-foreground">
            Keep your civic operations profile up to date.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["name", "Full name"],
              ["role", "Role"],
              ["district", "District"],
              ["email", "Email"],
              ["phone", "Phone"],
            ].map(([key, label]) => (
              <label
                className="flex flex-col gap-2 text-sm font-semibold"
                key={key}
              >
                {label}
                <input
                  value={draft[key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [key]: e.target.value })
                  }
                  className="rounded-xl border border-input bg-background px-3 py-2.5 font-normal outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            ))}
          </div>
          <button className="mt-6 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">
            <Save className="mr-2 inline" size={16} />
            Save profile
          </button>
        </form>
      </div>
    </>
  );
}
function SettingsView({ dark, setDark, notify }) {
  return (
    <>
      <Title eyebrow="Workspace preferences">Settings</Title>
      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div>
            <h3 className="font-bold">Appearance</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Use the green-tinted dark mode for low-light field coordination.
            </p>
          </div>
          <button
            onClick={() => {
              setDark(!dark);
              notify(`${dark ? "Light" : "Dark"} mode enabled`);
            }}
            className="rounded-xl border border-border px-4 py-2 text-sm font-semibold"
          >
            {dark ? "Use light mode" : "Use dark mode"}
          </button>
        </div>
        <div className="flex items-center justify-between py-5">
          <div>
            <h3 className="font-bold">Report notifications</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Pending review and volunteer updates
            </p>
          </div>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
            Enabled
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-5">
          <div>
            <h3 className="font-bold">Workspace status</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              All sample services operational
            </p>
          </div>
          <CheckCircle2 className="text-primary" />
        </div>
      </div>
    </>
  );
}
function ReportModal({ report, close, change }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              {report.id}
            </p>
            <h2 className="mt-2 text-xl font-bold">{report.title}</h2>
          </div>
          <button onClick={close} aria-label="Close report">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <b>{report.location}</b>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Initiated by</p>
            <b>{report.reporter}</b>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Category</p>
            <b>{report.type}</b>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge>{report.status}</Badge>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {STATUSES.filter((s) => s !== report.status)
            .slice(0, 3)
            .map((s) => (
              <button
                key={s}
                onClick={() => change(report, s)}
                className="rounded-xl border border-border px-3 py-2 text-sm font-semibold"
              >
                Move to {s}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
function PersonModal({ person, close, setSelected }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
              {person.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {person.id}
              </p>
              <h2 className="text-xl font-bold">{person.name}</h2>
              <p className="text-sm text-muted-foreground">
                {person.role} · {person.district}
              </p>
            </div>
          </div>
          <button onClick={close} aria-label="Close profile">
            <X size={18} />
          </button>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {person.bio}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-muted p-3">
            <Mail className="mb-2 text-primary" size={16} />
            <b className="block truncate">{person.email}</b>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <Phone className="mb-2 text-primary" size={16} />
            <b>{person.phone}</b>
          </div>
        </div>
        <div className="mt-5 rounded-xl border border-border p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">
            Current assignment
          </p>
          <p className="mt-2 text-sm font-semibold">
            {person.tasks[0] || "Available for a new task"}
          </p>
        </div>
        <button
          onClick={close}
          className="mt-5 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Close profile
        </button>
      </div>
    </div>
  );
}
function TaskModal({ form, setForm, reports, close, publish }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4">
      <form
        onSubmit={publish}
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Operations
            </p>
            <h2 className="mt-2 text-xl font-bold">Publish new cleanup task</h2>
          </div>
          <button type="button" onClick={close} aria-label="Close task form">
            <X size={18} />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Task title"
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
          />
          <input
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Location or district"
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={form.assignee}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            >
              {PEOPLE.map((p) => (
                <option key={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              required
              placeholder="Due date (YYYY-MM-DD)"
              value={form.due}
              onChange={(e) => setForm({ ...form, due: e.target.value })}
              className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <select
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
          >
            <option value="">Link source report (optional)</option>
            {reports.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} · {r.title}
              </option>
            ))}
          </select>
          <button className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            Publish cleanup task
          </button>
        </div>
      </form>
    </div>
  );
}
