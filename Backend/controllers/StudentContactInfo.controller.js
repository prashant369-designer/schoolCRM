import db from "../config/db.js";

export const createStudentContactInfo = async (req, res) => {
    try{
        const {student_id,primary_phone,secondary_phone,primary_email, secondary_email,AddressLine,
            PostAddressLine,TensilAdmDivision,Country,PIN,State,Telephone,distict
        } = req.body;

        const sql = await db.query(`
            INSERT INTO student_contacts
            (student_id, primary_phone, secondary_phone, primary_email, secondary_email, AddressLine, PostAddressLine, TensilAdmDivision, Country, PIN, State, Telephone, distict)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [student_id, primary_phone, secondary_phone, primary_email, secondary_email, AddressLine,
            PostAddressLine,TensilAdmDivision,Country,PIN,State,Telephone,distict]);

        res.status(201).json({
            message: "Student contact info created successfully",
            contactId: sql[0].insertId,
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error creating student contact info",
        });
    }
}

export const getStudentContactInfo = async (req, res) => {
  try {
    const { contact_id } = req.params;

    if (!contact_id) {
      return res.status(400).json({
        message: "contact_id is required",
      });
    }

    const [rows] = await db.query(
      `
        SELECT * FROM student_contacts 
        WHERE contact_id = ?
      `,
      [contact_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Student contact info not found",
      });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching student contact info",
    });
  }
};

export const getallstudentcontactInfo = async (req, res) => {
    try{
        const [rows] = await db.query(`
            SELECT * FROM student_contacts
        `);
        res.status(200).json(rows);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error fetching all student contact info",
        });
    }
}
