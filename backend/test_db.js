import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_URL).then(async () => {
    let users = await User.find({ email: 'admin' });
    console.log(users);
    process.exit(0);
}).catch(console.error);
