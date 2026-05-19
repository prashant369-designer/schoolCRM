import db from "../config/db.js";

export const createTotalRooms = async (req, res) => {
  try {
    const { room_name } = req.body;
    if (!room_name) {
      return res.status(400).json({ error: "Room name is required." });
    }
    const [result] = await db.query(
      "INSERT INTO total_rooms (room_name) VALUES (?)",
      [room_name],
    );
    res
      .status(201)
      .json({
        message: "Total rooms created successfully.",
        rooms_id: result.insertId,
      });
  } catch (error) {
    console.log("Error creating total rooms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating total rooms." });
  }
};

export const getTotalRooms = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM total_rooms");
    res.json(rows);
  } catch (error) {
    console.log("Error fetching total rooms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching total rooms." });
  }
};

export const getTotalRoomsById = async (req, res) => {
  try {
    const { rooms_id } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM total_rooms WHERE rooms_id = ?",
      [rooms_id],
    );
    if (rows.length === 0) {
      res
        .status(404)
        .json({ error: "Total rooms not found with the provided ID." });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.log("Error fetching total rooms by ID:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching total rooms by ID." });
  }
};

export const deleteTotalRooms = async (req, res) => {
  try {
    const { rooms_id } = req.params;
    const [result] = await db.query(
      "DELETE FROM total_rooms WHERE rooms_id = ?",
      [rooms_id],
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "Total rooms not found with the provided ID." });
    } else {
      res.json({ message: "Total rooms deleted successfully." });
    }
  } catch (error) {
    console.log("Error deleting total rooms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting total rooms." });
  }
};

export const updateTotalRooms = async (req, res) => {
  try {
    const { rooms_id } = req.params;
    const { room_name } = req.body;
    if (!room_name) {
      return res.status(400).json({ error: "Room name is required." });
    }
    const [result] = await db.query(
      "UPDATE total_rooms SET room_name = ? WHERE rooms_id = ?",
      [room_name, rooms_id],
    );
    if (result.affectedRows === 0) {
      res
        .status(404)
        .json({ error: "Total rooms not found with the provided ID." });
    } else {
      res.json({ message: "Total rooms updated successfully." });
    }
  } catch (error) {
    console.log("Error updating total rooms:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating total rooms." });
  }
};
