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

let router = express.Router();

router.post("/", upload.single("logo"), createCompany);
router.get("/search", searchCompany);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);

router.put("/:id/logo", upload.single("logo"), updateCompanyLogo);
router.put("/:id", updateCompanyDetails);

router.delete("/:id", deleteCompany);

export default router;