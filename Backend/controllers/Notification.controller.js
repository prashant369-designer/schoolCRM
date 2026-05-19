import db from "../config/db.js";

export const createnotification = async (req, res) => {
  try {
    const {
      notification_title,
      notification_description,
      priority_level,
      notification_motive,
    } = req.body;
    const [result] = await db.query(
      "INSERT INTO notification_center (notification_title, notification_description, priority_level,notification_motive) VALUES (?, ?, ?, ?)",
      [
        notification_title,
        notification_description,
        priority_level,
        notification_motive,
      ],
    );
    res
      .status(201)
      .json({
        message: "Notification created successfully",
        notification_id: result.insertId,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getnotification = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM notification_center");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getnotificationbyid = async (req, res) => {
  try {
    const notification_id = req.params;
    const [rows] = await db.query(
      "SELECT * FROM notification_center WHERE notification_id = ?",
      [notification_id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Notification not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletenotification = async (req, res) => {
  try {
    const notification_id = req.params;
    const [result] = await db.query(
      "DELETE FROM notification_center WHERE notification_id = ?",
      [notification_id],
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Notification not found" });
    } else {
      res.json({ message: "Notification deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatenotification = async (req, res) => {
  try {
    const notification_id = req.params;
    const {
      notification_title,
      notification_description,
      priority_level,
      notification_motive,
    } = req.body;
    const [result] = await db.query(
      "UPDATE notification_center SET notification_title =?, notification_description=?, priority_level=?,notification_motive=?",
      [
        notification_title,
        notification_description,
        priority_level,
        notification_motive,
      ],
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
