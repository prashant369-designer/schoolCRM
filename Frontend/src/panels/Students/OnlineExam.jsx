// import React, { useMemo, useState } from "react";
// import {
//   AlertTriangle,
//   ArrowLeft,
//   ArrowRight,
//   BookOpen,
//   CheckCircle2,
//   ChevronDown,
//   Clock3,
//   Eye,
//   FileQuestion,
//   Flag,
//   GraduationCap,
//   ListChecks,
//   LockKeyhole,
//   Menu,
//   MonitorCheck,
//   Save,
//   ShieldCheck,
//   Timer,
//   UserRound,
//   X,
// } from "lucide-react";

// const questions = [
//   {
//     id: 1,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Which organelle is known as the powerhouse of the cell?",
//     options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
//   },
//   {
//     id: 2,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "What is the chemical symbol of Sodium?",
//     options: ["So", "Na", "S", "Sd"],
//   },
//   {
//     id: 3,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Which gas is most abundant in Earth’s atmosphere?",
//     options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
//   },
//   {
//     id: 4,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Which part of the plant prepares food?",
//     options: ["Root", "Stem", "Leaf", "Flower"],
//   },
//   {
//     id: 5,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "The SI unit of force is:",
//     options: ["Joule", "Newton", "Watt", "Pascal"],
//   },
//   {
//     id: 6,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Which vitamin is produced in the skin in sunlight?",
//     options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
//   },
//   {
//     id: 7,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Water boils at what temperature at sea level?",
//     options: ["90°C", "100°C", "110°C", "120°C"],
//   },
//   {
//     id: 8,
//     subject: "Science",
//     type: "Multiple Choice",
//     marks: 1,
//     question: "Which blood cells help in clotting?",
//     options: ["RBC", "WBC", "Platelets", "Plasma"],
//   },
// ];

// export default function OnlineExamUI() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState({ 1: "Mitochondria", 3: "Nitrogen" });
//   const [markedForReview, setMarkedForReview] = useState([4]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showSubmitModal, setShowSubmitModal] = useState(false);

//   const currentQuestion = questions[currentIndex];

//   const answeredCount = Object.keys(answers).length;
//   const reviewCount = markedForReview.length;
//   const notVisitedCount = questions.length - answeredCount - reviewCount;

//   const progress = useMemo(() => {
//     return Math.round((answeredCount / questions.length) * 100);
//   }, [answeredCount]);

//   const handleAnswer = (option) => {
//     setAnswers((current) => ({ ...current, [currentQuestion.id]: option }));
//   };

//   const handleMarkForReview = () => {
//     setMarkedForReview((current) =>
//       current.includes(currentQuestion.id)
//         ? current.filter((id) => id !== currentQuestion.id)
//         : [...current, currentQuestion.id]
//     );
//   };

//   const goToQuestion = (index) => {
//     setCurrentIndex(index);
//     setSidebarOpen(false);
//   };

//   const goNext = () => {
//     if (currentIndex < questions.length - 1) setCurrentIndex((value) => value + 1);
//   };

//   const goPrevious = () => {
//     if (currentIndex > 0) setCurrentIndex((value) => value - 1);
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-900">
//       <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-3">
//             <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50">
//               <ArrowLeft size={20} />
//             </button>

//             <div>
//               <p className="flex items-center gap-2 text-sm font-medium text-indigo-600">
//                 <GraduationCap size={16} /> Student Exam Portal
//               </p>
//               <h1 className="text-lg font-bold text-slate-950 sm:text-2xl">Online Exam</h1>
//             </div>
//           </div>

//           <div className="hidden items-center gap-3 lg:flex">
//             <ExamTimer />
//             <button
//               onClick={() => setShowSubmitModal(true)}
//               className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
//             >
//               <LockKeyhole size={18} /> Submit Exam
//             </button>
//           </div>

//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
//           >
//             <Menu size={22} />
//           </button>
//         </div>
//       </header>

//       <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
//         <div className="space-y-6">
//           <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             <TopCard icon={BookOpen} label="Subject" value="Science" />
//             <TopCard icon={FileQuestion} label="Questions" value={`${questions.length} Total`} />
//             <TopCard icon={ListChecks} label="Answered" value={`${answeredCount}/${questions.length}`} />
//             <TopCard icon={MonitorCheck} label="Mode" value="Live Exam" />
//           </div>

//           <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//             <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
//               <div>
//                 <div className="mb-2 flex flex-wrap items-center gap-2">
//                   <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">
//                     Question {currentIndex + 1} of {questions.length}
//                   </span>
//                   <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
//                     {currentQuestion.type}
//                   </span>
//                   <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
//                     {currentQuestion.marks} Mark
//                   </span>
//                 </div>
//                 <h2 className="text-xl font-bold leading-relaxed text-slate-950">
//                   {currentQuestion.question}
//                 </h2>
//               </div>

//               <button
//                 onClick={handleMarkForReview}
//                 className={`inline-flex w-fit items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
//                   markedForReview.includes(currentQuestion.id)
//                     ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200"
//                     : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//                 }`}
//               >
//                 <Flag size={18} />
//                 {markedForReview.includes(currentQuestion.id) ? "Marked" : "Mark Review"}
//               </button>
//             </div>

//             <div className="space-y-3">
//               {currentQuestion.options.map((option, index) => {
//                 const isSelected = answers[currentQuestion.id] === option;

//                 return (
//                   <button
//                     key={option}
//                     onClick={() => handleAnswer(option)}
//                     className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/40 ${
//                       isSelected
//                         ? "border-indigo-400 bg-indigo-50 ring-1 ring-indigo-200"
//                         : "border-slate-200 bg-white"
//                     }`}
//                   >
//                     <span
//                       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
//                         isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {String.fromCharCode(65 + index)}
//                     </span>
//                     <span className="font-semibold text-slate-800">{option}</span>
//                     {isSelected && <CheckCircle2 className="ml-auto text-indigo-600" size={21} />}
//                   </button>
//                 );
//               })}
//             </div>

//             <div className="mt-6 flex flex-col justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
//               <button
//                 onClick={() => {
//                   setAnswers((current) => {
//                     const next = { ...current };
//                     delete next[currentQuestion.id];
//                     return next;
//                   });
//                 }}
//                 className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
//               >
//                 Clear Response
//               </button>

//               <div className="flex flex-col gap-3 sm:flex-row">
//                 <button
//                   onClick={goPrevious}
//                   disabled={currentIndex === 0}
//                   className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   <ArrowLeft size={18} /> Previous
//                 </button>
//                 <button
//                   onClick={goNext}
//                   disabled={currentIndex === questions.length - 1}
//                   className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Save & Next <ArrowRight size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
//             <div className="flex items-start gap-3">
//               <AlertTriangle className="mt-0.5 shrink-0" size={22} />
//               <div>
//                 <h3 className="font-bold">Exam Instructions</h3>
//                 <p className="mt-1 text-sm leading-6">
//                   Do not refresh the page or close the browser during the exam. Your selected answers are saved locally in this static UI demo.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <aside className="hidden space-y-6 lg:block">
//           <ExamSidePanel
//             questions={questions}
//             currentIndex={currentIndex}
//             answers={answers}
//             markedForReview={markedForReview}
//             progress={progress}
//             answeredCount={answeredCount}
//             reviewCount={reviewCount}
//             notVisitedCount={notVisitedCount}
//             goToQuestion={goToQuestion}
//             onSubmit={() => setShowSubmitModal(true)}
//           />
//         </aside>
//       </section>

//       {sidebarOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="absolute inset-0 bg-slate-950/40"
//             aria-label="Close sidebar"
//           />
//           <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto bg-white p-4 shadow-2xl">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-bold text-slate-950">Exam Panel</h2>
//               <button onClick={() => setSidebarOpen(false)} className="rounded-xl border border-slate-200 p-2">
//                 <X size={20} />
//               </button>
//             </div>
//             <ExamSidePanel
//               questions={questions}
//               currentIndex={currentIndex}
//               answers={answers}
//               markedForReview={markedForReview}
//               progress={progress}
//               answeredCount={answeredCount}
//               reviewCount={reviewCount}
//               notVisitedCount={notVisitedCount}
//               goToQuestion={goToQuestion}
//               onSubmit={() => setShowSubmitModal(true)}
//             />
//           </div>
//         </div>
//       )}

//       {showSubmitModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
//           <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
//               <LockKeyhole size={26} />
//             </div>
//             <h2 className="text-xl font-bold text-slate-950">Submit Exam?</h2>
//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               You have answered {answeredCount} out of {questions.length} questions. Once submitted, you cannot change your answers.
//             </p>

//             <div className="mt-5 grid grid-cols-3 gap-3">
//               <MiniStat label="Answered" value={answeredCount} />
//               <MiniStat label="Review" value={reviewCount} />
//               <MiniStat label="Pending" value={questions.length - answeredCount} />
//             </div>

//             <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <button
//                 onClick={() => setShowSubmitModal(false)}
//                 className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
//               >
//                 Continue Exam
//               </button>
//               <button className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
//                 Yes, Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// function ExamTimer() {
//   return (
//     <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
//       <Timer size={20} />
//       <div>
//         <p className="text-xs font-bold uppercase tracking-wide">Time Left</p>
//         <p className="text-lg font-black leading-none">01:24:36</p>
//       </div>
//     </div>
//   );
// }

// function ExamSidePanel({
//   questions,
//   currentIndex,
//   answers,
//   markedForReview,
//   progress,
//   answeredCount,
//   reviewCount,
//   notVisitedCount,
//   goToQuestion,
//   onSubmit,
// }) {
//   return (
//     <div className="space-y-6">
//       <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex items-center gap-3">
//           <img
//             src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80"
//             alt="Student"
//             className="h-12 w-12 rounded-2xl object-cover"
//           />
//           <div>
//             <h2 className="font-bold text-slate-950">Rahul Sharma</h2>
//             <p className="text-sm text-slate-500">Class 10-A • Roll No. 24</p>
//           </div>
//         </div>

//         <div className="mt-5 grid grid-cols-2 gap-3">
//           <InfoBox label="Exam" value="Half Yearly" />
//           <InfoBox label="Subject" value="Science" />
//           <InfoBox label="Duration" value="2 Hours" />
//           <InfoBox label="Total Marks" value="80" />
//         </div>
//       </div>

//       <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-slate-950">Progress</h2>
//           <span className="text-sm font-bold text-indigo-600">{progress}%</span>
//         </div>
//         <div className="h-3 overflow-hidden rounded-full bg-slate-100">
//           <div className="h-full rounded-full bg-indigo-600" style={{ width: `${progress}%` }} />
//         </div>

//         <div className="mt-5 grid grid-cols-3 gap-3">
//           <StatusBox label="Answered" value={answeredCount} className="bg-emerald-50 text-emerald-700 ring-emerald-200" />
//           <StatusBox label="Review" value={reviewCount} className="bg-amber-50 text-amber-700 ring-amber-200" />
//           <StatusBox label="Not Visit" value={Math.max(notVisitedCount, 0)} className="bg-slate-50 text-slate-700 ring-slate-200" />
//         </div>
//       </div>

//       <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-bold text-slate-950">Question Navigator</h2>
//           <button className="flex items-center gap-1 text-sm font-semibold text-slate-500">
//             All <ChevronDown size={16} />
//           </button>
//         </div>

//         <div className="grid grid-cols-5 gap-2">
//           {questions.map((question, index) => {
//             const isCurrent = currentIndex === index;
//             const isAnswered = Boolean(answers[question.id]);
//             const isReview = markedForReview.includes(question.id);

//             return (
//               <button
//                 key={question.id}
//                 onClick={() => goToQuestion(index)}
//                 className={`h-11 rounded-2xl text-sm font-bold transition ${
//                   isCurrent
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
//                     : isReview
//                     ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200"
//                     : isAnswered
//                     ? "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200"
//                     : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             );
//           })}
//         </div>

//         <div className="mt-5 space-y-2 text-xs font-medium text-slate-600">
//           <Legend color="bg-indigo-600" label="Current Question" />
//           <Legend color="bg-emerald-500" label="Answered" />
//           <Legend color="bg-amber-500" label="Marked for Review" />
//           <Legend color="bg-slate-300" label="Not Visited" />
//         </div>
//       </div>

//       <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-100">
//           <ShieldCheck className="mt-0.5 shrink-0" size={20} />
//           <p className="text-sm leading-6">
//             Your exam session is secure. Keep your device connected to the internet.
//           </p>
//         </div>

//         <button
//           onClick={onSubmit}
//           className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
//         >
//           <Save size={18} /> Submit Exam
//         </button>
//       </div>
//     </div>
//   );
// }

// function TopCard({ icon: Icon, label, value }) {
//   return (
//     <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{label}</p>
//           <h3 className="mt-2 text-lg font-bold text-slate-950">{value}</h3>
//         </div>
//         <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
//           <Icon size={21} />
//         </span>
//       </div>
//     </div>
//   );
// }

// function InfoBox({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-slate-50 p-3">
//       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
//       <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
//     </div>
//   );
// }

// function StatusBox({ label, value, className }) {
//   return (
//     <div className={`rounded-2xl p-3 text-center ring-1 ${className}`}>
//       <p className="text-xl font-black">{value}</p>
//       <p className="text-[11px] font-bold uppercase tracking-wide">{label}</p>
//     </div>
//   );
// }

// function Legend({ color, label }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className={`h-3 w-3 rounded-full ${color}`} />
//       <span>{label}</span>
//     </div>
//   );
// }

// function MiniStat({ label, value }) {
//   return (
//     <div className="rounded-2xl bg-slate-50 p-3 text-center">
//       <p className="text-xl font-black text-slate-950">{value}</p>
//       <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";

function StudentExam() {
  const [examId, setExamId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;  


  const loadExam = async () => {
    const res = await axios.get(`${base_url}/exam/1`);

    if (res.data.exam.status !== "published") {
      alert("Exam is not published yet");
      return;
    }

    setExam(res.data.exam);
    setQuestions(res.data.questions);
  };

  const selectAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const submitExam = async () => {
    const finalAnswers = Object.keys(answers).map((questionId) => ({
      question_id: Number(questionId),
      selected_answer: answers[questionId],
    }));

  const base_url = import.meta.env.VITE_API_URL;  


    const res = await axios.post(
      `${base_url}/exam/1`,
      {
        student_id: studentId,
        answers: finalAnswers,
      }
    );

    setResult(res.data);
  };

  if (result) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Result</h1>
        <p>Total Marks: {result.totalMarks}</p>
        <p>Obtained Marks: {result.obtainedMarks}</p>
        <p>Percentage: {result.percentage.toFixed(2)}%</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {!exam && (
        <>
          <h1 className="text-2xl font-bold mb-4">Start Exam</h1>

          <input
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border p-3 w-full mb-3"
          />

          <input
            placeholder="Exam ID"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
            className="border p-3 w-full mb-3"
          />

          <button
            onClick={loadExam}
            className="bg-blue-600 text-white px-5 py-3 rounded"
          >
            Load Exam
          </button>
        </>
      )}

      {exam && (
        <>
          <h1 className="text-2xl font-bold">{exam.exam_name}</h1>
          <p>Subject: {exam.subject}</p>
          <p>Duration: {exam.duration} minutes</p>

          <div className="mt-6 space-y-6">
            {questions.map((q, index) => (
              <div key={q.id} className="border p-4 rounded">
                <h2 className="font-semibold">
                  Q{index + 1}. {q.question}
                </h2>

                {["A", "B", "C", "D"].map((opt) => (
                  <label key={opt} className="block mt-2">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      onChange={() => selectAnswer(q.id, opt)}
                    />{" "}
                    {opt}. {q[`option_${opt.toLowerCase()}`]}
                  </label>
                ))}
              </div>
            ))}
          </div>

          <button
            onClick={submitExam}
            className="mt-6 bg-green-600 text-white px-5 py-3 rounded"
          >
            Submit Exam
          </button>
        </>
      )}
    </div>
  );
}

export default StudentExam;