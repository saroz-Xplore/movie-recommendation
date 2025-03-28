import { Movie } from "../models/movie.models.js";

const addMovie = async (req, res) => {
    try {
        const { title, genre, director, releaseYear, rating, description, posterUrl } = req.body;

        const existingMovie = await Movie.findOne({ title: title });
        if (existingMovie) {
            return res.status(409).json({ 
                message: "Error: Movie already exists" 
            });
        }

        const movie = await Movie.create({
            title,
            genre,
            director,
            releaseYear,
            rating,
            description,
            posterUrl
        });

        res.status(201).json({ 
            message: "Movie added successfully", 
            data: movie 
        });

    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ 
            message: "Unable to add movie" 
        });
    }}

export { addMovie }
