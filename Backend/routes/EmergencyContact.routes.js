import express from "express";
const router = express.Router();

import {addEmergencyContact,getEmergencyContact,getEmergencyContactById,deleteEmergencyContact,updateEmergencyContact} from "../controllers/EmergencyContact.controller.js";

router.post("/addemergencycontact", addEmergencyContact);
router.get("/getemergencycontact", getEmergencyContact);
router.get("/getemergencycontactbyid/:emergencycontact_id", getEmergencyContactById);
router.delete("/deleteemergencycontact/:emergencycontact_id", deleteEmergencyContact);
router.put("/updateemergencycontact/:emergencycontact_id", updateEmergencyContact);

export default router;