import React from "react";
import {
  Crown,
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";

const TopPillars = () => {
  const leaders = [
    {
      name: "Dr. Rajeev Sharma",
      role: "Founder",
      department: "School Vision & Development",
      experience: "25+ Years",
      email: "founder@school.com",
      phone: "+91 98765 43210",
      image: "https://i.pravatar.cc/150?img=12",
      badge: "Main Pillar",
      icon: <Crown size={24} />,
    },
    {
      name: "Mrs. Kavita Verma",
      role: "Principal",
      department: "Academic Administration",
      experience: "18+ Years",
      email: "principal@school.com",
      phone: "+91 98765 43211",
      image: "https://i.pravatar.cc/150?img=47",
      badge: "Academic Head",
      icon: <GraduationCap size={24} />,
    },
    {
      name: "Mr. Amit Gupta",
      role: "Co-Founder",
      department: "Operations & Management",
      experience: "20+ Years",
      email: "cofounder@school.com",
      phone: "+91 98765 43212",
      image: "https://i.pravatar.cc/150?img=32",
      badge: "Management Head",
      icon: <BriefcaseBusiness size={24} />,
    },
  ];

  const authorities = [
    {
      name: "Mr. Rohit Singh",
      role: "Vice Principal",
      work: "Discipline, Exams & Student Affairs",
      icon: <ShieldCheck />,
    },
    {
      name: "Mrs. Neha Sharma",
      role: "Academic Coordinator",
      work: "Class Scheduling & Teacher Coordination",
      icon: <Award />,
    },
    {
      name: "Mr. Suresh Kumar",
      role: "Admin Head",
      work: "Fees, Staff, Records & Office Work",
      icon: <Users />,
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          School Top Pillars
        </h1>
        <p className="text-gray-500 mt-2">
          Founder, Principal, Co-Founder and higher authorities who manage the school system.
        </p>
      </div>

      {/* TOP LEADERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {leaders.map((person, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-lg transition"
          >
            <div className="px-6 pb-6 mt-2">
              <img
                src={person.image}
                alt={person.name}
                className="w-28 h-28 rounded-3xl border-4 border-white object-cover shadow-md"
              />

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {person.name}
                    </h2>
                    <p className="text-blue-600 font-semibold">
                      {person.role}
                    </p>
                  </div>

                  <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                    {person.icon}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <BriefcaseBusiness size={18} />
                    <span>{person.department}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Award size={18} />
                    <span>{person.experience}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} />
                    <span>{person.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={18} />
                    <span>{person.phone}</span>
                  </div>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-2xl font-medium">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SCHOOL MANAGEMENT OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Leadership Responsibilities
          </h2>

          <div className="space-y-5">
            <div className="flex gap-4 bg-blue-50 p-5 rounded-2xl">
              <Crown className="text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-800">Founder</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Handles school vision, long-term planning, brand development and major decisions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-green-50 p-5 rounded-2xl">
              <GraduationCap className="text-green-600" />
              <div>
                <h3 className="font-bold text-gray-800">Principal</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Manages academics, teachers, student discipline, exams and daily school operations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-purple-50 p-5 rounded-2xl">
              <BriefcaseBusiness className="text-purple-600" />
              <div>
                <h3 className="font-bold text-gray-800">Co-Founder</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Supports management, finance, operations, planning and administration work.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SCHOOL INFO */}
        <div className="bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6">
          <SchoolIcon />

          <h2 className="text-2xl font-bold mt-5">
            School Leadership Board
          </h2>

          <p className="text-blue-100 mt-3">
            These members are responsible for running the complete school ecosystem.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span>Total Higher Authorities</span>
              <strong>12</strong>
            </div>

            <div className="flex justify-between">
              <span>Academic Heads</span>
              <strong>5</strong>
            </div>

            <div className="flex justify-between">
              <span>Admin Heads</span>
              <strong>4</strong>
            </div>

            <div className="flex justify-between">
              <span>Management Heads</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER AUTHORITIES */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Other Higher Authorities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {authorities.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-3xl p-5 hover:bg-blue-50 transition"
            >
              <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                {item.name}
              </h3>

              <p className="text-blue-600 font-medium mt-1">
                {item.role}
              </p>

              <p className="text-gray-500 text-sm mt-3">
                {item.work}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SchoolIcon = () => {
  return (
    <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center">
      <UserRound size={34} />
    </div>
  );
};

export default TopPillars;