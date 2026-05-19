// src/components/EventCalendar.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  School,
  Search,
  RefreshCcw,
  X,
  UserRound,
  CheckCircle,
} from "lucide-react";

import "@fullcalendar/daygrid/index.js";
import "@fullcalendar/timegrid/index.js";

const EventCalendar = ({ panelType = "Student" }) => {
  const [events, setEvents] = useState([]);
  const [rawEvents, setRawEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/events/getevents");
      const data = res.data || [];

      setRawEvents(data);

      const formattedEvents = data.map((event) => ({
        id: event.event_id,
        title: event.event_title,
        start: event.event_start_time
          ? `${event.event_start_date.split("T")[0]}T${event.event_start_time}`
          : event.event_start_date.split("T")[0],
        end: event.event_end_time
          ? `${event.event_end_date.split("T")[0]}T${event.event_end_time}`
          : event.event_end_date.split("T")[0],
        backgroundColor: event.event_color || "#2563EB",
        borderColor: event.event_color || "#2563EB",
        extendedProps: event,
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.log("Event fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const event = item.extendedProps;

      const matchSearch =
        `${event.event_title} ${event.event_type} ${event.event_location} ${event.status}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || event.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [events, search, statusFilter]);

  const upcomingCount = rawEvents.filter((e) => e.status === "Upcoming").length;
  const holidayCount = rawEvents.filter(
    (e) => e.is_holiday === 1 || e.is_holiday === true,
  ).length;
  const examCount = rawEvents.filter((e) => e.event_type === "Exam").length;

  const handleEventClick = (info) => {
    setSelectedEvent(info.event.extendedProps);
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

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <style>
        {`
          .fc {
            font-family: inherit;
          }

          .fc .fc-toolbar-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
          }

          .fc .fc-button {
            background: #2563eb;
            border: none;
            border-radius: 10px;
            padding: 8px 12px;
            font-weight: 600;
            text-transform: capitalize;
          }

          .fc .fc-button:hover {
            background: #1d4ed8;
          }

          .fc .fc-button-primary:not(:disabled).fc-button-active {
            background: #1e40af;
          }

          .fc .fc-daygrid-day {
            background: #ffffff;
          }

          .fc .fc-daygrid-day-number {
            color: #334155;
            font-weight: 600;
          }

          .fc .fc-col-header-cell {
            background: #f8fafc;
            padding: 10px 0;
          }

          .fc .fc-col-header-cell-cushion {
            color: #475569;
            font-weight: 700;
          }

          .fc-event {
            border-radius: 8px;
            padding: 3px 6px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            border: none;
          }

          .fc-day-today {
            background: #eff6ff !important;
          }
        `}
      </style>

      <div className="mb-6 rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm">
              <School size={16} />
              School ERP {panelType} Panel
            </div>

            <h1 className="text-3xl font-bold">{panelType} Event Calendar</h1>

            <p className="mt-2 max-w-2xl text-blue-100">
              View school holidays, exams, meetings, sports events, workshops,
              seminars, and class activities in one smart calendar.
            </p>
          </div>

          <button
            onClick={fetchEvents}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md hover:bg-blue-50"
          >
            <RefreshCcw size={18} />
            {loading ? "Loading..." : "Refresh Events"}
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Events</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {rawEvents.length}
          </h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Upcoming</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-700">
            {upcomingCount}
          </h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Holidays</p>
          <h3 className="mt-2 text-3xl font-bold text-purple-700">
            {holidayCount}
          </h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Exams</p>
          <h3 className="mt-2 text-3xl font-bold text-red-700">{examCount}</h3>
        </div>
      </div>

      <div className="mb-6 rounded-3xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              School Academic Calendar
            </h2>
            <p className="text-sm text-gray-500">
              Click any event to view complete details.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search event..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 outline-none focus:border-blue-500 md:w-72"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border bg-white p-4 shadow-sm md:p-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={filteredEvents}
          eventClick={handleEventClick}
          height="75vh"
          nowIndicator={true}
          dayMaxEvents={3}
        />
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div
              className="rounded-t-3xl p-5 text-white"
              style={{
                background:
                  selectedEvent.event_color ||
                  "linear-gradient(to right, #2563eb, #4f46e5)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm opacity-90">
                    {selectedEvent.event_type}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    {selectedEvent.event_title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-full bg-white/20 p-2 hover:bg-white/30"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-semibold ${getStatusStyle(
                    selectedEvent.status,
                  )}`}
                >
                  {selectedEvent.status}
                </span>

                {selectedEvent.is_holiday ? (
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-700">
                    School Holiday
                  </span>
                ) : null}
              </div>

              <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-gray-600">
                {selectedEvent.event_description || "No description available."}
              </p>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <InfoItem
                  icon={<CalendarDays size={18} />}
                  label="Date"
                  value={`${selectedEvent.event_start_date?.split("T")[0]} to ${
                    selectedEvent.event_end_date?.split("T")[0]
                  }`}
                />

                <InfoItem
                  icon={<Clock size={18} />}
                  label="Time"
                  value={`${selectedEvent.event_start_time || "--"} - ${
                    selectedEvent.event_end_time || "--"
                  }`}
                />

                <InfoItem
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={selectedEvent.event_location || "N/A"}
                />

                <InfoItem
                  icon={<UserRound size={18} />}
                  label="Organizer"
                  value={selectedEvent.organizer_name || "N/A"}
                />

                <InfoItem
                  icon={<Users size={18} />}
                  label="Audience"
                  value={selectedEvent.target_audience || "All"}
                />

                <InfoItem
                  icon={<CheckCircle size={18} />}
                  label="Class ID"
                  value={selectedEvent.class_id || "All Classes"}
                />
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-3 w-full rounded-xl bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3 rounded-2xl border bg-white p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium uppercase text-gray-400">{label}</p>
        <p className="mt-1 text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default EventCalendar;
