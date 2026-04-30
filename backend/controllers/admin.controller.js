import User from "../models/user.model.js";
import Program from "../models/program.model.js";
import Report from "../models/report.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getPlatformStats(req, res) {
    try {
        const totalUsers = await User.countDocuments();
        const totalHunters = await User.countDocuments({ role: 'HUNTER' });
        const totalCompanies = await User.countDocuments({ role: 'COMPANY_ADMIN' });
        const totalPrograms = await Program.countDocuments();
        const totalReports = await Report.countDocuments();
        const resolvedReports = await Report.countDocuments({ status: 'RESOLVED' });

        res.send({ success: true, data: {
            totalUsers, totalHunters, totalCompanies, totalPrograms, totalReports, resolvedReports
        }});
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching stats" });
    }
}

async function getAllProgramsAdmin(req, res) {
    try {
        const programs = await Program.find().populate("companyId").sort({ createdAt: -1 });
        res.send({ success: true, data: programs });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching programs" });
    }
}

async function getAllReportsAdmin(req, res) {
    try {
        const reports = await Report.find()
            .populate("hunterId", "username")
            .populate("programId", "title")
            .sort({ createdAt: -1 });
        res.send({ success: true, data: reports });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching reports" });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.send({ success: true, data: users });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching users" });
    }
}

async function deleteAnyUser(req, res) {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.send({ success: true, message: "User deleted by admin" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error deleting user" });
    }
}

async function updateAnyProgramStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const program = await Program.findByIdAndUpdate(id, { status }, { new: true });
        res.send({ success: true, data: program });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error updating program" });
    }
}

async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Please provide admin email/username and password" });
        }

        const initialAdminEmail = process.env.INITIAL_SUPER_ADMIN_EMAIL;
        const initialAdminPassword = process.env.INITIAL_SUPER_ADMIN_PASSWORD;

        // Secure environment-based seeding for the platform owner
        if (initialAdminEmail && initialAdminPassword && email === initialAdminEmail && password === initialAdminPassword) {
            let adminUser = await User.findOne({ role: 'SUPER_ADMIN' });
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            if (!adminUser) {
                adminUser = await User.create({
                    username: "SuperAdmin",
                    email: initialAdminEmail,
                    password: hashedPassword,
                    role: "SUPER_ADMIN"
                });
            } else {
                adminUser.email = initialAdminEmail;
                adminUser.password = hashedPassword;
                await adminUser.save();
            }

            const JWT_SECRET = process.env.JWT_SECRET;
            let token = jwt.sign({ id: adminUser._id, email: adminUser.email }, JWT_SECRET, { expiresIn: "1d" });
            
            res.cookie("token", token, { httpOnly: true, secure: false, path: "/", maxAge: 86400 * 1000 });
            
            let userResponse = adminUser.toObject();
            delete userResponse.password;

            return res.send({ success: true, user: userResponse });
        }

        // Standard super admin login check
        let user = await User.findOne({ email });
        if (!user || user.role !== 'SUPER_ADMIN') {
            return res.status(401).send({ message: "Invalid Admin Credentials" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid Admin Credentials" });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        let token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        
        res.cookie("token", token, { httpOnly: true, secure: false, path: "/", maxAge: 86400 * 1000 });
        
        let userResponse = user.toObject();
        delete userResponse.password;

        res.send({ success: true, user: userResponse });

    } catch (error) {
        console.log("ADMIN LOGIN ERROR:", error);
        res.status(500).send({ message: "Server error during admin login", error: error.message, stack: error.stack });
    }
}

export { getPlatformStats, getAllUsers, deleteAnyUser, updateAnyProgramStatus, getAllProgramsAdmin, getAllReportsAdmin, adminLogin };
