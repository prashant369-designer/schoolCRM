import db from "../../config/db.js";

export const registerteacher = async (req, res) => {
  try {
    const { registration_no, password, mailid } = req.body;
    const sql = db.query(
      "INSERT INTO teacher_auth (registration_no, password, mailid) VALUES (?, ?, ?)",
    );
    sql.query([registration_no, password, mailid], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Student registered successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginteacher = async (req, res) => {
  try {
    const { registration_no, passwords } = req.body;

    if (!registration_no || !passwords) {
      return res.status(400).json({
        error: "Registration no and password required",
      });
    }

    const [rows] = await db.query(
      "SELECT * FROM teacher_auth WHERE registration_no = ?",
      [registration_no],
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const student = rows[0];

    if (passwords !== student.passwords) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: student.id,
        registration_no: student.registration_no,
        mailid: student.mailid,
        role: "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: "student",
      id: student.id,
      registration_no: student.registration_no,
      mailid: student.mailid,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
