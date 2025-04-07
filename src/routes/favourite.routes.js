import express from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { addToFavourites, getUserFavourites, removeFromFavourites } from "../controllers/favourite.controllers.js";

const router = express.Router();

router.route('/add-to-favourite').post(VerifyToken, addToFavourites)
router.route('/remove-favourite/:movieId').delete(VerifyToken, removeFromFavourites)
router.route('/get-favourite').get(VerifyToken, getUserFavourites)


export const favouriteRoutes = router;
