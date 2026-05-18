import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  LockKeyhole,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Kavita Sharma",
    subject: "English",
    className: "10-A",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 2,
    name: "Amit Verma",
    subject: "Mathematics",
    className: "10-A",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: 3,
    name: "Neha Singh",
    subject: "Science",
    className: "10-A",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
  },
];

const ratingFields = [
  {
    key: "teachingQuality",
    title: "Teaching Quality",
    description: "How clearly does the teacher explain topics?",
    icon: BookOpen,
  },
  {
    key: "communication",
    title: "Communication",
    description: "How well does the teacher communicate with students?",
    icon: MessageSquareText,
  },
  {
    key: "supportiveness",
    title: "Student Support",
    description: "How helpful is the teacher when students have doubts?",
    icon: HeartHandshake,
  },
  {
    key: "punctuality",
    title: "Punctuality",
    description: "Does the teacher take classes on time?",
    icon: CheckCircle2,
  },
  {
    key: "practicalLearning",
    title: "Practical Learning",
    description: "Does the teacher use examples, activities or practice work?",
    icon: Lightbulb,
  },
];

export default function TeacherFeedbackFormUI() {
  const [selectedTeacherId, setSelectedTeacherId] = useState(1);
  const [ratings, setRatings] = useState({
    teachingQuality: 4,
    communication: 5,
    supportiveness: 4,
    punctuality: 4,
    practicalLearning: 5,
  });
  const [recommendTeacher, setRecommendTeacher] = useState("yes");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comment, setComment] = useState(
    "Teacher explains concepts clearly and gives useful examples. More revision classes before exams will help students."
  );

  const selectedTeacher = teachers.find((teacher) => teacher.id === Number(selectedTeacherId));

  const averageRating = useMemo(() => {
    const values = Object.values(ratings);
    return (values.reduce((total, value) => total + value, 0) / values.length).toFixed(1);
  }, [ratings]);

  const handleRating = (key, value) => {
    setRatings((current) => ({ ...current, [key]: value }));
  };

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
                  <GraduationCap size={16} /> Student Feedback Portal
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Year-End Teacher Feedback
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Share your honest feedback about your teacher for this academic year.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Academic Year
              </p>
              <button className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-950">
                2026 - 2027 <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-950">Select Teacher</h2>
              <p className="mt-1 text-sm text-slate-500">
                Choose the teacher for whom you want to submit feedback.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {teachers.map((teacher) => {
                const isSelected = teacher.id === Number(selectedTeacherId);

                return (
                  <button
                    key={teacher.id}
                    onClick={() => setSelectedTeacherId(teacher.id)}
                    className={`rounded-3xl border p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40 ${
                      isSelected
                        ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-slate-950">{teacher.name}</h3>
                        <p className="text-sm text-slate-500">{teacher.subject}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        Class
                      </span>
                      <span className="text-sm font-bold text-slate-950">{teacher.className}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Rate Teacher Performance</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Give ratings from 1 to 5 stars for each area.
                </p>
              </div>
              <div className="w-fit rounded-2xl bg-indigo-50 px-4 py-3 text-indigo-700 ring-1 ring-indigo-100">
                <p className="text-xs font-bold uppercase tracking-wide">Average Rating</p>
                <p className="text-2xl font-black">{averageRating}/5</p>
              </div>
            </div>

            <div className="space-y-4">
              {ratingFields.map((field) => (
                <RatingRow
                  key={field.key}
                  field={field}
                  value={ratings[field.key]}
                  onRate={(value) => handleRating(field.key, value)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-slate-950">Additional Feedback</h2>
              <p className="mt-1 text-sm text-slate-500">
                Write your suggestions, appreciation or improvement points.
              </p>
            </div>

            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={6}
              maxLength={500}
              placeholder="Write your feedback here..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>Be respectful and honest in your feedback.</span>
              <span>{comment.length}/500</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 font-bold text-slate-950">Would you recommend this teacher?</p>
                <div className="flex gap-3">
                  <ChoiceButton
                    active={recommendTeacher === "yes"}
                    label="Yes"
                    onClick={() => setRecommendTeacher("yes")}
                  />
                  <ChoiceButton
                    active={recommendTeacher === "no"}
                    label="No"
                    onClick={() => setRecommendTeacher("no")}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(event) => setIsAnonymous(event.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div>
                  <p className="font-bold text-slate-950">Submit anonymously</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Your name will be hidden from the teacher feedback report.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <UserRound size={24} />
              </span>
              <div>
                <h2 className="text-lg font-bold text-slate-950">Feedback Summary</h2>
                <p className="text-sm text-slate-500">Review before submit</p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTeacher?.image}
                  alt={selectedTeacher?.name}
                  className="h-14 w-14 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-slate-950">{selectedTeacher?.name}</h3>
                  <p className="text-sm text-slate-500">
                    {selectedTeacher?.subject} • Class {selectedTeacher?.className}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 border-b border-slate-200 pb-5">
              <SummaryRow label="Academic Year" value="2026 - 2027" />
              <SummaryRow label="Feedback Type" value="Year-End" />
              <SummaryRow label="Average Rating" value={`${averageRating}/5`} />
              <SummaryRow label="Recommend" value={recommendTeacher === "yes" ? "Yes" : "No"} />
              <SummaryRow label="Identity" value={isAnonymous ? "Anonymous" : "Visible"} />
            </div>

            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-100">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck size={18} /> Safe Feedback
              </div>
              <p className="mt-1 text-sm leading-6">
                Feedback helps school management improve teaching quality and student experience.
              </p>
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
              <Send size={18} /> Submit Feedback
            </button>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              <LockKeyhole size={18} /> Save as Draft
            </button>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 text-indigo-900 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 shrink-0" size={22} />
              <div>
                <h3 className="font-bold">Feedback Guidelines</h3>
                <p className="mt-1 text-sm leading-6">
                  Give clear, polite and useful feedback. Avoid personal comments and focus on teaching, support and classroom experience.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function RatingRow({ field, value, onRate }) {
  const Icon = field.icon;

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Icon size={21} />
          </span>
          <div>
            <h3 className="font-bold text-slate-950">{field.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{field.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRate(star)}
              className="rounded-lg p-1 transition hover:bg-amber-50"
            >
              <Star
                size={24}
                className={star <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-bold text-slate-700">{value}/5</span>
        </div>
      </div>
    </div>
  );
}

function ChoiceButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold text-slate-950">{value}</span>
    </div>
  );
}
