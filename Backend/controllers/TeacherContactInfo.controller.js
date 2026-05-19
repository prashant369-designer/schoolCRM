import db from "../config/db.js";

export const createTeacherContactInfo = async(req, res) => {
    try{
        const {teacherauth_id,phone,alternate_phone,email,address_line1,address_line2,city,state,pincode,country,emergency_contact_name,emergency_contact_phone,emergency_relation} = req.body;
        const [result] = await db.query("INSERT INTO teacher_contact (teacherauth_id, phone, alternate_phone, email, address_line1, address_line2, city, state, pincode, country, emergency_contact_name, emergency_contact_phone, emergency_relation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [teacherauth_id, phone, alternate_phone, email, address_line1, address_line2, city, state, pincode, country, emergency_contact_name, emergency_contact_phone, emergency_relation]);
        res.status(201).json({ message: "Teacher contact info created successfully.", contact_id: result.insertId });
    }
    catch(error){
        console.error("Error creating teacher contact info:", error);
        res.status(500).json({ error: "An error occurred while creating teacher contact info." });
    }
}

export const getTeacherContactInfo = async(req, res) => {
    try{
        const {contact_id} = req.params;
       const [rows] = await db.query("SELECT * FROM teacher_contact WHERE contact_id = ?", [contact_id]);
       if(rows.length === 0){
        return res.status(404).json({ error: "Teacher contact info not found." });
       }
         res.json(rows[0]);
    }
    catch(error){
        console.error("Error fetching teacher contact info:", error);
        res.status(500).json({ error: "An error occurred while fetching teacher contact info." });
    }
}

