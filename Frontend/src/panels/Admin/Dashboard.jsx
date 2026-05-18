import React from "react";
import {
  Users,
  GraduationCap,
  UserCheck,
  IndianRupee,
  Bell,
  CalendarDays,
  BookOpen,
  Clock3,
  TrendingUp,
  CircleAlert,
  Bus,
  ClipboardCheck,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,450",
      icon: <GraduationCap size={28} />,
      bg: "bg-blue-500",
      light: "bg-blue-100",
    },
    {
      title: "Total Teachers",
      value: "125",
      icon: <Users size={28} />,
      bg: "bg-green-500",
      light: "bg-green-100",
    },
    {
      title: "Today Attendance",
      value: "91%",
      icon: <UserCheck size={28} />,
      bg: "bg-purple-500",
      light: "bg-purple-100",
    },
    {
      title: "Pending Fees",
      value: "₹3.2L",
      icon: <IndianRupee size={28} />,
      bg: "bg-red-500",
      light: "bg-red-100",
    },
  ];

  const attendanceData = [
    {
      className: "10-A",
      teacher: "Kavita Sharma",
      subject: "English",
      present: 42,
      absent: 3,
    },
    {
      className: "9-B",
      teacher: "Rohit Verma",
      subject: "Math",
      present: 38,
      absent: 5,
    },
    {
      className: "8-C",
      teacher: "Neha Gupta",
      subject: "Science",
      present: 40,
      absent: 2,
    },
  ];

  const notifications = [
    "15 students absent in first lecture",
    "English teacher uploaded assignments",
    "Fee submission deadline tomorrow",
    "School bus delayed for Route 2",
  ];

  return (
    <div className="min-h-screen ">
      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            School ERP Dashboard
          </h1>

          <p className="text-gray-500 mt-1">Welcome back Admin 👋</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3">
            <CalendarDays className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Today</p>
              <h4 className="font-semibold">08 May 2026</h4>
            </div>
          </div>

          <button className="relative bg-white p-4 rounded-2xl shadow-sm">
            <Bell className="text-gray-700" />

            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-3xl font-bold text-gray-800 mt-3">
                  {item.value}
                </h2>

                <div className="flex items-center gap-1 mt-4 text-green-600 text-sm font-medium">
                  <TrendingUp size={16} />
                  +12% this month
                </div>
              </div>

              <div
                className={`${item.light} w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} text-white`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="xl:col-span-2 space-y-6">
          {/* ATTENDANCE */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Lecture Wise Attendance
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Real-time class attendance records
                </p>
              </div>

              <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-4 text-gray-500">Class</th>
                    <th className="pb-4 text-gray-500">Teacher</th>
                    <th className="pb-4 text-gray-500">Subject</th>
                    <th className="pb-4 text-gray-500">Present</th>
                    <th className="pb-4 text-gray-500">Absent</th>
                    <th className="pb-4 text-gray-500">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceData.map((item, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="py-5 font-semibold">{item.className}</td>

                      <td>{item.teacher}</td>

                      <td>{item.subject}</td>

                      <td className="text-green-600 font-semibold">
                        {item.present}
                      </td>

                      <td className="text-red-500 font-semibold">
                        {item.absent}
                      </td>

                      <td>
                        <span className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
                          Running
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* QUICK CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TEACHERS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Teacher Activity
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Today's active teachers
                  </p>
                </div>

                <div className="bg-green-100 p-3 rounded-2xl">
                  <Users className="text-green-600" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span>Kavita Sharma</span>

                  <span className="text-green-600 font-medium">In Lecture</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Rohit Verma</span>

                  <span className="text-blue-600 font-medium">Free Period</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Neha Gupta</span>

                  <span className="text-red-500 font-medium">Leave</span>
                </div>
              </div>
            </div>

            {/* FEES */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Fees Collection
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Monthly fee analytics
                  </p>
                </div>

                <div className="bg-red-100 p-3 rounded-2xl">
                  <IndianRupee className="text-red-500" />
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Collected</span>
                  <span className="font-semibold">78%</span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-green-500 rounded-full"></div>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Collection</p>

                    <h3 className="text-2xl font-bold mt-1">₹12.4L</h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Pending</p>

                    <h3 className="text-2xl font-bold mt-1 text-red-500">
                      ₹3.2L
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* NOTIFICATIONS */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Notifications</h2>

              <Bell className="text-orange-500" />
            </div>

            <div className="space-y-4">
              {notifications.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-gray-50 p-4 rounded-2xl"
                >
                  <CircleAlert className="text-orange-500 mt-1" size={18} />

                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SCHOOL BUS */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">School Transport</h2>

                <p className="text-sm text-blue-100 mt-1">
                  Bus tracking overview
                </p>
              </div>

              <Bus />
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between">
                <span>Running Buses</span>
                <strong>12</strong>
              </div>

              <div className="flex justify-between">
                <span>Delayed Routes</span>
                <strong>2</strong>
              </div>

              <div className="flex justify-between">
                <span>Students Picked</span>
                <strong>1,120</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
