import { User } from "../models/user.models.js"

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

        const user = await User.create({
            username,
            email,
            password,
            userPhoto: PhotoUrl  
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

export {RegisterUser}