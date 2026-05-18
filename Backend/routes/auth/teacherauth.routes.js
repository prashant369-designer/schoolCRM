import express from "express";
const router = express.Router();

import { registerteacher,loginteacher } from "../../controllers/auth/teacherauth.controller.js";

router.post("/register", registerteacher);
router.post("/login", loginteacher);

export default router;