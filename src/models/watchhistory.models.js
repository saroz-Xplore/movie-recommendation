import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Movie", 
    required: true 
},
  watchedAt: { 
    type: Date, 
    default: Date.now 
}
});

export const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema);
