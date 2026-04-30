import express from "express";
import {
    addBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from "../controllers/blog.controller.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/uploadFile.middleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", auth, upload.single("image"), addBlog);
router.put("/:id", auth, upload.single("image"), updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
