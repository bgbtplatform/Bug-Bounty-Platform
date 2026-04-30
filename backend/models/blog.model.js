import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ""
    },
    tags: [{
        type: String
    }],
    readTime: {
        type: Number,
        default: 5
    }
}, { timestamps: true });

let Blog = mongoose.model("Blog", blogSchema);

export default Blog;
