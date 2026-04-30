import Blog from "../models/blog.model.js";

async function addBlog(req, res) {
    try {
        let newBlog = req.body;
        newBlog.author = req.user.id;
        
        if (typeof newBlog.tags === 'string') {
            newBlog.tags = newBlog.tags.split(',').map(tag => tag.trim());
        }

        if (req.file) {
            newBlog.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        let createdBlog = await Blog.create(newBlog);
        res.status(201).send({ success: true, message: "Blog added", data: createdBlog });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Blog not added", error: error.message });
    }
}

async function getAllBlogs(req, res) {
    try {
        let blogs = await Blog.find().populate("author", "username avatarUrl role").sort({ createdAt: -1 });
        res.status(200).send({ success: true, data: blogs });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Failed to fetch blogs", error: error.message });
    }
}

async function getBlogById(req, res) {
    try {
        let { id } = req.params;
        let blog = await Blog.findById(id).populate("author", "username avatarUrl role bio");
        if (blog) {
            res.status(200).send({ success: true, data: blog });
        } else {
            res.status(404).send({ success: false, message: "Blog not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error fetching blog", error: error.message });
    }
}

async function updateBlog(req, res) {
    try {
        let { id } = req.params;
        let blog = await Blog.findById(id);

        if (!blog) return res.status(404).send({ success: false, message: "Blog not found" });

        if (blog.author.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ success: false, message: "Unauthorized" });
        }

        let updateData = req.body;
        
        if (typeof updateData.tags === 'string') {
            updateData.tags = updateData.tags.split(',').map(tag => tag.trim());
        }
        
        if (req.file) {
            updateData.imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        let updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).send({ success: true, message: "Blog updated", data: updatedBlog });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Blog not updated", error: error.message });
    }
}

async function deleteBlog(req, res) {
    try {
        let { id } = req.params;
        let blog = await Blog.findById(id);

        if (!blog) return res.status(404).send({ success: false, message: "Blog not found" });

        if (blog.author.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ success: false, message: "Unauthorized" });
        }

        await Blog.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Blog deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Blog not deleted", error: error.message });
    }
}

export {
    addBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
