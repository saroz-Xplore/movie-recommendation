import express from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { addToFavourites } from "../controllers/favourite.controllers.js";

const router = express.Router();

router.route('/add-to-favourite').post(VerifyToken, addToFavourites)


export const favouriteRoutes = router;
