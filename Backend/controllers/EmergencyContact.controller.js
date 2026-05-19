import db from "../config/db.js";

export const addEmergencyContact = async (req, res) => {
    try{
        const {person_name,Relation,City,Contact_No,student_id} = req.body;
        
        const [result] = await db.query(
            "INSERT INTO emergency_contact (person_name, Relation, City, Contact_No, student_id) VALUES (?, ?, ?, ?, ?)",
            [person_name, Relation, City, Contact_No, student_id]
        );

        res.status(201).json({ message: "Emergency contact added successfully", emergencyContactId: result.insertId });
    }
    catch(error){
        console.log("Error adding emergency contact:", error);
        res.status(500).json({ error: "An error occurred while adding the emergency contact." });
    }
}

export const getEmergencyContact = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM emergency_contact");
        res.status(200).json(rows);
    }
    catch(error){
        console.log("Error fetching emergency contacts:", error);
        res.status(500).json({ error: "An error occurred while fetching emergency contacts." });
    }
}

export const getEmergencyContactById = async (req, res) => {
    try{
    const { emergency_id } = req.params;
    const [rows] = await db.query("SELECT * FROM emergency_contact WHERE emergency_id = ?", [emergency_id]);

    if (rows.length === 0) {
        return res.status(404).json({ error: "Emergency contact not found." });
    }
    res.status(200).json(rows[0]);
    }catch(error){
        console.log("Error fetching emergency contact by ID:", error);
        res.status(500).json({ error: "An error occurred while fetching the emergency contact." });
    }
    
}

export const deleteEmergencyContact =async (req, res) => {
    try{
        const { emergency_id } = req.params;
        const [result] = await db.query("DELETE FROM emergency_contact WHERE emergency_id = ?", [emergency_id]);
        res.status(200).json({ message: "Emergency contact deleted successfully" });
    }
    catch(error){
        console.log("Error deleting emergency contact:", error);
        res.status(500).json({ error: "An error occurred while deleting the emergency contact." });
    }
}

export const updateEmergencyContact = async(req, res) => {
    try{
        const { emergency_id } = req.params;
        const {person_name,Relation,City,Contact_No,student_id} = req.body;
        const [result] = await db.query(
            "UPDATE emergency_contact SET person_name = ?, Relation = ?, City = ?, Contact_No = ?, student_id = ? WHERE emergency_id = ?",
            [person_name, Relation, City, Contact_No, student_id, emergency_id]
        );
        res.status(200).json({ message: "Emergency contact updated successfully" });
    }
    catch(error){
        console.log("Error updating emergency contact:", error);
        res.status(500).json({ error: "An error occurred while updating the emergency contact." });
    }
}