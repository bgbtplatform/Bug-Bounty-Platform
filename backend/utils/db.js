import mongoose from "mongoose";

let DB_URL=process.env.DB_URL

async function connectToDB(){
    try {
        await mongoose.connect(DB_URL)
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Database Error")
        console.log(error)
    }
}

export default connectToDB