import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { FiUser } from "react-icons/fi";
import axios from "axios";
import Logo from "../../assets/logo.png";

function Navbar({ panelName = "School ERP", panelType = "Student Panel" }) {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/teachersdetails/getteacherfulldetailsbyauthid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Student details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow">
          <div className="animate-spin text-blue-600" />
          <p className="font-semibold text-slate-600">
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  if (!studentDetails) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Student details not found.
      </div>
    );
  }

  const { classsection } = studentDetails;

  const details = studentDetails?.details;
  const fullName = details
    ? `${details.first_name || ""} ${details.last_name || ""}`
    : "User";

  const profileImage = details?.profile_image;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <nav className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-700 md:hidden"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/teacher/dashboard" className="flex items-center gap-3">
            <div className="h-12 w-30 ">
              <img
                src={Logo}
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/teacher/myprofile"
            className="relative rounded-2xl border border-slate-200 bg-slate-50 p-2.5 text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
          >
            <FiUser size={21} />
          </Link>

          <Link
            to="/teacher/settings"
            className="hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 sm:block"
          >
            <Settings size={21} />
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition hover:bg-slate-50"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-9 w-9 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserRound size={20} />
                </div>
              )}

              <div className="hidden text-left md:block">
                <p className="max-w-32 truncate text-sm font-black text-slate-950">
                  {fullName}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Teacher Panel
                </p>
              </div>

              <ChevronDown
                size={17}
                className="hidden text-slate-400 md:block"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="bg-linear-to-r from-indigo-600 to-sky-500 p-5 text-white">
                  <div className="flex items-center gap-4">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-14 w-14 rounded-2xl border-2 border-white/70 object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                        <UserRound size={26} />
                      </div>
                    )}

                    <div>
                      <h2 className="font-black">{fullName}</h2>
                       <p className="text-xs text-white/70">
                        {role || "School ERP User"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <Link
                    to="/teacher/myprofile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <UserRound size={18} />
                    My Profile
                  </Link>

                  <Link
                    to="/teacher/notification"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <Bell size={18} />
                    Notifications
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {isMobileOpen && (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden">
          <div className="relative mb-4">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/student/dashboard"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-2xl bg-indigo-50 px-4 py-3 text-center text-sm font-black text-indigo-700"
            >
              Dashboard
            </Link>

            <Link
              to="/student/notification"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm font-black text-slate-700"
            >
              Notifications
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
