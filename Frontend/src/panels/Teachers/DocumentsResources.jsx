import React, { useState } from "react";
import {
  Upload,
  FileText,
  File,
  Video,
  BookOpen,
  Presentation,
  Search,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

const materials = [
  {
    id: 1,
    title: "Algebra Chapter Notes",
    type: "Notes",
    subject: "Mathematics",
    className: "10th A",
    file: "algebra-notes.pdf",
    uploadedAt: "20 May 2026",
  },
  {
    id: 2,
    title: "Science Presentation",
    type: "PPT",
    subject: "Science",
    className: "9th B",
    file: "science-presentation.pptx",
    uploadedAt: "19 May 2026",
  },
  {
    id: 3,
    title: "Computer Lecture Video",
    type: "Video",
    subject: "Computer",
    className: "11th A",
    file: "react-intro.mp4",
    uploadedAt: "18 May 2026",
  },
];

export default function StudyMaterial() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 rounded-3xl bg-linear-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              Study Material
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Upload notes, PDFs, PPTs, videos and syllabus for your students.
            </p>
          </div>

          <button className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-md hover:bg-indigo-50">
            + Upload Material
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<FileText />} title="Notes" value="24" color="bg-indigo-100 text-indigo-600" />
        <StatCard icon={<File />} title="PDFs" value="18" color="bg-green-100 text-green-600" />
        <StatCard icon={<Presentation />} title="PPTs" value="9" color="bg-orange-100 text-orange-600" />
        <StatCard icon={<Video />} title="Videos" value="12" color="bg-blue-100 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Upload Form */}
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
            <Upload size={20} className="text-indigo-600" />
            Upload Material
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Material title"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />

            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Select Type</option>
              <option>Notes</option>
              <option>PDF</option>
              <option>PPT</option>
              <option>Video</option>
              <option>Syllabus</option>
            </select>

            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Select Subject</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>English</option>
              <option>Computer</option>
            </select>

            <select className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
              <option>Select Class</option>
              <option>10th A</option>
              <option>9th B</option>
              <option>11th A</option>
              <option>12th C</option>
            </select>

            <textarea
              rows="4"
              placeholder="Short description..."
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
            />

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50 p-6 text-center hover:bg-indigo-100">
              <Upload size={32} className="mb-2 text-indigo-600" />
              <p className="text-sm font-bold text-slate-700">
                Upload file
              </p>
              <p className="text-xs text-slate-500">
                PDF, PPT, DOC, MP4 supported
              </p>

              <input
                type="file"
                className="hidden"
                accept=".pdf,.ppt,.pptx,.doc,.docx,video/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>

            {selectedFile && (
              <p className="text-sm font-semibold text-green-600">
                Selected: {selectedFile.name}
              </p>
            )}

            <button className="w-full rounded-2xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700">
              Publish Material
            </button>
          </div>
        </div>

        {/* Material List */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Uploaded Materials
            </h2>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-3.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search material..."
                className="w-full rounded-2xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 md:w-72"
              />
            </div>
          </div>

          <div className="space-y-4">
            {materials.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
                      {item.type === "Video" ? (
                        <Video size={22} />
                      ) : item.type === "PPT" ? (
                        <Presentation size={22} />
                      ) : (
                        <FileText size={22} />
                      )}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {item.subject} • {item.className}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.file} • Uploaded {item.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                      {item.type}
                    </span>

                    <button className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-indigo-100 hover:text-indigo-700">
                      <Eye size={17} />
                    </button>

                    <button className="rounded-xl bg-green-100 p-2 text-green-700 hover:bg-green-200">
                      <Download size={17} />
                    </button>

                    <button className="rounded-xl bg-red-100 p-2 text-red-700 hover:bg-red-200">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Syllabus Card */}
          <div className="mt-5 rounded-3xl bg-linear-to-r from-slate-900 to-indigo-700 p-5 text-white">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-3">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold">Class 10th Syllabus</h3>
                  <p className="text-sm text-indigo-100">
                    Complete subject-wise syllabus uploaded for students.
                  </p>
                </div>
              </div>

              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-50">
                View Syllabus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl p-3 ${color}`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        </div>
      </div>
    </div>
  );
}