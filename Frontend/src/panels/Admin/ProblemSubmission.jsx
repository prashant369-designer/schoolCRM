import React, { useState } from "react";
import {
  AlertTriangle,
  Search,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  User,
  ShieldAlert,
  PackageSearch,
  MessageSquareWarning,
  School,
  Users,
} from "lucide-react";

const ProblemManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProblem, setSelectedProblem] = useState(null);

  const problems = [
    {
      id: "PRB-001",
      postedBy: "Rahul Sharma",
      role: "Student",
      className: "10-A",
      type: "Misbehaviour",
      title: "Student misbehaviour in classroom",
      description:
        "One student was disturbing the class and using abusive language during English lecture.",
      date: "08 May 2026",
      priority: "High",
      status: "Pending",
    },
    {
      id: "PRB-002",
      postedBy: "Kavita Sharma",
      role: "Teacher",
      className: "10-A",
      type: "Lost Item",
      title: "Lost attendance register",
      description: "Class 10-A attendance register is missing from staff room.",
      date: "08 May 2026",
      priority: "Medium",
      status: "In Review",
    },
    {
      id: "PRB-003",
      postedBy: "Ramesh Kumar",
      role: "Staff",
      className: "Admin Block",
      type: "Maintenance",
      title: "Water leakage near office",
      description: "There is water leakage near admin office corridor.",
      date: "07 May 2026",
      priority: "High",
      status: "Resolved",
    },
  ];

  const filteredProblems =
    selectedStatus === "All"
      ? problems
      : problems.filter((item) => item.status === selectedStatus);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Problem & Complaint Management
          </h1>
          <p className="text-gray-500 mt-1">
            Students, teachers and staff can submit problems. Admin can review
            and take action.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-medium">
          + Submit New Problem
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Problems</p>
              <h2 className="text-3xl font-bold mt-2">128</h2>
            </div>
            <AlertTriangle className="text-blue-600" size={36} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending</p>
              <h2 className="text-3xl font-bold mt-2 text-orange-500">34</h2>
            </div>
            <Clock className="text-orange-500" size={36} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">In Review</p>
              <h2 className="text-3xl font-bold mt-2 text-purple-600">18</h2>
            </div>
            <Eye className="text-purple-600" size={36} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Resolved</p>
              <h2 className="text-3xl font-bold mt-2 text-green-600">76</h2>
            </div>
            <CheckCircle className="text-green-600" size={36} />
          </div>
        </div>
      </div>

      {/* PROBLEM TYPES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-red-50 rounded-3xl p-5 border border-red-100">
          <ShieldAlert className="text-red-500 mb-4" />
          <h3 className="font-bold text-gray-800">Misbehaviour</h3>
          <p className="text-sm text-gray-500 mt-1">
            Fight, abuse, bullying, bad conduct
          </p>
        </div>

        <div className="bg-yellow-50 rounded-3xl p-5 border border-yellow-100">
          <PackageSearch className="text-yellow-600 mb-4" />
          <h3 className="font-bold text-gray-800">Lost Item</h3>
          <p className="text-sm text-gray-500 mt-1">
            Bag, books, ID card, register
          </p>
        </div>

        <div className="bg-blue-50 rounded-3xl p-5 border border-blue-100">
          <School className="text-blue-600 mb-4" />
          <h3 className="font-bold text-gray-800">School Facility</h3>
          <p className="text-sm text-gray-500 mt-1">
            Classroom, washroom, water, electricity
          </p>
        </div>

        <div className="bg-purple-50 rounded-3xl p-5 border border-purple-100">
          <MessageSquareWarning className="text-purple-600 mb-4" />
          <h3 className="font-bold text-gray-800">Other Complaint</h3>
          <p className="text-sm text-gray-500 mt-1">
            Any other school related issue
          </p>
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="bg-white rounded-3xl shadow-sm p-5 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-96">
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search problem, student, teacher..."
              className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-2xl outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["All", "Pending", "In Review", "Resolved"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-5 py-2 rounded-xl text-sm font-medium ${
                  selectedStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Recent Problem Submissions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-4">Problem ID</th>
                <th className="pb-4">Posted By</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Priority</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProblems.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-5 font-semibold text-blue-600">
                    {item.id}
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.postedBy}</h4>
                        <p className="text-sm text-gray-500">
                          {item.className}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{item.role}</td>
                  <td>{item.type}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Resolved"
                          ? "bg-green-100 text-green-600"
                          : item.status === "In Review"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{item.date}</td>

                  <td>
                    <button
                      onClick={() => setSelectedProblem(item)}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProblem.title}
                </h2>
                <p className="text-gray-500 mt-1">
                  {selectedProblem.id} • {selectedProblem.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedProblem(null)}
                className="bg-gray-100 p-2 rounded-xl"
              >
                <XCircle />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">Posted By</p>
                <h4 className="font-bold">{selectedProblem.postedBy}</h4>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">Role</p>
                <h4 className="font-bold">{selectedProblem.role}</h4>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">Problem Type</p>
                <h4 className="font-bold">{selectedProblem.type}</h4>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-sm text-gray-500">Priority</p>
                <h4 className="font-bold">{selectedProblem.priority}</h4>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-2xl mb-5">
              <h3 className="font-bold mb-2">Problem Description</h3>
              <p className="text-gray-700">{selectedProblem.description}</p>
            </div>

            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Admin Action Note
              </label>
              <textarea
                rows="4"
                placeholder="Write action taken by admin..."
                className="w-full bg-gray-100 rounded-2xl p-4 outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row gap-3 justify-end">
              <button className="bg-orange-100 text-orange-600 px-5 py-3 rounded-xl font-medium">
                Mark In Review
              </button>

              <button className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium">
                Mark Resolved
              </button>

              <button className="bg-red-100 text-red-600 px-5 py-3 rounded-xl font-medium">
                Reject Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemManagement;
