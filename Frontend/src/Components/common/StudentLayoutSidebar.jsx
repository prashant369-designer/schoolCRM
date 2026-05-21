import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiReadthedocs } from "react-icons/si";
import { MdAssignmentTurnedIn } from "react-icons/md";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  NotebookPen,
  Printer,
  Search,
  ShieldUser,
  UserRound,
  WalletCards,
} from "lucide-react";

function AdminSidebar({ closeSidebar = () => {} }) {
  const [openAccount, setOpenAccount] = useState(true);
  const [openFee, setOpenFee] = useState(true);
  const [connection, setConnection] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    window.location.reload();
  };

  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
        : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
    }`;

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="no-scrollbar flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-black uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-2">
          <NavLink
            onClick={closeSidebar}
            to="/student/dashboard"
            className={linkClasses}
          >
            <Home size={20} />
            Dashboard
          </NavLink>

          <DropdownButton
            title="Main Account"
            open={openAccount}
            onClick={() => setOpenAccount(!openAccount)}
          />

          {openAccount && (
            <div className="ml-3 space-y-2 border-l border-slate-200 pl-3">
              <NavLink
                onClick={closeSidebar}
                to="/student/myaccount"
                className={linkClasses}
              >
                <NotebookPen size={20} />
                My Profile
              </NavLink>

              <NavLink
                onClick={closeSidebar}
                to="/student/profileprint"
                className={linkClasses}
              >
                <Printer size={20} />
                Profile Print
              </NavLink>
            </div>
          )}

          {/* fee management */}
          <DropdownButton
            title="Fee Management"
            open={openFee}
            onClick={() => setOpenFee(!openFee)}
          />

          {openFee && (
            <div className="ml-3 space-y-2 border-l border-slate-200 pl-3">
              <NavLink
                onClick={closeSidebar}
                to="/student/myfee"
                className={linkClasses}
              >
                <WalletCards size={20} />
                Pay My Fee
              </NavLink>
            </div>
          )}

          {/* video connection */}
          <DropdownButton
            title="Online Connect"
            open={connection}
            onClick={() => setConnection(!connection)}
          />

          {connection && (
            <div className="ml-3 space-y-2 border-l border-slate-200 pl-3">
          <NavLink
            onClick={closeSidebar}
            to="/student/onlineexam"
            className={linkClasses}
          >
            <GraduationCap size={20} />
            Online Exam
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/videocallstudent"
            className={linkClasses}
          >
            <GraduationCap size={20} />
            Video Call
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/mapbusroute"
            className={linkClasses}
          >
            <GraduationCap size={20} />
            Map Bus Route
          </NavLink>
            </div>
          )}

          <NavLink
            onClick={closeSidebar}
            to="/student/viewresult"
            className={linkClasses}
          >
            <FileText size={20} />
            View Result
          </NavLink>

          

          <NavLink
            onClick={closeSidebar}
            to="/student/searchfaculty"
            className={linkClasses}
          >
            <Search size={20} />
            Search Faculty
          </NavLink>

          <NavLink
            to="/student/leave"
            onClick={closeSidebar}
            className={linkClasses}
          >
            <SiReadthedocs className="h-5 w-5" />
            <span>Leave Requests</span>
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/studymaterial"
            className={linkClasses} 
          >
            <CreditCard size={20} />
            Study Material
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/assignments"
            className={linkClasses} 
          >
            <MdAssignmentTurnedIn size={20} />
           Assignments
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/notification"
            className={linkClasses}
          >
            <Bell size={20} />
            Notification
          </NavLink>

          <p className="mb-3 mt-6 px-3 text-xs font-black uppercase tracking-wider text-slate-400">
            Account
          </p>

          <NavLink
            onClick={closeSidebar}
            to="/student/studentprofile"
            className={linkClasses}
          >
            <UserRound size={20} />
            Profile & Security
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/eventcalendar"
            className={linkClasses}
          >
            <CalendarDays size={20} />
            Event Calendar
          </NavLink>

          <NavLink
            onClick={closeSidebar}
            to="/student/feedbackform"
            className={linkClasses}
          >
            <ShieldUser size={20} />
            Feedback Form
          </NavLink>
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
}

function DropdownButton({ title, open, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
    >
      <span>{title}</span>
      {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );
}

export default AdminSidebar;
