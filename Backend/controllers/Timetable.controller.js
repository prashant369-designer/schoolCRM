import db from "../config/db.js";

export const createTimetable = async (req, res) => {
  try {
    const {
      teacher_id,
      classsection_id,
      class_subject_id,
      day_name,
      lecture_type,
      timeslot_id,
      rooms_id,
    } = req.body;

    const [result] = await db.query(
      "INSERT INTO weekly_timetable (teacher_id, classsection_id, class_subject_id, day_name, lecture_type, timeslot_id, rooms_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        teacher_id,
        classsection_id,
        class_subject_id,
        day_name,
        lecture_type,
        timeslot_id,
        rooms_id,
      ],
    );
    res
      .status(201)
      .json({
        message: "Timetable created successfully",
        timetableId: result.insertId,
      });
  } catch (error) {
    console.error("Error creating timetable:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the timetable." });
  }
};

export const getTimetableFields = async (req, res) => {
  try {
    const [timetableFields] = await db.query("SELECT * FROM weekly_timetable");
    res.json(timetableFields);
  } catch (error) {
    console.error("Error fetching timetable fields:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching timetable fields." });
  }
};

export const getAllTimetables = async (req, res) => {
  try {
    const [timetables] = await db.query("SELECT * FROM weekly_timetable");
    res.json(timetables);
  } catch (error) {
    console.error("Error fetching timetables:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching timetables." });
  }
};
