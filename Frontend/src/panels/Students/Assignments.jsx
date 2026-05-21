import React, { useState } from "react";
import {
   Search
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Chapter 5 Algebra Practice",
    subject: "Mathematics",
    dueDate: "2026-05-25",
    submissions: 32,
    total: 40,
    status: "Active",
  },
  {
    id: 2,
    title: "Essay on Environment",
    subject: "English",
    dueDate: "2026-05-28",
    submissions: 25,
    total: 38,
    status: "Active",
  },
  {
    id: 3,
    title: "Physics Numericals",
    subject: "Science",
    dueDate: "2026-05-22",
    submissions: 40,
    total: 40,
    status: "Completed",
  },
];

export default function TeacherAssignments() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Assignment Management
          </h1>
        </div>
      </div>

        {/* Assignment List */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Subject-wise Assignments
            </h2>

            <div className="flex gap-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-2xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 md:w-56"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {assignments.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Due Date: {item.dueDate}
                    </p>
                  </div>
                  <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600">
                        {item.subject}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          item.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <button className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    Upload Submissions
                  </button>
                </div>
              </div>
            ))}
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