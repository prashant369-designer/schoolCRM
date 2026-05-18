import express from "express";
const router = express.Router();

import { registerstudent,loginstudent,changeemail,changepassword,forgotpassword } from "../../controllers/auth/studentauth.controller.js";

router.post("/register", registerstudent);
router.post("/login", loginstudent);
router.put("/changeemail/:id", changeemail);
router.put("/changepassword/:id", changepassword);
router.post("/forgotpassword/:id", forgotpassword);

export default router;