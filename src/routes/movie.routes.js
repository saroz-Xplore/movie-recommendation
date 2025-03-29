import { Router } from "express";
import { addMovie, getAllMovies } from "../controllers/movie.controllers.js";



const router = Router();

router.route('/add-movie').post(addMovie)
router.route('/get-movies').get(getAllMovies)


export const movieRoutes = router
