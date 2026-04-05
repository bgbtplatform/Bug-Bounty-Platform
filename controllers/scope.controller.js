import Scope from "../models/scope.model.js";


// ADD SCOPE
async function addScope(req, res) {
  try {
    let newScope = req.body;

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
    let updatedScope = req.body;

    updatedScope = await Scope.findOneAndUpdate(
      { _id: id },
      updatedScope,
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

    let scope = await Scope.findOneAndDelete({ _id: id });

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


export {
  addScope,
  getScopesByCompany,
  getScope,
  updateScope,
  deleteScope,
};