import express from "express";

import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyDetails,
  updateCompanyLogo,
  deleteCompany,
  searchCompany,
} from "../controllers/company.controller.js";

import upload from '../middleware/uploadFile.middleware.js';
import auth from "../middleware/auth.middleware.js";

let router = express.Router();

router.post("/", auth, upload.single("logo"), createCompany);
router.get("/search", searchCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

router.put("/:id/logo", auth, upload.single("logo"), updateCompanyLogo);
router.put("/:id", auth, upload.single("logo"), updateCompanyDetails);

router.delete("/:id", auth, deleteCompany);

export default router;
