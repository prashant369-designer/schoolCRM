import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CreditCard,
  GraduationCap,
  MailOpen,
  Megaphone,
  MoreVertical,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

const categories = [
  "All",
  "Fees",
  "Exam",
  "Event",
  "Attendance",
  "Result",
  "Announcement",
  "Security",
];

const priorityStyles = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const categoryStyles = {
  Fees: "bg-purple-50 text-purple-700",
  Exam: "bg-blue-50 text-blue-700",
  Event: "bg-indigo-50 text-indigo-700",
  Attendance: "bg-red-50 text-red-700",
  Result: "bg-emerald-50 text-emerald-700",
  Announcement: "bg-orange-50 text-orange-700",
  Security: "bg-slate-100 text-slate-700",
};

export default function NotificationUI() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const unreadCount = items.filter((item) => !item.isRead).length;
  const readCount = items.filter((item) => item.isRead).length;

  const filteredNotifications = useMemo(() => {
    return items.filter((item) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "unread" && !item.isRead) ||
        (activeTab === "read" && item.isRead);

      const categoryMatch =
        selectedCategory === "All" || item.category === selectedCategory;

      const searchMatch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      return tabMatch && categoryMatch && searchMatch;
    });
  }, [items, activeTab, selectedCategory, searchTerm]);

  const groupedNotifications = useMemo(() => {
    return filteredNotifications.reduce((groups, item) => {
      if (!groups[item.date]) groups[item.date] = [];
      groups[item.date].push(item);
      return groups;
    }, {});
  }, [filteredNotifications]);

  const markAllAsRead = () => {
    setItems((current) => current.map((item) => ({ ...item, isRead: true })));
  };

  const toggleRead = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isRead: !item.isRead } : item,
      ),
    );
  };

  const deleteNotification = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };
  const base_url = import.meta.env.VITE_API_URL;  


  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get(
          `${base_url}/notifications/getnotification`,
        );

        const formattedData = res.data.map((item) => ({
          id: item.notification_id,
          title: item.notification_title,
          message: item.notification_description,
          category: item.notification_motive,
          priority: item.priority_level,
          time: new Date(item.created_at).toLocaleString(),
          date: "Today",
          isRead: false,
          icon: getNotificationIcon(item.notification_motive),
        }));

        setItems(formattedData);
      } catch (error) {
        console.log("Notification fetch error:", error);
      }
    };

    getNotifications();
  }, []);

  const getNotificationIcon = (motive) => {
    switch (motive) {
      case "Fees":
        return CreditCard;
      case "Exam":
        return BookOpenCheck;
      case "Event":
        return CalendarDays;
      case "Attendance":
        return AlertTriangle;
      case "Result":
        return CheckCircle2;
      case "Announcement":
        return Megaphone;
      case "Security":
        return ShieldCheck;
      default:
        return Bell;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <button className="mt-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50">
                <ArrowLeft size={20} />
              </button>

              <div>
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-indigo-600">
                  <GraduationCap size={16} /> School ERP Alerts
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Notifications
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  View school updates, fee reminders, exam alerts and attendance
                  notifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:min-w-107">
              <HeaderStat label="Total" value={items.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
        <aside className="hidden space-y-6 lg:block">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <BellRing size={24} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Notification Center
                </h2>
                <p className="text-sm text-slate-500">Manage alerts easily</p>
              </div>
            </div>

            <div className="space-y-2">
              <TabButton
                label="All Notifications"
                count={items.length}
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${
                    selectedCategory === category
                      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{category}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {category === "All"
                      ? items.length
                      : items.filter((item) => item.category === category)
                          .length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 text-indigo-900 shadow-sm">
            <div className="flex items-start gap-3">
              <Settings className="mt-0.5 shrink-0" size={22} />
              <div>
                <h3 className="font-bold">Notification Settings</h3>
                <p className="mt-1 text-sm leading-6">
                  Enable SMS, email and WhatsApp alerts from profile settings.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 lg:hidden"
                >
                  <ChevronDown size={18} /> Filters
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
              <MobileTab
                label="All"
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              />
              <MobileTab
                label={`Unread ${unreadCount}`}
                active={activeTab === "unread"}
                onClick={() => setActiveTab("unread")}
              />
              <MobileTab
                label={`Read ${readCount}`}
                active={activeTab === "read"}
                onClick={() => setActiveTab("read")}
              />
            </div>
          </div>

          <div className="space-y-6">
            {Object.keys(groupedNotifications).map((group) => (
              <div key={group}>
                <div className="mb-3 flex items-center gap-3">
                  <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">
                    {group}
                  </h2>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="space-y-3">
                  {groupedNotifications[group].map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onToggleRead={() => toggleRead(notification.id)}
                      onDelete={() => deleteNotification(notification.id)}
                    />
                  ))}
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
                  <Bell size={30} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  No notifications found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search keyword, tab or category filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            onClick={() => setShowMobileFilter(false)}
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close filter"
          />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Filter Notifications
              </h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="rounded-xl border border-slate-200 p-2"
              >
                <X size={20} />
              </button>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">
                Category
              </span>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 outline-none"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>

            <button
              onClick={() => setShowMobileFilter(false)}
              className="mt-5 w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function NotificationCard({ notification, onToggleRead, onDelete }) {
  const Icon = notification.icon;

  return (
    <article
      className={`rounded-3xl border p-5 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/30 ${
        notification.isRead
          ? "border-slate-200 bg-white"
          : "border-indigo-200 bg-indigo-50/40"
      }`}
    >
      <div className="flex gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            categoryStyles[notification.category] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          <Icon size={23} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-950">
                  {notification.title}
                </h3>
                {!notification.isRead && (
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                )}
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {notification.message}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
              {notification.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${priorityStyles[notification.priority]}`}
            >
              {notification.priority} Priority
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              <Clock3 size={13} /> {notification.time}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function HeaderStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-xl font-black text-slate-950">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

function TabButton({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span>{label}</span>
      <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-600 ring-1 ring-slate-200">
        {count}
      </span>
    </button>
  );
}

function MobileTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {label}
    </button>
  );
}
