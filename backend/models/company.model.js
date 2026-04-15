import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: ""
    },
    website: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    programType: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    bountyRange: {
        min: {
            type: Number
        },
        max: {
            type: Number
        }
    },
    assets: [{
        type: String
    }],
    severityRewards: {
        low: {
            type: Number
        },
        medium: {
            type: Number
        },
        high: {
            type: Number
        },
        critical: {
            type: Number
        }
    },
    responseEfficiency: {
        type: Number
    }
}, { timestamps: true }
);

let Company = mongoose.model("Company", companySchema);
export default Company;