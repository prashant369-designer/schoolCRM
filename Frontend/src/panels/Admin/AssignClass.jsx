import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  Users,
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";

const AssignLectureClass = () => {
  const [teacher,setTeacher] = useState([]);
  const [subject,setSubject] = useState([]);
  const [classes,setClasses] = useState([]);
  const [time,setTime] = useState([]);
  const [rooms,setRooms] = useState([]);
  const base_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${base_url}/teachersdetails/getallteacherdetails`).then((res) => {
      setTeacher(res.data);
    });
    axios.get(`${base_url}/classandsubject/getclassandsubject`).then((res) => {
      setSubject(res.data);
    });
    axios.get(`${base_url}/classandsection/getclassandsection`).then((res) => {
      setClasses(res.data);
    });
    axios.get(`${base_url}/timeslots/gettimeslots`).then((res) => {
      setTime(res.data);
    });
    axios.get(`${base_url}/totalrooms/getrooms`).then((res) => {
      setRooms(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Assign Classes to Teacher
          </h1>
          <p className="text-gray-500 mt-1">
            Assign teacher to class, subject, lecture, day and time slot.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2">
          <Plus size={20} />
          New Lecture Assignment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Users className="text-blue-600 mb-4" />
          <p className="text-gray-500">Total Teachers</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">{teacher.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <BookOpen className="text-green-600 mb-4" />
          <p className="text-gray-500">Total Classes</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">{classes.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <Clock className="text-orange-500 mb-4" />
          <p className="text-gray-500">Total Subjects</p>
          <h2 className="text-3xl font-bold mt-2 text-orange-500">{subject.length}</h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <AlertCircle className="text-red-500 mb-4" />
          <p className="text-gray-500">Total Rooms</p>
          <h2 className="text-3xl font-bold mt-2 text-red-500">{rooms.length}</h2>
        </div>
      </div>

      {/* Assign Form */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Create Lecture Assignment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Teacher
            </label>
            <select
              className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Select Teacher</option>
             {teacher.map((teacher) => (
              <option key={teacher.teacher_id}>
                <p>{`${teacher.first_name} ${teacher.last_name}`}</p>
                </option>
             ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Class
            </label>
            <select
              className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Select Class</option>
              {classes.map((classes) => (
                <option key={classes.class_id}>
                  <p>{`${classes.classname} ${classes.section}`}</p>
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Subject
            </label>
            <select
              className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Select Subject</option>
              {subject.map((subject) => (
                <option key={subject.class_subject_id}>
                  <p>{subject.subject_name}</p>
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Day
            </label>
            <select className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none">
              <option>Select Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Lecture Type
            </label>
            <select className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none">
              <option>Select Lecture Type</option>
              <option>Lecture</option>
              <option>Break</option>
              <option>Lunch</option>
              <option>Activity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Time Slot
            </label>
            <select className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none">
             {time.map((time) => (
               <option key={time.timeslot_id}>
                <p >{time.start_time} - {time.end_time}- {time.slot_name} </p>
                </option>
             ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Room / Location
            </label>
            <select className="w-full bg-gray-100 px-4 py-3 rounded-2xl outline-none">
             {rooms.map((room) => (
               <option key={room.rooms_id}>
                <p >{room.room_name} </p>
                </option>
             ))}
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium">
              Assign Lecture
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
            placeholder="Search teacher, class, subject, lecture..."
            className="w-full bg-gray-100 pl-12 pr-4 py-3 rounded-2xl outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <CalendarDays className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">
            Lecture Class Assignments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-4">Teacher</th>
                <th className="pb-4">Subject</th>
                <th className="pb-4">Class</th>
                <th className="pb-4">Day</th>
                <th className="pb-4">Lecture</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Room</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
                <tr  className="border-b last:border-none">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">
                        rakesh
                      </span>
                    </div>
                  </td>

                  <td>math</td>

                  <td>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                     10-A
                    </span>
                  </td>

                  <td>Monday</td>
                  <td>first</td>
                  <td>09:00 - 10:00</td>
                  <td>101</td>


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
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-3xl p-6">
        <h3 className="font-bold text-blue-700 mb-2">
          Lecture Assignment Rule
        </h3>
        <p className="text-gray-600 text-sm">
          One teacher should not be assigned to two classes at the same day and
          same time slot. This helps avoid timetable conflicts and shows free
          periods clearly.
        </p>
      </div>
    </div>
  );
};

export default AssignLectureClass;