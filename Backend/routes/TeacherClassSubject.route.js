import express from "express";
const router = express.Router();

import {addTeacherClassSubject,getTeacherClassSubject,getTeacherClassSubjectById} from "../controllers/TeacherClassSubject.controller.js";

router.post("/addTeacherClassSubject", addTeacherClassSubject);
router.get("/getTeacherClassSubject", getTeacherClassSubject);
router.get("/getTeacherClassSubjectById/:id", getTeacherClassSubjectById);

export default router;