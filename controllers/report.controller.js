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

async function allReports(req,res){
    try{
        let reports = await Report.find();
        res.send(reports)
    }
    catch(error){
        console.log(error);
        res.status(400).send({ message: "NO reports fetched", error: error.message });
    }
}

async function updateReport(req, res){
    try {
        let { id } = req.params
        let updatedReport = req.body

        updatedReport = await Report.findOneAndUpdate({_id: id}, updatedReport, {returnDocument: "after"})
        if(updatedReport !== null){
            res.send(updatedReport)
        } else {
            res.status(404).send({"message": "Report not found"})
        }
    } catch (error) {
       console.log(error)
        res.status(400).send({"message": "Report not Updated", "error": error.message})
    }
}

async function deleteReport(req, res){
    try {
        let { id } = req.params

        let report = await Report.findOneAndDelete({_id: id})
        if(report !== null){
            res.send({"message": "Report Deleted"})
        } else {
            res.status(404).send({"message": "Report not found"})
        }
    } catch (error) {
       console.log(error)
        res.status(400).send({"message": "Report not Updated", "error": error.message})
    }
}

export {
    addReport,allReports,updateReport,deleteReport
}