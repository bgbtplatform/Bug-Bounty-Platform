import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["HUNTER", "COMPANY_ADMIN", "SUPER_ADMIN"],
        default: "HUNTER"
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    reputation: {
        type: Number,
        default: 0
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        default: null
    }
}, { timestamps: true }
);

let User = mongoose.model("User", userSchema)
export default User