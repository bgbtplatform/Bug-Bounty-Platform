import Program from "./../models/program.model.js"
import mongoose from "mongoose";

async function addProgram(req, res) {
    try {
        let newProgram = req.body;
        if (!newProgram.title || !newProgram.companyId) {
            return res.status(400).send({ success: false, message: "Title and Company ID are required" });
        }
        newProgram.owner = req.user.id;
        let createdProgram = await Program.create(newProgram);
        res.status(201).send({ success: true, message: "Program added", data: createdProgram });
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Program not added", error: error.message });
    }
}

async function allPrograms(req, res) {
    try {
        let programs = await Program.find();
        res.status(200).send({ success: true, data: programs });
    } catch (error) {
        res.status(500).send({ success: false, message: "Programs not found", error: error.message });
    }
}

async function updateProgram(req, res) {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
        }
        let program = await Program.findById(id);
        if (!program) {
            return res.status(404).send({ success: false, message: "Program not found" });
        }
        if (program.owner?.toString() !== req.user.id) {
            return res.status(403).send({ success: false, message: "Unauthorized to update this program" });
        }

        let updatedProgram = await Program.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (updatedProgram) {
            res.status(200).send({ success: true, message: "Program updated", data: updatedProgram });
        } else {
            res.status(404).send({ success: false, message: "Program not found" });
        }
    } catch (error) {
        res.status(400).send({ success: false, message: "Program not updated", error: error.message });
    }
}

async function deleteProgram(req, res) {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
        }
        let program = await Program.findById(id);
        if (!program) {
            return res.status(404).send({ success: false, message: "Program not found" });
        }
        if (program.owner?.toString() !== req.user.id) {
            return res.status(403).send({ success: false, message: "Unauthorized to delete this program" });
        }

        await Program.findByIdAndDelete(id);
        res.status(200).send({ success: true, message: "Program deleted" });
    } catch (error) {
        res.status(400).send({ success: false, message: "Program not deleted", error: error.message });
    }
}

async function getProgramsByCompany(req, res) {
    try {
        let { companyId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).send({ success: false, message: "Invalid Company ID" });
        }
        let programs = await Program.find({ companyId: companyId });
        res.status(200).send({ success: true, data: programs });
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching programs", error: error.message });
    }
}

async function getProgramById(req, res) {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid ID format" });
        }
        let program = await Program.findById(id).populate("companyId");
        if (program) {
            res.status(200).send({ success: true, data: program });
        } else {
            res.status(404).send({ success: false, message: "Program not found" });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: "Error fetching program", error: error.message });
    }
}

export {
    addProgram, allPrograms, updateProgram, deleteProgram, getProgramsByCompany, getProgramById
}