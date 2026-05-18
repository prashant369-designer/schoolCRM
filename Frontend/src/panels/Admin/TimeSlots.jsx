import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Clock3,
  Search,
} from "lucide-react";

const API_URL =
  "http://localhost:3000/api/timeslots";

const TimeSlots = () => {
  const [timeslots, setTimeslots] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isEditMode, setIsEditMode] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [formData, setFormData] = useState({
    start_time: "",
    end_time: "",
    slot_name: "",
    lecture_type: "Lecture",
  });

  // ================= FETCH TIMESLOTS =================

  const fetchTimeSlots = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/gettimeslots`
      );

      setTimeslots(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch timeslots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  // ================= OPEN CREATE MODAL =================

  const openCreateModal = () => {
    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      start_time: "",
      end_time: "",
      slot_name: "",
      lecture_type: "Lecture",
    });

    setIsModalOpen(true);
  };

  // ================= OPEN EDIT MODAL =================

  const openEditModal = (item) => {
    setIsEditMode(true);

    setSelectedId(item.timeslot_id);

    setFormData({
      start_time: item.start_time || "",
      end_time: item.end_time || "",
      slot_name: item.slot_name || "",
      lecture_type:
        item.lecture_type || "Lecture",
    });

    setIsModalOpen(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setIsModalOpen(false);

    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      start_time: "",
      end_time: "",
      slot_name: "",
      lecture_type: "Lecture",
    });
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.start_time ||
      !formData.end_time ||
      !formData.slot_name
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${API_URL}/updatetimeslots/${selectedId}`,
          formData
        );

        alert("Timeslot updated successfully");
      } else {
        await axios.post(
          `${API_URL}/createtimeslots`,
          formData
        );

        alert("Timeslot created successfully");
      }

      closeModal();

      fetchTimeSlots();
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
      "Are you sure you want to delete this timeslot?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/deletetimeslots/${id}`
      );

      alert("Timeslot deleted successfully");

      fetchTimeSlots();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ================= FILTER =================

  const filteredTimeSlots =
    timeslots.filter((item) => {
      const text = `
      ${item.slot_name}
      ${item.start_time}
      ${item.end_time}
      ${item.lecture_type}
    `.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    });

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Clock3 className="text-blue-600" />
              Time Slots Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all school lecture timings
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Time Slot
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
            placeholder="Search timeslot..."
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

                <th className="p-4">
                  Slot Name
                </th>

                <th className="p-4">
                  Start Time
                </th>

                <th className="p-4">
                  End Time
                </th>

                <th className="p-4">
                  Lecture Type
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
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    Loading timeslots...
                  </td>
                </tr>
              ) : filteredTimeSlots.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No timeslots found
                  </td>
                </tr>
              ) : (
                filteredTimeSlots.map(
                  (item, index) => (
                    <tr
                      key={item.timeslot_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4 font-medium">
                        {item.slot_name}
                      </td>

                      <td className="p-4">
                        {item.start_time}
                      </td>

                      <td className="p-4">
                        {item.end_time}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            item.lecture_type ===
                            "Break"
                              ? "bg-red-100 text-red-700"
                              : item.lecture_type ===
                                "Activity"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {item.lecture_type}
                        </span>
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
                                item.timeslot_id
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
                  ? "Edit Time Slot"
                  : "Add Time Slot"}
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
              {/* SLOT NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slot Name
                </label>

                <input
                  type="text"
                  name="slot_name"
                  value={formData.slot_name}
                  onChange={handleChange}
                  placeholder="Example: Lecture 1"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* START TIME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>

                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* END TIME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>

                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LECTURE TYPE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecture Type
                </label>

                <select
                  name="lecture_type"
                  value={formData.lecture_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Lecture">
                    Lecture
                  </option>

                  <option value="Break">
                    Break
                  </option>

                  <option value="Lunch">
                    Lunch
                  </option>

                  <option value="Activity">
                    Activity
                  </option>
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
                    ? "Update Time Slot"
                    : "Create Time Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;