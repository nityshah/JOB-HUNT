// aa part ma Node.js ane application vache connection establish thay che


import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully");
    }
    catch(error)
    {
        console.log(error);
    }
}

export default connectDB;