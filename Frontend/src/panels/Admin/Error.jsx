import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, SearchX } from "lucide-react";

function Error404() {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-5xl">
        
        {/* Background Effects */}
        <div className="absolute -top-20 -left-20 h-72 w-72 bg-orange-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-72 w-72 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="relative bg-white border border-slate-200 rounded-[40px] shadow-2xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Content */}
            <div className="p-8 md:p-14 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold w-fit">
                <SearchX size={18} />
                Page Not Found
              </div>

              <h1 className="mt-6 text-7xl md:text-8xl font-black text-slate-900 leading-none">
                404
              </h1>

              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-800">
                Oops! This page does not exist.
              </h2>

              <p className="mt-5 text-slate-500 leading-relaxed max-w-lg">
                The page you are looking for may have been removed, renamed,
                or is temporarily unavailable in the School ERP system.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20"
                >
                  <Home size={20} />
                  Go Dashboard
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </button>
              </div>

              {/* Quick Links */}
              <div className="mt-10">
                <p className="text-sm font-semibold text-slate-500 mb-4">
                  Quick Navigation
                </p>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Students",
                    "Teachers",
                    "Attendance",
                    "Reports",
                    "Fees",
                    "Settings",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative hidden lg:flex items-center justify-center bg-slate-950 overflow-hidden">
              
              {/* Decorative Shapes */}
              <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-orange-500/20 blur-2xl"></div>
              <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl"></div>

              {/* Main 404 Card */}
              <div className="relative z-10">
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 shadow-2xl">
                  
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      
                      {/* Big 404 */}
                      <h1 className="text-[180px] font-black text-white leading-none tracking-tight">
                        404
                      </h1>

                      {/* Floating Icon */}
                      <div className="absolute -top-5 -right-5 h-16 w-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 animate-bounce">
                        <SearchX size={32} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white">
                      Lost in the ERP?
                    </h3>

                    <p className="mt-3 text-slate-300 max-w-sm mx-auto">
                      Don't worry. You can safely return to the dashboard and
                      continue managing your school system.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-16 right-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-white">
                <p className="text-xs text-slate-300">System Status</p>
                <h4 className="text-lg font-bold text-green-400">
                  Operational
                </h4>
              </div>

              <div className="absolute bottom-16 left-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-white">
                <p className="text-xs text-slate-300">Server</p>
                <h4 className="text-lg font-bold">Running Smoothly</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;