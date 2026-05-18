import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  School,
  IndianRupee,
  CalendarCheck,
  Bus,
  PhoneCall,
} from "lucide-react";

const policies = [
  {
    id: "terms",
    title: "Terms & Conditions",
    icon: FileText,
    content: [
      "Students, parents, teachers, and staff must follow all school rules and regulations.",
      "The school reserves the right to update academic, attendance, fee, and disciplinary policies when required.",
      "Misuse of the school ERP portal, fake information, or unauthorized access is strictly prohibited.",
      "All users are responsible for keeping their login credentials safe and private.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: Lock,
    content: [
      "The school collects only necessary information such as student details, parent contact, attendance, fees, and academic records.",
      "Personal data is used only for school management, communication, reports, and safety purposes.",
      "Student and parent information will not be shared with third parties without permission, except when legally required.",
      "Users can contact the school admin for data correction or account-related support.",
    ],
  },
  {
    id: "rules",
    title: "School Rules",
    icon: School,
    content: [
      "Students must attend school regularly and arrive on time.",
      "Proper school uniform and ID card are compulsory.",
      "Respectful behavior toward teachers, staff, and other students is expected.",
      "Damage to school property may result in disciplinary action and recovery charges.",
    ],
  },
  {
    id: "fees",
    title: "Fees Policy",
    icon: IndianRupee,
    content: [
      "School fees must be paid before the due date mentioned by the administration.",
      "Late fee charges may apply after the due date.",
      "Fee receipts will be available after successful payment.",
      "Refunds, if applicable, will follow the official school refund policy.",
    ],
  },
  {
    id: "attendance",
    title: "Attendance Policy",
    icon: CalendarCheck,
    content: [
      "Student attendance is marked lecture-wise by assigned teachers.",
      "Parents may receive absence notifications through SMS, email, WhatsApp, or the ERP portal.",
      "Minimum attendance criteria may be required for exams and school activities.",
      "Medical leave or emergency absence must be reported with valid reason/document.",
    ],
  },
  {
    id: "transport",
    title: "Transport Policy",
    icon: Bus,
    content: [
      "Students using school transport must follow bus safety rules.",
      "Pickup and drop points should be selected as per school transport routes.",
      "Bus fee, route changes, or transport cancellation must be handled through the school office.",
      "The school is not responsible for delays caused by traffic, weather, or unavoidable conditions.",
    ],
  },
];

function SchoolPolicies() {
  const [activePolicy, setActivePolicy] = useState(policies[0]);

  return (
    <div className="min-h-full bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 md:p-8 text-white shadow-lg">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute left-10 bottom-0 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <ShieldCheck size={30} />
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  School Policies & Guidelines
                </h1>
                <p className="text-sm md:text-base text-slate-300 mt-1 max-w-2xl">
                  Read all important school terms, privacy rules, attendance,
                  fees, transport, and general guidelines in one place.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/10 px-5 py-4">
              <p className="text-xs text-slate-300">Last Updated</p>
              <h3 className="text-lg font-semibold">May 2026</h3>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sticky top-6">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider px-2 mb-3">
                Policy Sections
              </h2>

              <div className="space-y-2">
                {policies.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePolicy.id === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePolicy(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-semibold text-sm">
                        {item.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              
              <div className="px-6 md:px-8 py-6 border-b border-slate-200 bg-linear-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    {React.createElement(activePolicy.icon, { size: 26 })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {activePolicy.title}
                    </h2>
                    <p className="text-sm text-slate-500">
                      Please read this section carefully.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                {activePolicy.content.map((point, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="h-8 w-8 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <p className="text-slate-700 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Box */}
            <div className="mt-6 rounded-3xl bg-orange-50 border border-orange-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
                  <PhoneCall size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Need Help?
                  </h3>
                  <p className="text-sm text-slate-600">
                    For any question related to school policies, contact the
                    school administration office.
                  </p>
                </div>
              </div>

              <button className="px-5 py-3 rounded-2xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition">
                Contact Admin
              </button>
            </div>

            {/* Agreement Box */}
            <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-orange-500"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  I have read and understood the school terms, privacy policy,
                  attendance rules, fee policy, and other guidelines mentioned
                  above.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolPolicies;