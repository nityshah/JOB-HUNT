import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// jyare pan aapde database sathe deal karta hoie tyare async await aavse j
export const register = async (req, res) => { // aa navo user ave ane register kare enu logic che
    try {
        const { fullname, email, phoneNumber, password, role } = req.body // req.body ma thi aa badho data aavse ane store thai jase
        console.log(fullname, email, phoneNumber, password, role);

        if (!fullname || !email || !phoneNumber || !role || !password) // aa badha ma thi kai pan missing hoy to error throw karvani 
        {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        };


        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        const user = await User.findOne({ email }); // database ma always object j pass thay ahiya aapde email j rakhiye che 
        // suupose email nu name email_name hot to email:email_name pass karat
        if (user) {
            return res.status(400).json({
                message: "User exist with this email",
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10); // password ne ketlo strong rakhvo ena mate che

        await User.create({ // ana thi user create thase
            fullname,
            email,
            phoneNumber,
            password: hashedPassword, // ahiya password ne hashedPassword ni value made che, model ma je je name aapyu e j name thi ahiya document(ek value) create karvu pade
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        // user login khali email,password ane role thi j karse
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }
        let user = await User.findOne({ email }); // je user madse email mathi e user name na variable ma as an object store thase
        if (!user) // user na madyo
        {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }
        // have user madya pachi password check karisu ke je password enter karyo e actual password sathe match thay che
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) // isPassword ne check karvanu ke enter karelo password correct che ke incorrect
        {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        };
        // role sacho che ke nai :- register student thi karyu che ane login recruiter thi karva mange che
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role",
                success: false,
            });
        };
        const tokenData = {
            userId: user._id // aana thi encoded vastu generate thase jena thi user ne identify kari sakay
            // ._id by default generate thay backend ma 
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' }); // secret key hase to j token ne change kari sakay baki nai 
        // expiresIn in 1d etle agar user logout karvanu bhuli jay to by default 1 divas pachi logout thai jase
        // ane pachu login karse tyare navu token generate karse

        user = {
            _id: user._id,
            fullname: user.fullname,
            password: user.password,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }



        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        }) // "token" -> name thi cookie store thase,token-> je uper generate karyu e che ,httpOnly karyu etle khali http thi j access thase
        // backend(Javascript) thi access nahi thay  
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ // tarat expire thai jase ane token ne empty kari didhu etle 
            // pachu login kare tyare navu token generate thay 
            message: "Logged Out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills);




        // CLOUDINARY COMES HERE

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);






        // skills array ave che etle ene split karvu pade
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        // check karo ke je user update karva aave che e valid user che ke nai
        const userId = req.id; // middleware authentication 
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not Found",
                success: false
            })
        }

        // check karya pachi je details lidhi ene update kari devanu

        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // RESUME COMES LATER HERE...
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }


        await user.save();


        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true
        })


    } catch (error) {
        console.log(error);
    }
}

