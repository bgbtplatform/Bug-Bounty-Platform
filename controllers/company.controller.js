import Company from "../models/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      website,
      description,
      programType,
      bountyRange,
      assets,
      severityRewards,
      responseEfficiency,
    } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const company = await Company.create({
      name,
      website,
      description,
      programType,
      bountyRange,
      assets,
      severityRewards,
      responseEfficiency,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating company",
      error: error.message,
    });
  }
};




export const getCompanies = async (req, res) => {
  try {
    // Optional filters
    const { programType, minBounty } = req.query;

    let filter = {};

    if (programType) {
      filter.programType = programType;
    }

    if (minBounty) {
      filter["bountyRange.min"] = { $gte: Number(minBounty) };
    }

    const companies = await Company.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
};



// GET SINGLE COMPANY
export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching company",
      error: error.message,
    });
  }
};



// UPDATE COMPANY
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument:"after",
        runValidators: true,
      }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: company,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating company",
      error: error.message,
    });
  }
};



// DELETE COMPANY
export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting company",
      error: error.message,
    });
  }
};