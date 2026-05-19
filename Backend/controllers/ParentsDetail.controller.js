import db from "../config/db.js";

export const createparetsDetail = async(req, res) => {
    try{
    const {student_id,father_name,father_contact,mother_name,mother_contact,father_occupation,mother_occupation,FathersQualification,Fatheremail,Motherqualification,Motheremail} = req.body;

    const [result] = await db.query(
        "INSERT INTO student_parents (student_id, father_name, father_contact, mother_name, mother_contact, father_occupation, mother_occupation, FathersQualification, Fatheremail, Motherqualification, Motheremail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [student_id,father_name,father_contact,mother_name,mother_contact,father_occupation,mother_occupation,FathersQualification,Fatheremail,Motherqualification,Motheremail]
    );
    res.status(201).json({ message: "Parent details created successfully", parentId: result.insertId });

    }
    catch(error){
        console.error("Error creating parent details:", error);
        res.status(500).json({ error: "An error occurred while creating parent details." });
}
}

export const getParentsDetailsByStudentId = async (req, res) => {
    try {
        const {parent_id}  = req.params;

        const [rows] = await db.query("SELECT * FROM student_parents WHERE parent_id = ?", [parent_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Parent details not found for the given student ID." });
        }

        res.status(200).json(rows[0]);
    }
    catch (error) {
        console.error("Error fetching parent details:", error);
        res.status(500).json({ error: "An error occurred while fetching parent details." });
    }
}


