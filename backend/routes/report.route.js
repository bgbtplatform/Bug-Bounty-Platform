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

router.get("/my", auth, getMyReports);
router.get("/program/:programId", auth, getReportsByProgram);
router.post("/", auth, upload.single("attachements"), addReport);
router.get("/", auth, allReports);
router.patch("/:id/status", auth, updateReportStatus);
router.get("/:id", auth, getReportById);
router.put("/:id", auth, updateReport);
router.put("/:id/attachments", auth, upload.single("attachements"), updateReportAttachments);
router.delete("/:id", auth, deleteReport);

export default router;
