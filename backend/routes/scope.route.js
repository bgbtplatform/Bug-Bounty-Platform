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
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, addScope);

router.get("/", getAllScopes);
router.get("/company/:companyId", getScopesByCompany);
router.get("/program/:programId", getScopesByProgram);
router.get("/:id", getScope);

router.put("/:id", auth, updateScope);

router.delete("/:id", auth, deleteScope);

export default router;
