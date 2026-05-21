import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  User,
  CalendarDays,
  CircleUser,
  IdCard,
  Camera,
  Mail,
  Settings,
  FileText,
  Briefcase,
  Code,
  Phone,
  Globe,
  MapPin,
  GraduationCap,
  Users,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function StudentDetails() {
  const base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const tabs = [
    { name: "Personal Details", icon: User },
    { name: "Communication Details", icon: MapPin },
    { name: "Educational Details", icon: GraduationCap },
    { name: "My Documents", icon: FileText },
  ];

  const [activeTab, setActiveTab] = useState("Personal Details");
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/studentsdetails/getstudentdetailsbyauthid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Student details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const safe = (value) => value || "N/A";

  const parseSubjects = (subjects) => {
    try {
      const parsed = JSON.parse(subjects);
      return Array.isArray(parsed) ? parsed.join(", ") : subjects;
    } catch {
      return subjects || "N/A";
    }
  };

  const Detail = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
      <div className="mt-0.5 rounded-lg bg-blue-100 p-2 text-blue-700">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 wrap-break-words text-sm font-semibold text-slate-700">
          {safe(value)}
        </p>
      </div>
    </div>
  );

  const Section = ({ title, icon: Icon, children, color = "blue" }) => {
    const colors = {
      blue: "from-blue-600 to-indigo-600",
      green: "from-emerald-500 to-teal-600",
      sky: "from-sky-500 to-cyan-600",
      purple: "from-purple-600 to-violet-600",
    };

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className={`bg-linear-to-r ${colors[color]} px-5 py-4`}>
          <div className="flex items-center gap-3 text-white">
            <Icon size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wide">
              {title}
            </h2>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow">
          <Loader2 className="animate-spin text-blue-600" />
          <p className="font-semibold text-slate-600">
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  if (!studentDetails) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Student details not found.
      </div>
    );
  }

  const { auth, details, contact, education, parents,classsection,emergency,documents } = studentDetails;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium text-blue-100">
              Student ERP Portal
            </p>
            <h1 className="mt-1 text-2xl font-bold md:text-3xl">
              {safe(details?.first_name)} {safe(details?.last_name)}
            </h1>
            <p className="mt-2 text-sm text-blue-100">
              {safe(classsection.classname)} - Section {safe(classsection?.section)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-blue-100">Roll No</p>
              <p className="font-bold">{safe(details?.roll)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-blue-100">Library Code</p>
              <p className="font-bold">{safe(details?.library_code)}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-blue-100">Gender</p>
              <p className="font-bold">{safe(details?.gender)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-3 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex min-w-fit items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={17} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Personal Details */}
      {activeTab === "Personal Details" && (
        <div className="space-y-6">
          <Section title="Personal Details" icon={User} color="blue">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Detail icon={User} label="Name" value={`${details?.first_name} ${details?.last_name}`} />
              <Detail icon={CalendarDays} label="DOB" value={details?.date_of_birth} />
              <Detail icon={CircleUser} label="Gender" value={details?.gender} />
              <Detail icon={IdCard} label="Aadhar No" value={details?.aadhar_no} />
              <Detail icon={Camera} label="Category" value={details?.category} />
              <Detail icon={Mail} label="Personal Email" value={auth?.mailid} />
              <Detail icon={Settings} label="University Roll" value={details?.roll} />
              <Detail icon={Briefcase} label="Course" value={`${classsection?.classname} - ${classsection?.section}`} />
              <Detail icon={Code} label="Library Code" value={details?.library_code} />
              <Detail icon={Phone} label="Contact No" value={contact?.primary_phone} />
              <Detail icon={Globe} label="Official Email" value="prashant.gla_cs21@gla.ac.in" />
            </div>
          </Section>

          <Section title="Parents Details" icon={Users} color="green">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Detail icon={User} label="Father's Name" value={parents?.father_name} />
              <Detail icon={Briefcase} label="Father's Occupation" value={parents?.father_occupation} />
              <Detail icon={GraduationCap} label="Father's Qualification" value={parents?.FathersQalification} />
              <Detail icon={Mail} label="Father's Email" value={parents?.Fatheremail} />
              <Detail icon={Phone} label="Father Contact" value={parents?.father_contact} />
              <Detail icon={User} label="Mother's Name" value={parents?.mother_name} />
              <Detail icon={Briefcase} label="Mother's Occupation" value={parents?.mother_occupation} />
              <Detail icon={GraduationCap} label="Mother's Qualification" value={parents?.Motherqualification} />
              <Detail icon={Mail} label="Mother's Email" value={parents?.Motheremail} />
              <Detail icon={Phone} label="Mother Contact" value={parents?.mother_contact} />
            </div>
          </Section>
        </div>
      )}

      {/* Communication Details */}
      {activeTab === "Communication Details" && (
        <div className="space-y-6">
          <Section title="Present Address" icon={MapPin} color="sky">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Detail icon={MapPin} label="Address Line 1" value={contact?.AddressLine} />
              <Detail icon={MapPin} label="Post + Address Line 2" value={contact?.PostAddressLine} />
              <Detail icon={MapPin} label="Tehsil/Admin Division" value={contact?.TensilAdmDivison} />
              <Detail icon={MapPin} label="District" value={contact?.distict} />
              <Detail icon={Globe} label="Country" value={contact?.Country} />
              <Detail icon={FileText} label="PIN" value={contact?.PIN} />
              <Detail icon={MapPin} label="State" value={contact?.State} />
              <Detail icon={Phone} label="Telephone" value={contact?.Telephone} />
            </div>
          </Section>

          <Section title="Emergency Contact" icon={ShieldAlert} color="purple">
            <div className="grid gap-4 md:grid-cols-2">
              <Detail icon={User} label="Person Name" value={emergency.person_name} />
              <Detail icon={CircleUser} label="Relation" value={emergency.Relation} />
              <Detail icon={MapPin} label="City" value={emergency.City} />
              <Detail icon={Phone} label="Contact No" value={emergency.Contact_No} />
            </div>
          </Section>
        </div>
      )}

      {/* Educational Details */}
      {activeTab === "Educational Details" && (
        <div className="space-y-6">
          {education?.map((educational, index) => (
            <Section
              key={index}
              title={`${educational.standard} Standard`}
              icon={GraduationCap}
              color="green"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Detail icon={FileText} label="Stream" value={educational.stream} />
                <Detail icon={GraduationCap} label="Board/University" value={educational.board} />
                <Detail icon={IdCard} label="Roll No" value={educational.roll_no || "8892761"} />
                <Detail icon={CalendarDays} label="Passing Year" value={educational.passing_year} />
                <Detail icon={FileText} label="Subjects" value={parseSubjects(educational.subjects)} />
                <Detail icon={FileText} label="Max Marks" value={educational.max_marks} />
                <Detail icon={FileText} label="Obtained Marks" value={educational.obtained_marks} />
                <Detail icon={FileText} label="Percentage" value={`${educational.percentage}%`} />
              </div>
            </Section>
          ))}
        </div>
      )}

      {/* Documents */}
  {/* Documents */}
{activeTab === "My Documents" && (
  <Section title="My Documents" icon={FileText} color="blue">
    {documents && documents.length > 0 ? (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((doc) => (
          <div
            key={doc.document_id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <FileText size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    {doc.document_type}
                  </h3>
                  <p className="text-sm capitalize text-slate-500">
                    {doc.doc_category}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  doc.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : doc.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {doc.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <strong>Uploaded:</strong>{" "}
                {doc.created_at
                  ? new Date(doc.created_at).toLocaleDateString()
                  : "N/A"}
              </p>

              <p>
                <strong>Approved Date:</strong>{" "}
                {doc.approved_date
                  ? new Date(doc.approved_date).toLocaleDateString()
                  : "Not approved yet"}
              </p>
            </div>

            <a
              href={`http://localhost:3000/uploads/${doc.document_upload}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              View Document
            </a>
          </div>
        ))}
      </div>
    ) : (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <FileText className="mx-auto mb-3 text-slate-400" size={42} />
        <h3 className="text-lg font-bold text-slate-700">
          No documents uploaded yet
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Aadhaar, marksheets, certificates and ID documents can appear here.
        </p>
      </div>
    )}
  </Section>
)}
    </div>
  );
}