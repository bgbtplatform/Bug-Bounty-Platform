import express from "express";
import {
  addScope,
  getScopesByCompany,
  getScopesByProgram,
  getAllScopes,
  getScope,
  updateScope,
  deleteScope,
} from "../controllers/scope.controller.js";

const router = express.Router();

router.post("/", addScope);

router.get("/", getAllScopes);
router.get("/company/:companyId", getScopesByCompany);
router.get("/program/:programId", getScopesByProgram);
router.get("/:id", getScope);

router.put("/:id", updateScope);

router.delete("/:id", deleteScope);

export default router;