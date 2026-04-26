import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        req:true
    },
    rules:[{
        type:String
    }],
    policy:[{
        type:String
    }],
    rewards:{
        low:{
            type:Number,
            default:0
        },
        medium:{
            type:Number,
            default:0
        },
        high:{
            type:Number,
            default:0
        },
        critical:{
            type:Number,
            default:0
        }
    },
    status:{
        type:String,
        enum:['DRAFT','ACTIVE','PAUSED','CLOSED'],
        default:'DRAFT'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

let Program = mongoose.model("Program",programSchema)
export default Program