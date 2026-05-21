import React, { useState } from "react";
import {
  FilePlus,
  GraduationCap,
  Trophy,
  BarChart3,
  FileText,
  Search,
  Download,
  Calculator,
  ClipboardList,
  Medal,
} from "lucide-react";

const studentsData = [
  { id: 1, name: "Aman Sharma", roll: "01", marks: 86 },
  { id: 2, name: "Priya Verma", roll: "02", marks: 92 },
  { id: 3, name: "Rohit Singh", roll: "03", marks: 68 },
  { id: 4, name: "Neha Gupta", roll: "04", marks: 78 },
];

const getGrade = (marks) => {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  return "Fail";
};

export default function ExamsMarks() {
  const [students, setStudents] = useState(studentsData);

  const updateMarks = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, marks: Number(value) }
          : student
      )
    );
  };

  const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Exams & Marks
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Create exams, enter marks, calculate grades, generate reports and analyze performance.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-md hover:bg-indigo-50">
            <FilePlus size={18} />
            Create Exam
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<ClipboardList />}
          title="Total Exams"
          value="12"
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<GraduationCap />}
          title="Students"
          value="40"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<Calculator />}
          title="Class Average"
          value="81%"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<Trophy />}
          title="Top Score"
          value="92"
          color="bg-orange-100 text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Create Exam */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Create Exam
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Exam name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />

            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Select Class</option>
              <option>10th A</option>
              <option>9th B</option>
              <option>11th A</option>
            </select>

            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Select Subject</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
            </select>

            <input
              type="date"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />

            <input
              type="number"
              placeholder="Total marks"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />

            <button className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700">
              Save Exam
            </button>
          </div>
        </div>

        {/* Enter Marks */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Enter Marks
            </h2>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search student..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 md:w-72"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-187 border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left text-sm text-slate-600">
                  <th className="rounded-l-2xl px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Roll No.</th>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Marks</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="rounded-r-2xl px-4 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {sortedStudents.map((student, index) => (
                  <tr key={student.id} className="border-b border-slate-100 text-sm">
                    <td className="px-4 py-4 font-bold text-slate-700">
                      #{index + 1}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {student.roll}
                    </td>

                    <td className="px-4 py-4 font-bold text-slate-800">
                      {student.name}
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="number"
                        value={student.marks}
                        onChange={(e) => updateMarks(student.id, e.target.value)}
                        className="w-24 rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-indigo-500"
                      />
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                        {getGrade(student.marks)}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.marks >= 50
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.marks >= 50 ? "Pass" : "Fail"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-5 rounded-2xl bg-green-600 px-6 py-3 text-sm font-bold text-white hover:bg-green-700">
            Save Marks
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Analytics */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <BarChart3 size={20} className="text-indigo-600" />
            Subject Performance Analytics
          </h2>

          <div className="space-y-4">
            <PerformanceBar label="Mathematics" value="84%" width="84%" />
            <PerformanceBar label="Science" value="78%" width="78%" />
            <PerformanceBar label="English" value="88%" width="88%" />
            <PerformanceBar label="Computer" value="91%" width="91%" />
          </div>
        </div>

        {/* Rank List */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Medal size={20} className="text-indigo-600" />
            Rank List
          </h2>

          <div className="space-y-3">
            {sortedStudents.slice(0, 3).map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    #{index + 1} {student.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Roll No. {student.roll}
                  </p>
                </div>

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                  {student.marks}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Cards + Internal Assessment */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <FileText size={20} className="text-indigo-600" />
            Report Cards
          </h2>

          <p className="mb-4 text-sm text-slate-500">
            Generate student-wise report cards with marks, grades and remarks.
          </p>

          <button className="flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">
            <Download size={18} />
            Generate Report Cards
          </button>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Internal Assessment
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <AssessmentBox title="Homework" value="10/10" />
            <AssessmentBox title="Class Test" value="18/20" />
            <AssessmentBox title="Behaviour" value="9/10" />
          </div>

          <button className="mt-5 w-full rounded-2xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-indigo-700">
            Update Assessment
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

function PerformanceBar({ label, value, width }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className="font-bold text-slate-800">{value}</span>
      </div>

      <div className="h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-indigo-600" style={{ width }}></div>
      </div>
    </div>
  );
}

function AssessmentBox({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 text-center">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-indigo-600">{value}</h3>
    </div>
  );
}