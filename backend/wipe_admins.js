import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_URL).then(async () => {
    await User.deleteMany({ role: 'SUPER_ADMIN' });
    console.log("Deleted all super admins");
    process.exit(0);
}).catch(console.error);
