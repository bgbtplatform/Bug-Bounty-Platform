import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    hunterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // programId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Program',
    //     required:true,
    // },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    impact:{
        type:String,
        required:true
    },
    attachements:{
        type:String,
        requred:true
    },
    severity:{
        type:String,
        enum:["LOW","MEDIUM","CRITICAL","NONE"],
        default:"NONE"
    },
    status:{
        type:String,
        enum:["NEW","TRIAGED","NEED_MORE_INFO","RESOLVED","OUT_OF_SCOPE","REJECTED"],
        default:"NEW"
    },
    cvss_score:{
        type:Number,
        min:0,
        max:10,
        default:0
    }
},{timestamps:true});

let Report = mongoose.model("Report",reportSchema)

export default Report