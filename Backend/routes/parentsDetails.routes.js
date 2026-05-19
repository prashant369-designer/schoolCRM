import express from "express";
const router = express.Router();

import {createparetsDetail,getParentsDetailsByStudentId} from "../controllers/ParentsDetail.controller.js";

router.post("/createstudentparentdetails", createparetsDetail);
router.get("/getstudentparentdetailsbyid/:parent_id", getParentsDetailsByStudentId);

export default router;