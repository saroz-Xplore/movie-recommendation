import { Movie } from "../models/movie.models.js";
import { User } from "../models/user.models.js";

const addMovie = async (req, res) => {
    try {

        const user = await User.findById(req.user?._id);

        if (!user || !user.isAdmin) {
            return res.status(403).json({
                message: "Unauthorized: Admin access"
            });
        }

      const { title, description, genre, releaseDate, rating, director, cast } = req.body;

      const movie = new Movie({
        title,
        description,
        genre,
        releaseDate,
        rating,
        director,
        cast
      });
  
      await movie.save();

      res.status(201).json({
        message: "Movie added successfully", 
        data: movie
      });
    } catch (err) {
        console.log("error:", err.message ); 
      res.status(400).json({ 
        message: "Error while adding movie"
    });
    }
  };


const getAllMovies = async (req, res) => {
  try {

    const user = await User.findById(req.user?._id);
    
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

const updateMovie = async (req, res) => {
    try {
      const { title, description, genre, releaseDate, rating, director } = req.body;

      const user = await User.findById(req.user?._id);
      if (!user || !user.isAdmin) {
          return res.status(403).json({ 
            message: "Unauthorized: Admin access" 
        });
      }
  
      const movie = await Movie.findByIdAndUpdate(
        req.params._id,
        {
            $set: {
                title,
                description,
                genre,
                releaseDate,
                rating,
                director
            }
        },
        { 
            new: true 
        }
    );

      if (!movie) {
        return res.status(404).json({ 
            message: 'Movie not found' 
        });
      }

      res.status(200).json({ 
        message: "Movie updated successfully", 
        data: movie 
    });

    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const deleteMovie = async (req, res) => {
    try {

        const user = await User.findById(req.user?._id);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ 
              message: "Unauthorized: Admin access" 
          });
        }

      const movie = await Movie.findByIdAndDelete(req.params._id);
      console.log('movie', movie);
      if (!movie) {
        return res.status(404).json({ 
            message: 'Movie not found' 
        });
      }
  
      res.status(200).json({ 
        message: 'Movie deleted successfully' 
    });

    } catch (err) {
      res.status(500).json({ 
        error: err.message 
    });
    }
  };

export { addMovie, getAllMovies, fetchsingleinfo, updateMovie, deleteMovie }
