import db from "../config/db.js";

export const createStudentLibrary = async (req, res) => {
    try{
        const {student_id, fortigate_id,password} = req.body;

        // Check if the student library already exists for the given student_id
        const [existingLibrary] = await db.query("SELECT * FROM student_library WHERE student_id = ?", [student_id]);
        if (existingLibrary.length > 0) {
            return res.status(400).json({ error: "Student library already exists for this student_id." });
        }

        const [result] = await db.query("INSERT INTO student_library (student_id, fortigate_id, password) VALUES (?, ?, ?)", [student_id, fortigate_id, password]);
        res.status(201).json({ message: "Student library created successfully.", libraryId: result.insertId });
    }
    catch(error){
        console.error("Error creating student library:", error);
        res.status(500).json({ error: "An error occurred while creating the student library." });
    }
}

export const getStudentLibrarybyid = async (req, res) => {
    try{
        const {library_id} = req.params;
        const [library] = await db.query("SELECT * FROM student_library WHERE library_id = ?", [library_id]);
        if (library.length === 0) {
            return res.status(404).json({ error: "Student library not found." });
        }
        res.status(200).json(library[0]);
    }
    catch(error){
        console.error("Error fetching student library by ID:", error);
        res.status(500).json({ error: "An error occurred while fetching the student library." });
    }
}

export const getStudentLibrary = async (req, res) => {
    try{
        const [libraries] = await db.query("SELECT * FROM student_library");
        res.status(200).json(libraries);
    }
    catch(error){
        console.error("Error fetching student library:", error);
        res.status(500).json({ error: "An error occurred while fetching the student library." });
    }
}