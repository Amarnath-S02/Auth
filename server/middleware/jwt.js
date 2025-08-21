import jwt from "jsonwebtoken"

export const verifyToken =(req,res,next)=>{
    const token=req.headers["authorization"];
    if(!token){
        res.status(403).json("token is missing");
    }

    try{
        const decoded=jwt.verify(token.split(" ")[1],process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(e){
        res.status(401).json({message:"inavalid token"})
    }
};
