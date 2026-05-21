import React, { useState } from "react";
import {
  CalendarDays,
  Upload,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  HeartPulse,
  Briefcase,
  Search,
  Eye,
} from "lucide-react";

const leaveHistory = [
  {
    id: 1,
    type: "Sick Leave",
    from: "10 May 2026",
    to: "11 May 2026",
    days: 2,
    reason: "Fever and weakness",
    status: "Approved",
  },
  {
    id: 2,
    type: "Casual Leave",
    from: "18 May 2026",
    to: "18 May 2026",
    days: 1,
    reason: "Family function",
    status: "Pending",
  },
  {
    id: 3,
    type: "Sick Leave",
    from: "02 Apr 2026",
    to: "03 Apr 2026",
    days: 2,
    reason: "Medical checkup",
    status: "Rejected",
  },
];

export default function TeacherLeaveManagement() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Leave Management
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Apply sick/casual leave, upload proof and track approval status.
            </p>
          </div>
        </div>
      </div>

      

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Apply Leave */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <FileText size={20} className="text-indigo-600" />
            Apply Leave
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Leave Type*
              </label>
              <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
                <option>Select leave type</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
                <option>Emergency Leave</option>
                <option>Half Day Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600">
                  From Date*
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600">
                  To Date*
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Reason*
              </label>
              <textarea
                rows="4"
                placeholder="Write leave reason..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Upload Medical Proof (optional)
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-6 text-center hover:bg-indigo-100">
                <Upload size={32} className="mb-2 text-indigo-600" />
                <p className="text-sm font-bold text-slate-700">
                  Upload document
                </p>
                <p className="text-xs text-slate-500">
                  PDF, JPG, PNG supported
                </p>

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </label>

              {selectedFile && (
                <p className="mt-2 text-sm font-semibold text-green-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <button className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700">
              Submit Leave Request
            </button>
          </div>
        </div>

        {/* Leave History */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Leave History
            </h2>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search leave..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 md:w-72"
              />
            </div>
          </div>

          <div className="space-y-4">
            {leaveHistory.map((leave) => (
              <div
                key={leave.id}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-2xl p-3 ${
                        leave.type === "Sick Leave"
                          ? "bg-red-100 text-red-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {leave.type === "Sick Leave" ? (
                        <HeartPulse size={22} />
                      ) : (
                        <Briefcase size={22} />
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {leave.type}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {leave.from} to {leave.to} • {leave.days} day(s)
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Reason: {leave.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {leave.status}
                    </span>

                    <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-100 hover:text-indigo-700">
                      <Eye size={15} />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Approval Flow */}
          <div className="mt-5 rounded-3xl bg-slate-900 p-5 text-white">
            <div className="flex gap-3">
              <AlertCircle size={24} className="text-indigo-300" />
              <div>
                <h3 className="font-bold">Approval Process</h3>
                <p className="mt-1 text-sm text-slate-300">
                  Your leave request will be reviewed by Class teacher. You can track
                  pending, approved and rejected status from leave history.
                </p>
              </div>
            </div>
          </div>
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