import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoLogOutOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  FaUserGraduate,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  MdAssignment,
  MdOutlineFactCheck,
  MdOutlineLibraryBooks,
  MdOutlineQuiz,
  MdOutlineOnlinePrediction,
} from "react-icons/md";
import { SiReadthedocs } from "react-icons/si";
import { FiUser, FiChevronDown, FiChevronUp } from "react-icons/fi";

function TeacherSidebar({ closeSidebar }) {
  const [openAcademics, setOpenAcademics] = useState(true);
  const [openAccount, setOpenAccount] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleLinkClick = () => {
    if (closeSidebar) closeSidebar();
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-semibold transition-all duration-300
    ${
      isActive
        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  const simpleBtnClasses =
    "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-slate-400 transition hover:bg-slate-50";

  return (
    <aside className="flex h-full min-h-screen w-full flex-col bg-white px-4 py-2 text-slate-800">
      <nav className="flex flex-1 flex-col gap-2">
        {/* Main */}
        <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          Main
        </p>

        <NavLink
          to="/teacher/dashboard"
          onClick={handleLinkClick}
          className={linkClasses}
        >
          <IoHomeOutline className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>

        {/* Academics Group */}
        <button
          type="button"
          onClick={() => setOpenAcademics(!openAcademics)}
          className={simpleBtnClasses}
        >
          <span>Academics</span>
          {openAcademics ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {openAcademics && (
          <div className="space-y-2">
            <NavLink
              to="/teacher/attendance"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <MdOutlineFactCheck className="h-5 w-5" />
              <span>Attendance</span>
            </NavLink>

            <NavLink
              to="/teacher/assignments"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <MdAssignment className="h-5 w-5" />
              <span>Assignments</span>
            </NavLink>

            <NavLink
              to="/teacher/studentmanagement"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <FaUserGraduate className="h-5 w-5" />
              <span>Students</span>
            </NavLink>

            <NavLink
              to="/teacher/videocallteacher"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <FaUserGraduate className="h-5 w-5" />
              <span>Video call teachers</span>
            </NavLink>

            <NavLink
              to="/teacher/timetable"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <FaRegCalendarAlt className="h-5 w-5" />
              <span>Timetable</span>
            </NavLink>

            <NavLink
              to="/teacher/exams"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <MdOutlineQuiz className="h-5 w-5" />
              <span>Exams & Marks</span>
            </NavLink>

            <NavLink
              to="/teacher/documents"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <MdOutlineLibraryBooks className="h-5 w-5" />
              <span>Study Material</span>
            </NavLink>
          </div>
        )}

        {/* Account Group */}
        <button
          type="button"
          onClick={() => setOpenAccount(!openAccount)}
          className={simpleBtnClasses}
        >
          <span>Account</span>
          {openAccount ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {openAccount && (
          <div className="space-y-2">
            <NavLink
              to="/teacher/leave"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <SiReadthedocs className="h-5 w-5" />
              <span>Leave Requests</span>
            </NavLink>

            <NavLink
              to="/teacher/myprofile"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <FiUser className="h-5 w-5" />
              <span>My Profile</span>
            </NavLink>

            <NavLink
              to="/teacher/settings"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <IoSettingsOutline className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Bottom Teacher Card */}
      <div className="rounded-3xl bg-slate-50 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
        >
          <IoLogOutOutline className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}

export default TeacherSidebar;
