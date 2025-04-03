import express from 'express';
import { addRating, getRatingsForMovie } from '../controllers/rating.controllers.js';
import { VerifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();


router.route('/add-rating').post(VerifyToken, addRating)
router.route("/get-all-ratings/:movieId").get(getRatingsForMovie)


export const ratingRoutes = router