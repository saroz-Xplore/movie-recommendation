import { Router } from "express";
import { addMovie } from "../controllers/movie.controllers.js";



const router = Router();

router.route('/add-movie').post(addMovie)


export const movieRoutes = router
