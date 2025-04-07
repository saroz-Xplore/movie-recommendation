import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({

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
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Favourite = mongoose.model("Favourite", favouriteSchema);
