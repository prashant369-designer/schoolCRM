import React from "react";
import { GiMatterStates } from "react-icons/gi";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";

const Section = ({ title, subtitle, children }) => (
  <div className="py-16 px-6 text-center">
    <h2 className="text-3xl font-bold mb-4">{title}</h2>
    <p className="text-gray-600 mb-10">{subtitle}</p>
    {children}
  </div>
);

export default function LandingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">School ERP System</h1>
        <p className="text-lg mb-6">Manage Students, Teachers & Staff Efficiently</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold">
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <Section
        title="Powerful Features"
        subtitle="Everything you need to manage your school in one place"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-lg ">Attendance System</h3>
            <p className="text-gray-500 text-sm mb-4">Lecture-wise smart attendance tracking</p>
            <GiMatterStates className="text-6xl text-blue-600 mb-2" />

          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-lg ">Assignments</h3>
            <p className="text-gray-500 text-sm mb-4">Create, submit & evaluate assignments easily</p>
            <MdOutlineAssignmentTurnedIn className="text-6xl text-blue-600 mb-2" />

          </div>

          <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold text-lg">Performance</h3>
            <p className="text-gray-500 text-sm mb-4">Track student progress and results</p>
            <GrDocumentPerformance className="text-6xl text-blue-600 mb-2" />
          </div>
        </div>
      </Section>

    </div>
  );
}


