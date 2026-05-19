// src/components/AdminEventCalendar.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  Clock,
  School,
  Search,
  RefreshCcw,
} from "lucide-react";

const AdminEventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    event_title: "",
    event_description: "",
    event_type: "Other",
    event_start_date: "",
    event_end_date: "",
    event_start_time: "",
    event_end_time: "",
    event_location: "",
    organizer_name: "",
    target_audience: "All",
    class_id: "",
    event_color: "#2563EB",
    is_holiday: false,
    status: "Upcoming",
    created_by: 1,
  });

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/events/getevents");
      setEvents(res.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const resetForm = () => {
    setFormData({
      event_title: "",
      event_description: "",
      event_type: "Other",
      event_start_date: "",
      event_end_date: "",
      event_start_time: "",
      event_end_time: "",
      event_location: "",
      organizer_name: "",
      target_audience: "All",
      class_id: "",
      event_color: "#2563EB",
      is_holiday: false,
      status: "Upcoming",
      created_by: 1,
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:3000/api/events/updateevent/${editId}`,
          formData,
        );
        alert("Event updated successfully");
      } else {
        await axios.post(
          "http://localhost:3000/api/events/createevent",
          formData,
        );
        alert("Event created successfully");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.log("Submit error:", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (event) => {
    setEditId(event.event_id);

    setFormData({
      event_title: event.event_title || "",
      event_description: event.event_description || "",
      event_type: event.event_type || "Other",
      event_start_date: event.event_start_date?.split("T")[0] || "",
      event_end_date: event.event_end_date?.split("T")[0] || "",
      event_start_time: event.event_start_time || "",
      event_end_time: event.event_end_time || "",
      event_location: event.event_location || "",
      organizer_name: event.organizer_name || "",
      target_audience: event.target_audience || "All",
      class_id: event.class_id || "",
      event_color: event.event_color || "#2563EB",
      is_holiday: event.is_holiday === 1 || event.is_holiday === true,
      status: event.status || "Upcoming",
      created_by: event.created_by || 1,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/events/deleteevent/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.log("Delete error:", error);
      alert("Delete failed");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Ongoing":
        return "bg-green-50 text-green-700 border-green-200";
      case "Completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const filteredEvents = events.filter((event) =>
    `${event.event_title} ${event.event_type} ${event.status} ${event.target_audience}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalUpcoming = events.filter((e) => e.status === "Upcoming").length;
  const totalHoliday = events.filter(
    (e) => e.is_holiday === 1 || e.is_holiday === true,
  ).length;
  const totalCompleted = events.filter((e) => e.status === "Completed").length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mb-6 rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm">
              <School size={16} />
              School ERP Admin Panel
            </div>
            <h1 className="text-3xl font-bold">Event Calendar Management</h1>
            <p className="mt-2 max-w-2xl text-blue-100">
              Create and manage school holidays, exams, meetings, functions,
              workshops, and class events.
            </p>
          </div>

          <button
            onClick={fetchEvents}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md hover:bg-blue-50"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Total Events</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {events.length}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Upcoming</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-700">
            {totalUpcoming}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Holidays</p>
          <h3 className="mt-2 text-3xl font-bold text-purple-700">
            {totalHoliday}
          </h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="mt-2 text-3xl font-bold text-green-700">
            {totalCompleted}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm border xl:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-700">
              {editId ? <Edit size={22} /> : <Plus size={22} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {editId ? "Update Event" : "Create New Event"}
              </h2>
              <p className="text-sm text-gray-500">
                Fill event details for school calendar.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="event_title"
              placeholder="Event Title"
              value={formData.event_title}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              required
            />

            <textarea
              name="event_description"
              placeholder="Event Description"
              value={formData.event_description}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              rows="3"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <select
                name="event_type"
                value={formData.event_type}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Holiday</option>
                <option>Exam</option>
                <option>Meeting</option>
                <option>Sports</option>
                <option>Function</option>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Class</option>
                <option>Other</option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                name="event_start_date"
                value={formData.event_start_date}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                required
              />

              <input
                type="date"
                name="event_end_date"
                value={formData.event_end_date}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                name="event_start_time"
                value={formData.event_start_time}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />

              <input
                type="time"
                name="event_end_time"
                value={formData.event_end_time}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <input
              type="text"
              name="event_location"
              placeholder="Location"
              value={formData.event_location}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="organizer_name"
              placeholder="Organizer Name"
              value={formData.organizer_name}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <select
                name="target_audience"
                value={formData.target_audience}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option>All</option>
                <option>Students</option>
                <option>Teachers</option>
                <option>Parents</option>
                <option>Staff</option>
              </select>

              <input
                type="text"
                name="class_id"
                placeholder="Class ID optional"
                value={formData.class_id}
                onChange={handleChange}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <label className="text-sm font-medium text-gray-600">
                Event Color
              </label>
              <input
                type="color"
                name="event_color"
                value={formData.event_color}
                onChange={handleChange}
                className="h-9 w-16 cursor-pointer rounded-lg border"
              />
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="is_holiday"
                checked={formData.is_holiday}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Mark as School Holiday
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-md hover:bg-blue-800"
              >
                {editId ? <Edit size={18} /> : <Plus size={18} />}
                {editId ? "Update Event" : "Create Event"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl bg-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm border xl:col-span-2">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                All School Events
              </h2>
              <p className="text-sm text-gray-500">
                View, edit, and delete calendar records.
              </p>
            </div>

            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="px-4">Event</th>
                  <th className="px-4">Type</th>
                  <th className="px-4">Date & Time</th>
                  <th className="px-4">Audience</th>
                  <th className="px-4">Status</th>
                  <th className="px-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <tr
                      key={event.event_id}
                      className="rounded-2xl bg-slate-50 shadow-sm transition hover:bg-blue-50"
                    >
                      <td className="rounded-l-2xl px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-11 w-2 rounded-full"
                            style={{
                              backgroundColor: event.event_color || "#2563EB",
                            }}
                          ></span>
                          <div>
                            <p className="font-bold text-gray-900">
                              {event.event_title}
                            </p>
                            <p className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin size={14} />
                              {event.event_location || "No location"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                          {event.event_type}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <p className="flex items-center gap-1">
                          <CalendarDays size={14} />
                          {event.event_start_date?.split("T")[0]}
                        </p>
                        <p className="mt-1 flex items-center gap-1">
                          <Clock size={14} />
                          {event.event_start_time || "--"} -{" "}
                          {event.event_end_time || "--"}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-gray-700">
                          <Users size={15} />
                          {event.target_audience}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(
                            event.status,
                          )}`}
                        >
                          {event.status}
                        </span>
                      </td>

                      <td className="rounded-r-2xl px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="rounded-xl bg-yellow-100 p-2 text-yellow-700 hover:bg-yellow-200"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(event.event_id)}
                            className="rounded-xl bg-red-100 p-2 text-red-700 hover:bg-red-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-gray-500">
                      No events found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.event_id}
                  className="rounded-2xl border bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {event.event_title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {event.event_type}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        event.status,
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={15} />
                      {event.event_start_date?.split("T")[0]}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={15} />
                      {event.event_location || "No location"}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={15} />
                      {event.target_audience}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-100 py-2 font-semibold text-yellow-700"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.event_id)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-100 py-2 font-semibold text-red-700"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-gray-500">No events found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCalendar;
