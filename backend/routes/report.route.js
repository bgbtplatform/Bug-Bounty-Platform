import express from "express";
import {
    addReport,
    allReports,
    getReportById,
    updateReport,
    updateReportAttachments,
    deleteReport,
    getMyReports,
    getReportsByProgram,
    updateReportStatus
} from "../controllers/report.controller.js";

import upload from "../middleware/pdfUpload.middleware.js";
import auth from "../middleware/auth.middleware.js";

let router = express.Router();

// Get personal reports (Must be above /:id)
router.get("/my", auth, getMyReports);

// Get all reports for a specific program (company owner only)
router.get("/program/:programId", auth, getReportsByProgram);

// Create report
router.post("/", auth, upload.single("attachements"), addReport);

// Admin / Internal
router.get("/", auth, allReports);

// Update report status (company/program owner only)
router.patch("/:id/status", auth, updateReportStatus);

// Specific report management
router.get("/:id", auth, getReportById);
router.put("/:id", auth, updateReport);
router.put("/:id/attachments", auth, upload.single("attachements"), updateReportAttachments);
router.delete("/:id", auth, deleteReport);

export default router;
