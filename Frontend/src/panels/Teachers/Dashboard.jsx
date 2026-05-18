import React from "react";

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-2xl p-4">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

export default function TeacherDashboard() {
  const todayClasses = [
    { subject: "Math", time: "10:00 AM" },
    { subject: "English", time: "11:00 AM" },
    { subject: "Science", time: "1:00 PM" },
  ];

  const pendingAttendance = [
    { class: "10-A", subject: "Math" },
    { class: "9-B", subject: "Science" },
  ];

  const assignments = [
    { title: "Algebra Homework", due: "Tomorrow" },
    { title: "Essay Writing", due: "2 Days Left" },
  ];

  const activities = [
    "Marked attendance for 10-A",
    "Uploaded Math assignment",
    "Updated marks for 9-B",
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <Card title="Today’s Classes">
          <ul className="space-y-2">
            {todayClasses.map((cls, index) => (
              <li key={index} className="flex justify-between">
                <span>{cls.subject}</span>
                <span className="text-gray-500">{cls.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Pending Attendance */}
        <Card title="Pending Attendance">
          <ul className="space-y-2">
            {pendingAttendance.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.class}</span>
                <span className="text-red-500">{item.subject}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Upcoming Assignments */}
        <Card title="Upcoming Assignments">
          <ul className="space-y-2">
            {assignments.map((a, index) => (
              <li key={index} className="flex justify-between">
                <span>{a.title}</span>
                <span className="text-blue-500">{a.due}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <ul className="space-y-2 text-sm text-gray-600">
            {activities.map((act, index) => (
              <li key={index}>• {act}</li>
            ))}
          </ul>
        </Card>

        {/* Quick Stats */}
        <Card title="Quick Stats">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Attendance %</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-500 h-3 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-sm mt-1">75%</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Class Performance</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full" style={{ width: "68%" }}></div>
              </div>
              <p className="text-sm mt-1">68%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
