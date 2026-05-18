import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-5">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default function StaffDashboard() {
  const staffList = [
    { name: "Ramesh Kumar", role: "Security Guard", shift: "Morning" },
    { name: "Suresh Yadav", role: "Cleaner", shift: "Evening" },
    { name: "Amit Singh", role: "Maintenance Worker", shift: "Night" },
  ];

  const attendance = [
    { name: "Ramesh Kumar", status: "Present" },
    { name: "Suresh Yadav", status: "Absent" },
    { name: "Amit Singh", status: "Present" },
  ];

  const tasks = [
    "Clean classrooms - Block A",
    "Check security cameras",
    "Repair lights in corridor",
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>

      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Staff">
          <p className="text-2xl font-bold">25</p>
        </Card>

        <Card title="Present Today">
          <p className="text-2xl font-bold text-green-600">20</p>
        </Card>

        <Card title="Absent Today">
          <p className="text-2xl font-bold text-red-600">5</p>
        </Card>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff List */}
        <Card title="Staff List">
          <ul className="space-y-3 text-sm">
            {staffList.map((staff, index) => (
              <li key={index} className="flex justify-between">
                <span>{staff.name} ({staff.role})</span>
                <span className="text-gray-500">{staff.shift}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Attendance */}
        <Card title="Today Attendance">
          <ul className="space-y-3 text-sm">
            {attendance.map((a, index) => (
              <li key={index} className="flex justify-between">
                <span>{a.name}</span>
                <span className={a.status === "Present" ? "text-green-600" : "text-red-600"}>
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Tasks */}
        <Card title="Assigned Tasks">
          <ul className="space-y-2 text-sm text-gray-600">
            {tasks.map((task, index) => (
              <li key={index}>• {task}</li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
