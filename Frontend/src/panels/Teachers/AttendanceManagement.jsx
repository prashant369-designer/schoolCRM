import React, { useState } from "react";
import {
  ClipboardCheck,
  Users,
  UserCheck,
  UserX,
  Clock,
  CalendarDays,
  QrCode,
  Download,
  MessageCircle,
  Edit,
  Search,
  History,
} from "lucide-react";

const studentsData = [
  { id: 1, name: "Aman Sharma", roll: "01", status: "present" },
  { id: 2, name: "Priya Verma", roll: "02", status: "absent" },
  { id: 3, name: "Rohit Singh", roll: "03", status: "late" },
  { id: 4, name: "Neha Gupta", roll: "04", status: "present" },
  { id: 5, name: "Karan Yadav", roll: "05", status: "present" },
];

export default function AttendanceManagement() {
  const [students, setStudents] = useState(studentsData);
  const [whatsappAlert, setWhatsappAlert] = useState(true);

  const updateStatus = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const bulkMark = (status) => {
    setStudents((prev) => prev.map((student) => ({ ...student, status })));
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const lateCount = students.filter((s) => s.status === "late").length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Attendance Management
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Mark lecture-wise attendance, edit records, send WhatsApp alerts
              and export reports.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-indigo-600 shadow-md hover:bg-indigo-50">
              <QrCode size={18} />
              QR Attendance
            </button>

            <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800">
              <Download size={18} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users />}
          title="Total Students"
          value={students.length}
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<UserCheck />}
          title="Present"
          value={presentCount}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<UserX />}
          title="Absent"
          value={absentCount}
          color="bg-red-100 text-red-600"
        />
        <StatCard
          icon={<Clock />}
          title="Late"
          value={lateCount}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
          <ClipboardCheck size={20} className="text-indigo-600" />
          Lecture Details
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Class
            </label>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>10th A</option>
              <option>9th B</option>
              <option>11th A</option>
              <option>12th C</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Subject
            </label>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
              <option>Computer</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Lecture
            </label>
            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>1st Lecture</option>
              <option>2nd Lecture</option>
              <option>3rd Lecture</option>
              <option>4th Lecture</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Date
            </label>
            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                type="date"
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700">
              Load Students
            </button>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Mark Attendance
            </h2>
            <p className="text-sm text-slate-500">
              Select present, absent or late for each student.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => bulkMark("present")}
              className="rounded-2xl bg-green-100 px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-200"
            >
              Mark All Present
            </button>

            <button
              onClick={() => bulkMark("absent")}
              className="rounded-2xl bg-red-100 px-4 py-2.5 text-sm font-bold text-red-700 hover:bg-red-200"
            >
              Mark All Absent
            </button>

            <button
              onClick={() => bulkMark("late")}
              className="rounded-2xl bg-orange-100 px-4 py-2.5 text-sm font-bold text-orange-700 hover:bg-orange-200"
            >
              Mark All Late
            </button>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search student..."
              className="w-full rounded-2xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 md:w-72"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-green-50 px-4 py-3">
            <MessageCircle size={19} className="text-green-600" />
            <span className="text-sm font-semibold text-slate-700">
              Auto WhatsApp alert to parents
            </span>
            <input
              type="checkbox"
              checked={whatsappAlert}
              onChange={() => setWhatsappAlert(!whatsappAlert)}
              className="h-4 w-4 accent-green-600"
            />
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left text-sm text-slate-600">
                <th className="rounded-l-2xl px-4 py-3">Roll No.</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Present</th>
                <th className="px-4 py-3">Absent</th>
                <th className="px-4 py-3">Late</th>
                <th className="px-4 py-3">Current Status</th>
                <th className="rounded-r-2xl px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="px-4 py-4 font-semibold text-slate-700">
                    #{student.roll}
                  </td>

                  <td className="px-4 py-4 font-bold text-slate-800">
                    {student.name}
                  </td>

                  <td className="px-4 py-4">
                    <StatusButton
                      active={student.status === "present"}
                      label="Present"
                      color="green"
                      onClick={() => updateStatus(student.id, "present")}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <StatusButton
                      active={student.status === "absent"}
                      label="Absent"
                      color="red"
                      onClick={() => updateStatus(student.id, "absent")}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <StatusButton
                      active={student.status === "late"}
                      label="Late"
                      color="orange"
                      onClick={() => updateStatus(student.id, "late")}
                    />
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        student.status === "present"
                          ? "bg-green-100 text-green-700"
                          : student.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-100 hover:text-indigo-700">
                      <Edit size={15} />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">
            WhatsApp alert will be sent only for absent students.
          </p>

          <button className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-indigo-700">
            Save Attendance
          </button>
        </div>
      </div>

      {/* Attendance History */}
      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
            <History size={20} className="text-indigo-600" />
            Attendance History
          </h2>

          <button className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-100 hover:text-indigo-700">
            <Download size={17} />
            Download Report
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <HistoryCard
            date="20 May 2026"
            lecture="1st Lecture"
            subject="Mathematics"
            present="34"
            absent="4"
            late="2"
          />
          <HistoryCard
            date="19 May 2026"
            lecture="2nd Lecture"
            subject="Science"
            present="36"
            absent="3"
            late="1"
          />
          <HistoryCard
            date="18 May 2026"
            lecture="4th Lecture"
            subject="English"
            present="32"
            absent="6"
            late="2"
          />
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

function StatusButton({ active, label, color, onClick }) {
  const styles = {
    green: active
      ? "bg-green-600 text-white"
      : "bg-green-100 text-green-700 hover:bg-green-200",
    red: active
      ? "bg-red-600 text-white"
      : "bg-red-100 text-red-700 hover:bg-red-200",
    orange: active
      ? "bg-orange-500 text-white"
      : "bg-orange-100 text-orange-700 hover:bg-orange-200",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-bold transition ${styles[color]}`}
    >
      {label}
    </button>
  );
}

function HistoryCard({ date, lecture, subject, present, absent, late }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-3">
        <h3 className="font-bold text-slate-800">{date}</h3>
        <p className="text-sm text-slate-500">
          {lecture} • {subject}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-green-100 p-3">
          <p className="text-lg font-bold text-green-700">{present}</p>
          <p className="text-xs font-semibold text-green-600">Present</p>
        </div>

        <div className="rounded-2xl bg-red-100 p-3">
          <p className="text-lg font-bold text-red-700">{absent}</p>
          <p className="text-xs font-semibold text-red-600">Absent</p>
        </div>

        <div className="rounded-2xl bg-orange-100 p-3">
          <p className="text-lg font-bold text-orange-700">{late}</p>
          <p className="text-xs font-semibold text-orange-600">Late</p>
        </div>
      </div>
    </div>
  );
}