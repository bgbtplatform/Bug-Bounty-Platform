import "dotenv/config";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import connectToDB from './utils/db.js';
import auth from './middleware/auth.middleware.js';
import Report from './models/report.model.js';
import Program from './models/program.model.js';

import userRouter from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import programRoutes from './routes/program.route.js';
import scopeRoutes from "./routes/scope.route.js";
import reportRouter from './routes/report.route.js';

const app = express();

const allowedOrigins = [
    /^http:\/\/localhost:\d+$/,
    /^http:\/\/127\.0\.0\.1:\d+$/
];

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.get("/uploads/:filename", async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'uploads', filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }

        const fileUrl = `http://localhost:5000/uploads/${filename}`;
        const report = await Report.findOne({ attachments: fileUrl });

        if (report) {
            // Secure attachment: enforce auth and IDOR check
            return auth(req, res, async () => {
                const isHunter = report.hunterId.toString() === req.user.id;
                const program = await Program.findById(report.programId);
                const isProgramOwner = program && program.owner?.toString() === req.user.id;

                if (!isHunter && !isProgramOwner) {
                    return res.status(403).send('Unauthorized to view this attachment');
                }

                serveFile(res, filePath);
            });
        }

        // Public file (like avatars)
        serveFile(res, filePath);
    } catch (error) {
        console.error("Error serving file:", error);
        res.status(500).send("Server error while retrieving file");
    }
});

function serveFile(res, filePath) {
    if (filePath.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
    }
    res.sendFile(filePath);
}

app.get("/", (req, res) => {
    res.send("Bug Bounty Platform API");
});

app.use("/users", userRouter);
app.use("/company", companyRoutes);
app.use("/program", programRoutes);
app.use("/scope", scopeRoutes);
app.use("/report", reportRouter);
app.use("/reports", reportRouter);

connectToDB().then(() => {
    app.listen(5000, "0.0.0.0", () => {
        console.log("Server running on http://localhost:5000");
    });
}).catch(err => {
    console.log("Failed to start server due to DB error:", err);
});
