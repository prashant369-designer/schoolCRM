import express from "express";
const router = express.Router();

import { registerteacher,loginteacher,changeemail,changepassword,forgotpassword } from "../../controllers/auth/teacherauth.controller.js";

router.post("/register", registerteacher);
router.post("/login", loginteacher);
router.put("/changeemail/:id", changeemail);
router.put("/changepassword/:id", changepassword);
router.post("/forgotpassword/:id", forgotpassword);

export default router;