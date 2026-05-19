import db from "../config/db.js";

export const createteacherexperience = async(req, res) => {
    try{
        const {teacherauth_id,school_name,role,subject,start_date,end_date,total_years,description} = req.body;
        const [result] = await db.query("INSERT INTO teacher_experience (teacherauth_id, school_name, role, subject, start_date, end_date, total_years, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [teacherauth_id, school_name, role, subject, start_date, end_date, total_years, description]);
        res.status(201).json({ message: "Teacher experience created successfully.", experience_id: result.insertId });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "An error occurred while creating teacher experience." });
    }
}

export const getteacherexperienceByid = async(req, res) => {
    try{
        const {experience_id} = req.params;
        const [rows] = await db.query("SELECT * FROM teacher_experience WHERE experience_id = ?", [experience_id]);
        if(rows.length === 0){
            return res.status(404).json({ error: "Teacher experience not found." });
        }
        res.json(rows[0]);
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while fetching teacher experience." });
    }
}