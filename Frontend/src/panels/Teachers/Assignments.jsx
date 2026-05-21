import React, { useState } from "react";
import {
  BookOpen,
  Upload,
  CalendarDays,
  FileText,
  Users,
  CheckCircle,
  Clock,
  Search,
  Star,
} from "lucide-react";

const assignments = [
  {
    id: 1,
    title: "Chapter 5 Algebra Practice",
    subject: "Mathematics",
    className: "10th A",
    dueDate: "2026-05-25",
    submissions: 32,
    total: 40,
    status: "Active",
  },
  {
    id: 2,
    title: "Essay on Environment",
    subject: "English",
    className: "9th B",
    dueDate: "2026-05-28",
    submissions: 25,
    total: 38,
    status: "Active",
  },
  {
    id: 3,
    title: "Physics Numericals",
    subject: "Science",
    className: "11th A",
    dueDate: "2026-05-22",
    submissions: 40,
    total: 40,
    status: "Completed",
  },
];

const submissions = [
  {
    id: 1,
    name: "Aman Sharma",
    roll: "12",
    file: "algebra_solution.pdf",
    submittedAt: "Today, 10:30 AM",
    marks: "",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Verma",
    roll: "18",
    file: "math_homework.jpg",
    submittedAt: "Yesterday, 07:15 PM",
    marks: "18/20",
    status: "Checked",
  },
  {
    id: 3,
    name: "Rohit Singh",
    roll: "24",
    file: "chapter5.pdf",
    submittedAt: "Today, 09:00 AM",
    marks: "",
    status: "Pending",
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
          <p className="mt-1 text-sm text-indigo-100">
            Create homework, manage submissions, check work and give feedback.
          </p>
        </div>

        <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-indigo-50">
          + Create New Homework
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<BookOpen />}
          title="Total Assignments"
          value="24"
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<Users />}
          title="Total Submissions"
          value="456"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<Clock />}
          title="Pending Check"
          value="38"
          color="bg-orange-100 text-orange-600"
        />
        <StatCard
          icon={<CheckCircle />}
          title="Checked"
          value="418"
          color="bg-blue-100 text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Create Homework */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-1">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <FileText size={20} className="text-indigo-600" />
            Create Homework
          </h2>

          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Homework Title
              </label>
              <input
                type="text"
                placeholder="Enter homework title"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600">
                  Subject
                </label>
                <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
                  <option>Select Subject</option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Science</option>
                  <option>Computer</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-600">
                  Class / Section
                </label>
                <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
                  <option>Select Class</option>
                  <option>10th A</option>
                  <option>9th B</option>
                  <option>11th A</option>
                  <option>12th C</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Due Date
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

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-600">
                Description
              </label>
              <textarea
                rows="4"
                placeholder="Write assignment instructions..."
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Upload PDF / Image
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-6 text-center transition hover:bg-indigo-100">
                <Upload size={30} className="mb-2 text-indigo-600" />
                <p className="text-sm font-semibold text-slate-700">
                  Click to upload file
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
                <p className="mt-2 text-sm font-medium text-green-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
            >
              Publish Homework
            </button>
          </form>
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

              <select className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-indigo-500">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>English</option>
                <option>Science</option>
              </select>
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
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600">
                        {item.subject}
                      </span>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                        {item.className}
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

                    <h3 className="font-bold text-slate-800">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Due Date: {item.dueDate}
                    </p>
                  </div>

                  <div className="min-w-44">
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-600">
                        Submissions
                      </span>
                      <span className="font-bold text-slate-800">
                        {item.submissions}/{item.total}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-200">
                      <div
                        className="h-2 rounded-full bg-indigo-600"
                        style={{
                          width: `${(item.submissions / item.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <button className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    View Submissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <h2 className="text-lg font-bold text-slate-800">
            Student Submissions
          </h2>

          <button className="rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
            Export Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-left text-sm text-slate-600">
                <th className="rounded-l-2xl px-4 py-3">Student</th>
                <th className="px-4 py-3">Roll No.</th>
                <th className="px-4 py-3">Submitted File</th>
                <th className="px-4 py-3">Submitted At</th>
                <th className="px-4 py-3">Marks</th>
                <th className="px-4 py-3">Feedback</th>
                <th className="rounded-r-2xl px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 text-sm"
                >
                  <td className="px-4 py-4 font-semibold text-slate-800">
                    {student.name}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{student.roll}</td>
                  <td className="px-4 py-4">
                    <button className="flex items-center gap-2 font-semibold text-indigo-600 hover:underline">
                      <FileText size={16} />
                      {student.file}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {student.submittedAt}
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      placeholder="20/20"
                      defaultValue={student.marks}
                      className="w-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      placeholder="Write feedback..."
                      className="w-48 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                        student.status === "Checked"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <Star size={13} />
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-end">
          <button className="rounded-2xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-green-700">
            Save Marks & Feedback
          </button>
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