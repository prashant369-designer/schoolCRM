import React, { useState } from "react";
import {
  GraduationCap,
  UserCheck,
  Users,
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AssignClassTeacher = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const classes = [
    { id: 1, className: "Nursery-A", students: 32, teacher: "Not Assigned" },
    { id: 2, className: "1-A", students: 38, teacher: "Neha Sharma" },
    { id: 3, className: "5-B", students: 42, teacher: "Rohit Verma" },
    { id: 4, className: "10-A", students: 45, teacher: "Kavita Sharma" },
    { id: 5, className: "12-C", students: 40, teacher: "Not Assigned" },
  ];

  const teachers = [
    "Kavita Sharma",
    "Rohit Verma",
    "Neha Sharma",
    "Amit Gupta",
    "Pooja Singh",
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Assign Class Teacher
          </h1>
          <p className="text-gray-500 mt-1">
            Assign one class teacher to each class and manage responsibility.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2">
          <Plus size={20} />
          New Assignment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <GraduationCap className="text-blue-600 mb-4" />
          <p className="text-gray-500">Total Classes</p>
          <h2 className="text-3xl font-bold mt-2">32</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <UserCheck className="text-green-600 mb-4" />
          <p className="text-gray-500">Assigned Classes</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">28</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <AlertCircle className="text-orange-500 mb-4" />
          <p className="text-gray-500">Not Assigned</p>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">4</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Users className="text-purple-600 mb-4" />
          <p className="text-gray-500">Available Teachers</p>
          <h2 className="text-3xl font-bold mt-2 text-purple-600">18</h2>
        </div>
      </div>

      {/* Assign Form */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Assign Teacher to Class
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Choose Class</option>
              {classes.map((item) => (
                <option key={item.id} value={item.className}>
                  {item.className}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Teacher
            </label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Choose Teacher</option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium">
              Assign Class Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl shadow-sm p-5 mb-8">
        <div className="relative">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search class, teacher..."
            className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-2xl outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <BookOpen className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Class Teacher Assignments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-4">Class</th>
                <th className="pb-4">Students</th>
                <th className="pb-4">Class Teacher</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {classes.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-5 font-semibold text-gray-800">
                    {item.className}
                  </td>

                  <td>{item.students}</td>

                  <td>
                    {item.teacher === "Not Assigned" ? (
                      <span className="text-gray-400">Not Assigned</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {item.teacher.charAt(0)}
                        </div>
                        <span className="font-medium">{item.teacher}</span>
                      </div>
                    )}
                  </td>

                  <td>
                    {item.teacher === "Not Assigned" ? (
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1">
                        <CheckCircle size={14} />
                        Assigned
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                        <Edit size={18} />
                      </button>

                      <button className="bg-red-50 text-red-600 p-2 rounded-xl">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6">
        <h3 className="font-bold text-blue-700 mb-2">
          Class Teacher Responsibility
        </h3>
        <p className="text-gray-600 text-sm">
          Class teacher can manage student attendance, class notices,
          parent communication, discipline reports and academic coordination
          for assigned class.
        </p>
      </div>
    </div>
  );
};

export default AssignClassTeacher;