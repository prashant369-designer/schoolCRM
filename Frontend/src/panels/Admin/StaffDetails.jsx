import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Brush,
  Wrench,
  Clock,
  ClipboardList,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Card = ({ title, children, icon }) => (
  <div className="bg-white shadow-sm hover:shadow-lg transition rounded-3xl p-6 border border-gray-100">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      {icon && (
        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
    {children}
  </div>
);

export default function StaffDashboard() {
  const staffList = [
    {
      name: "Ramesh Kumar",
      role: "Security Guard",
      shift: "Morning",
      icon: <Shield size={20} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Suresh Yadav",
      role: "Cleaner",
      shift: "Evening",
      icon: <Brush size={20} />,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "Amit Singh",
      role: "Maintenance Worker",
      shift: "Night",
      icon: <Wrench size={20} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const attendance = [
    { name: "Ramesh Kumar", status: "Present", time: "08:05 AM" },
    { name: "Suresh Yadav", status: "Absent", time: "--" },
    { name: "Amit Singh", status: "Present", time: "09:10 PM" },
  ];

  const tasks = [
    {
      title: "Clean classrooms - Block A",
      assignedTo: "Suresh Yadav",
      status: "Pending",
    },
    {
      title: "Check security cameras",
      assignedTo: "Ramesh Kumar",
      status: "Completed",
    },
    {
      title: "Repair lights in corridor",
      assignedTo: "Amit Singh",
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Staff Details
          </h1>
          <p className="text-gray-500 mt-1">
            Manage non-teaching staff, attendance, shifts and assigned duties.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium">
          + Add Staff
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Staff" icon={<Users size={24} />}>
          <p className="text-3xl font-bold text-gray-800">25</p>
          <p className="text-sm text-gray-500 mt-2">
            Security, cleaners and maintenance team
          </p>
        </Card>

        <Card title="Present Today" icon={<UserCheck size={24} />}>
          <p className="text-3xl font-bold text-green-600">20</p>
          <p className="text-sm text-gray-500 mt-2">
            80% staff attendance today
          </p>
        </Card>

        <Card title="Absent Today" icon={<UserX size={24} />}>
          <p className="text-3xl font-bold text-red-600">5</p>
          <p className="text-sm text-gray-500 mt-2">
            Need replacement for important duties
          </p>
        </Card>
      </div>

      {/* Shift Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6">
          <Clock className="mb-4" />
          <p className="text-blue-100">Morning Shift</p>
          <h2 className="text-3xl font-bold mt-2">12 Staff</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <Clock className="text-orange-500 mb-4" />
          <p className="text-gray-500">Evening Shift</p>
          <h2 className="text-3xl font-bold mt-2">8 Staff</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <Clock className="text-purple-600 mb-4" />
          <p className="text-gray-500">Night Shift</p>
          <h2 className="text-3xl font-bold mt-2">5 Staff</h2>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Staff List */}
        <Card title="Staff List" icon={<Users size={24} />}>
          <div className="space-y-4">
            {staffList.map((staff, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${staff.color}`}
                  >
                    {staff.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {staff.name}
                    </h3>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                  </div>
                </div>

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {staff.shift}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Attendance */}
        <Card title="Today Attendance" icon={<UserCheck size={24} />}>
          <div className="space-y-4">
            {attendance.map((a, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-none pb-4"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{a.name}</h3>
                  <p className="text-sm text-gray-500">
                    Check-in: {a.time}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    a.status === "Present"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Tasks */}
        <Card title="Assigned Tasks" icon={<ClipboardList size={24} />}>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Assigned to: {task.assignedTo}
                    </p>
                  </div>

                  {task.status === "Completed" ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <AlertCircle className="text-orange-500" size={20} />
                  )}
                </div>

                <span
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}