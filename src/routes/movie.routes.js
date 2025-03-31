import { Router } from "express";
import { addMovie, deleteMovie, fetchsingleinfo, getAllMovies, updateMovie } from "../controllers/movie.controllers.js";
import { VerifyToken } from "../middleware/auth.middleware.js";



const router = Router();

router.route('/add-movie').post(VerifyToken, addMovie)
router.route('/get-movies').get(VerifyToken, getAllMovies)
router.route("/single-info/:_id").get(VerifyToken,fetchsingleinfo)
router.route("/update-info/:_id").patch(VerifyToken, updateMovie)
router.route("/delete-movie/:_id").delete(VerifyToken, deleteMovie)


export const movieRoutes = router
