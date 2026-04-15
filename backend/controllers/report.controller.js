import Report from "../models/report.model.js"

async function addReport(req, res) {
    try {
        let newReport = req.body;
        if (req.file) {
            newReport.attachements = `http://localhost:5000/uploads/${req.file.filename}`;
        }
        newReport = await Report.create(newReport);
        res.status(201).send(newReport);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Report not added", error: error.message });
    }
}

async function allReports(req, res) {
    try {
        let { status, severity } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        let reports = await Report.find(filter).populate("hunterId", "-password").sort({ createdAt: -1 });
        res.send(reports);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "No reports fetched", error: error.message });
    }
}

async function getReportById(req, res) {
    try {
        let { id } = req.params;
        let report = await Report.findById(id).populate("hunterId", "-password");
        if (report) {
            res.send(report);
        } else {
            res.status(404).send({ message: "Report not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error fetching report", error: error.message });
    }
}

async function updateReport(req, res) {
    try {
        let { id } = req.params;
        let updatedReport = req.body;

        updatedReport = await Report.findOneAndUpdate({ _id: id }, updatedReport, { returnDocument: "after" });
        if (updatedReport !== null) {
            res.send(updatedReport);
        } else {
            res.status(404).send({ message: "Report not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Report not updated", error: error.message });
    }
}

async function deleteReport(req, res) {
    try {
        let { id } = req.params;

        let report = await Report.findOneAndDelete({ _id: id });
        if (report !== null) {
            res.send({ message: "Report deleted" });
        } else {
            res.status(404).send({ message: "Report not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Report not deleted", error: error.message });
    }
}

export {
    addReport, 
    allReports, 
    getReportById, 
    updateReport,  
    deleteReport
}