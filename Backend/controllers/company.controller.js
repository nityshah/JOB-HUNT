import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";




export const registerCompany = async (req, res) => { // user je company ma register kare e 
    try {
        const { companyName } = req.body; // ahiya companyName thi data aapyo che etle companyName rekahyu che 
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is requird",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName })
        if (company) // same company ma 2 var apply na karay ena mate che
        {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            });
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // je companies user e nakhi hase e aai jay ena mate id thi extract karie che
        let companies = await Company.find({ userId }); // backend ma je by default ._id hoy e aave req.id ma
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Companies found successfully",
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// get companyById
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; // :id ma thi je id aavse e hase i.e request ma je id hoy e 
        const company = await Company.findById(companyId); // jyare id pass kariye tyare curly brace ni jarur nathi
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company, // uper je Id thi company madi e che
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// update company details

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;


        // console.log(name,description,website,location); 


        // AHIYA CLOUDINARY AAVSE
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;



        // const updateData = {  originally avu thay che pan name same reakhya che etle direct avu lakhiye to pan chale
        //     name: name,
        //     description: description,
        //     website: website,
        //     location: location
        //   };
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) // koi data agar missing rakhyo to ena mate
        {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}



