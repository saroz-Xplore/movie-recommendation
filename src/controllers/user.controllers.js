import { User } from "../models/user.models.js"
import {uploadToCloudinary} from "../utils/cloudinary.js";

const RegisterUser = async(req, res) => {
    try {
        const {username, email, password} = req.body

        const existingUser = await User.findOne({email: email})
        if(existingUser)
            {
            res.status(409).json({
                message: "Error: Existing User " })
        }

        const PhotoUrl = `public/images/${req.file.filename}`
        const upload = await  uploadToCloudinary(PhotoUrl)

        const user = await User.create({
            username,
            email,
            password,
            userPhoto: upload.url
        })

        const usercreated = await User.findById(user._id).select("-password")
        if(!usercreated){
            res.status(500).json({
                message: "registration error"
                
            })
        }

        return res.status(200).json({ message: "Registered Successfully",
            data:usercreated
        })

    } catch (error) {
        console.log("Error", error);
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

        return res.status(200).json({
            message: "User Successfully Logged In", data: user
        })

    } catch (error) {
        console.log("something went wrong");
        res.status(500).json({
            message: "Error while logging"
        })
    }
}

export {RegisterUser, userLogin}