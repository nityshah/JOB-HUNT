import { Job } from "../models/job.model.js";


// admin job post karse
export const postJob = async (req, res) => {// admin e job post kari e che
    try { // if ma je vastu required hoy e che agar missing  hoy to error 
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "Something is Missing",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            position,
            company: companyId, // company id aapde apvani rehse as an input, ke kai company mate hu as a admin job post karu chu 
            created_by: userId // agar hu a admin chu to ahiya mari Id aavse (admin etle recruiter kevay )
        });
        console.log(job);
        return res.status(201).json({
            message: "New Job created succcessfully",
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


// student mate che aa
export const getAllJobs = async (req, res) => { // koi particular word uper thi jobs return thase
    try {
        const keyword = req.query.keyword || ""; // API pachi ?keyword="Nitya shah" aave e keyword ma store thay i.e Nitya shah keyword ma store thase
        // ?abc hot to req.query.abc lakhat
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }, // $or:- aano matlab e che ke koi pan ek true thatu hase to return karse
                // regex etle sena uper filter lagadvu che i.e title ke description uper thi search karse
                // options:"i" etle upper,lower ke mix hase badhu ek rite j treat thase
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        // const jobs = await Job.find(query); // ana thi khali id aavse company ni jene create kari hase eni
        const jobs = await Job.find(query).populate({
            path: "company" // ana thi me as a recruiter kai company mate job create kari che e aavse.
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not find",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

//find Id by Job
// student mate che aa
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const getJob = await Job.findById(jobId).populate({
            path: "applications" // aa redux toolkit ma getSingleJob mate useful che , ema user e job mate apply karyu che ke nai e check kare che
            // aa path vadu lakhyu che e database ma applications database ma jaine check karse ke apply karyu che ke nai   
        });
        if (!getJob) {
            return res.status(404).json({
                message: "Jobs not find",
                success: false
            });
        }
        return res.status(200).json({
            getJob,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin ketla jobs create karya che haji sudhi

export const getAdminJobs = async (req, res) => { // ana thi me as a recruiter ketli jobs create kari che e aavse
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1
        })
        // console.log(jobs)
        // console.log(adminId)
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not find",
                success: false
            });
        }
        return res.status(200).json({
            message: "Jobs found successfully",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



// update Job

export const updateJob = async (req, res) => {
    try {

        console.log("Received Headers:", req.headers);
        console.log("Received Body:", req.body);
        const { title, description, requirements, salary, experienceLevel, location, jobType, position } = req.body;
        console.log(title, description, requirements, salary, experienceLevel, location, jobType, position);
        const updateData = { title, description, requirements, salary, experienceLevel, location, jobType, position };
        const job = await Job.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!job) // koi data agar missing rakhyo to ena mate
        {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Job information updated Successfully.",
            job,
            success: true
        })

    } catch (error) {
        console.log(error)
    }
}