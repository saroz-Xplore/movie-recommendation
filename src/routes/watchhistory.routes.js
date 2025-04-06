import express from 'express';
import { VerifyToken } from '../middleware/auth.middleware.js';
import { addToWatchHistory, getWatchHistory } from '../controllers/watchhistory.controllers.js';

const router = express.Router();


router.route('/add-watch-history').post(VerifyToken, addToWatchHistory)
router.route('/get-watch-history').get(VerifyToken, getWatchHistory)



export const watchhistoryRoutes = router