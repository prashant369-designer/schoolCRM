import db from "../config/db.js";

export const createStudentDetails = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      religion,
      roll,
      profile_image,
      studentauth_id,
      gender,
      category,
      aadhar_no,
      library_code,
      pan_no,
      classsection_id,
    } = req.body;

    const sql = `
      INSERT INTO students_details 
      (first_name, last_name, date_of_birth, religion, roll, profile_image, studentauth_id, gender, category, aadhar_no, library_code, pan_no, classsection_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      first_name,
      last_name,
      date_of_birth,
      religion,
      roll,
      profile_image,
      studentauth_id,
      gender,
      category,
      aadhar_no,
      library_code,
      pan_no,
      classsection_id,
    ];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      message: "Student details created successfully",
      studentId: result.insertId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating student details",
    });
  }
};

export const getAllStudentsdetails = async (req, res) => {
  try {
    await db.ping();
    console.log("DB Connected");
    const sql = "SELECT * FROM students_details";
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching students details",
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "SELECT * FROM students_details WHERE student_id = ?";

    const [rows] = await db.query(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Student details not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching student details",
    });
  }
};

export const getStudentFullDetailsByAuthId = async (req, res) => {
  try {
    const { studentauth_id } = req.params;

    if (!studentauth_id) {
      return res.status(400).json({
        message: "studentauth_id is required",
      });
    }

    // 1. Student auth + basic details
    const [studentRows] = await db.query(
      `
      SELECT 
        sa.studentauth_id,
        sa.registration_no,
        sa.passwords,
        sa.role,
        sa.mailid,

        sd.student_id,
        sd.first_name,
        sd.last_name,
        sd.date_of_birth,
        sd.religion,
        sd.roll,
        sd.admission_date,
        sd.profile_image,
        sd.gender,
        sd.category,
        sd.aadhar_no,
        sd.library_code,
        sd.pan_no,
        sd.classsection_id,

        cs.classsection_id,
        cs.classname,
        cs.section

      FROM student_auth sa
      LEFT JOIN students_details sd 
        ON sa.studentauth_id = sd.studentauth_id

      LEFT JOIN class_section cs
        ON sd.classsection_id = cs.classsection_id

      WHERE sa.studentauth_id = ?
      `,
      [studentauth_id],
    );

    if (studentRows.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const student = studentRows[0];
    const student_id = student.student_id;

    // 2. Contact info
    const [contactRows] = await db.query(
      `
      SELECT * FROM student_contacts
      WHERE student_id = ?
      `,
      [student_id],
    );

    // 3. Education info
    const [educationRows] = await db.query(
      `
      SELECT * FROM student_education
      WHERE studentauth_id = ?
      `,
      [studentauth_id],
    );

    // 4. Library info
    const [libraryRows] = await db.query(
      `
      SELECT * FROM student_library
      WHERE student_id = ?
      `,
      [student_id],
    );

    // 5. Parent info
    const [parentRows] = await db.query(
      `
      SELECT * FROM student_parents
      WHERE student_id = ?
      `,
      [student_id],
    );

    // 6 emergenty info
    const [emergencyRows] = await db.query(
      `
      SELECT * FROM emergency_contact
      WHERE student_id = ?
      `,
      [student_id],
    );

    // 7 documents info
    const [documentRows] = await db.query(
      `
      SELECT * FROM document
      WHERE student_id = ?
      `,
      [student_id],
    );

    res.status(200).json({
      auth: {
        studentauth_id: student.studentauth_id,
        registration_no: student.registration_no,
        passwords: student.passwords,
        role: student.role,
        mailid: student.mailid,
      },

      details: {
        student_id: student.student_id,
        first_name: student.first_name,
        last_name: student.last_name,
        date_of_birth: student.date_of_birth,
        religion: student.religion,
        roll: student.roll,
        admission_date: student.admission_date,
        profile_image: student.profile_image,
        studentauth_id: student.studentauth_id,
        gender: student.gender,
        category: student.category,
        aadhar_no: student.aadhar_no,
        library_code: student.library_code,
        pan_no: student.pan_no,
        classsection_id: student.classsection_id,
      },

      classsection: {
        classsection_id: student.classsection_id,
        classname: student.classname,
        section: student.section,
      },

      contact: contactRows[0] || null,
      education: educationRows,
      library: libraryRows[0] || null,
      parents: parentRows[0] || null,
      emergency: emergencyRows[0] || null,
      documents: documentRows,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching full student details",
    });
  }
};
