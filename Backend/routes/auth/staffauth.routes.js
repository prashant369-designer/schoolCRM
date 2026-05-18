import express from "express";
const router = express.Router();

import { registerstaff,loginstaff } from "../../controllers/auth/staffauth.controller.js";

router.post("/register", registerstaff);
router.post("/login", loginstaff);

export default router;