import express from "express";
import {
  createStudentDetails,
  getAllStudentsdetails,
  getStudentById,
  getStudentFullDetailsByAuthId
} from "../controllers/StudentDetails.controller.js";

const router = express.Router();

router.post("/createstudentdetails", createStudentDetails);
router.get("/getallstudentsdetails", getAllStudentsdetails);
router.get("/getstudentbyid/:id", getStudentById);
router.get("/getstudentdetailsbyauthid/:studentauth_id", getStudentFullDetailsByAuthId);

export default router;