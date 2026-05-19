import db from "../config/db.js";

export const addDocument = async(req, res) => {
    try{
        const {student_id,document_type,doc_category,approved_date,document_upload,status} = req.body;
        const [result] = await db.query(
            "INSERT INTO documents (student_id, document_type, doc_category, approved_date, document_upload, status) VALUES (?, ?, ?, ?, ?, ?)",
            [student_id, document_type, doc_category, approved_date, document_upload, status]
        );
        res.status(201).json({ message: "Document added successfully", documentId: result.insertId });
    }
    catch(error){
        console.error("Error adding document:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllDocuments = async(req, res) => {
    try{
        const [documents] = await db.query("SELECT * FROM documents");
        res.status(200).json(documents);
    }
    catch(error){
        console.error("Error fetching documents:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getDocumentsByStudentId =async (req, res) => {
    try{
        const document_id = req.params;
        const [documents] = await db.query("SELECT * FROM documents WHERE student_id = ?", [document_id])
        res.status(200).json(documents)
    }
    catch(error){
        console.error("Error fetching documents by student ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateDocumentStatus = async(req, res) => {
    try{
        const document_id = req.params;
        const { status } = req.body;
        const [result] = await db.query("UPDATE documents SET status = ? WHERE document_id = ?", [status, document_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document status updated successfully" });
    }
    catch(error){
        console.error("Error updating document status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteDocument =async (req, res) => {
    try{
        const document_id = req.params;
        const [result] = await db.query("DELETE FROM documents WHERE document_id = ?", [document_id]);
        if(result.affectedRows === 0){
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document deleted successfully" });
    }
    catch(error){
        console.error("Error deleting document:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}