
import { Router } from "express";
import { RegisterUser } from "../controllers/user.controllers.js";

const router = Router()

router.route('/registration').post(RegisterUser)


export const userRoutes = router