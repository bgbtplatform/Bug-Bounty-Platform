import express from "express";
import{
    addReport,allReports,updateReport,deleteReport
} from "./../controllers/report.controller.js"

import upload from "./../middleware/pdfUpload.middleware.js"

let router = express.Router();

router.post("/",upload.single("attachement"),addReport)
router.get("/",allReports)
router.put("/:id",updateReport)
router.delete("/:id",deleteReport)

export default router;