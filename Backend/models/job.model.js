import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({ // Schema etle Khali column nu name ane model etle jema CRUD operation perform thay
    title:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    requirements:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel : {
        type: Number,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    jobType: {
        type: String,
        required: true,
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    created_by :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User', // aa User name na Schema ne refer karse
        required:true,
    },
    applications:[{
        type: mongoose.Schema.Types.ObjectId, // aa id le che etle push karta time e ._id thi push karyu che 
        ref:'Application',
    }
  ]
},{timestamps:true});
export const Job = mongoose.model('Job',jobSchema)