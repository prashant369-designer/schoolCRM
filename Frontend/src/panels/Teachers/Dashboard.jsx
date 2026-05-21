import React from "react";
import {
  CalendarDays,
  Clock,
  ClipboardCheck,
  BookOpen,
  Bell,
  Users,
  GraduationCap,
  FileText,
  Video,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const lectures = [
  { time: "08:30 AM", subject: "Mathematics", className: "10th A", room: "Room 204" },
  { time: "10:00 AM", subject: "Science", className: "9th B", room: "Lab 2" },
  { time: "12:30 PM", subject: "Computer", className: "11th A", room: "Lab 1" },
];

const tasks = [
  { title: "Check Algebra homework", type: "Assignment", status: "Pending" },
  { title: "Upload Science notes", type: "Documents", status: "Pending" },
  { title: "Enter exam marks", type: "Exams", status: "Urgent" },
];

const exams = [
  { subject: "Mathematics", className: "10th A", date: "25 May 2026" },
  { subject: "Science", className: "9th B", date: "28 May 2026" },
];

const notifications = [
  "Staff meeting at 2:30 PM",
  "3 students absent in 10th A",
  "New circular uploaded by admin",
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Welcome Back, Teacher 👋
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Manage lectures, attendance, homework and student performance from one place.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 px-5 py-3">
            <p className="text-xs text-indigo-100">Today</p>
            <h3 className="font-bold">20 May 2026</h3>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<CalendarDays />}
          title="Today's Lectures"
          value="4"
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<ClipboardCheck />}
          title="Attendance"
          value="92%"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<FileText />}
          title="Homework Pending"
          value="18"
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          icon={<Users />}
          title="Student Strength"
          value="156"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Today's Lectures */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Today’s Lectures
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:underline">
              View Timetable
            </button>
          </div>

          <div className="space-y-4">
            {lectures.map((lecture, index) => (
              <div
                key={index}
                className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                    <Clock size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      {lecture.subject}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {lecture.className} • {lecture.room}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700">
                    {lecture.time}
                  </span>
                  <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
                    Start
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Bell size={20} className="text-indigo-600" />
            Notifications
          </h2>

          <div className="space-y-3">
            {notifications.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Pending Tasks */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Pending Tasks
          </h2>

          <div className="space-y-3">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500">{task.type}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    task.status === "Urgent"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Attendance Summary
          </h2>

          <div className="space-y-4">
            <AttendanceBar label="10th A" value="94%" width="94%" />
            <AttendanceBar label="9th B" value="88%" width="88%" />
            <AttendanceBar label="11th A" value="91%" width="91%" />
          </div>

          <button className="mt-5 w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700">
            View Full Attendance
          </button>
        </div>

        {/* Upcoming Exams */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Upcoming Exams
          </h2>

          <div className="space-y-3">
            {exams.map((exam, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <h3 className="font-bold text-slate-800">{exam.subject}</h3>
                <p className="text-sm text-slate-500">{exam.className}</p>
                <p className="mt-2 text-sm font-bold text-indigo-600">
                  {exam.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <QuickAction icon={<ClipboardCheck />} title="Mark Attendance" />
          <QuickAction icon={<BookOpen />} title="Create Homework" />
          <QuickAction icon={<GraduationCap />} title="Enter Marks" />
          <QuickAction icon={<Video />} title="Start Online Class" />
        </div>
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

function AttendanceBar({ label, value, width }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>

      <div className="h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-indigo-600"
          style={{ width }}
        ></div>
      </div>
    </div>
  );
}

function QuickAction({ icon, title }) {
  return (
    <button className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50">
      <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500">Click to open</p>
      </div>
    </button>
  );
}