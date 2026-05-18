import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Filter,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  UsersRound,
  X,
} from "lucide-react";

const departments = [
  "All Departments",
  "English",
  "Math",
  "Science",
  "Social Science",
  "Computer Science",
  "Physical Education",
  "Hindi",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer",
  "History",
  "Geography",
  "Civicks",
  "Economics",
  "Physical education ",
  "Accountant",
];

const statuses = ["All Status", "Available", "In Class", "On Leave"];

export default function SearchFacultyUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [teacherDetails, setTeacherDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const base_url = import.meta.env.VITE_API_URL;

  const fetchAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${base_url}/teachersdetails/getallteacherdetails`,
      );

      const formattedData = response.data.map((teacher) => ({
        id: teacher.teacher_id,
        name: `${teacher.first_name} ${teacher.last_name}`,
        role: teacher.bio || "Teacher",
        department: teacher.Department,
        subjects: teacher.Subjects
          ? teacher.Subjects.split(",").map((item) => item.trim())
          : [],
        classTeacher: teacher.Class_Teacher || "N/A",
        experience: `${teacher.experience} Years`,
        rating: 4.8,
        status: "Available",
        nextClass: "10:30 AM",
        room: "Room 204",
        email: "teacher@schoolerp.com",
        phone: "+91 98765 43210",
        image: teacher.profile_image,
      }));

      setTeacherDetails(formattedData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, []);

  const filteredFaculty = useMemo(() => {
    return teacherDetails.filter((faculty) => {
      const searchValue = searchTerm.toLowerCase();

      const searchMatch =
        faculty.name.toLowerCase().includes(searchValue) ||
        faculty.role.toLowerCase().includes(searchValue) ||
        faculty.department?.toLowerCase().includes(searchValue) ||
        faculty.classTeacher?.toLowerCase().includes(searchValue) ||
        faculty.subjects.join(" ").toLowerCase().includes(searchValue);

      const departmentMatch =
        department === "All Departments" || faculty.department === department;

      const statusMatch = status === "All Status" || faculty.status === status;

      return searchMatch && departmentMatch && statusMatch;
    });
  }, [searchTerm, department, status, teacherDetails]);

  const availableCount = teacherDetails.filter(
    (item) => item.status === "Available",
  ).length;

  const inClassCount = teacherDetails.filter(
    (item) => item.status === "In Class",
  ).length;

  if (loading) {
    return <div className="p-6 font-bold">Loading teacher details...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <button className="mt-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50">
                <ArrowLeft size={20} />
              </button>

              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-medium text-indigo-600">
                  <GraduationCap size={16} /> School ERP Directory
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-xl">
                  Search Faculty
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  Find teachers by name, department, subject, class or
                  availability.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:min-w-105">
              <HeaderStat label="Total" value={teacherDetails.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by faculty name, subject, class or role..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div className="hidden gap-3 lg:flex">
              <SelectBox
                value={department}
                onChange={setDepartment}
                options={departments}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 lg:hidden"
              >
                <Filter size={18} /> Filters
              </button>

              <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    viewMode === "grid"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  Grid
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                    viewMode === "list"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Faculty Members
            </h2>

            <p className="text-sm text-slate-500">
              Showing {filteredFaculty.length} result
              {filteredFaculty.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <SlidersHorizontal size={18} /> Sort by Experience
          </button>
        </div>

        {viewMode === "grid" ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.4fr_1fr_1fr_120px_140px] gap-4 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
              <span>Faculty</span>
              <span>Department</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {filteredFaculty.map((faculty, index) => (
              <FacultyRow
                key={faculty.id}
                faculty={faculty}
                isLast={index === filteredFaculty.length - 1}
              />
            ))}
          </div>
        )}

        {filteredFaculty.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
              <Search size={28} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-950">
              No faculty found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search keyword or selected filters.
            </p>
          </div>
        )}
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            onClick={() => setShowFilters(false)}
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close filters"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">Filters</h2>

              <button
                onClick={() => setShowFilters(false)}
                className="rounded-xl border border-slate-200 p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <MobileSelect
                label="Department"
                value={department}
                onChange={setDepartment}
                options={departments}
              />

              <MobileSelect
                label="Availability"
                value={status}
                onChange={setStatus}
                options={statuses}
              />
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="mt-5 w-full rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function FacultyCard({ faculty }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="h-16 w-16 rounded-3xl object-cover"
          />

          <div>
            <h3 className="text-lg font-bold text-slate-950">{faculty.name}</h3>

            <p className="text-sm text-slate-500 line-clamp-1">
              {faculty.role}
            </p>

            <div className="mt-2 flex items-center gap-1 text-sm font-bold text-amber-600">
              <Star size={15} className="fill-current" /> {faculty.rating}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoTile
          icon={BookOpen}
          label="Department"
          value={faculty.department}
        />
        <InfoTile
          icon={UsersRound}
          label="Class Teacher"
          value={faculty.classTeacher}
        />
        <InfoTile
          icon={BriefcaseBusiness}
          label="Experience"
          value={faculty.experience}
        />
        <InfoTile icon={Clock3} label="Next Class" value={faculty.nextClass} />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          Subjects
        </p>

        <div className="flex flex-wrap gap-2">
          {faculty.subjects.map((subject) => (
            <span
              key={subject}
              className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        

        <p className="flex items-center gap-2">
          <Mail size={16} className="text-slate-400" /> {faculty.email}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 ">
        <ActionButton icon={Phone} label="Call" />
      </div>
    </article>
  );
}

function FacultyRow({ faculty, isLast }) {
  return (
    <div
      className={`grid gap-4 px-5 py-4 lg:grid-cols-[1.4fr_1fr_1fr_120px_140px] lg:items-center ${
        !isLast ? "border-b border-slate-200" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="h-14 w-14 rounded-2xl object-cover"
        />

        <div>
          <h3 className="font-bold text-slate-950">{faculty.name}</h3>
          <p className="text-sm text-slate-500">{faculty.role}</p>
        </div>
      </div>

      <div>
        <p className="font-semibold text-slate-950">{faculty.department}</p>
        <p className="text-sm text-slate-500">{faculty.subjects.join(", ")}</p>
      </div>

      <div>
        <p className="font-semibold text-slate-950">{faculty.classTeacher}</p>
        <p className="text-sm text-slate-500">{faculty.room}</p>
      </div>

      <StatusBadge status={faculty.status} />

      <div className="flex gap-2">
        <button className="rounded-xl bg-indigo-600 p-2 text-white transition hover:bg-indigo-700">
          <Phone size={18} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    "In Class": "bg-blue-50 text-blue-700 ring-blue-200",
    "On Leave": "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${
        styles[status] || "bg-slate-50 text-slate-700 ring-slate-200"
      }`}
    >
      <CheckCircle2 size={14} /> {status}
    </span>
  );
}

function HeaderStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-xl font-black text-slate-950">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

function SelectBox({ value, onChange, options }) {
  return (
    <div className="relative min-w-47">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
    </div>
  );
}

function MobileSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <SelectBox value={value} onChange={onChange} options={options} />
    </label>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-3">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        <Icon size={16} />

        <p className="text-xs font-bold uppercase tracking-wide">{label}</p>
      </div>

      <p className="text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label }) {
  return (
    <button className="inline-flex items-center justify-center cursor-pointer gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
      <Icon size={17} /> {label}
    </button>
  );
}
