import { WatchHistory } from "../models/watchhistory.models.js";
import { Movie } from "../models/movie.models.js";


const addToWatchHistory = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user?._id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ 
        message: "Movie not found" 
    });
    }

    
    const history = new WatchHistory({ userId, movieId });
    await history.save();

    res.status(201).json({
      message: "Added to watch history",
      data: history,
    });

  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Unable to add watch history" });
  }
};


const getWatchHistory = async (req, res) => {
    try {
      const userId = req.user?._id;
  
      const history = await WatchHistory.find({ userId }).populate("movieId", "title genre releaseDate")
  
      res.status(200).json({ 
        message : "Fetched watch history successfully",
        data: history });

    } catch (error) {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Unable to fetched" });
    }
  };

export {addToWatchHistory, getWatchHistory}