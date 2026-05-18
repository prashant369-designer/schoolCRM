import express from "express";
const router = express.Router();

import { CreateTeacher,GetAllTeacher,getTeacherbyid } from "../controllers/Teacher.controller.js";

router.post("/createteacherdetails", CreateTeacher);
router.get("/getallteacherdetails", GetAllTeacher);
router.get("/gettacherbyid/:id", getTeacherbyid);

export default router;