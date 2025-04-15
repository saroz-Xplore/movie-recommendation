import { User } from "../models/user.models.js"
import {uploadToCloudinary} from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/cloudinary.js";
import fs from 'fs';

const generateAccessToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()

        return {accessToken}
    } catch (error) {
        console.log("Error generating access token", error);
    }
}

const generateRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = user.generateRefreshToken()

        user.refreshToken= refreshToken
        user.save({validateBeforeSave: false})

        return {refreshToken}
    } catch (error) {
        console.log("error generating refresh token", error);
    }
}


const RegisterUser = async(req, res) => {
        let cloudinaryId = null;
        try {
            const {username, email, password} = req.body

        const existingUser = await User.findOne({email: email})
        if(existingUser)
            {
            return res.status(409).json({
                message: "Error: Existing User " })
        }

        const PhotoUrl = `public/images/${req.file.filename}`
        const upload = await  uploadToCloudinary(PhotoUrl)
        cloudinaryId = upload.public_id;

        const user = await User.create({
            username,
            email,
            password,
            userPhoto: upload.url
        })

        const usercreated = await User.findById(user._id).select("-password")
        if(!usercreated){
           return res.status(500).json({
                message: "registration error"
                
            })
        }

        return res.status(200).json({ message: "Registered Successfully",
            data:usercreated
        })

    } catch (error) {
        console.log("Error", error);

        if (req.file?.filename) {
                fs.unlink(`public/images/${req.file.filename}`, err => { 
                        if (err)
                         console.log("File deletion error:", err);
                });
            }

            if (cloudinaryId) {
                try {
                    await deleteFromCloudinary(cloudinaryId);
                } catch (cloudinaryError) {
                    console.log("Cloudinary deletion error:", cloudinaryError);
                }
            }
        res.status(500).json({
            message: "unable to register user"
        })
    }
}

const userLogin = async(req, res) => {
    try {
        
        const {email, password} = req.body
        if(!email){
            return res.status(400).json({
                message: 'Email must be required'
            })
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credentials"
            })
        }

        const {accessToken} = await generateAccessToken(user.id)
        const {refreshToken} = await generateRefreshToken(user._id)
    
        const loggedInfo = await User.findById(user._id).select("-password -refreshToken")

        const options= {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
        .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)   
            .json({
                message: "User Successfully Logged In",
                data: loggedInfo
            }) 

    } catch (error) {
        console.log("something went wrong");
        res.status(500).json({
            message: "Error while logging"
        })
    }
}

export {RegisterUser, userLogin}