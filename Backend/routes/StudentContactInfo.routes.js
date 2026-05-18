import express from "express";
const router = express.Router();

import {
    createStudentContactInfo,getStudentContactInfo,getallstudentcontactInfo
}
from "../controllers/StudentContactInfo.controller.js";

router.post("/createstudentcontactinfo", createStudentContactInfo);
router.get("/getstudentcontactinfobyid/:studentId", getStudentContactInfo);
router.get("/getallstudentcontactinfo", getallstudentcontactInfo);

export default router;