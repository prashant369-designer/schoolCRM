import db from "../config/db.js";

export const createClassandSection = (req, res) => {
  try {
    const {classname,section} = req.body;
    const sql = "INSERT INTO class_section (classname, section) VALUES (?, ?)";
    db.query(sql, [classname, section], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database Error" });
      }
      res.status(201).json({ message: "Class and Section created successfully", id: result.insertId });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getClassandSection = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM class_section"
    );
    return res.status(200).json(rows);
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getclassandSectionByid = async (req, res) => {
  try {
        const { classsection_id } = req.params;
        const [rows] = await db.query("SELECT * FROM class_section WHERE classsection_id = ?", [classsection_id]);
        if (rows.length === 0) {
          return res.status(404).json({ error: "Class and Section not found" });
        }
        return res.status(200).json(rows[0]);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteclassandSection = async (req, res) => {
  try {
    const { classsection_id } = req.params;
    const [result] = await db.query("DELETE FROM class_section WHERE classsection_id = ?", [classsection_id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Class and Section not found" });
    }
    return res.status(200).json({ message: "Class and Section deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateclassandSection = (req, res) => {
  try {
    const { classsection_id } = req.params;
    const { classname, section } = req.body;

    const sql = `
      UPDATE class_section 
      SET classname = ?, section = ? 
      WHERE classsection_id = ?
    `;

    const values = [classname, section, classsection_id];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Class and Section not found" });
      }

      return res.status(200).json({
        message: "Class and Section updated successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};