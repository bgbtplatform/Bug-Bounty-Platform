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
router.post("/login", loginUser);
router.get("/search", searchUser);

router.get("/current", auth, getCurrentUser);
router.get("/logout", auth, logout);
router.get("/", auth, allUsers);
router.get("/:id", auth, getUserById);

router.put("/:id/avatar", auth, upload.single("avatarUrl"), updateUserAvatar);
router.put("/:id", auth, updateUser);

router.delete("/:id", auth, deleteUser);

export default router;
