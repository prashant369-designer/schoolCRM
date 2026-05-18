import express from "express";
const router = express.Router();

import {createTimetable,getTimetableFields,getAllTimetables }  from "../controllers/Timetable.controller.js";

router.post("/createtimetable", createTimetable);
router.get("/getalltimetablefields", getTimetableFields);
router.get("/getalltimetables", getAllTimetables);

export default router;