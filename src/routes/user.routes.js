
import { Router } from "express";
import { RegisterUser } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.route('/registration').post(upload.single("userPhoto"),RegisterUser)


export const userRoutes = router