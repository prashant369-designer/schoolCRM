import express from "express";
const router = express.Router();

import {createClassandSubject,getClassandSubject,getclassandSubjectByid,deleteclassandSubject,updateclassandSubject} from "../controllers/ClassandSubject.controller.js";

router.post("/createclassandsubject", createClassandSubject);
router.get("/getclassandsubject", getClassandSubject);
router.get("/getclassandsubjectbyid/:class_subject_id", getclassandSubjectByid);
router.delete("/deleteclassandsubject/:class_subject_id", deleteclassandSubject);
router.put("/updateclassandsubject/:class_subject_id", updateclassandSubject);

export default router;