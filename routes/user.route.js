import express from "express";

import{
    addUser,allUsers,updateUser,deleteUser
} from "./../controllers/user.controller.js"

import upload from '../middleware/uploadFile.middleware.js'

let router = express.Router();

router.post("/",upload.single("avatarUrl"),addUser)
router.get("/",allUsers)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router