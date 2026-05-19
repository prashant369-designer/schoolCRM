import db from "../config/db.js";

export const CreateTeacher =async (req, res) => {
    try{
        const {teacherauth_id,first_name,last_name,date_of_birth,gender,qualification,experience,salary,profile_image,Department,bio,Class_Teacher,Subjects} = req.body;

        const [result] = await db.query(
            "INSERT INTO teachers_details (teacherauth_id, first_name, last_name, date_of_birth, gender, qualification, experience, salary, profile_image, Department, bio, Class_Teacher, Subjects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [teacherauth_id, first_name, last_name, date_of_birth, gender, qualification, experience, salary, profile_image, Department, bio, Class_Teacher, Subjects]
        );
        
        res.status(201).json({ message: "Teacher details created successfully", teacherId: result.insertId });
    }
    catch(error){
        console.log("Error creating teacher details:", error);
        res.status(500).json({ error: "Failed to create teacher details" });
    }
}

export const GetAllTeacher =async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM teachers_details");
        res.status(200).json(rows);
    }
    catch(error){
        console.log("Error fetching teacher details:", error);
        res.status(500).json({ error: "Failed to fetch teacher details" });
    }
}

export const getTeacherbyid =async (req, res) => {
    try{
        const {id} = req.params;
        const [rows] = await db.query("SELECT * FROM teachers_details WHERE teacher_id = ?", [id]);
        if(rows.length === 0){
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json(rows[0]);
    }   
    catch(error){
        console.log("Error fetching teacher details by ID:", error);
        res.status(500).json({ error: "Failed to fetch teacher details" });
    }
}