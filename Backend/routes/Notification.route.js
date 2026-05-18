import express from "express";
const router = express.Router();

import {createnotification,getnotification,getnotificationbyid,deletenotification,updatenotification} from "../controllers/Notification.controller.js";

router.post("/createnotification", createnotification);
router.get("/getnotification", getnotification);
router.get("/getnotificationbyid/:notification_id", getnotificationbyid);
router.delete("/deletenotification/:notification_id", deletenotification);
router.put("/updatenotification/:notification_id", updatenotification);

export default router;