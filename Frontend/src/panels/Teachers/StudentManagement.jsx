import React, { useState } from "react";
import {
  Users,
  Search,
  Eye,
  Phone,
  Mail,
  ClipboardCheck,
  GraduationCap,
  MessageSquareText,
  UserRound,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const studentsData = [
  {
    id: 1,
    name: "Aman Sharma",
    roll: "01",
    className: "10th A",
    attendance: "94%",
    performance: "A",
    parentName: "Rajesh Sharma",
    parentPhone: "+91 9876543210",
    parentEmail: "rajesh@example.com",
    behaviour: "Good discipline and active in class.",
    status: "Excellent",
  },
  {
    id: 2,
    name: "Priya Verma",
    roll: "02",
    className: "10th A",
    attendance: "88%",
    performance: "B+",
    parentName: "Sunita Verma",
    parentPhone: "+91 9876543211",
    parentEmail: "sunita@example.com",
    behaviour: "Needs improvement in homework submission.",
    status: "Average",
  },
  {
    id: 3,
    name: "Rohit Singh",
    roll: "03",
    className: "10th A",
    attendance: "72%",
    performance: "C",
    parentName: "Mahesh Singh",
    parentPhone: "+91 9876543212",
    parentEmail: "mahesh@example.com",
    behaviour: "Often late, needs attention.",
    status: "Attention",
  },
];

export default function StudentManagement() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(studentsData[0]);

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Student Management
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              View student profiles, attendance, academic performance and parent details.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 px-5 py-3">
            <p className="text-xs text-indigo-100">Class Teacher</p>
            <h3 className="font-bold">10th A</h3>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users />}
          title="Total Students"
          value="40"
          color="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={<ClipboardCheck />}
          title="Avg Attendance"
          value="89%"
          color="bg-green-100 text-green-600"
        />
        <StatCard
          icon={<GraduationCap />}
          title="Top Performers"
          value="12"
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          icon={<AlertCircle />}
          title="Need Attention"
          value="4"
          color="bg-red-100 text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Student List */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Student List
            </h2>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 md:w-72"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-212 border-collapse">
              <thead>
                <tr className="bg-slate-100 text-left text-sm text-slate-600">
                  <th className="rounded-l-2xl px-4 py-3">Roll No.</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Attendance</th>
                  <th className="px-4 py-3">Performance</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="rounded-r-2xl px-4 py-3">Profile</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
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

                    <td className="px-4 py-4 text-slate-600">
                      {student.className}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        {student.attendance}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-bold text-indigo-600">
                      Grade {student.performance}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          student.status === "Excellent"
                            ? "bg-green-100 text-green-700"
                            : student.status === "Attention"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="flex items-center gap-2 rounded-xl bg-indigo-100 px-3 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-200"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Profile */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <UserRound size={20} className="text-indigo-600" />
            Student Profile
          </h2>

          <div className="mb-5 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-5 text-white">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
              {selectedStudent.name.charAt(0)}
            </div>

            <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
            <p className="text-sm text-indigo-100">
              Roll #{selectedStudent.roll} • {selectedStudent.className}
            </p>
          </div>

          <InfoCard
            icon={<ClipboardCheck />}
            label="Attendance"
            value={selectedStudent.attendance}
          />

          <InfoCard
            icon={<TrendingUp />}
            label="Academic Performance"
            value={`Grade ${selectedStudent.performance}`}
          />

          <div className="mt-4 rounded-3xl bg-slate-50 p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-800">
              <Phone size={17} className="text-indigo-600" />
              Parent Contact
            </h3>

            <p className="text-sm font-semibold text-slate-700">
              {selectedStudent.parentName}
            </p>

            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Phone size={15} />
              {selectedStudent.parentPhone}
            </p>

            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <Mail size={15} />
              {selectedStudent.parentEmail}
            </p>
          </div>

          <div className="mt-4 rounded-3xl bg-slate-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-800">
              <MessageSquareText size={17} className="text-indigo-600" />
              Behaviour Remarks
            </h3>

            <p className="text-sm leading-6 text-slate-600">
              {selectedStudent.behaviour}
            </p>

            <textarea
              rows="3"
              placeholder="Add new remark..."
              className="mt-3 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            ></textarea>

            <button className="mt-3 w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700">
              Save Remark
            </button>
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

function InfoCard({ icon, label, value }) {
  return (
    <div className="mb-3 rounded-3xl bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <h3 className="font-bold text-slate-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}