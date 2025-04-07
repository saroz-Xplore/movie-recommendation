import express from "express";
import { VerifyToken } from "../middleware/auth.middleware.js";
import { addToFavourites, removeFromFavourites } from "../controllers/favourite.controllers.js";

const router = express.Router();

router.route('/add-to-favourite').post(VerifyToken, addToFavourites)
router.route('/remove-favourite/:movieId').delete(VerifyToken, removeFromFavourites)


export const favouriteRoutes = router;
