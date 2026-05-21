import express from "express";
import db from "./config/db.js";

const router = express.Router();

// Create exam
router.post("/create", async (req, res) => {
  try {
    const { exam_name, classsection_id, class_subject_id, duration, total_marks } = req.body;

    const [result] = await db.query(
      `INSERT INTO exams 
      (exam_name, classsection_id, class_subject_id, duration, total_marks) 
      VALUES (?, ?, ?, ?, ?)`,
      [exam_name, classsection_id, class_subject_id, duration, total_marks]
    );

    res.json({
      success: true,
      message: "Exam created successfully",
      exam_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add question
router.post("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    const {
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      marks,
    } = req.body;

    await db.query(
      `INSERT INTO questionslist
      (exam_id, question, option_a, option_b, option_c, option_d, correct_answer, marks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        examId,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        marks,
      ]
    );

    res.json({ success: true, message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Publish exam
router.put("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    await db.query("UPDATE exams SET status = 'published' WHERE exam_id = ?", [
      examId,
    ]);

    res.json({ success: true, message: "Exam published successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get exam with questions
router.get("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    const [exam] = await db.query("SELECT * FROM exams WHERE exam_id = ?", [examId]);

    const [questions] = await db.query(
      `SELECT exam_id, question, option_a, option_b, option_c, option_d, marks 
       FROM questionslist WHERE exam_id = ?`,
      [examId]
    );

    res.json({
      success: true,
      exam: exam[0],
      questions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Submit exam
router.post("/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    const { student_id, answers } = req.body;

    if (!student_id || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "student_id and answers are required",
      });
    }

    let obtainedMarks = 0;

    for (const ans of answers) {
      const [questionRows] = await db.query(
        "SELECT correct_answer, marks FROM questionslist WHERE question_id = ?",
        [ans.question_id]
      );

      if (questionRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Question not found: ${ans.question_id}`,
        });
      }

      const question = questionRows[0];

      await db.query(
        `INSERT INTO student_answers 
        (exam_id, studentauth_id, question_id, selected_answer)
        VALUES (?, ?, ?, ?)`,
        [examId, student_id, ans.question_id, ans.selected_answer]
      );

      if (question.correct_answer === ans.selected_answer) {
        obtainedMarks += question.marks;
      }
    }

    const [examRows] = await db.query(
      "SELECT total_marks FROM exams WHERE exam_id = ?",
      [examId]
    );

    if (examRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    const totalMarks = examRows[0].total_marks;
    const percentage = Number(((obtainedMarks / totalMarks) * 100).toFixed(2));

    await db.query(
      `INSERT INTO examresults 
      (exam_id, studentauth_id, total_marks, obtained_marks, percentage)
      VALUES (?, ?, ?, ?, ?)`,
      [examId, student_id, totalMarks, obtainedMarks, percentage]
    );

    res.json({
      success: true,
      message: "Exam submitted successfully",
      totalMarks,
      obtainedMarks,
      percentage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;