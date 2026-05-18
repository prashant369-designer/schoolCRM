// src/pages/admin/StudentsDetails.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, ArrowLeft, User, Calendar, IdCard, BookOpen } from "lucide-react";

const StudentsDetails = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();

    const matchesName = fullName.includes(searchTerm.toLowerCase());

    const matchesClass = classFilter
      ? student.class_name === classFilter
      : true;

    return matchesName && matchesClass;
  });

  const API_URL =
    "http://localhost:3000/api/studentsdetails/getallstudentsdetails";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading student details...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!selectedStudent ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              All Students Details
            </h1>
            <p className="text-gray-500">
              Manage and view complete student information
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow mb-5">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search By Name */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Search Student Name
                </label>

                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter By Class */}
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Filter By Class
                </label>

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Classes</option>

                  {[...new Set(students.map((s) => s.class_name))].map(
                    (className, index) => (
                      <option key={index} value={className}>
                        Class {className}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3">Roll No</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Admission Date</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr
                      key={student.student_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={student.profile_image}
                          alt="student"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {student.first_name} {student.last_name}
                      </td>

                      <td className="px-4 py-3">{student.class_name}</td>
                      <td className="px-4 py-3">{student.section}</td>
                      <td className="px-4 py-3">{student.roll}</td>
                      <td className="px-4 py-3">{student.gender}</td>

                      <td className="px-4 py-3">
                        {formatDate(student.admission_date)}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6 text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <StudentFullDetails
          student={selectedStudent}
          formatDate={formatDate}
          onBack={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

const StudentFullDetails = ({ student, formatDate, onBack }) => {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-5 flex items-center gap-2 text-gray-700 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Students List
      </button>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b pb-6">
          <img
            src={student.profile_image}
            alt="student"
            className="w-36 h-36 rounded-full object-cover border shadow"
          />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {student.first_name} {student.last_name}
            </h2>

            <p className="text-gray-500 mt-1">
              Student ID: {student.student_id}
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
                Class {student.class_name}
              </span>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
                Section {student.section}
              </span>
              <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full">
                Roll No {student.roll}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <DetailCard
            icon={<User />}
            title="Personal Details"
            data={[
              ["First Name", student.first_name],
              ["Last Name", student.last_name],
              ["Gender", student.gender],
              ["Date of Birth", formatDate(student.date_of_birth)],
              ["Religion", student.religion],
              ["Category", student.category],
            ]}
          />

          <DetailCard
            icon={<BookOpen />}
            title="Academic Details"
            data={[
              ["Class", student.class_name],
              ["Section", student.section],
              ["Roll Number", student.roll],
              ["Admission Date", formatDate(student.admission_date)],
              ["Student Auth ID", student.studentauth_id],
              ["Library Code", student.library_code],
            ]}
          />

          <DetailCard
            icon={<IdCard />}
            title="Identity Details"
            data={[
              ["Aadhar Number", student.aadhar_no],
              ["PAN Number", student.pan_no],
            ]}
          />

          <DetailCard
            icon={<Calendar />}
            title="Important Dates"
            data={[
              ["Date of Birth", formatDate(student.date_of_birth)],
              ["Admission Date", formatDate(student.admission_date)],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, data }) => {
  return (
    <div className="border rounded-xl p-5 bg-gray-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-3">
        {data.map(([label, value], index) => (
          <div key={index}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsDetails;
