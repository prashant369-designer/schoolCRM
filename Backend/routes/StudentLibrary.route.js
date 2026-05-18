import express from "express";
const router = express.Router();

import {createStudentLibrary,getStudentLibrarybyid,getStudentLibrary} from "../controllers/StudentLibrary.controller.js";

router.post("/createstudentlibrary", createStudentLibrary);
router.get("/getstudentlibrary", getStudentLibrary);
router.get("/getstudentlibrarybyid/:library_id", getStudentLibrarybyid);

export default router;