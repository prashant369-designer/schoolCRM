import React, { useState } from "react";
import axios from "axios";
import { UserPlus, Mail, Lock, BadgeCheck } from "lucide-react";

function RegisterSST() {
  const [formData, setFormData] = useState({
    registration_no: "",
    passwords: "",
    role: "",
    mailid: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const base_url = import.meta.env.VITE_API_URL;  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${base_url}/auth/registersst`,
        formData
      );

      setMessage(res.data.message || "User registered successfully!");

      setFormData({
        registration_no: "",
        passwords: "",
        role: "",
        mailid: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        
        <div className="bg-slate-950 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-orange-500 flex items-center justify-center">
              <UserPlus size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Register User</h1>
              <p className="text-sm text-slate-300">
                Add student, teacher or staff login account
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Registration Number
            </label>
            <div className="relative">
              <BadgeCheck className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="text"
                name="registration_no"
                value={formData.registration_no}
                onChange={handleChange}
                placeholder="Enter registration number"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="email"
                name="mailid"
                value={formData.mailid}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <input
                type="password"
                name="passwords"
                value={formData.passwords}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {message && (
            <div className="rounded-2xl bg-orange-50 border border-orange-200 px-4 py-3 text-sm text-orange-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterSST;