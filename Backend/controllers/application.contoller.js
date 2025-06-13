// je user job mate apply kare ena mate nu che aa logic 

import { json } from "express";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try {
        // aapde isAuthencated ma token ne as a id lidhi che ene j aapde encode ane pachu decode kariye che therefore 
        // ene aapde req.id ma user._id store kariye che
        const userId = req.id;
        const jobId = req.params.id; // /:id i.e imput ma thi aavse
        // bane required che etle aa mathi thi ek pan absnt hase to error aapvani
        if(!jobId)
        {
            return res.status(400).json({
                message:"Job id is requierd",
                success:false
            })
        }
        // agar user e already job mate apply karyu che to e fari vaar apply na kare ena mate nu che aa logic
        const existingApplicantion = await Application.findOne({job:jobId,applicant:userId});
        
        if(existingApplicantion){
            return res.status(400).json({
                message:"You have already applied for the job",
                success:false
            })
        }

        // have agar job j exist nathi karti to job mate apply j na karay to therefore ena mate nu logic niche che 
        const job = await Job.findById(jobId);
        if(!job)
        {
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        // now create a new application i.e applicant ne job mate apply karvnau
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })


        // je nava applications banya e Job model ma push karvana etle khbr pade ke ketla nava applications aya che
        job.applications.push(newApplication._id); // nava application ma ._id hase e push thase
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}


// ketli total jobs applied che enu logic
// i.e user e ketli jobs ma apply kari rakhyu che e aapse
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application)
        {
            return res.status(404),json({
                message:"No Applications",
                success:false
            });
        }
        return res.status(200).json({
            application,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
} 


// getApplicants -> aa ena mate che ke admin(recruiter) e aatli job create kari hati ena mate ketla applicants e 
// apply karyu che
// admin ne khbe pade ke ketla user e apply karyu che 

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
            }
        })
        if(!job)
        {
            return res.status(404),json({
                message:"Job not found",
                success:false
            });
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id; // params ma id thi id etla mate lidhi beacuse aapde koi specific user ni detaiks update karvi hot to,
                                            // req.id ma thi let to khali logged in user ni details update kari sakat
        if(!status)
            {
                return res.status(404),json({
                    message:"Status is required",
                    success:false
                });
            } 
        // find the application by application id
        
        const application = await Application.findOne({_id:applicationId});

        if(!application)
        {
            return res.status(404),json({
                message:"Application not found",
                success:false
            });
        }
        
// update status 
application.status = status;
await application.save();

return res.status(200).json({
    message:"Status updated successfully",
    success:true
});
    } catch (error) {
        console.log(error);
    }
}

