import React, { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminNavbar from "../Components/common/LayoutNavbar";
import StudentSidebar from "../Components/common/StudentLayoutSidebar";
import Chatbotlogo from "../assets/chatbot.png";
import { Link } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen overflow-hidden bg-slate-100">
      <AdminNavbar />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {isSidebarOpen && (
          <button
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          />
        )}

        <aside
          className={`fixed left-0 top-0 z-50 h-screen w-72 transform border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:static md:z-0 md:h-full md:translate-x-0 md:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <StudentSidebar closeSidebar={closeSidebar} />
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                School ERP
              </p>
              <h1 className="text-lg font-black text-slate-950">
                Student Panel
              </h1>
            </div>

            <button
              onClick={toggleSidebar}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-2 text-slate-700"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
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
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
