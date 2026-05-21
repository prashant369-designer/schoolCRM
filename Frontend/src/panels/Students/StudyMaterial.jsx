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
    file: "algebra-notes.pdf",
    uploadedAt: "20 May 2026",
  },
  {
    id: 2,
    title: "Science Presentation",
    type: "PPT",
    subject: "Science",
    file: "science-presentation.pptx",
    uploadedAt: "19 May 2026",
  },
  {
    id: 3,
    title: "Computer Lecture Video",
    type: "Video",
    subject: "Computer",
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
              View notes, PDFs, PPTs, videos and syllabus.
            </p>
          </div>
        </div>
      </div>

             {/* Material List */}
        <div className="rounded-3xl bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <h2 className="text-lg font-bold text-slate-800">
              Materials
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
                  </div>
                </div>
              </div>
            ))}
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