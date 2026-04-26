import Scope from "../models/scope.model.js";
import Program from "../models/program.model.js";

// ADD SCOPE
async function addScope(req, res) {
  try {
    let { program: programId } = req.body;
    
    // Verify Program Ownership
    const program = await Program.findById(programId);
    if (!program) return res.status(404).json({ success: false, message: "Program not found" });
    
    if (program.owner?.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Only the program owner can add scopes" });
    }

    let newScope = req.body;
    newScope.owner = req.user.id;
    newScope = await Scope.create(newScope);

    res.status(201).send({
      success: true,
      message: "Scope created successfully",
      data: newScope,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to create scope",
      error: error.message,
    });
  }
}


// GET SCOPES BY COMPANY
async function getScopesByCompany(req, res) {
  try {
    let { companyId } = req.params;

    let scopes = await Scope.find({ company: companyId });

    res.status(200).send({
      success: true,
      message: "Scopes fetched successfully",
      count: scopes.length,
      data: scopes,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to fetch scopes",
      error: error.message,
    });
  }
}


// GET SCOPES BY PROGRAM
async function getScopesByProgram(req, res) {
  try {
    let { programId } = req.params;

    let scopes = await Scope.find({ program: programId });

    res.status(200).send({
      success: true,
      message: "Scopes fetched successfully",
      count: scopes.length,
      data: scopes,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to fetch scopes",
      error: error.message,
    });
  }
}


// GET SINGLE SCOPE
async function getScope(req, res) {
  try {
    let { id } = req.params;

    let scope = await Scope.findById(id);

    if (scope !== null) {
      res.status(200).send({
        success: true,
        message: "Scope fetched successfully",
        data: scope,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Scope not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error fetching scope",
      error: error.message,
    });
  }
}


// UPDATE SCOPE
async function updateScope(req, res) {
  try {
    let { id } = req.params;
    let data = req.body;

    const scope = await Scope.findById(id);
    if (!scope) return res.status(404).send({ success: false, message: "Scope not found" });
    if (scope.owner?.toString() !== req.user.id) return res.status(403).send({ success: false, message: "Unauthorized" });

    let updatedScope = await Scope.findOneAndUpdate(
      { _id: id },
      data,
      { returnDocument: "after" }
    );

    if (updatedScope !== null) {
      res.status(200).send({
        success: true,
        message: "Scope updated successfully",
        data: updatedScope,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Scope not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to update scope",
      error: error.message,
    });
  }
}


// DELETE SCOPE
async function deleteScope(req, res) {
  try {
    let { id } = req.params;
    const scope = await Scope.findById(id);
    if (!scope) return res.status(404).send({ success: false, message: "Scope not found" });
    if (scope.owner?.toString() !== req.user.id) return res.status(403).send({ success: false, message: "Unauthorized" });

    await Scope.findByIdAndDelete(id);

    if (scope !== null) {
      res.status(200).send({
        success: true,
        message: "Scope deleted successfully",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Scope not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to delete scope",
      error: error.message,
    });
  }
}


// GET ALL SCOPES
async function getAllScopes(req, res) {
  try {
    let { type, inScope, maxSeverity } = req.query;
    let filter = {};
    if (type) filter.type = type;
    if (inScope !== undefined) filter.inScope = (inScope === "true");
    if (maxSeverity) filter.maxSeverity = maxSeverity;

    let scopes = await Scope.find(filter).populate("company", "name logo");

    res.status(200).send({
      success: true,
      count: scopes.length,
      data: scopes,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Failed to fetch scopes",
      error: error.message,
    });
  }
}

export {
  addScope,
  getScopesByCompany,
  getScopesByProgram,
  getAllScopes,
  getScope,
  updateScope,
  deleteScope,
};