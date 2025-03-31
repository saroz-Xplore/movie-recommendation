import express from 'express';
import { addRating } from '../controllers/rating.controllers.js';
import { VerifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();


router.route('/add-rating').post(VerifyToken, addRating)


export const ratingRoutes = router