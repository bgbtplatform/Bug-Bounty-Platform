import express from "express";
import auth from "../middleware/auth.middleware.js";
import isSuperAdmin from "../middleware/superAdmin.middleware.js";
import { getPlatformStats, getAllUsers, deleteAnyUser, updateAnyProgramStatus, getAllProgramsAdmin, getAllReportsAdmin, adminLogin } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);

router.use(auth, isSuperAdmin);

router.get("/stats", getPlatformStats);
router.get("/users", getAllUsers);
router.get("/programs", getAllProgramsAdmin);
router.get("/reports", getAllReportsAdmin);
router.delete("/users/:id", deleteAnyUser);
router.patch("/programs/:id/status", updateAnyProgramStatus);

export default router;
