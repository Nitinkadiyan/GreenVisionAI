
import { useEffect, useState } from "react";
import {
  MapPin,
  Navigation,
  IndianRupee,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

// Fallback dummy tasks
const dummyTasks = [
  {
    _id: "dummy-1",
    type: "Plastic Waste",
    area: "Sector 12",
    reward: 500,
    priority: "High",
    distance: "2 km Away",
    isDummy: true,
  },
  {
    _id: "dummy-2",
    type: "Construction Debris",
    area: "Sector 27",
    reward: 750,
    priority: "Medium",
    distance: "4 km Away",
    isDummy: true,
  },
  {
    _id: "dummy-3",
    type: "E-Waste Dump",
    area: "Riverfront Road",
    reward: 620,
    priority: "High",
    distance: "6 km Away",
    isDummy: true,
  },
];

export default function Community() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/volunteer/landing-page-tasks?limit=3`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cleanup tasks");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch tasks");
        }

        const backendTasks = data.cleanupTasks || [];

        // Show backend tasks if available.
        // Otherwise, use dummy tasks.
        setTasks(
          backendTasks.length > 0 ? backendTasks : dummyTasks
        );
      } catch (error) {
        console.error("Error fetching cleanup tasks:", error);

        // Fallback if backend is unavailable.
        setTasks(dummyTasks);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
      case "High":
        return "bg-destructive/10 text-destructive";

      case "Medium":
        return "bg-accent/10 text-accent";

      default:
        return "bg-primary/10 text-primary";
    }
  };

  const handleAcceptTask = () => {
    navigate("/login");
  };

  return (
    <section id="community" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Community
          </p>

          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Open cleanup tasks near you
          </h2>
        </Reveal>

        {loading ? (
          <div className="mt-14 flex justify-center py-16">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span className="ml-3 text-muted-foreground">
              Loading cleanup tasks...
            </span>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task, index) => {
              const wasteType = task.isDummy
                ? task.type
                : task.report?.aiAnalysis?.wasteType ||
                  task.report?.description ||
                  "Cleanup Task";

              const location = task.isDummy
                ? task.area
                : task.report?.location?.address ||
                  task.report?.location?.city ||
                  "Location unavailable";

              const priority = task.isDummy
                ? task.priority
                : task.report?.priority || "Medium";

              const reward = task.isDummy
                ? task.reward
                : task.reward?.amount ?? 0;

              return (
                <Reveal key={task._id} delay={index * 0.08}>
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-lift">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                        <Trash2 className="h-5 w-5 text-primary" />
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityStyle(
                          priority
                        )}`}
                      >
                        {priority} Priority
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-foreground">
                      {wasteType}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      {location}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-sm">
                      <span className="flex items-center font-semibold text-foreground">
                        <IndianRupee className="mr-0.5 h-4 w-4 text-primary" />
                        {reward}
                      </span>

                      {task.distance && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Navigation className="h-4 w-4" />
                          {task.distance}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleAcceptTask}
                      className="gradient-primary mt-6 w-full rounded-full py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 group-hover:shadow-lift"
                    >
                      Accept Task
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
