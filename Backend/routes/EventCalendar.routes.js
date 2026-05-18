// routes/EventCalendar.route.js

import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/EventCalendar.controller.js";

const router = express.Router();

router.post("/createevent", createEvent);
router.get("/getevents", getEvents);
router.get("/geteventbyid/:event_id", getEventById);
router.put("/updateevent/:event_id", updateEvent);
router.delete("/deleteevent/:event_id", deleteEvent);

export default router;