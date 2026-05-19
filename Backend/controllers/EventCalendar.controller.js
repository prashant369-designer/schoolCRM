import db from "../config/db.js";

export const createEvent = async (req, res) => {
  try {
    const {
      event_title,
      event_description,
      event_type,
      event_start_date,
      event_end_date,
      event_start_time,
      event_end_time,
      event_location,
      organizer_name,
      target_audience,
      class_id,
      event_color,
      is_holiday,
      status,
    } = req.body;

    const [result] = await db.query(
      "INSERT INTO event_calendar (event_title, event_description, event_type, event_start_date, event_end_date, event_start_time, event_end_time, event_location, organizer_name, target_audience, class_id, event_color, is_holiday, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        event_title,
        event_description,
        event_type,
        event_start_date,
        event_end_date,
        event_start_time,
        event_end_time,
        event_location,
        organizer_name,
        target_audience,
        class_id,
        event_color,
        is_holiday,
        status,
      ],
    );
    res
      .status(201)
      .json({
        message: "Event created successfully",
        eventId: result.insertId,
      });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const [events] = await db.query("SELECT * FROM event_calendar");
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { event_id } = req.params;

    const [event] = await db.query(
      "SELECT * FROM event_calendar WHERE event_id = ?",
      [event_id],
    );

    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event[0]);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const {
      event_title,
      event_description,
      event_type,
      event_start_date,
      event_end_date,
      event_start_time,
      event_end_time,
      event_location,
      organizer_name,
      target_audience,
      class_id,
      event_color,
      is_holiday,
      status,
    } = req.body;
    const [result] = await db.query(
      "UPDATE event_calendar SET event_title = ?, event_description = ?, event_type = ?, event_start_date = ?, event_end_date = ?, event_start_time = ?, event_end_time = ?, event_location = ?, organizer_name = ?, target_audience = ?, class_id = ?, event_color = ?, is_holiday = ?, status = ? WHERE event_id = ?",
      [
        event_title,
        event_description,
        event_type,
        event_start_date,
        event_end_date,
        event_start_time,
        event_end_time,
        event_location,
        organizer_name,
        target_audience,
        class_id,
        event_color,
        is_holiday,
        status,
        event_id,
      ],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params;
    const [result] = await db.query(
      "DELETE FROM event_calendar WHERE event_id = ?",
      [event_id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
