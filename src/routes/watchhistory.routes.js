import express from 'express';
import { VerifyToken } from '../middleware/auth.middleware.js';
import { addToWatchHistory } from '../controllers/watchhistory.controllers.js';

const router = express.Router();


router.route('/add-watch-history').post(VerifyToken, addToWatchHistory)



export const watchhistoryRoutes = router