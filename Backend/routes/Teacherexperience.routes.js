import express from "express";
const router = express.Router();

import {createteacherexperience,getteacherexperienceByid }  from "../controllers/Teacherexperience.controller.js";

router.post("/createteacherexperience", createteacherexperience);
router.get("/getteacherexperiencebyid/:experience_id", getteacherexperienceByid);

export default router;