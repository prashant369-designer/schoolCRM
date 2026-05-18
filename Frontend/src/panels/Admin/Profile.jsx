import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  AtSign,
  Bell,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  LockKeyhole,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function ProfileSecurityUI() {
  const base_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [studentDetails, setStudentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("personalEmail");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const handleChange = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const settings = [
    {
      id: "personalEmail",
      title: "Change Personal Email",
      description: "Update your recovery and personal communication email.",
      icon: Mail,
    },
    {
      id: "changePassword",
      title: "Change Password",
      description: "Create a stronger password for your account.",
      icon: LockKeyhole,
    },
    {
      id: "forgotPassword",
      title: "Forgot Password",
      description: "Send a reset password link to your registered email.",
      icon: KeyRound,
    },
  ];

  // Function to fetch student details
  const fetchStudentDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/studentsdetails/getstudentdetailsbyauthid/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStudentDetails(response.data.data);
    } catch (error) {
      console.error("Student details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [id]);

  const [data, setData] = useState({
    currentmailid: "",
    mailid: "",
  });

  const [Passdata, setPassData] = useState({
    currentpassword: "",
    passwords: "",
    confirm_password: "",
  });

  const [forgotData, setForgotData] = useState({
    mailid: "",
  });

  // Function to update student details email
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${base_url}/auth/students/changeemail/${id}`,
        data,
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // Function to update student details password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (Passdata.passwords !== Passdata.confirm_password) {
      alert("New password and confirm password do not match");
      return;
    }
    try {
      const response = await axios.put(
        `${base_url}/auth/students/changepassword/${id}`,
        Passdata,
      );
      console.log(response.data);
      alert(response.data.message);
      setPassData({
        currentpassword: "",
        passwords: "",
        confirm_password: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${base_url}/auth/students/forgotpassword/${id}`,
        forgotData,
      );
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const passwordStrength = useMemo(() => {
    const password = Passdata.passwords;
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  }, [Passdata.passwords]);

  // Render student details or loading indicator
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow">
          <Loader2 className="animate-spin text-blue-600" />
          <p className="font-semibold text-slate-600">
            Loading student details...
          </p>
        </div>
      </div>
    );
  }

  // Render student details or error message
  if (!studentDetails) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Student details not found.
      </div>
    );
  }

  const { auth, details, contact, education, parents } = studentDetails;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <button className="mt-1 rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50">
                <ArrowLeft size={20} />
              </button>

              <div>
                <p className="mb-1 flex items-center gap-2 text-xs font-medium text-indigo-600">
                  <GraduationCap size={16} /> Student Profile Portal
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-xl">
                  Profile & Security Settings
                </h1>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your personal email, contact number and password
                  securely.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
              <div className="flex items-center gap-2 text-xs font-bold">
                <ShieldCheck size={18} /> Account Verified
              </div>
              <p className="mt-1 text-xs font-medium">
                Last updated: 07 May 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={details.profile_image}
                alt="Student profile"
                className="h-16 w-16 rounded-3xl object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-slate-950">{` ${details.first_name} ${details.last_name}`}</h2>
                <p className="text-sm text-slate-500">
                  Class {`${details.class_name}-${details.section}`} • Roll No.{" "}
                  {details.roll}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <ProfileInfo
                icon={Mail}
                label="Personal Email"
                value={auth.mailid}
              />
              <ProfileInfo
                icon={Phone}
                label="Contact Number"
                value={contact.primary_phone}
              />
              <ProfileInfo
                icon={ShieldCheck}
                label="Security Status"
                value="2-step verification enabled"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm ">
            {settings.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`mb-2 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition last:mb-0 cursor-pointer ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-950">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                      {item.description}
                    </span>
                  </span>
                  <ChevronRight
                    size={18}
                    className={isActive ? "text-indigo-600" : "text-slate-300"}
                  />
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-6">
          {activeTab === "personalEmail" && (
            <form onSubmit={handleUpdate}>
              <SettingsCard
                icon={AtSign}
                title="Change Personal Email"
                description="Your personal email is used for password recovery, school updates and important notifications."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Current Personal Email"
                    type="email"
                    placeholder="Enter current email address"
                    value={data.currentmailid}
                    onChange={(value) =>
                      setData({ ...data, currentmailid: value })
                    }
                    icon={Mail}
                  />

                  <InputField
                    label="New Personal Email"
                    type="email"
                    placeholder="Enter new email address"
                    value={data.mailid}
                    onChange={(value) => setData({ ...data, mailid: value })}
                    icon={AtSign}
                  />
                </div>

                <VerificationBox
                  title="Email verification required"
                  description="After saving, an Email will be sent to your new email address for confirmation."
                />

                <ActionButtons  primaryLabel="Update Email" />
              </SettingsCard>
            </form>
          )}

          {activeTab === "changePassword" && (
            <form onSubmit={handleUpdatePassword}>
              <SettingsCard
                icon={LockKeyhole}
                title="Change Password"
                description="Use a strong password with uppercase letters, numbers and special characters."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <PasswordField
                    label="Current Password"
                    value={Passdata.currentpassword}
                    onChange={(value) =>
                      setPassData({ ...Passdata, currentpassword: value })
                    }
                    show={showPassword}
                    setShow={setShowPassword}
                  />
                  <PasswordField
                    label="New Password"
                    value={Passdata.passwords}
                    onChange={(value) =>
                      setPassData({ ...Passdata, passwords: value })
                    }
                    show={showNewPassword}
                    setShow={setShowNewPassword}
                  />
                  <PasswordField
                    label="Confirm New Password"
                    value={Passdata.confirm_password}
                    onChange={(value) =>
                      setPassData({ ...Passdata, confirm_password: value })
                    }
                    show={showNewPassword}
                    setShow={setShowNewPassword}
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-700">
                      Password Strength
                    </p>
                    <p className="text-sm font-bold text-indigo-600">
                      {getStrengthLabel(passwordStrength)}
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className={`h-2 rounded-full ${item <= passwordStrength ? "bg-indigo-600" : "bg-slate-200"}`}
                      />
                    ))}
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-500 md:grid-cols-2">
                    <li>• Minimum 8 characters</li>
                    <li>• One uppercase letter</li>
                    <li>• One number</li>
                    <li>• One special character</li>
                  </ul>
                </div>

                <ActionButtons  primaryLabel="Change Password" />
              </SettingsCard>
            </form>
          )}

          {activeTab === "forgotPassword" && (
            <form onSubmit={handleForgotPassword}>
              <SettingsCard
                icon={KeyRound}
                title="Forgot Password"
                description="Send a secure password reset link to your registered email address."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    label="Registered Email"
                    placeholder={"Enter registered email address"}
                    type="email"
                    value={forgotData.mailid}
                    onChange={(value) =>
                      setForgotData({ ...forgotData, mailid: value })
                    }
                    icon={Mail}
                  />
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 shrink-0" size={20} />
                    <div>
                      <h3 className="font-bold">Reset link information</h3>
                      <p className="mt-1 text-sm leading-6">
                        The password send to your mail address. Plase go through the mail address.
                      </p>
                    </div>
                  </div>
                </div>

                <ActionButtons primaryLabel="Send Reset Link" />
              </SettingsCard>
            </form>
          )}

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-5 text-indigo-900 shadow-sm">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 shrink-0" size={22} />
              <div>
                <h3 className="font-bold">Security Note</h3>
                <p className="mt-1 text-sm leading-6">
                  Never share your password or OTP with anyone. School staff
                  will never ask for your password directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SettingsCard({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ">
      <div className="mb-6 flex items-start gap-4 ">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
          <Icon size={23} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function InputField({ label, type, value, onChange, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={19}
        />
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />
      </div>
    </label>
  );
}

function PasswordField({ label, value, onChange, show, setShow }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <div className="relative">
        <LockKeyhole
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={19}
        />
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter password"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-500 hover:bg-slate-100"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </label>
  );
}

function VerificationBox({ title, description }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ primaryLabel }) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
      <button type="button" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer">
        Cancel
      </button>
      <button type="submit" className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
        <Save size={18} /> {primaryLabel}
      </button>
    </div>
  );
}

function ProfileInfo({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 ring-1 ring-slate-200">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-bold text-slate-950">
          {value}
        </p>
      </div>
    </div>
  );
}

function getStrengthLabel(score) {
  if (score <= 1) return "Weak";
  if (score === 2) return "Medium";
  if (score === 3) return "Strong";
  return "Very Strong";
}
