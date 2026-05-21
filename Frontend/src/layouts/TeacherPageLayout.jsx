import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherNavbar from "../Components/common/TeacherLayoutNavbar";
import TeacherSidebar from "../Components/common/TeacherLayoutSidebar";
import Chatbotlogo from "../assets/chatbot.png";
import { Link } from "react-router-dom";


function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
      <TeacherNavbar />

      <div className="flex justify-between items-center p-4 bg-black/40 text-white md:hidden">
          <span className="text-lg font-semibold">Admin Panel</span>
          <button onClick={toggleSidebar} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-64 border-r border-gray-300 text-white p-4 overflow-auto no-scrollbar`}
        >
          <TeacherSidebar />
        </div>

        {/* Main Content (ONLY THIS SHOULD SCROLL) */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        <div className="absolute bottom-10 right-10 border-slate-200 bg-white rounded-full cursor-pointer border-2 w-20 h-20 ">
            <Link to="/chatbot">
              <img
                className="w-full h-full rounded-full object-cover object-center"
                src={Chatbotlogo}
                alt=""
              />
            </Link>
          </div>
      </div>
    </div>
    </>
  );
}

export default AdminLayout;