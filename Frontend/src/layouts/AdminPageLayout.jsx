import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminNavbar from "../Components/common/AdminLayoutNavbar";
import AdminSidebar from "../Components/common/AdminLayoutSidebar";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      <AdminNavbar />

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-950 text-white border-b border-white/10">
        <div>
          <h1 className="text-base font-semibold">Admin Portal</h1>
          <p className="text-xs text-slate-400">School ERP Management</p>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static top-0 left-0 z-40 h-full md:h-auto
            w-72 bg-slate-950 text-white
            border-r border-white/10
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <AdminSidebar closeSidebar={closeSidebar} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="min-h-[calc(100vh-120px)] rounded-3xl bg-white border border-slate-200 shadow-sm p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
