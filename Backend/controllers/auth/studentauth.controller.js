import db from "../../config/db.js";

export const registerstudent = (req, res) => {
    try{
        const {registration_no, password,mailid} = req.body;
        const sql = db.query("INSERT INTO student_auth (registration_no, password, mailid) VALUES (?, ?, ?)");
        sql.query([registration_no, password, mailid], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(201).json({ message: "Student registered successfully" });
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const loginstudent = (req, res) => {
    try{
        const {registration_no, password} = req.body;
        const sql = db.query("SELECT * FROM student_auth WHERE registration_no = ? AND password = ?");
        sql.query([registration_no, password], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(200).json(result);
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const changeemail = (req, res) => {
    try{
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const changepassword = (req, res) => {
    try{
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const forgotpassword = (req, res) => {
    try{
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
