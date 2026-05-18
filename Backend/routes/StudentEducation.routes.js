import express from "express";
const router = express.Router();

import {createstudenteducation,getstudenteducationbyid} from "../controllers/StudentEducation.controller.js";

router.post("/createstudenteducation", createstudenteducation);
router.get("/getstudenteducationbyid/:student_edu_id", getstudenteducationbyid);

export default router;