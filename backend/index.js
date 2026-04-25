import "dotenv/config";
import express from 'express';
import path from 'path'
import { fileURLToPath } from 'node:url';
import cors from 'cors'

import connectedToDB from './utils/db.js'

import userRouter from './routes/user.route.js'
import companyRoutes from './routes/company.route.js'
import programRoutes from './routes/program.route.js'
import scopeRoutes from "./routes/scope.route.js";
import reportRouter from './routes/report.route.js'

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.pdf')) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline');
        }
    }
}));

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/users", userRouter)
app.use("/company", companyRoutes);
app.use("/program", programRoutes);
app.use("/scope", scopeRoutes);
app.use("/reports", reportRouter)

app.listen(5000, () => {
    console.log("Server running")
    connectedToDB()
})