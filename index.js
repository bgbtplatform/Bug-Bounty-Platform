import  "dotenv/config";
import express from 'express';

import connectedToDB from './utils/db.js'

const app = express()

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(5000,()=>{
    console.log("Server running")
    connectedToDB()
})