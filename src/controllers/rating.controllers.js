import { Rating } from "../models/rating.models.js";
import { Movie } from "../models/movie.models.js";
import { User } from "../models/user.models.js";

const addRating = async (req, res) => {
  try {

    const user = await User.findById(req.user?._id);
          if (user.isAdmin) {
              return res.status(403).json({ 
                message: "Unauthorized: Admin access" 
            });
          }

    const { movieId, rating, review } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ 
        message: "Movie not found" 
    });
    }

    const existingRating = await Rating.findOne({ movieId, userId: req.user?._id });
    if (existingRating) {
      return res.status(400).json({ 
        message: "You have already rated this movie" 
    });
    }

    const newRating = new Rating({
      movieId,
      userId: req.user?._id,
      rating,
      review
    });

    await newRating.save();

    res.status(201).json({ 
        message: "Movie Rated successfully", 
        data: newRating 
    });
  } catch (err) {
    console.log("error:", error.message)
    res.status(500).json({
        message: "Error rating"
    });
  }
};


const getRatingsForMovie = async (req, res) => {
  try {
      const { movieId } = req.params;

      const ratings = await Rating.find({ movieId }).populate("userId", "name email");

      if (!ratings.length) {
          return res.status(404).json({
              message: "No ratings found for this movie"
          });
      }

      res.status(200).json({
          message: "Ratings fetched successfully",
          data: ratings
      });

  } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({
          message: "Error fetching ratings"
      });
  }
};

const getUserRatings = async (req, res) => {
  try {
      const userId = req.user?._id;

      const ratings = await Rating.find({ userId }).populate("movieId", "title genre");

      if (!ratings.length) {
          return res.status(404).json({
              message: "No ratings found for this user"
          });
      }

      res.status(200).json({
          message: "User ratings fetched successfully",
          data: ratings
      });

  } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({
          message: "Error fetching user ratings"
      });
  }
};

export {addRating, getRatingsForMovie, getUserRatings}