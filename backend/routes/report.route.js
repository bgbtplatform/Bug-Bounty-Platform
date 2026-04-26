import express from "express";
import {
    addReport,
    allReports,
    getReportById,
    updateReport,
    deleteReport,
    getMyReports
} from "../controllers/report.controller.js";

import upload from "../middleware/pdfUpload.middleware.js";
import auth from "../middleware/auth.middleware.js";

let router = express.Router();

// Get personal reports (Must be above /:id)
router.get("/my", auth, getMyReports);

// Create report
router.post("/", auth, upload.single("attachements"), addReport);

// Admin / Internal
router.get("/", auth, allReports);

// Specific report management
router.get("/:id", auth, getReportById);
router.put("/:id", auth, updateReport);
router.delete("/:id", auth, deleteReport);

export default router;
