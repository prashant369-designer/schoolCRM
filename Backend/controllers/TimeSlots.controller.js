import db from "../config/db.js";

export const createTimeSlots = async(req, res) => {
    try{
        const {start_time,end_time,slot_name,lecture_type} = req.body;
        const [result] = await db.query("INSERT INTO timeslots (start_time, end_time, slot_name, lecture_type) VALUES (?, ?, ?, ?)", [start_time, end_time, slot_name, lecture_type]);
        res.status(201).json({ message: "Time slot created successfully.", timeslot_id: result.insertId });
    }
    catch(error){
        console.error("Error creating time slot:", error);
        res.status(500).json({ error: "An error occurred while creating the time slot." });
    }
}

export const getTimeSlots = async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM timeslots");
        res.json(rows);
    }
    catch(error){
        console.error("Error fetching time slots:", error);
        res.status(500).json({ error: "An error occurred while fetching time slots." });
    }
}

export const getTimeSlotsByid = async(req, res) => {
    try{
        const { timeslot_id } = req.params;
        const [rows] = await db.query("SELECT * FROM timeslots WHERE timeslot_id = ?", [timeslot_id]);
        if(rows.length === 0){
            res.status(404).json({ error: "Time slot not found." });
        }
        else{
            res.json(rows[0]);
        }
    }
    catch(error){
        console.error("Error fetching time slot by ID:", error);
        res.status(500).json({ error: "An error occurred while fetching the time slot." });
    }
}

export const deleteTimeSlots = async(req, res) => {
    try{
        const { timeslot_id } = req.params;
        const [result] = await db.query("DELETE FROM timeslots WHERE timeslot_id = ?", [timeslot_id]);
        if(result.affectedRows === 0){
            res.status(404).json({ error: "Time slot not found." });
        }
        else{
            res.json({ message: "Time slot deleted successfully." });
        }
    }
    catch(error){
        console.error("Error deleting time slot:", error);
        res.status(500).json({ error: "An error occurred while deleting the time slot." });
    }
}

export const updateTimeSlots = async(req, res) => {
    try{
        const { timeslot_id } = req.params;
        const { start_time, end_time, slot_name, lecture_type } = req.body;
        const [result] = await db.query("UPDATE timeslots SET start_time = ?, end_time = ?, slot_name = ?, lecture_type = ? WHERE timeslot_id = ?", [start_time, end_time, slot_name, lecture_type, timeslot_id]);
        if(result.affectedRows === 0){
            res.status(404).json({ error: "Time slot not found." });
        }
        else{
            res.json({ message: "Time slot updated successfully." });
        }
    }
    catch(error){
        console.error("Error updating time slot:", error);
        res.status(500).json({ error: "An error occurred while updating the time slot." });
    }
}



