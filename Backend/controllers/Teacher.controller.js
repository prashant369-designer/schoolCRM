import db from "../config/db.js";

export const CreateTeacher =async (req, res) => {
    try{
        const {teacherauth_id,first_name,last_name,date_of_birth,gender,qualification,experience,salary,profile_image,Department,bio,Class_Teacher,Subjects} = req.body;

        const [result] = await db.query(
            "INSERT INTO teachers_details (teacherauth_id, first_name, last_name, date_of_birth, gender, qualification, experience, salary, profile_image, Department, bio, Class_Teacher, Subjects) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [teacherauth_id, first_name, last_name, date_of_birth, gender, qualification, experience, salary, profile_image, Department, bio, Class_Teacher, Subjects]
        );
        
        res.status(201).json({ message: "Teacher details created successfully", teacherId: result.insertId });
    }
    catch(error){
        console.log("Error creating teacher details:", error);
        res.status(500).json({ error: "Failed to create teacher details" });
    }
}

export const GetAllTeacher =async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM teachers_details");
        res.status(200).json(rows);
    }
    catch(error){
        console.log("Error fetching teacher details:", error);
        res.status(500).json({ error: "Failed to fetch teacher details" });
    }
}

export const getTeacherbyid =async (req, res) => {
    try{
        const {id} = req.params;
        const [rows] = await db.query("SELECT * FROM teachers_details WHERE teacher_id = ?", [id]);
        if(rows.length === 0){
            return res.status(404).json({ error: "Teacher not found" });
        }
        res.status(200).json(rows[0]);
    }   
    catch(error){
        console.log("Error fetching teacher details by ID:", error);
        res.status(500).json({ error: "Failed to fetch teacher details" });
    }
}

export const getTeacherFullDetailsByAuthId = async (req, res) => {
  try {
    const { teacherauth_id } = req.params;

    if (!teacherauth_id) {
      return res.status(400).json({
        message: "teacherauth_id is required",
      });
    }

    const [teacherRows] = await db.query(
      `
      SELECT 
        ta.teacherauth_id,
        ta.registration_no,
        ta.passwords,
        ta.role,
        ta.mailid,

        td.teacher_id,
        td.first_name,
        td.last_name,
        td.date_of_birth,
        td.gender,
        td.religion,
        td.qualification,
        td.experience,
        td.joining_date,
        td.salary,
        td.profile_image,
        td.Department,
        td.bio,
        td.Class_Teacher,
        td.Subjects,

        tc.contact_id,
        tc.phone,
        tc.alternate_phone,
        tc.email,
        tc.address_line1,
        tc.address_line2,
        tc.city,
        tc.state,
        tc.pincode,
        tc.country,
        tc.emergency_contact_name,
        tc.emergency_contact_phone,
        tc.emergency_relation,

        te.experience_id,
        te.school_name,
        te.role,
        te.subject,
        te.start_date,
        te.end_date,
        te.total_years,
        te.description
        
      FROM teacher_auth ta
      LEFT JOIN teachers_details td 
        ON ta.teacherauth_id = td.teacherauth_id
      LEFT JOIN teacher_contact tc  
        ON ta.teacherauth_id = tc.teacherauth_id
        LEFT JOIN teacher_experience te
        ON ta.teacherauth_id = te.teacherauth_id
      WHERE ta.teacherauth_id =  ?
      `,
      [teacherauth_id]
    );

    if (teacherRows.length === 0) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    const teacher = teacherRows[0];

    res.status(200).json({
      auth: {
        teacherauth_id: teacher.teacherauth_id,
        registration_no: teacher.registration_no,
        passwords: teacher.passwords,
        role: teacher.role,
        mailid: teacher.mailid,
      },
      details: {
        teacher_id: teacher.teacher_id,
        first_name: teacher.first_name,
        last_name: teacher.last_name,
        date_of_birth: teacher.date_of_birth,
        gender: teacher.gender,
        religion: teacher.religion,
        qualification: teacher.qualification,
        experience: teacher.experience,
        joining_date: teacher.joining_date,
        salary: teacher.salary,
        profile_image: teacher.profile_image,
        Department: teacher.Department,
        bio: teacher.bio,
        Class_Teacher: teacher.Class_Teacher,
        Subjects: teacher.Subjects,
      },
        contact: {
        contact_id: teacher.contact_id,
        phone: teacher.phone,
        alternate_phone: teacher.alternate_phone,
        email: teacher.email,
        address_line1: teacher.address_line1,
        address_line2: teacher.address_line2,
        city: teacher.city,
        state: teacher.state,
        pincode: teacher.pincode,
        country: teacher.country,
        emergency_contact_name: teacher.emergency_contact_name,
        emergency_contact_phone: teacher.emergency_contact_phone,
        emergency_relation: teacher.emergency_relation,
      },
        experience: {
        experience_id: teacher.experience_id,
        school_name: teacher.school_name,
        role: teacher.role,
        subject: teacher.subject,
        start_date: teacher.start_date,
        end_date: teacher.end_date,
        total_years: teacher.total_years,
        description: teacher.description,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching full teacher details",
      error: err.message,
    });
  }
};