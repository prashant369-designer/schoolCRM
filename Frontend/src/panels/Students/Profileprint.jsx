import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Printer,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Users,
  CalendarDays,
  IdCard,
  BookOpen,
  Loader2,
} from "lucide-react";

function Profileprint() {
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  const base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

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

      setStudentDetails(response.data.data);
    } catch (error) {
      console.error("Student details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow">
          <Loader2 className="animate-spin text-blue-600" />
          <p className="font-semibold text-slate-600">
            Loading student profile...
          </p>
        </div>
      </div>
    );
  }

  if (!studentDetails) {
    return (
      <div className="min-h-screen bg-slate-100 p-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Student details not found.
        </div>
      </div>
    );
  }

  const auth = studentDetails.auth || {};
  const details = studentDetails.details || {};
  const contact = studentDetails.contact || {};
  const education = studentDetails.education || [];
  const parents = studentDetails.parents || {};
  const classsection = studentDetails.classsection || {};

  return (
    <div className="min-h-screen bg-slate-100 p-4 print:bg-white print:p-0">
      {/* Action Bar */}
      <div className="mx-auto mb-4 flex max-w-5xl justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>
      </div>

      {/* Printable Area */}
      <div
        ref={printRef}
        id="printableArea"
        className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl print:max-w-full print:rounded-none print:shadow-none"
      >
        {/* Header */}
        <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 px-8 py-7 text-white print:bg-blue-700">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-blue-100">
                School ERP System
              </p>
              <h1 className="mt-1 text-3xl font-bold">Student Profile</h1>
              <p className="mt-2 text-sm text-blue-100">
                Registration No: {auth.registration_no || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-white/15 px-5 py-4 text-sm backdrop-blur print:border print:border-white/40">
              <p className="text-blue-100">Generated Profile</p>
              <p className="font-bold">{new Date().toLocaleDateString("en-IN")}</p>
            </div>
          </div>
        </div>

        <div className="p-8 print:p-5">
          {/* Student Summary */}
          <div className="mb-8 grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-[160px_1fr] print:break-inside-avoid">
            <div className="flex justify-center md:justify-start">
              <img
                src={details.profile_image}
                alt="Profile"
                className="h-36 w-36 rounded-2xl border-4 border-white object-cover shadow-md"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {details.first_name || "N/A"} {details.last_name || ""}
              </h2>

              <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                <MiniInfo icon={GraduationCap} label="Class" value={`${classsection.classname || "N/A"} - ${classsection.section || "N/A"}`} />
                <MiniInfo icon={IdCard} label="Roll No" value={details.roll} />
                <MiniInfo icon={User} label="Gender" value={details.gender} />
                <MiniInfo icon={Mail} label="Email" value={auth.mailid} />
                <MiniInfo icon={Phone} label="Phone" value={contact.primary_phone} />
                <MiniInfo icon={BookOpen} label="Library Code" value={details.library_code} />
              </div>
            </div>
          </div>

          <Section title="Personal Details" icon={User}>
            <Info label="Date of Birth" value={formatDate(details.date_of_birth)} />
            <Info label="Religion" value={details.religion} />
            <Info label="Category" value={details.category} />
            <Info label="Aadhar No" value={details.aadhar_no} />
            <Info label="PAN No" value={details.pan_no} />
            <Info label="Library Code" value={details.library_code} />
            <Info label="Admission Date" value={formatDate(details.admission_date)} />
          </Section>

          <Section title="Contact Details" icon={MapPin}>
            <Info label="Primary Phone" value={contact.primary_phone} />
            <Info label="Secondary Phone" value={contact.secondary_phone} />
            <Info label="Primary Email" value={contact.primary_email} />
            <Info label="Secondary Email" value={contact.secondary_email} />
            <Info label="Address" value={contact.AddressLine} />
            <Info label="Street Address" value={contact.PostAddressLine} />
            <Info label="Tehsil/Admin Division" value={contact.TensilAdmDivison} />
            <Info label="Country" value={contact.Country} />
            <Info label="State" value={contact.State} />
            <Info label="District" value={contact.distict} />
            <Info label="Telephone" value={contact.Telephone} />
            <Info label="PIN" value={contact.PIN} />
          </Section>

          <Section title="Parent Details" icon={Users}>
            <Info label="Father Name" value={parents.father_name} />
            <Info label="Father Contact" value={parents.father_contact} />
            <Info label="Father Email" value={parents.Fatheremail} />
            <Info label="Father Occupation" value={parents.father_occupation} />
            <Info label="Father Qualification" value={parents.FathersQalification} />

            <Info label="Mother Name" value={parents.mother_name} />
            <Info label="Mother Contact" value={parents.mother_contact} />
            <Info label="Mother Email" value={parents.Motheremail} />
            <Info label="Mother Occupation" value={parents.mother_occupation} />
            <Info label="Mother Qualification" value={parents.Motherqualification} />
          </Section>

          {/* Education Details */}
          <div className="mb-8 break-inside-avoid">
            <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
                <GraduationCap size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Education Details
              </h2>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <Th>Standard</Th>
                    <Th>Stream</Th>
                    <Th>Board</Th>
                    <Th>Year</Th>
                    <Th>Subjects</Th>
                    <Th>Marks</Th>
                    <Th>Percentage</Th>
                  </tr>
                </thead>

                <tbody>
                  {education.length > 0 ? (
                    education.map((edu) => (
                      <tr
                        key={edu.student_edu_id}
                        className="border-t border-slate-200 hover:bg-slate-50 print:hover:bg-white"
                      >
                        <Td>{edu.standard}</Td>
                        <Td>{edu.stream}</Td>
                        <Td>{edu.board}</Td>
                        <Td>{edu.passing_year}</Td>
                        <Td>{safeSubjects(edu.subjects)}</Td>
                        <Td>
                          {edu.obtained_marks || "N/A"}/{edu.max_marks || "N/A"}
                        </Td>
                        <Td>
                          <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">
                            {edu.percentage || "N/A"}%
                          </span>
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="p-5 text-center text-slate-500">
                        No education details found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-slate-200 pt-5 text-center text-xs text-slate-500">
            <p className="font-semibold">Generated by School ERP System</p>
            <p>This is a computer-generated student profile.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function safeSubjects(subjects) {
  try {
    const parsed = JSON.parse(subjects);
    return Array.isArray(parsed) ? parsed.join(", ") : subjects;
  } catch {
    return subjects || "N/A";
  }
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="mb-8 break-inside-avoid">
      <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
          <Icon size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2">
        {children}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="break-inside-avoid rounded-2xl border border-slate-200 bg-white p-4 shadow-sm print:shadow-none">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 wrap-break-words text-sm font-bold text-slate-700">
        {value || "N/A"}
      </p>
    </div>
  );
}

function MiniInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm print:border print:shadow-none">
      <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-700">{value || "N/A"}</p>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">
      {children}
    </th>
  );
}

function Td({ children }) {
  return <td className="px-4 py-3 text-slate-700">{children || "N/A"}</td>;
}

export default Profileprint;