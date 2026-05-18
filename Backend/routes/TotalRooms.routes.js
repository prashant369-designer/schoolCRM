import express from "express";
const router = express.Router();

import {createTotalRooms,getTotalRooms,getTotalRoomsById,deleteTotalRooms,updateTotalRooms} from "../controllers/TotalRooms.controller.js";

router.post("/createrooms", createTotalRooms);
router.get("/getrooms", getTotalRooms);
router.get("/getroomsbyid/:rooms_id", getTotalRoomsById);
router.delete("/deleterooms/:rooms_id", deleteTotalRooms);
router.put("/updaterooms/:rooms_id", updateTotalRooms);

export default router;