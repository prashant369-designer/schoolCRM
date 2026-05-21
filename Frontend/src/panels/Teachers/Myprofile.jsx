import React, { useState } from "react";
import {
  User,
  Camera,
  GraduationCap,
  BookOpen,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Upload,
  FileText,
  Save,
} from "lucide-react";

export default function TeacherProfile() {
  const [photo, setPhoto] = useState(null);
  const [document, setDocument] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold md:text-3xl">My Profile</h1>
        <p className="mt-1 text-sm text-indigo-100">
          Manage your personal details, qualification, subject, experience and documents.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-indigo-100 text-indigo-600">
                {photo ? (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Teacher"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={55} />
                )}
              </div>

              <label className="absolute -bottom-3 -right-3 flex cursor-pointer items-center justify-center rounded-2xl bg-indigo-600 p-3 text-white shadow-md hover:bg-indigo-700">
                <Camera size={18} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-800">
              Prashant Sir
            </h2>
            <p className="text-sm text-slate-500">Mathematics Teacher</p>

            <div className="mt-5 grid w-full grid-cols-2 gap-3">
              <MiniBox title="Experience" value="3 Years" />
              <MiniBox title="Subject" value="Maths" />
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-slate-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputBox icon={<User />} label="Full Name" placeholder="Enter full name" />
            <InputBox icon={<GraduationCap />} label="Qualification" placeholder="B.Ed, M.Sc, B.Tech..." />
            <InputBox icon={<BookOpen />} label="Subject" placeholder="Mathematics" />
            <InputBox icon={<Briefcase />} label="Experience" placeholder="3 Years" />
            <InputBox icon={<Phone />} label="Phone Number" placeholder="+91 9876543210" />
            <InputBox icon={<Mail />} label="Email Address" placeholder="teacher@example.com" />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-semibold text-slate-600">
              Address
            </label>
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-4 top-4 text-slate-400"
              />
              <textarea
                rows="4"
                placeholder="Enter full address"
                className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 pl-11 text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button className="mt-5 flex items-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-700">
            <Save size={18} />
            Save Profile
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
          <FileText size={20} className="text-indigo-600" />
          Teacher Documents
        </h2>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-6 text-center hover:bg-indigo-100">
            <Upload size={32} className="mb-2 text-indigo-600" />
            <p className="text-sm font-bold text-slate-700">
              Upload Documents
            </p>
            <p className="text-xs text-slate-500">
              Degree, ID proof, certificates
            </p>

            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => setDocument(e.target.files[0])}
            />
          </label>

          <DocumentCard title="Qualification Certificate" file="degree.pdf" />
          <DocumentCard title="Experience Letter" file="experience.pdf" />
        </div>

        {document && (
          <p className="mt-4 text-sm font-semibold text-green-600">
            Selected: {document.name}
          </p>
        )}
      </div>
    </div>
  );
}

function InputBox({ icon, label, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-3.5 text-slate-400">{icon}</span>
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
        />
      </div>
    </div>
  );
}

function MiniBox({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <h3 className="mt-1 font-bold text-indigo-600">{value}</h3>
    </div>
  );
}

function DocumentCard({ title, file }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
      <div className="mb-3 rounded-2xl bg-indigo-100 p-3 text-indigo-600 w-fit">
        <FileText size={24} />
      </div>

      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{file}</p>

      <button className="mt-4 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
        View Document
      </button>
    </div>
  );
}