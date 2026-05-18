import express from "express";
const router = express.Router();

import {createTimeSlots,getTimeSlots,getTimeSlotsByid,deleteTimeSlots,updateTimeSlots} from "../controllers/TimeSlots.controller.js";

router.post("/createtimeslots", createTimeSlots);
router.get("/gettimeslots", getTimeSlots);
router.get("/gettimeslotsbyid/:timeslot_id", getTimeSlotsByid);
router.delete("/deletetimeslots/:timeslot_id", deleteTimeSlots);
router.put("/updatetimeslots/:timeslot_id", updateTimeSlots);

export default router;