import jwt from "jsonwebtoken"; // aa sign,verify and JWT token ne verify karva mate vapray

// aa middleware che jyaer koi request aavse tyare sauthi pehla aa check thase ane agar aa sachu hase to
// toj agad jase , nahi to nai jay

const isAuthenticated = async (req,res,next) => { // route pase gaya pehla aa execute thase 
    try {
        const token = req.cookies.token; // req ma thi token lai ne check karvanu ke valid request che ke nai 
    if(!token)
    {
        return res.status(401).json({
            message:"User not Authenticated",
            success:false
        })
    }
    // agar token sachu nikdyo to verfiy karvanu 
    const decode = await jwt.verify(token,process.env.SECRET_KEY) // aa decoded vastu return karse example like decoded user id,role etc
    if(!decode)
    {
        return res.status(401).json({ // 401-> unauthorized access
            message:"Invalid token",
            success:false
        })
    }
    req.id= decode.userId; // aa user._id che backend ma by default hoy e madse decode karya pachi
    // aane aapde req.id ma alag thi store karyu che 
    next();
    } catch (error) {
        console.log(error);
    }

}

export default isAuthenticated;