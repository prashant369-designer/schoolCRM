import db from "../config/db.js";

export const createstudenteducation = async (req, res) => {
    try {
    const {studentauth_id,standard,stream,board,passing_year,subjects,max_marks,obtained_marks,percentage} = req.body;

    const [result] = await db.query(
        "INSERT INTO student_education (studentauth_id, standard, stream, board, passing_year, subjects, max_marks, obtained_marks, percentage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [studentauth_id, standard, stream, board, passing_year, subjects, max_marks, obtained_marks, percentage]
    );

    res.status(201).json({ message: "Student education created successfully", student_edu_id: result.insertId });
    }
    catch (error) {
        console.error("Error creating student education:", error);
        res.status(500).json({ error: "An error occurred while creating student education." });
    }

}

export const getstudenteducationbyid = async (req, res) => {
    try{

        const {student_edu_id} = req.params;

        const [rows] = await db.query(
            "SELECT * FROM student_education WHERE student_edu_id = ?",
            [student_edu_id]
        );
        if(rows.length === 0) {
            return res.status(404).json({ error: "Student education not found." });
        }

        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error("Error fetching student education by ID:", error);
        res.status(500).json({ error: "An error occurred while fetching student education by ID." });
    }
}

