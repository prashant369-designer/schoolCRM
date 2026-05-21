import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Repeat,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertCircle,
} from "lucide-react";

const weeklyTimetable = [
  {
    day: "Monday",
    lectures: [
      { time: "08:30 - 09:15", subject: "Mathematics", className: "10th A", room: "Room 204" },
      { time: "10:00 - 10:45", subject: "Science", className: "9th B", room: "Lab 2" },
      { time: "12:30 - 01:15", subject: "Free Lecture", className: "-", room: "Staff Room" },
    ],
  },
  {
    day: "Tuesday",
    lectures: [
      { time: "09:15 - 10:00", subject: "Computer", className: "11th A", room: "Lab 1" },
      { time: "11:00 - 11:45", subject: "Mathematics", className: "10th B", room: "Room 105" },
    ],
  },
  {
    day: "Wednesday",
    lectures: [
      { time: "08:30 - 09:15", subject: "Mathematics", className: "10th A", room: "Room 204" },
      { time: "11:45 - 12:30", subject: "Substitute Lecture", className: "8th C", room: "Room 301" },
    ],
  },
];

const todayLectures = [
  {
    time: "08:30 AM",
    subject: "Mathematics",
    className: "10th A",
    room: "Room 204",
    status: "Completed",
  },
  {
    time: "10:00 AM",
    subject: "Science",
    className: "9th B",
    room: "Lab 2",
    status: "Running",
  },
  {
    time: "12:30 PM",
    subject: "Free Lecture",
    className: "No Class",
    room: "Staff Room",
    status: "Free",
  },
  {
    time: "01:30 PM",
    subject: "Computer",
    className: "11th A",
    room: "Lab 1",
    status: "Upcoming",
  },
];

const upcomingSchedule = [
  {
    title: "Parent Teacher Meeting",
    date: "22 May 2026",
    time: "11:00 AM",
  },
  {
    title: "Math Unit Test",
    date: "25 May 2026",
    time: "09:30 AM",
  },
  {
    title: "Staff Meeting",
    date: "28 May 2026",
    time: "02:00 PM",
  },
];

export default function TeacherTimetable() {
  const [view, setView] = useState("daily");

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Teacher Timetable
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              View daily schedule, weekly timetable, free lectures, classroom details and substitute classes.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-md hover:bg-indigo-50">
            <Plus size={18} />
            Add Substitute
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<CalendarDays />}
          title="Today Lectures"
          value="4"
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<Clock />}
          title="Free Lectures"
          value="1"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<Repeat />}
          title="Substitute"
          value="1"
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          icon={<MapPin />}
          title="Classrooms"
          value="5"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      {/* Controls */}
      <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex gap-3">
            <button
              onClick={() => setView("daily")}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                view === "daily"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              Daily Timetable
            </button>

            <button
              onClick={() => setView("weekly")}
              className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
                view === "weekly"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              Weekly Timetable
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search subject/class..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-64"
              />
            </div>

            <div className="flex gap-2">
              <button className="rounded-2xl bg-slate-100 p-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">
                <ChevronLeft size={18} />
              </button>
              <button className="rounded-2xl bg-slate-100 p-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {view === "daily" ? <DailyTimetable /> : <WeeklyTimetable />}
    </div>
  );
}

function DailyTimetable() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      {/* Daily Lectures */}
      <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Today’s Schedule
        </h2>

        <div className="space-y-4">
          {todayLectures.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-2xl p-3 ${
                      item.status === "Free"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Running"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    <BookOpen size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      {item.subject}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.className} • {item.room}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    {item.time}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Running"
                        ? "bg-orange-100 text-orange-700"
                        : item.status === "Free"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Upcoming Schedule
        </h2>

        <div className="space-y-3">
          {upcomingSchedule.map((item, index) => (
            <div key={index} className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-bold text-slate-800">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.date}</p>
              <p className="mt-2 text-sm font-bold text-indigo-600">
                {item.time}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-3xl bg-orange-50 p-4">
          <div className="flex gap-3">
            <AlertCircle className="text-orange-600" size={22} />
            <div>
              <h3 className="text-sm font-bold text-orange-700">
                Substitute Reminder
              </h3>
              <p className="mt-1 text-sm text-orange-600">
                You have one substitute lecture today in 8th C.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyTimetable() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-800">
        Weekly Timetable
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {weeklyTimetable.map((day, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-4"
          >
            <h3 className="mb-4 rounded-2xl bg-indigo-600 px-4 py-3 text-center font-bold text-white">
              {day.day}
            </h3>

            <div className="space-y-3">
              {day.lectures.map((lecture, i) => (
                <div key={i} className="rounded-2xl bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-800">
                      {lecture.subject}
                    </h4>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                        lecture.subject === "Free Lecture"
                          ? "bg-green-100 text-green-700"
                          : lecture.subject === "Substitute Lecture"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {lecture.subject === "Free Lecture"
                        ? "Free"
                        : lecture.subject === "Substitute Lecture"
                        ? "Substitute"
                        : "Class"}
                    </span>
                  </div>

                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock size={15} />
                    {lecture.time}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Users size={15} />
                    {lecture.className}
                  </p>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />
                    {lecture.room}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl p-3 ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}