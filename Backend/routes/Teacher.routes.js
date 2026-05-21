import express from "express";
const router = express.Router();

import { CreateTeacher,GetAllTeacher,getTeacherbyid,getTeacherFullDetailsByAuthId } from "../controllers/Teacher.controller.js";

router.post("/createteacherdetails", CreateTeacher);
router.get("/getallteacherdetails", GetAllTeacher);
router.get("/gettacherbyid/:id", getTeacherbyid);
router.get("/getteacherfulldetailsbyauthid/:teacherauth_id", getTeacherFullDetailsByAuthId);

export default router;