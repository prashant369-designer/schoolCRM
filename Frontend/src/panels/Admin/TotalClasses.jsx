import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, School, Search } from "lucide-react";
const base_url = import.meta.env.VITE_API_URL;  

const API_URL = `${base_url}/classandsection`;

const ClassAndSection = () => {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    classname: "",
    section: "",
  });

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/getclassandsection`);

      setClasses(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setFormData({
      classname: "",
      section: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setIsEditMode(true);
    setSelectedId(item.classsection_id);
    setFormData({
      classname: item.classname || "",
      section: item.section || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedId(null);
    setFormData({
      classname: "",
      section: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.classname.trim()) {
      alert("Class name is required");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${API_URL}/updateclassandsection/${selectedId}`,
          formData,
        );

        alert("Class updated successfully");
      } else {
        await axios.post(`${API_URL}/createclassandsection`, formData);

        alert("Class created successfully");
      }

      closeModal();
      fetchClasses();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/deleteclassandsection/${id}`);
      alert("Class deleted successfully");
      fetchClasses();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const filteredClasses = classes.filter((item) => {
    const text = `${item.classname} ${item.section || ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <School className="text-blue-600" />
                Class & Section Management
              </h1>
              <p className="text-gray-500 mt-1">
                Create, edit, delete and view all school classes.
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Add Class
            </button>
          </div>

          <div className="mb-5 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search class or section..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-4 rounded-l-xl">S.No</th>
                  <th className="p-4">Class ID</th>
                  <th className="p-4">Class Name</th>
                  <th className="p-4">Section</th>
                  <th className="p-4 rounded-r-xl text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">
                      Loading classes...
                    </td>
                  </tr>
                ) : filteredClasses.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">
                      No class found
                    </td>
                  </tr>
                ) : (
                  filteredClasses.map((item, index) => (
                    <tr
                      key={item.classsection_id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{item.classsection_id}</td>
                      <td className="p-4 font-medium text-gray-800">
                        {item.classname}
                      </td>
                      <td className="p-4">
                        {item.section ? (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {item.section}
                          </span>
                        ) : (
                          <span className="text-gray-400">No Section</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.classsection_id)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? "Edit Class" : "Add New Class"}
              </h2>

              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  name="classname"
                  value={formData.classname}
                  onChange={handleChange}
                  placeholder="Example: 10th, 11th, Nursery"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  placeholder="Example: A, B, Science, Commerce"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

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
                  {isEditMode ? "Update Class" : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassAndSection;
