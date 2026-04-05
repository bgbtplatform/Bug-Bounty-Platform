import express from "express";
import {
  addScope,
  getScopesByCompany,
  getScope,
  updateScope,
  deleteScope,
} from "../controllers/scope.controller.js";

const router = express.Router();

// ADD SCOPE
router.post("/", addScope);

// GET SCOPES BY COMPANY
router.get("/company/:companyId", getScopesByCompany);

// GET SINGLE SCOPE
router.get("/:id", getScope);

// UPDATE SCOPE
router.put("/:id", updateScope);

// DELETE SCOPE
router.delete("/:id", deleteScope);

export default router;