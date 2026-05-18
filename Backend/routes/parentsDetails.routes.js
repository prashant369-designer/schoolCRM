import express from "express";
const router = express.Router();

import {createparetsDetail,getParentsDetailsByStudentId} from "../controllers/ParentsDetail.controller.js";

router.post("/createstudentparentdetails", createparetsDetail);
router.get("/getstudentparentdetailsbyid/:studentId", getParentsDetailsByStudentId);

export default router;