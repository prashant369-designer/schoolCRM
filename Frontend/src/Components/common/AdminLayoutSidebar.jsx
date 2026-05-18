import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  GraduationCap,
  School,
  Users,
  UserRound,
  UserCog,
  CalendarDays,
  FileBarChart,
  BookOpen,
  AlertTriangle,
  LogOut,
  ChevronDown,
  ChevronUp,
  Award,
  MessageSquareWarning,
  ShieldCheck,
} from "lucide-react";

function AdminSidebar({ closeSidebar = () => {} }) {
  const [openDetails, setOpenDetails] = useState(true);
  const [openPages, setOpenPages] = useState(false);
  const [openTymtable, setOpenTymtable] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  const subLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
      isActive
        ? "bg-white/15 text-white"
        : "text-slate-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="h-full flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight">School ERP</h1>
            <p className="text-xs text-slate-400">Admin Control Center</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        <p className="px-2 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            onClick={closeSidebar}
            className={linkClass}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/registersst"
            onClick={closeSidebar}
            className={linkClass}
          >
            <UserPlus size={20} />
            Register SST
          </NavLink>

          {/* Tymtable Dropdown */}
          <button
            onClick={() => setOpenTymtable(!openTymtable)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <span className="flex items-center gap-3">
              <Users size={20} />
              Tymtable
            </span>
            {openTymtable ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openTymtable && (
            <div className="ml-3 pl-3 border-l border-white/10 space-y-2">
              <NavLink
                to="/admin/totalclasses"
                onClick={closeSidebar}
                className={linkClass}
              >
                <School size={20} />
                Total Classes
              </NavLink>
              <NavLink
                to="/admin/totalsubjects"
                onClick={closeSidebar}
                className={linkClass}
              >
                <School size={20} />
                Subjects
              </NavLink>
              <NavLink
                to="/admin/timeslots"
                onClick={closeSidebar}
                className={linkClass}
              >
                <School size={20} />
                Time Slots
              </NavLink>
              <NavLink
                to="/admin/totalrooms"
                onClick={closeSidebar}
                className={linkClass}
              >
                <School size={20} />
                Total Rooms
              </NavLink>
              <NavLink
                to="/admin/assignclass"
                onClick={closeSidebar}
                className={linkClass}
              >
                <School size={20} />
                Assign Lecture
              </NavLink>

              <NavLink
                to="/admin/assignclassteacher"
                onClick={closeSidebar}
                className={linkClass}
              >
                <GraduationCap size={20} />
                Class-ClassTeacher
              </NavLink>
            </div>
          )}

          {/* Details Dropdown */}
          <button
            onClick={() => setOpenDetails(!openDetails)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <span className="flex items-center gap-3">
              <Users size={20} />
              Details
            </span>
            {openDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openDetails && (
            <div className="ml-3 pl-3 border-l border-white/10 space-y-2">
              <NavLink
                to="/admin/facultydetails"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <UserCog size={18} />
                Faculty Details
              </NavLink>

              <NavLink
                to="/admin/studentdetails"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <UserRound size={18} />
                Student Details
              </NavLink>

              <NavLink
                to="/admin/staffdetails"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <Users size={18} />
                Staff Details
              </NavLink>
            </div>
          )}

          {/* Pages Dropdown */}
          <button
            onClick={() => setOpenPages(!openPages)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <span className="flex items-center gap-3">
              <BookOpen size={20} />
              School Pages
            </span>
            {openPages ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openPages && (
            <div className="ml-3 pl-3 border-l border-white/10 space-y-2">
              <NavLink
                to="/admin/awards"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <Award size={18} />
                Awards
              </NavLink>

              <NavLink
                to="/admin/toppillars"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <Users size={18} />
                Top Pillars
              </NavLink>

              <NavLink
                to="/admin/problemsubmission"
                onClick={closeSidebar}
                className={subLinkClass}
              >
                <MessageSquareWarning size={18} />
                Problem Submission
              </NavLink>
            </div>
          )}

          <p className="px-2 pt-5 mb-3 text-[11px] uppercase tracking-widest text-slate-500">
            Account & System
          </p>

          <NavLink
            to="/admin/profile"
            onClick={closeSidebar}
            className={linkClass}
          >
            <UserRound size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/admin/academiccalendar"
            onClick={closeSidebar}
            className={linkClass}
          >
            <CalendarDays size={20} />
            Academic Calendar
          </NavLink>

          <NavLink
            to="/admin/notification"
            onClick={closeSidebar}
            className={linkClass}
          >
            <CalendarDays size={20} />
           Notifications
          </NavLink>

          <NavLink
            to="/admin/reports"
            onClick={closeSidebar}
            className={linkClass}
          >
            <FileBarChart size={20} />
            Reports
          </NavLink>

          <NavLink
            to="/admin/docs"
            onClick={closeSidebar}
            className={linkClass}
          >
            <BookOpen size={20} />
            Docs
          </NavLink>

          <NavLink
            to="/admin/error"
            onClick={closeSidebar}
            className={linkClass}
          >
            <AlertTriangle size={20} />
            404 Error
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
