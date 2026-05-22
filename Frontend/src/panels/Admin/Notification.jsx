import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AlertTriangle,
  Bell,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Eye,
  GraduationCap,
  Megaphone,
  Pencil,
  Plus,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
const base_url = import.meta.env.VITE_API_URL;  
const API_URL = `${base_url}/notifications`;

const motives = [
  "All",
  "Fees",
  "Exam",
  "Event",
  "Attendance",
  "Result",
  "Announcement",
  "Security",
];

const priorities = ["Low", "Medium", "High"];

const motiveIcons = {
  Fees: CreditCard,
  Exam: BookOpenCheck,
  Event: CalendarDays,
  Attendance: AlertTriangle,
  Result: CheckCircle2,
  Announcement: Megaphone,
  Security: ShieldCheck,
};

const priorityStyles = {
  High: "bg-red-50 text-red-700 ring-red-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

export default function AdminNotification() {
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMotive, setSelectedMotive] = useState("All");
  const [editId, setEditId] = useState(null);
  const [viewData, setViewData] = useState(null);

  const [formData, setFormData] = useState({
    notification_title: "",
    notification_description: "",
    priority_level: "Medium",
    notification_motive: "Announcement",
  });

  const getNotifications = async () => {
    try {
      const res = await axios.get(`${API_URL}/getnotification`);
      setNotifications(res.data);
    } catch (error) {
      console.log("Get notification error:", error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const motiveMatch =
        selectedMotive === "All" || item.notification_motive === selectedMotive;

      const searchMatch =
        item.notification_title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.notification_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.notification_motive
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return motiveMatch && searchMatch;
    });
  }, [notifications, selectedMotive, searchTerm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      notification_title: "",
      notification_description: "",
      priority_level: "Medium",
      notification_motive: "Announcement",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/updatenotification/${editId}`, formData);
        alert("Notification updated successfully");
      } else {
        await axios.post(`${API_URL}/createnotification`, formData);
        alert("Notification created successfully");
      }

      resetForm();
      getNotifications();
    } catch (error) {
      console.log("Submit notification error:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.notification_id);
    setFormData({
      notification_title: item.notification_title,
      notification_description: item.notification_description,
      priority_level: item.priority_level,
      notification_motive: item.notification_motive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;

    try {
      await axios.delete(`${API_URL}/deletenotification/${id}`);
      getNotifications();
    } catch (error) {
      console.log("Delete notification error:", error);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/getnotificationbyid/${id}`);
      setViewData(res.data);
    } catch (error) {
      console.log("View notification error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <p className="mb-1 flex items-center gap-2 text-sm font-medium text-indigo-600">
            <GraduationCap size={16} /> School ERP Admin Panel
          </p>

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Manage Notifications
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Create, update, view and delete school alerts.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:min-w-96">
              <HeaderStat label="Total" value={notifications.length} />
              <HeaderStat
                label="High"
                value={
                  notifications.filter((n) => n.priority_level === "High")
                    .length
                }
              />
              <HeaderStat
                label="Today"
                value={
                  notifications.filter((n) => {
                    const today = new Date().toDateString();
                    return new Date(n.created_at).toDateString() === today;
                  }).length
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              {editId ? <Pencil size={22} /> : <Plus size={22} />}
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                {editId ? "Edit Notification" : "Create Notification"}
              </h2>
              <p className="text-sm text-slate-500">
                Send alerts to students, teachers or parents.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="notification_title"
              value={formData.notification_title}
              onChange={handleChange}
              placeholder="Notification title"
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            <textarea
              name="notification_description"
              value={formData.notification_description}
              onChange={handleChange}
              placeholder="Notification description"
              required
              rows="5"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            <select
              name="priority_level"
              value={formData.priority_level}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-300 focus:bg-white"
            >
              {priorities.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              name="notification_motive"
              value={formData.notification_motive}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-300 focus:bg-white"
            >
              {motives
                .filter((item) => item !== "All")
                .map((item) => (
                  <option key={item}>{item}</option>
                ))}
            </select>

            <div className="flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700">
                {editId ? <Save size={18} /> : <Plus size={18} />}
                {editId ? "Update Notification" : "Create Notification"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm font-medium outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              <select
                value={selectedMotive}
                onChange={(e) => setSelectedMotive(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-indigo-300"
              >
                {motives.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotifications.map((item) => {
              const Icon = motiveIcons[item.notification_motive] || Bell;

              return (
                <article
                  key={item.notification_id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/30"
                >
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                      <Icon size={23} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <h3 className="font-bold text-slate-950">
                            {item.notification_title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {item.notification_description}
                          </p>
                        </div>

                        <div className="flex shrink-0 gap-2">
                          <button
                            onClick={() => handleView(item.notification_id)}
                            className="rounded-xl border border-slate-200 bg-white p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-xl border border-slate-200 bg-white p-2 text-amber-600 hover:bg-amber-50"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.notification_id)}
                            className="rounded-xl border border-slate-200 bg-white p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                          {item.notification_motive}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${
                            priorityStyles[item.priority_level]
                          }`}
                        >
                          {item.priority_level} Priority
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {filteredNotifications.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <BellRing className="mx-auto text-slate-400" size={35} />
                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  No notifications found
                </h3>
                <p className="text-sm text-slate-500">
                  Create your first school notification.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {viewData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">
                Notification Details
              </h2>
              <button
                onClick={() => setViewData(null)}
                className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <b>Title:</b> {viewData.notification_title}
              </p>
              <p>
                <b>Description:</b> {viewData.notification_description}
              </p>
              <p>
                <b>Priority:</b> {viewData.priority_level}
              </p>
              <p>
                <b>Motive:</b> {viewData.notification_motive}
              </p>
              <p>
                <b>Created:</b> {new Date(viewData.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
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
