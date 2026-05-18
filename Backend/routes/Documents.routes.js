import express from "express";
import {
  addDocument,
  getAllDocuments,
  getDocumentsByStudentId,
  updateDocumentStatus,
  deleteDocument,
} from "../controllers/Documents.controller.js";

const router = express.Router();

router.post("/add", addDocument);
router.get("/", getAllDocuments);
router.get("/student/:student_id", getDocumentsByStudentId);
router.put("/status/:document_id", updateDocumentStatus);
router.delete("/delete/:document_id", deleteDocument);

export default router;