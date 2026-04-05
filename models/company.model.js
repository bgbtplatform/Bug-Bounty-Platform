import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: String,
    website: String,
    description: String,
    programType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    bountyRange: {
      min: Number,
      max: Number,
    },
    assets: [String],
    severityRewards: {
      low: Number,
      medium: Number,
      high: Number,
      critical: Number,
    },
    responseEfficiency: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);