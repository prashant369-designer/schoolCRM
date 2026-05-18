import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Building2,
  Search,
} from "lucide-react";

const API_URL =
  "http://localhost:3000/api/totalrooms";

const TotalRooms = () => {
  const [rooms, setRooms] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isEditMode, setIsEditMode] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [formData, setFormData] = useState({
    room_name: "",
  });

  // ================= FETCH ROOMS =================

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/getrooms`
      );

      setRooms(res.data.data || res.data || []);
    } catch (error) {
      console.log(error);

      alert("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // ================= OPEN CREATE MODAL =================

  const openCreateModal = () => {
    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      room_name: "",
    });

    setIsModalOpen(true);
  };

  // ================= OPEN EDIT MODAL =================

  const openEditModal = (item) => {
    setIsEditMode(true);

    setSelectedId(item.rooms_id);

    setFormData({
      room_name: item.room_name || "",
    });

    setIsModalOpen(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setIsModalOpen(false);

    setIsEditMode(false);

    setSelectedId(null);

    setFormData({
      room_name: "",
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

    if (!formData.room_name.trim()) {
      alert("Room name is required");
      return;
    }

    try {
      if (isEditMode) {
        await axios.put(
          `${API_URL}/updaterooms/${selectedId}`,
          formData
        );

        alert("Room updated successfully");
      } else {
        await axios.post(
          `${API_URL}/createrooms`,
          formData
        );

        alert("Room created successfully");
      }

      closeModal();

      fetchRooms();
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
      "Are you sure you want to delete this room?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/deleterooms/${id}`
      );

      alert("Room deleted successfully");

      fetchRooms();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  // ================= FILTER =================

  const filteredRooms = rooms.filter(
    (item) =>
      item.room_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Building2 className="text-blue-600" />
              Rooms Management
            </h1>

            <p className="text-gray-500 mt-1">
              Create, edit and manage all school
              rooms
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Room
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
            placeholder="Search room..."
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
                  Room ID
                </th>

                <th className="p-4">
                  Room Name
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
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    Loading rooms...
                  </td>
                </tr>
              ) : filteredRooms.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No rooms found
                  </td>
                </tr>
              ) : (
                filteredRooms.map(
                  (item, index) => (
                    <tr
                      key={item.rooms_id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4">
                        {index + 1}
                      </td>

                      <td className="p-4">
                        {item.rooms_id}
                      </td>

                      <td className="p-4 font-medium">
                        Room {item.room_name}
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
                                item.rooms_id
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
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
            {/* HEADER */}

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode
                  ? "Edit Room"
                  : "Add Room"}
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
              {/* ROOM NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name / Number
                </label>

                <input
                  type="text"
                  name="room_name"
                  value={formData.room_name}
                  onChange={handleChange}
                  placeholder="Example: 101"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                    ? "Update Room"
                    : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalRooms;