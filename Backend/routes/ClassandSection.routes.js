import express from "express";
const router = express.Router();

import {createClassandSection,getClassandSection,getclassandSectionByid,deleteclassandSection,updateclassandSection} from "../controllers/ClassandSection.controller.js";

router.post("/createclassandsection", createClassandSection);
router.get("/getclassandsection", getClassandSection);
router.get("/getclassandsectionbyid/:classsection_id", getclassandSectionByid);
router.delete("/deleteclassandsection/:classsection_id", deleteclassandSection);
router.put("/updateclassandsection/:classsection_id", updateclassandSection);

export default router;