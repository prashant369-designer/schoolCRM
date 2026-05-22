import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  X,
  BookOpen,
  Search,
} from "lucide-react";
  const base_url = import.meta.env.VITE_API_URL;  

const SUBJECT_API =
  `${base_url}/classandsubject`;

const CLASS_API =
  `${base_url}/classandsection/getclassandsection`;

const ClassAndSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    classsection_id: "",
    subject_name: "",
    subject_code: "",
    subject_type: "",
    is_optional: 0,
  });

  // ================= FETCH SUBJECTS =================

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${SUBJECT_API}/getclassandsubject`
      );

      setSubjects(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  // ================= FETCH CLASSES =================

  const fetchClasses = async () => {
    try {
      const res = await axios.get(CLASS_API);

      setClasses(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

  // ================= OPEN CREATE MODAL =================

  const openCreateModal = () => {
    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      classsection_id: "",
      subject_name: "",
      subject_code: "",
      subject_type: "",
      is_optional: 0,
    });

    setIsModalOpen(true);
  };

  // ================= OPEN EDIT MODAL =================

  const openEditModal = (item) => {
    setIsEditMode(true);

    setSelectedId(item.class_subject_id);

    setFormData({
      classsection_id: item.classsection_id || "",
      subject_name: item.subject_name || "",
      subject_code: item.subject_code || "",
      subject_type: item.subject_type || "",
      is_optional: item.is_optional || 0,
    });

    setIsModalOpen(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setIsModalOpen(false);

    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      classsection_id: "",
      subject_name: "",
      subject_code: "",
      subject_type: "",
      is_optional: 0,
    });
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "is_optional" ? Number(value) : value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.classsection_id ||
      !formData.subject_name ||
      !formData.subject_code
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${SUBJECT_API}/updateclassandsubject/${selectedId}`,
          formData
        );

        alert("Subject updated successfully");
      } else {
        await axios.post(
          `${SUBJECT_API}/createclassandsubject`,
          formData
        );

        alert("Subject created successfully");
      }

      closeModal();

      fetchSubjects();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${SUBJECT_API}/deleteclassandsubject/${id}`
      );

      alert("Subject deleted successfully");

      fetchSubjects();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ================= FILTER =================

  const filteredSubjects = subjects.filter((item) => {
    const text = `
      ${item.subject_name}
      ${item.subject_code}
      ${item.subject_type}
    `.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // ================= GET CLASS NAME =================

  const getClassName = (classId) => {
    const cls = classes.find(
      (item) =>
        item.classsection_id === Number(classId)
    );

    if (!cls) return "-";

    return `${cls.classname} ${cls.section || ""}`;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <BookOpen className="text-blue-600" />
              Class & Subject Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all subjects for classes
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        {/* SEARCH */}

        <div className="mb-5 relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search subject..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="p-4 rounded-l-xl">
                  S.No
                </th>

                <th className="p-4">Class</th>

                <th className="p-4">
                  Subject Name
                </th>

                <th className="p-4">
                  Subject Code
                </th>

                <th className="p-4">
                  Subject Type
                </th>

                <th className="p-4">
                  Optional
                </th>

                <th className="p-4 rounded-r-xl text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >
                    Loading subjects...
                  </td>
                </tr>
              ) : filteredSubjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >
                    No subjects found
                  </td>
                </tr>
              ) : (
                filteredSubjects.map(
                  (item, index) => (
                    <tr
                      key={item.class_subject_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4 font-medium">
                        {getClassName(
                          item.classsection_id
                        )}
                      </td>

                      <td className="p-4">
                        {item.subject_name}
                      </td>

                      <td className="p-4">
                        {item.subject_code}
                      </td>

                      <td className="p-4">
                        {item.subject_type}
                      </td>

                      <td className="p-4">
                        {item.is_optional === 1 ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Yes
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                            No
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() =>
                              openEditModal(item)
                            }
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.class_subject_id
                              )
                            }
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6">
            {/* HEADER */}

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode
                  ? "Edit Subject"
                  : "Add Subject"}
              </h2>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* CLASS */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Class
                </label>

                <select
                  name="classsection_id"
                  value={formData.classsection_id}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    Select Class
                  </option>

                  {classes.map((item) => (
                    <option
                      key={item.classsection_id}
                      value={item.classsection_id}
                    >
                      {item.classname}{" "}
                      {item.section || ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* SUBJECT NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>

                <input
                  type="text"
                  name="subject_name"
                  value={formData.subject_name}
                  onChange={handleChange}
                  placeholder="Example: Mathematics"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SUBJECT CODE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Code
                </label>

                <input
                  type="text"
                  name="subject_code"
                  value={formData.subject_code}
                  onChange={handleChange}
                  placeholder="Example: MATH101"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* SUBJECT TYPE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Type
                </label>

                <select
                  name="subject_type"
                  value={formData.subject_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    Select Type
                  </option>

                  <option value="Theory">
                    Theory
                  </option>

                  <option value="Practical">
                    Practical
                  </option>

                  <option value="Lab">
                    Lab
                  </option>

                  <option value="Activity">
                    Activity
                  </option>
                </select>
              </div>

              {/* OPTIONAL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is Optional?
                </label>

                <select
                  name="is_optional"
                  value={formData.is_optional}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>No</option>

                  <option value={1}>Yes</option>
                </select>
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isEditMode
                    ? "Update Subject"
                    : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAndSubject;