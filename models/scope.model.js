import mongoose from "mongoose";

const scopeSchema = new mongoose.Schema(
  {
    // 🔗 Link to Company
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    // Asset Name (like mi.com, com.xiaomi.app)
    assetName: {
      type: String,
      required: true,
      trim: true,
    },

    //Asset Type
    type: {
      type: String,
      enum: ["Web", "API", "Android", "iOS", "Other"],
      default: "Other",
    },

    // Scope Status
    inScope: {
      type: Boolean,
      default: true,
    },

    //Max Severity Allowed
    maxSeverity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    //Bounty Eligibility
    bountyEligible: {
      type: Boolean,
      default: true,
    },


    // Last Updated
    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    // Stats
    resolvedReports: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scope", scopeSchema);