import db from "../../config/db.js";
import jwt from "jsonwebtoken";
import mailer from "../../utils/mailer.js";

export const registerteacher = async (req, res) => {
  try {
    const { registration_no, passwords, mailid } = req.body;

    if (!registration_no || !passwords || !mailid) {
      return res.status(400).json({
        error: "registration_no, passwords and mailid are required",
      });
    }

    const sql = `
      INSERT INTO teacher_auth 
      (registration_no, passwords, mailid) 
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query(sql, [registration_no, passwords, mailid]);

    const subject = "Welcome to School CRM Portal 👨‍🏫";
    const text = `
Dear Teacher,

Welcome to our School CRM Portal.

Your teacher account has been created successfully.

Login Credentials:
--------------------------------
Email ID : ${mailid}
Password : ${passwords}
--------------------------------

Please login and change your password after first login.

Best Regards,
School CRM Team
`;

    const html = `
<div style="margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;">
  
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#059669,#0f766e);padding:30px;text-align:center;color:white;">
      <h1 style="margin:0;font-size:28px;">👨‍🏫 School CRM Portal</h1>
      <p style="margin-top:10px;font-size:15px;">
        Teacher Account Registration Successful
      </p>
    </div>

    <!-- Body -->
    <div style="padding:35px;">
      
      <h2 style="color:#111827;margin-bottom:10px;">
        Welcome Teacher 👋
      </h2>

      <p style="color:#4b5563;font-size:15px;line-height:1.7;">
        Your teacher account has been successfully created in the 
        <strong>School CRM Application</strong>.
      </p>

      <div style="margin:30px 0;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px;">
        
        <h3 style="margin-top:0;color:#374151;">
          🔐 Login Credentials
        </h3>

        <p style="margin:10px 0;font-size:15px;">
          <strong>Email ID:</strong> ${mailid}
        </p>

        <p style="margin:10px 0;font-size:15px;">
          <strong>Password:</strong> ${passwords}
        </p>

      </div>

      <!-- Features -->
      <div style="margin-top:25px;">
        <h3 style="color:#111827;">
          📚 Teacher Portal Features
        </h3>

        <ul style="color:#4b5563;line-height:1.8;padding-left:20px;">
          <li>Mark Student Attendance</li>
          <li>Manage Lecture Schedule</li>
          <li>View Assigned Classes</li>
          <li>Upload Notes & Assignments</li>
          <li>Track Student Performance</li>
        </ul>
      </div>

      <p style="color:#ef4444;font-size:14px;margin-top:25px;">
        ⚠️ For security purposes, please change your password after your first login.
      </p>

      <!-- Button -->
      <div style="text-align:center;margin-top:35px;">
        <a 
          href="http://localhost:5173/teacher-login"
          style="
            background:#059669;
            color:white;
            text-decoration:none;
            padding:14px 28px;
            border-radius:8px;
            display:inline-block;
            font-weight:bold;
            font-size:15px;
          "
        >
          Login to Teacher Portal
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#f3f4f6;padding:20px;text-align:center;font-size:13px;color:#6b7280;">
      © 2026 School CRM Application <br/>
      Teacher Management System
    </div>

  </div>
</div>
`;

    await mailer(mailid, subject, text, html);

    return res.status(201).json({
      message: "Student registered successfully",
      student_id: result.insertId,
    });
  } catch (error) {
    console.log("Register student error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
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
        id: student.teacherauth_id,
        registration_no: student.registration_no,
        mailid: student.mailid,
        role: "teacher",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: "teacher",
      id: student.teacherauth_id,
      registration_no: student.registration_no,
      mailid: student.mailid,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeemail = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentmailid, mailid } = req.body;

    if (!currentmailid || !mailid) {
      return res
        .status(400)
        .json({ error: "Current and new email are required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM teacher_auth WHERE teacherauth_id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = rows[0];
    if (currentmailid !== student.mailid) {
      return res
        .status(400)
        .json({ error: "Current email does not match our records" });
    }

    await db.query(
      "UPDATE teacher_auth SET mailid = ? WHERE teacherauth_id = ?",
      [mailid, id],
    );

    return res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changepassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentpassword, passwords, confirm_password } = req.body;

    if (!currentpassword || !passwords || !confirm_password) {
      return res
        .status(400)
        .json({
          error:
            "Current password, new password and confirm password are required",
        });
    }

    const [rows] = await db.query(
      "SELECT * FROM teacher_auth WHERE teacherauth_id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    const student = rows[0];
    if (currentpassword !== student.passwords) {
      return res
        .status(400)
        .json({ error: "Current password does not match our records" });
    }

    if (passwords !== confirm_password) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    await db.query(
      "UPDATE teacher_auth SET passwords = ? WHERE teacherauth_id = ?",
      [passwords, id],
    );

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotpassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { mailid } = req.body;

    if (!mailid) {
      return res.status(400).json({ error: "Email is required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM teacher_auth WHERE teacherauth_id = ?",
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = rows[0];

    if (mailid !== student.mailid) {
      return res.status(400).json({
        error: "Email does not match our records",
      });
    }

    const subject = "Password Reset Request for School CRM Portal";

    const text = `Dear Student,

We received a request to reset your password for your School CRM Portal account.

Your password is: ${student.passwords}

If you did not request a password reset, please immediately do report.

Best Regards,
School CRM Team`;

    await mailer(student.mailid, subject, text);

    return res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
