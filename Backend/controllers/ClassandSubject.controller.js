import db from "../config/db.js";

export const createClassandSubject = async(req, res) => {
    try{
        const {subject_name,classsection_id,subject_code,subject_type} = req.body;
        const [result] = await db.query("INSERT INTO class_subjects (subject_name, classsection_id, subject_code, subject_type) VALUES (?, ?, ?, ?)", [subject_name, classsection_id, subject_code, subject_type]);
        res.status(201).json({ message: "Class and subject data created successfully.", class_subject_id: result.insertId });
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while creating class and subject data." });
    }
}

export const getClassandSubject = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM class_subjects");
        res.json(rows);
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while fetching class and subject data." });
    }
}

export const getclassandSubjectByid = async (req, res) => {
    try{
        const { class_subject_id } = req.params;
        const [rows] = await db.query("SELECT * FROM class_subjects WHERE class_subject_id = ?", [class_subject_id]);
        if(rows.length === 0){
            return res.status(404).json({ error: "Class and subject not found." });
        }
        res.json(rows[0]);
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while fetching class and subject data." });
    }
}

export const deleteclassandSubject = async (req, res) => {
    try{
        const { class_subject_id } = req.params;
        const [result] = await db.query("DELETE FROM class_subjects WHERE class_subject_id = ?", [class_subject_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "Class and subject not found." });
        }
        res.json({ message: "Class and subject data deleted successfully." });
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while deleting class and subject data." });
    }
}

export const updateclassandSubject = async(req, res) => {
    try{
        const { class_subject_id } = req.params;
        const { subject_name, classsection_id, subject_code, subject_type } = req.body;
        const [result] = await db.query("UPDATE class_subjects SET subject_name = ?, classsection_id = ?, subject_code = ?, subject_type = ? WHERE class_subject_id = ?", [subject_name, classsection_id, subject_code, subject_type, class_subject_id]);   
        if(result.affectedRows === 0){
            return res.status(404).json({ error: "Class and subject not found." });
        }
        res.json({ message: "Class and subject data updated successfully." });
    }
    catch(error){
        res.status(500).json({ error: "An error occurred while updating class and subject data." });
    }
}