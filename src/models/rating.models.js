import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({

  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
},
  movieId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
},
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    required: true 
},
  review: { 
    type: String 
}
});

export const Rating = mongoose.model('Rating', ratingSchema);
