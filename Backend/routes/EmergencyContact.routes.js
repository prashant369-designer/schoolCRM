import express from "express";
const router = express.Router();

import {addEmergencyContact,getEmergencyContact,getEmergencyContactById,deleteEmergencyContact,updateEmergencyContact} from "../controllers/EmergencyContact.controller.js";

router.post("/addemergencycontact", addEmergencyContact);
router.get("/getemergencycontact", getEmergencyContact);
router.get("/getemergencycontactbyid/:emergency_id", getEmergencyContactById);
router.delete("/deleteemergencycontact/:emergency_id", deleteEmergencyContact);
router.put("/updateemergencycontact/:emergency_id", updateEmergencyContact);

export default router;