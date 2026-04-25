import express from "express";

import {
    addUser,
    allUsers,
    getUserById,
    searchUser,
    updateUser,
    updateUserAvatar,
    deleteUser,
    loginUser,
    logout,
    getCurrentUser
} from "../controllers/user.controller.js";

import upload from '../middleware/uploadFile.middleware.js';
import auth from "../middleware/auth.middleware.js";

let router = express.Router();

router.post("/", upload.single("avatarUrl"), addUser);
router.get("/search", searchUser);
router.get("/", allUsers);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/current", auth, getCurrentUser);
router.get("/:id", getUserById);       

router.put("/:id/avatar", upload.single("avatarUrl"), updateUserAvatar);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;