import { Movie } from "../models/movie.models.js";
import { User } from "../models/user.models.js";

const addMovie = async (req, res) => {
    try {
        const { title, genre, director, releaseYear, rating, description, posterUrl } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }
        const user = await User.findById(req.user._id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ 
                message: "Access Denied: Admins Only" 
            });
        }

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

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();  

    res.status(200).json(movies);

  } catch (err) {
    res.status(500).json({ 
        error: err.message 
    });
  }
};

  const fetchsingleinfo = async(req, res) => {
    try {
        const movie= await Movie.findById(req.params._id)
   
        if(!movie){
            return res.status(404).json({
                message: "Movie not found"
            })
        }
        return res.status(200).json({
            message: "Single info Fetched",
            data: movie
        })
        
    } catch (error) {
        console.log("Error", error)
         res.status(500).json({      
            message:"Error fetching single info"
        })
    }
}

export { addMovie, getAllMovies, fetchsingleinfo }
