import { Router } from "express";
import { addMovie, fetchsingleinfo, getAllMovies } from "../controllers/movie.controllers.js";



const router = Router();

router.route('/add-movie').post(addMovie)
router.route('/get-movies').get(getAllMovies)
router.route("/single-info/:_id").get(fetchsingleinfo)


export const movieRoutes = router
