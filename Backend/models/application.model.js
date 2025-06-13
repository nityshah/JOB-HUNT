import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{ // kai job mate apply karyu che
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job', // Job model ne refer karvanu
        required:true,
    },
    applicant: { // kon apply kare che e che 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum: ['pending','accepted','rejected'],
        default:'pending',
    }
},{timestamps:true})
export const Application = mongoose.model('Application',applicationSchema);