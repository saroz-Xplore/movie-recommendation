import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"


export const VerifyToken = async(req, res, next) => {
    try {
        
        const token= req.cookies?.accessToken

        if(!token){
            res.status(401).json({
                message: "Unauthorized request"
            })
        }

        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        
        if(!user){
            res.status(404).json({
                message: "Error User"
            })
        }
        req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            message:error.message
        })
    }
}