
import { useState } from "react";

import {
  ShieldCheck,
  ClipboardCheck,
  Gift,
  CheckCircle2,
  Bell,
} from "lucide-react";

import SectionTitle from "./SectionTitle";

export default function NotificationsView() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Government accepted your report",
      body: "Plastic Waste Report #GV-1024 has been accepted.",
      time: "2 minutes ago",
      unread: true,
      icon: ShieldCheck,
    },
    {
      id: 2,
      title: "Cleanup task assigned",
      body: "You have been assigned a cleanup task near Koramangala.",
      time: "1 hour ago",
      unread: true,
      icon: ClipboardCheck,
    },
    {
      id: 3,
      title: "Reward received",
      body: "You earned ₹500 for completing a cleanup task.",
      time: "Yesterday",
      unread: true,
      icon: Gift,
    },
    {
      id: 4,
      title: "Report resolved",
      body: "Your reported environmental issue has been resolved.",
      time: "2 days ago",
      unread: false,
      icon: CheckCircle2,
    },
  ]);

  // Calculate unread notifications
  const unreadCount = items.filter(
    (notification) => notification.unread
  ).length;

  // Mark individual notification as read
  const markAsRead = (id) => {
    setItems((currentItems) =>
      currentItems.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setItems((currentItems) =>
      currentItems.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  return (
    <div className="p-5 md:p-8">
      <SectionTitle
        title="Notifications"
        subtitle="Stay updated on your reports and cleanup activities."
        action={unreadCount > 0 ? "Mark all as read" : undefined}
        onAction={markAllAsRead}
      />

      {/* Notification Summary */}
      <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
        <Bell size={16} className="text-emerald-600" />

        <span>
          {unreadCount} unread notification
          {unreadCount !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="max-w-3xl space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
            <Bell
              size={32}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No notifications yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Updates about your reports and cleanup activities will appear here.
            </p>
          </div>
        ) : (
          items.map((notification) => {
            const Icon = notification.icon;

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => markAsRead(notification.id)}
                className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition hover:border-emerald-200 ${
                  notification.unread
                    ? "border-emerald-100 bg-emerald-50/50"
                    : "border-slate-100 bg-white"
                }`}
              >
                {/* Notification Icon */}
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                    notification.unread
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon size={18} />
                </span>

                {/* Notification Content */}
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap justify-between gap-2">
                    <strong className="text-sm text-slate-800">
                      {notification.title}
                    </strong>

                    <small className="text-xs text-slate-400">
                      {notification.time}
                    </small>
                  </span>

                  <span className="mt-1 block text-sm text-slate-500">
                    {notification.body}
                  </span>
                </span>

                {/* Unread Indicator */}
                {notification.unread && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
