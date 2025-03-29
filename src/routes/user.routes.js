
import { Router } from "express";
import { RegisterUser, userLogin } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";
import Joi from 'joi'
import validator from 'express-joi-validation'
import fs from 'fs'
import path from 'path'

const router = Router()
const validate = validator.createValidator()
const registerValidationSchema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(14).required().pattern(new RegExp
        ("^(?=.*[^a-zA-Z0-9])(?=.*[A-Z])(?=.*\\d).{8,}$")).message({
            "string.pattern.base": "Password must be include 1 special character, 1 uppercase letter and 1 digit number."
        })
    })  

router.route('/registration').post(upload.single("userPhoto"),  async (req, res, next) => {
    try {
        await registerValidationSchema.validateAsync(req.body)
        next();
    } catch (error) {
        console.log("Validation Error:", error.message);
        
    if (req.file) {
        fs.unlink(req.file.path, (err) => {
            if (err){
                console.log("error deleting file:", err);
     }})
}
    const errorMessage = error.details.map((err) => err.message.replaceAll('"', ''))
    return res.status(400).json({
        message:  errorMessage
    });
}
}, RegisterUser)

router.route('/login').post(userLogin)


export const userRoutes = router