import { Favourite } from "../models/favourite.models.js";
import { Movie } from "../models/movie.models.js";


const addToFavourites = async (req, res) => {
  try {
    const { movieId } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ 
        message: "Movie not found" 
    });
    }

    const exists = await Favourite.findOne({ userId: req.user?._id, movieId });
    if (exists) {
      return res.status(400).json({ message: "Already in favourites" });
    }

    const favourite = new Favourite({ userId: req.user?._id, movieId });
    await favourite.save();

    res.status(201).json({ 
        message: "Added to favourites", 
        data: favourite 
    });

  } catch (error) {
    res.status(500).json({ 
        message: "Error adding to favorites" 
    });
  }
};

export { addToFavourites }
