import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import { FaBarcode, FaEnvelope, FaGraduationCap } from "react-icons/fa6";

const InfoCard = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <h3 className="text-sm font-bold text-slate-800">{value || "N/A"}</h3>
  </div>
);

export default function StudentPortal() {
  const base_url = import.meta.env.VITE_API_URL;  
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const [studentDetails, setStudentDetails] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentDetails = async () => {
    const response = await axios.get(
      `${base_url}/studentsdetails/getstudentdetailsbyauthid/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setStudentDetails(response.data.data);
  };

  const fetchFullTimetable = async () => {
    const timetableRes = await axios.get(
      `${base_url}/timetable/getalltimetables`,
    );

    const timetableRows = timetableRes.data.data || [];

    const fullData = await Promise.all(
      timetableRows.map(async (item) => {
        const [classSectionRes, subjectRes, timeSlotRes, roomRes, teacherRes] =
          await Promise.all([
            axios.get(
              `${base_url}/classandsection/getclassandsectionbyid/${item.classsection_id}`,
            ),
            axios.get(
              `${base_url}/classandsubject/getclassandsubjectbyid/${item.class_subject_id}`,
            ),
            axios.get(
              `${base_url}/timeslots/gettimeslotsbyid/${item.timeslot_id}`,
            ),
            axios.get(`${base_url}/totalrooms/getroomsbyid/${item.rooms_id}`),
            axios.get(
              `${base_url}/teachersdetails/gettacherbyid/${item.teacher_id}`,
            ),
          ]);

        return {
          ...item,
          classSection: classSectionRes.data?.[0] || null,
          subject: subjectRes.data?.[0] || null,
          timeSlot: timeSlotRes.data?.[0] || null,
          room: roomRes.data?.[0] || null,
          teacher: teacherRes.data?.[0] || null,
        };
      }),
    );

    setTimetableData(fullData);
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchStudentDetails(), fetchFullTimetable()]);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [id]);

  const timeSlots = useMemo(() => {
    const uniqueSlots = new Map();

    timetableData.forEach((item) => {
      if (item.timeSlot) {
        uniqueSlots.set(item.timeSlot.timeslot_id, item.timeSlot);
      }
    });

    return Array.from(uniqueSlots.values()).sort((a, b) =>
      a.start_time.localeCompare(b.start_time),
    );
  }, [timetableData]);

  const groupedTimetable = useMemo(() => {
    return timetableData.reduce((acc, item) => {
      const day = item.day_name;

      if (!acc[day]) {
        acc[day] = {};
      }

      acc[day][item.timeslot_id] = item;

      return acc;
    }, {});
  }, [timetableData]);

  const days = Object.keys(groupedTimetable);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (!studentDetails) {
    return <div className="p-6">Student details not found.</div>;
  }

  const auth = studentDetails.auth || {};
  const details = studentDetails.details || {};
  const library = studentDetails.library || {};

  return (
    <div className="min-h-screen">
      <div className="mb-6 rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm text-blue-100">Welcome back</p>
            <h1 className="text-xl md:text-xl font-bold">Student Dashboard</h1>
            <p className="mt-1 text-xs text-blue-100">
              Manage your academic profile, progress and weekly schedule.
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
            <p className="text-xs text-blue-100">Academic Session</p>
            <p className="font-bold">2025 - 2026</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <InfoCard
          label="School Roll Number"
          value={details.roll}
          icon={<FaGraduationCap />}
        />

        <InfoCard
          label="Enrollment Number"
          value={auth.registration_no}
          icon={<FaBarcode />}
        />

        <InfoCard
          label="Fortigate ID"
          value={library.fortigate_id}
          icon={<FaBarcode />}
        />

        <InfoCard label="Login Password" value={library.password} icon={<FaLock />} />

        <InfoCard
          label="Official Email"
          value={auth.mailid}
          icon={<FaEnvelope />}
        />

        <InfoCard
          label="First Time Password"
          value="Check Mail"
          icon={<FaLock />}
        />

        <InfoCard
          label="Result Percentage"
          value={details.result_percentage}
          icon={<FaGraduationCap />}
        />

        <InfoCard
          label="Result Status"
          value={details.result_status}
          icon={<FaGraduationCap />}
        />
      </div>

      <div className="mt-6 rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-slate-900 px-6 py-5 text-white">
          <div>
            <h2 className="text-xl font-bold">Weekly Timetable</h2>
            <p className="text-sm text-slate-300">
              Dynamic weekly schedule from database.
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-2 text-sm">
            Monday - Saturday
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700">
                <th className="px-5 py-4 text-left">Day</th>

                {timeSlots.map((slot) => (
                  <th className="px-5 py-4" key={slot.timeslot_id}>
                    <p>{slot.slot_name}</p>
                    <p className="text-xs font-normal">
                      {slot.start_time} - {slot.end_time}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {days.length > 0 ? (
                days.map((day, index) => (
                  <tr
                    key={day}
                    className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {day}
                    </td>

                    {timeSlots.map((slot) => {
                      const lecture = groupedTimetable[day]?.[slot.timeslot_id];

                      return (
                        <td
                          key={slot.timeslot_id}
                          className="px-5 py-4 text-center"
                        >
                          {lecture ? (
                            <div className="rounded-2xl px-3 py-3 font-semibold border bg-blue-50 text-blue-700 border-blue-100">
                              <p>{lecture.subject?.subject_name}</p>

                              <p className="mt-1 text-xs font-normal text-slate-500">
                                {lecture.teacher?.first_name}{" "}
                                {lecture.teacher?.last_name}
                              </p>

                              <p className="mt-1 text-xs font-normal text-slate-500">
                                Room: {lecture.room?.room_name}
                              </p>
                            </div>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={timeSlots.length + 1}
                    className="px-5 py-6 text-center text-slate-500"
                  >
                    No timetable found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
