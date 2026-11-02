
import { Check } from "lucide-react";

export default function Timeline({ report }) {
  const steps = [
    "Report Submitted",
    "AI Analysis Completed",
    "Accepted by Government",
    "Cleanup Task Assigned",
    "Volunteer Accepted",
    "Cleanup In Progress",
    "Completion Submitted",
    "Government Review",
    "Resolved",
  ];

  // Map report statuses to the corresponding timeline step.
  const statusToStep = {
    "pending review": 0,
    "accepted by government": 2,
    "assigned cleanup": 3,
    "cleanup task assigned": 3,
    "volunteer accepted": 4,
    "in progress": 5,
    "cleanup in progress": 5,
    "completion submitted": 6,
    "government review": 7,
    completed: 8,
    resolved: 8,
  };

  const normalizedStatus = report?.status?.trim().toLowerCase();

  const currentStep =
    statusToStep[normalizedStatus] ?? 0;

  // A report is fully completed only when its status is resolved/completed.
  const isCompleted = currentStep === 8;

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="font-bold text-slate-900">
        Government Response
      </h3>

      {!report && (
        <p className="mt-4 text-sm text-slate-500">
          No report information available.
        </p>
      )}

      {report && (
        <div className="mt-5 space-y-0">
          {steps.map((step, index) => {
            const isStepCompleted =
              isCompleted || index <= currentStep;

            const isCurrentStep =
              !isCompleted && index === currentStep;

            return (
              <div key={step} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full ${
                      isStepCompleted
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isStepCompleted ? (
                      <Check size={13} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    )}
                  </span>

                  {index < steps.length - 1 && (
                    <span
                      className={`h-6 w-px ${
                        index < currentStep
                          ? "bg-emerald-200"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>

                <p
                  className={`pb-2 text-sm ${
                    isStepCompleted
                      ? "font-semibold text-slate-700"
                      : "text-slate-400"
                  }`}
                >
                  {step}

                  {isCurrentStep && (
                    <span className="ml-2 text-xs font-medium text-emerald-600">
                      Current
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
  