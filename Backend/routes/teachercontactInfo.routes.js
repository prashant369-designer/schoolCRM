import express from "express";
const router = express.Router();

import { createTeacherContactInfo,getTeacherContactInfo } from "../controllers/TeacherContactInfo.controller.js";

router.post("/createteachercontactinfo", createTeacherContactInfo);
router.get("/getteachercontactinfobyid/:teacherId", getTeacherContactInfo);

export default router;