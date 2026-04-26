import mongoose from "mongoose";

const scopeSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    assetName: {
      type: String,
      required: true,
      trim: true,
    },
 
    type: {
      type: String,
      enum: ["Web", "API", "Android", "iOS", "Other"],
      default: "Other",
    },

    inScope: {
      type: Boolean,
      default: true,
    },

    maxSeverity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    bountyEligible: {
      type: Boolean,
      default: true,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    resolvedReports: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Scope", scopeSchema);