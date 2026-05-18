import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Medal,
  Printer,
  Search,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";

const exams = ["Half Yearly Exam", "Unit Test - 2", "Final Exam"];

const subjects = [
  {
    id: 1,
    subject: "English",
    teacher: "Mrs. Kavita Sharma",
    maxMarks: 100,
    obtainedMarks: 88,
    grade: "A",
    remarks: "Excellent communication and writing skills.",
  },
  {
    id: 2,
    subject: "Mathematics",
    teacher: "Mr. Amit Verma",
    maxMarks: 100,
    obtainedMarks: 76,
    grade: "B+",
    remarks: "Good performance. Improve problem solving speed.",
  },
  {
    id: 3,
    subject: "Science",
    teacher: "Mrs. Neha Singh",
    maxMarks: 100,
    obtainedMarks: 91,
    grade: "A+",
    remarks: "Strong conceptual understanding.",
  },
  {
    id: 4,
    subject: "Social Science",
    teacher: "Mr. Rajeev Kumar",
    maxMarks: 100,
    obtainedMarks: 82,
    grade: "A",
    remarks: "Very good answer presentation.",
  },
  {
    id: 5,
    subject: "Computer Science",
    teacher: "Ms. Priya Jain",
    maxMarks: 100,
    obtainedMarks: 95,
    grade: "A+",
    remarks: "Outstanding practical and theory performance.",
  },
];

const previousResults = [
  {
    exam: "Unit Test - 1",
    date: "12 Aug 2026",
    percentage: 79.4,
    grade: "B+",
    status: "Passed",
  },
  {
    exam: "Quarterly Exam",
    date: "28 Sep 2026",
    percentage: 82.8,
    grade: "A",
    status: "Passed",
  },
];

const getGradeBadge = (grade) => {
  if (grade.includes("A")) return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  if (grade.includes("B")) return "bg-blue-50 text-blue-700 ring-blue-200";
  return "bg-amber-50 text-amber-700 ring-amber-200";
};

export default function ViewResultUI() {
  const [selectedExam, setSelectedExam] = useState("Half Yearly Exam");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubjects = useMemo(() => {
    return subjects.filter((item) =>
      item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalMarks = subjects.reduce((total, item) => total + item.maxMarks, 0);
  const obtainedMarks = subjects.reduce((total, item) => total + item.obtainedMarks, 0);
  const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(1);
  const overallGrade = Number(percentage) >= 90 ? "A+" : Number(percentage) >= 80 ? "A" : "B+";
  const rank = 4;

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
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-indigo-600">
                  <GraduationCap size={16} /> Student Academic Portal
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  View Result
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Check subject-wise marks, grade, percentage and result history.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Select Exam
                </p>
                <select
                  value={selectedExam}
                  onChange={(event) => setSelectedExam(event.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                >
                  {exams.map((exam) => (
                    <option key={exam}>{exam}</option>
                  ))}
                </select>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
                <Download size={18} /> Download Result
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=160&q=80"
                alt="Student"
                className="h-16 w-16 rounded-3xl object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-950">Rahul Sharma</h2>
                <p className="text-sm text-slate-500">Class 10-A • Roll No. 24</p>
                <p className="mt-1 text-xs font-medium text-indigo-600">Student ID: STU-2026-104</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <StudentInfo label="Father" value="Ramesh Sharma" />
              <StudentInfo label="Session" value="2026 - 2027" />
              <StudentInfo label="Section" value="A" />
              <StudentInfo label="DOB" value="14 Jan 2011" />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Result Summary</h2>
                <p className="text-sm text-slate-500">{selectedExam}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Award size={22} />
              </span>
            </div>

            <div className="space-y-4">
              <SummaryCard icon={BookOpenCheck} label="Total Marks" value={`${obtainedMarks}/${totalMarks}`} />
              <SummaryCard icon={TrendingUp} label="Percentage" value={`${percentage}%`} />
              <SummaryCard icon={Medal} label="Overall Grade" value={overallGrade} />
              <SummaryCard icon={Sparkles} label="Class Rank" value={`#${rank}`} />
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-100">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={18} /> Passed
              </div>
              <p className="mt-1 text-sm">
                Congratulations! You have successfully passed this examination.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <TopStat icon={FileText} label="Exam" value={selectedExam} />
            <TopStat icon={CalendarDays} label="Result Date" value="07 May 2026" />
            <TopStat icon={UserRound} label="Attendance" value="92%" />
            <TopStat icon={Award} label="Status" value="Passed" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Subject-wise Result</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Detailed marks, grades and teacher remarks.
                </p>
              </div>

              <div className="relative w-full md:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search subject..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="hidden grid-cols-[1.2fr_1fr_120px_100px_1.3fr] gap-4 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
                <span>Subject</span>
                <span>Teacher</span>
                <span>Marks</span>
                <span>Grade</span>
                <span>Remarks</span>
              </div>

              {filteredSubjects.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid gap-3 px-4 py-4 lg:grid-cols-[1.2fr_1fr_120px_100px_1.3fr] lg:items-center ${
                    index !== filteredSubjects.length - 1 ? "border-b border-slate-200" : ""
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-950">{item.subject}</p>
                    <p className="text-xs text-slate-500 lg:hidden">{item.teacher}</p>
                  </div>
                  <p className="hidden text-sm text-slate-600 lg:block">{item.teacher}</p>
                  <p className="text-sm font-bold text-slate-950">
                    {item.obtainedMarks}/{item.maxMarks}
                  </p>
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ${getGradeBadge(
                      item.grade
                    )}`}
                  >
                    {item.grade}
                  </span>
                  <p className="text-sm text-slate-500">{item.remarks}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Previous Results</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Compare your performance with earlier exams.
                </p>
              </div>
              <button className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                View All <ChevronDown size={16} />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {previousResults.map((result) => (
                <div key={result.exam} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-950">{result.exam}</h3>
                      <p className="mt-1 text-sm text-slate-500">Published on {result.date}</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                      {result.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Percentage</p>
                      <p className="text-xl font-bold text-slate-950">{result.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Grade</p>
                      <p className="text-xl font-bold text-slate-950">{result.grade}</p>
                    </div>
                    <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Printer size={18} /> Print Result
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800">
              <Download size={18} /> Download Report Card
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function StudentInfo({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={20} />
        </span>
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
      <p className="font-bold text-slate-950">{value}</p>
    </div>
  );
}

function TopStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="mt-2 text-lg font-bold text-slate-950">{value}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={21} />
        </span>
      </div>
    </div>
  );
}
