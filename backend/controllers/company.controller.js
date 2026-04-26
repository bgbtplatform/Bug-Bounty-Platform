import Company from "../models/company.model.js";

async function createCompany(req, res) {
  try {
    let newCompany = req.body;

    if (req.file) {
      newCompany.logo = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    newCompany.owner = req.user.id; // From auth middleware

    if (!newCompany.name) {
      return res.status(400).send({
        success: false,
        message: "Company name is required",
      });
    }

    newCompany = await Company.create(newCompany);

    res.status(201).send({
      success: true,
      message: "Company created successfully",
      data: newCompany,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating company",
      error: error.message,
    });
  }
}



async function getCompanies(req, res) {
  try {
    const { programType, minBounty } = req.query;

    let filter = {};

    if (programType) {
      filter.programType = programType;
    }

    if (minBounty) {
      filter["bountyRange.min"] = { $gte: Number(minBounty) };
    }

    const companies = await Company.find(filter).sort({ createdAt: -1 });

    res.send({
      success: true,
      count: companies.length,
      data: companies,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
}



async function getCompanyById(req, res) {
  try {
    let { id } = req.params;

    let company = await Company.findById(id);

    if (company) {
      res.send({
        success: true,
        data: company,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching company",
      error: error.message,
    });
  }
}



async function updateCompanyLogo(req, res) {
  try {
    let { id } = req.params;

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Logo image is required",
      });
    }

    let updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      {
        logo: `http://localhost:5000/uploads/${req.file.filename}`,
      },
      { returnDocument: "after" }
    );

    if (updatedCompany !== null) {
      res.send({
        success: true,
        message: "Company logo updated successfully",
        data: updatedCompany,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating company logo",
      error: error.message,
    });
  }
}

async function updateCompanyDetails(req, res) {
  try {
    let { id } = req.params;
    let updateData = req.body;

    // Verify Ownership
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).send({ success: false, message: "Company not found" });
    }
    
    if (company.owner?.toString() !== req.user.id) {
      return res.status(403).send({ success: false, message: "Unauthorized to update this company" });
    }

    if (req.file) {
      updateData.logo = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Multer sends everything as strings, so we must parse nested objects
    if (typeof updateData.bountyRange === 'string') {
      updateData.bountyRange = JSON.parse(updateData.bountyRange);
    }
    if (typeof updateData.severityRewards === 'string') {
      updateData.severityRewards = JSON.parse(updateData.severityRewards);
    }

    const updatedCompany = await Company.findOneAndUpdate(
      { _id: id },
      updateData,
      { returnDocument: "after", runValidators: true }
    );

    if (updatedCompany !== null) {
      res.send({
        success: true,
        message: "Company updated successfully",
        data: updatedCompany,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating company",
      error: error.message,
    });
  }
}

async function deleteCompany(req, res) {
  try {
    let { id } = req.params;

    let company = await Company.findOneAndDelete({ _id: id });

    if (company !== null) {
      res.send({
        success: true,
        message: "Company deleted successfully",
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Company not found",
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting company",
      error: error.message,
    });
  }
}



async function searchCompany(req, res) {
  try {
    let { query } = req.query;

    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Search query is required",
      });
    }

    let companies = await Company.find({
      name: { $regex: query, $options: "i" }
    }).sort({ createdAt: -1 });

    res.send({
      success: true,
      count: companies.length,
      data: companies,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error searching companies",
      error: error.message,
    });
  }
}



export {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyLogo,
  updateCompanyDetails,
  deleteCompany,
  searchCompany
};