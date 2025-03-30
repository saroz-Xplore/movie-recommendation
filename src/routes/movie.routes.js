import { Router } from "express";
import { addMovie, fetchsingleinfo, getAllMovies, updateMovie } from "../controllers/movie.controllers.js";
import { VerifyToken } from "../middleware/auth.middleware.js";



const router = Router();

router.route('/add-movie').post(addMovie)
router.route('/get-movies').get(getAllMovies)
router.route("/single-info/:_id").get(VerifyToken,fetchsingleinfo)
router.route("/update-info/:_id").patch(VerifyToken, updateMovie)


export const movieRoutes = router
