import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Edit3,
  Eye,
  Filter,
  GraduationCap,
  Medal,
  MoreVertical,
  Plus,
  Search,
  Star,
  Trash2,
  Trophy,
  UserRound,
  UsersRound,
  X,
  Save,
} from "lucide-react";

const initialAwards = [
  {
    id: 1,
    title: "Best Student of the Year",
    category: "Academic",
    recipientType: "Student",
    recipientName: "Rahul Sharma",
    className: "10-A",
    awardDate: "20 May 2026",
    status: "Published",
    description: "Awarded for excellent academic performance and discipline.",
  },
  {
    id: 2,
    title: "Best Teacher Award",
    category: "Faculty",
    recipientType: "Teacher",
    recipientName: "Kavita Sharma",
    className: "English Department",
    awardDate: "22 May 2026",
    status: "Draft",
    description: "Recognized for outstanding teaching quality and student support.",
  },
  {
    id: 3,
    title: "Sports Champion",
    category: "Sports",
    recipientType: "Student",
    recipientName: "Sandeep Yadav",
    className: "9-B",
    awardDate: "25 May 2026",
    status: "Published",
    description: "Awarded for winning inter-house cricket and athletics events.",
  },
  {
    id: 4,
    title: "Perfect Attendance",
    category: "Attendance",
    recipientType: "Student",
    recipientName: "Priya Singh",
    className: "8-C",
    awardDate: "28 May 2026",
    status: "Archived",
    description: "Awarded for maintaining 100% attendance this academic session.",
  },
];

const emptyForm = {
  title: "",
  category: "Academic",
  recipientType: "Student",
  recipientName: "",
  className: "",
  awardDate: "",
  status: "Draft",
  description: "",
};

const categories = ["All", "Academic", "Faculty", "Sports", "Attendance", "Cultural", "Discipline"];
const statuses = ["All", "Published", "Draft", "Archived"];

const statusStyles = {
  Published: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Draft: "bg-amber-50 text-amber-700 ring-amber-200",
  Archived: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function AdminAwardsCrudUI() {
  const [awards, setAwards] = useState(initialAwards);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAwardId, setEditingAwardId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredAwards = useMemo(() => {
    return awards.filter((award) => {
      const searchMatch =
        award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.category.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = category === "All" || award.category === category;
      const statusMatch = status === "All" || award.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [awards, searchTerm, category, status]);

  const publishedCount = awards.filter((award) => award.status === "Published").length;
  const draftCount = awards.filter((award) => award.status === "Draft").length;

  const openAddModal = () => {
    setEditingAwardId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (award) => {
    setEditingAwardId(award.id);
    setForm({ ...award });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.recipientName) return;

    if (editingAwardId) {
      setAwards((current) =>
        current.map((award) => (award.id === editingAwardId ? { ...award, ...form } : award))
      );
    } else {
      setAwards((current) => [{ id: Date.now(), ...form }, ...current]);
    }

    setIsModalOpen(false);
    setForm(emptyForm);
    setEditingAwardId(null);
  };

  const handleDelete = (id) => {
    setAwards((current) => current.filter((award) => award.id !== id));
  };

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
                <p className="mb-1 flex items-center gap-2 text-sm font-medium text-indigo-600">
                  <GraduationCap size={16} /> Admin Panel
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Awards Management
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Create, view, update and delete school awards for students and faculty.
                </p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              <Plus size={18} /> Add New Award
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Trophy} label="Total Awards" value={awards.length} helper="All award records" />
          <StatCard icon={BadgeCheck} label="Published" value={publishedCount} helper="Visible to users" />
          <StatCard icon={Edit3} label="Draft" value={draftCount} helper="Pending publish" />
          <StatCard icon={Medal} label="Categories" value={categories.length - 1} helper="Award types" />
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by award title, recipient or category..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <SelectBox value={category} onChange={setCategory} options={categories} />
            <SelectBox value={status} onChange={setStatus} options={statuses} />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[1.4fr_1fr_1fr_130px_130px_150px] gap-4 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid">
            <span>Award</span>
            <span>Recipient</span>
            <span>Category</span>
            <span>Date</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {filteredAwards.map((award, index) => (
            <AwardRow
              key={award.id}
              award={award}
              isLast={index === filteredAwards.length - 1}
              onEdit={() => openEditModal(award)}
              onDelete={() => handleDelete(award.id)}
            />
          ))}

          {filteredAwards.length === 0 && (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
                <Award size={30} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-950">No awards found</h3>
              <p className="mt-1 text-sm text-slate-500">Try changing search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Trophy size={24} />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">
                    {editingAwardId ? "Edit Award" : "Add New Award"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Fill award details and save it in the admin panel.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <InputField
                label="Award Title"
                value={form.title}
                onChange={(value) => setForm((current) => ({ ...current, title: value }))}
                placeholder="Enter award title"
              />

              <SelectField
                label="Category"
                value={form.category}
                onChange={(value) => setForm((current) => ({ ...current, category: value }))}
                options={categories.filter((item) => item !== "All")}
              />

              <SelectField
                label="Recipient Type"
                value={form.recipientType}
                onChange={(value) => setForm((current) => ({ ...current, recipientType: value }))}
                options={["Student", "Teacher", "Staff", "Class", "House"]}
              />

              <InputField
                label="Recipient Name"
                value={form.recipientName}
                onChange={(value) => setForm((current) => ({ ...current, recipientName: value }))}
                placeholder="Enter recipient name"
              />

              <InputField
                label="Class / Department"
                value={form.className}
                onChange={(value) => setForm((current) => ({ ...current, className: value }))}
                placeholder="Example: 10-A or Science Department"
              />

              <InputField
                label="Award Date"
                value={form.awardDate}
                onChange={(value) => setForm((current) => ({ ...current, awardDate: value }))}
                placeholder="Example: 20 May 2026"
              />

              <SelectField
                label="Status"
                value={form.status}
                onChange={(value) => setForm((current) => ({ ...current, status: value }))}
                options={["Published", "Draft", "Archived"]}
              />
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-slate-700">Description</span>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={4}
                placeholder="Write award description..."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </label>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                <Save size={18} /> {editingAwardId ? "Update Award" : "Create Award"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function AwardRow({ award, isLast, onEdit, onDelete }) {
  return (
    <div
      className={`grid gap-4 px-5 py-4 lg:grid-cols-[1.4fr_1fr_1fr_130px_130px_150px] lg:items-center ${
        !isLast ? "border-b border-slate-200" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Award size={22} />
        </span>
        <div>
          <h3 className="font-bold text-slate-950">{award.title}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-slate-500">{award.description}</p>
        </div>
      </div>

      <div>
        <p className="font-bold text-slate-950">{award.recipientName}</p>
        <p className="text-sm text-slate-500">{award.recipientType} • {award.className}</p>
      </div>

      <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">
        {award.category}
      </span>

      <p className="text-sm font-bold text-slate-700">{award.awardDate}</p>

      <StatusBadge status={award.status} />

      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
          <Eye size={18} />
        </button>
        <button onClick={onEdit} className="rounded-xl border border-slate-200 p-2 text-indigo-600 transition hover:bg-indigo-50">
          <Edit3 size={18} />
        </button>
        <button onClick={onDelete} className="rounded-xl border border-red-200 p-2 text-red-600 transition hover:bg-red-50">
          <Trash2 size={18} />
        </button>
        <button className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">{value}</h3>
          <p className="mt-1 text-xs text-slate-500">{helper}</p>
        </div>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </span>
      </div>
    </div>
  );
}

function SelectBox({ value, onChange, options }) {
  return (
    <div className="relative min-w-45">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <SelectBox value={value} onChange={onChange} options={options} />
    </label>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
      />
    </label>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[status]}`}>
      <BadgeCheck size={14} /> {status}
    </span>
  );
}
