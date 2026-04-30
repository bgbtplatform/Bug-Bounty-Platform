import Report from "../models/report.model.js"
import Program from "../models/program.model.js"
import mongoose from "mongoose";

async function addReport(req, res) {
    try {
        let newReport = req.body;
        newReport.hunterId = req.user.id; 

        if (req.file) {
            newReport.attachments = `http://localhost:5000/uploads/${req.file.filename}`;
        }
        let createdReport = await Report.create(newReport);
        res.status(201).send({ success: true, message: "Report added", data: createdReport });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Report not added", error: error.message });
    }
}

async function allReports(req, res) {
    try {
        let { status, severity } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        // Fetch programs owned by the current user to allow them to view their programs' reports
        const myPrograms = await Program.find({ owner: req.user.id }).select("_id");
        const myProgramIds = myPrograms.map(p => p._id);

        // Security Patch (IDOR): Only return reports where the user is either the hunter OR the program owner, unless SUPER_ADMIN
        if (req.user.role !== 'SUPER_ADMIN') {
            filter.$or = [
                { hunterId: req.user.id },
                { programId: { $in: myProgramIds } }
            ];
        }

        let reports = await Report.find(filter).populate("hunterId", "-password").sort({ createdAt: -1 });
        res.status(200).send({ success: true, data: reports });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "No reports fetched", error: error.message });
    }
}

async function getReportById(req, res) {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
        }
        let report = await Report.findById(id).populate("hunterId", "-password");
        if (report) {
            // Security Patch (IDOR): Ensure only the hunter or the program owner can view the report
            const isHunter = report.hunterId._id.toString() === req.user.id;
            
            const program = await Program.findById(report.programId);
            const isProgramOwner = program && program.owner?.toString() === req.user.id;

            if (!isHunter && !isProgramOwner && req.user.role !== 'SUPER_ADMIN') {
                return res.status(403).send({ success: false, message: "Unauthorized: You do not have permission to view this report" });
            }

            res.status(200).send({ success: true, data: report });
        } else {
            res.status(404).send({ success: false, message: "Report not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error fetching report", error: error.message });
    }
}

async function updateReport(req, res) {
    try {
        let { id } = req.params;
        const report = await Report.findById(id);
        if (!report) return res.status(404).send({ success: false, message: "Report not found" });
        if (report.hunterId.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') return res.status(403).send({ success: false, message: "Unauthorized" });

        let updatedReport = await Report.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).send({ success: true, message: "Report updated", data: updatedReport });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Report not updated", error: error.message });
    }
}

async function deleteReport(req, res) {
    try {
        let { id } = req.params;
        const report = await Report.findById(id);
        if (!report) return res.status(404).send({ success: false, message: "Report not found" });
        if (report.hunterId.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') return res.status(403).send({ success: false, message: "Unauthorized" });

        await Report.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Report deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Report not deleted", error: error.message });
    }
}

async function getMyReports(req, res) {
    try {
        let reports = await Report.find({ hunterId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, data: reports });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching reports", error: error.message });
    }
}

async function updateReportAttachments(req, res) {
    try {
        let { id } = req.params;

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "No file uploaded",
            });
        }

        const report = await Report.findById(id);
        if (!report) return res.status(404).send({ success: false, message: "Report not found" });
        
        if (report.hunterId.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ success: false, message: "Unauthorized" });
        }

        let updatedReport = await Report.findOneAndUpdate(
            { _id: id },
            {
                attachments: `http://localhost:5000/uploads/${req.file.filename}`,
            },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Report attachments updated successfully",
            data: updatedReport,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error updating report attachments",
            error: error.message,
        });
    }
}

async function getReportsByProgram(req, res) {
    try {
        let { programId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(programId)) {
            return res.status(400).send({ success: false, message: "Invalid Program ID format" });
        }

        const program = await Program.findById(programId);
        if (!program) return res.status(404).send({ success: false, message: "Program not found" });
        if (program.owner?.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ success: false, message: "Unauthorized: You do not own this program" });
        }

        const reports = await Report.find({ programId })
            .populate("hunterId", "-password")
            .sort({ createdAt: -1 });

        res.status(200).send({ success: true, data: reports });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching program reports", error: error.message });
    }
}

async function updateReportStatus(req, res) {
    try {
        let { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["NEW", "TRIAGED", "NEED_MORE_INFO", "RESOLVED", "OUT_OF_SCOPE", "REJECTED"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).send({ success: false, message: "Invalid or missing status value" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid Report ID format" });
        }

        const report = await Report.findById(id);
        if (!report) return res.status(404).send({ success: false, message: "Report not found" });

        const program = await Program.findById(report.programId);
        if (!program) return res.status(404).send({ success: false, message: "Associated program not found" });
        if (program.owner?.toString() !== req.user.id && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).send({ success: false, message: "Unauthorized: You do not own this program" });
        }

        const updatedReport = await Report.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).populate("hunterId", "-password");

        res.status(200).send({ success: true, message: "Report status updated", data: updatedReport });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error updating report status", error: error.message });
    }
}

export {
    addReport,
    allReports,
    getReportById,
    updateReport,
    updateReportAttachments,
    deleteReport,
    getMyReports,
    getReportsByProgram,
    updateReportStatus
}
