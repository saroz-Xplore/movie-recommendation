import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    
  title: { 
    type: String,
    required: true 
},
  genre: [{ 
    type: String, 
    required: true 
}],
  director: { 
    type: String 
},
  releaseYear: { 
    type: Number 
},
  rating: { 
    type: Number, 
    min: 0, 
    max: 10 
},
  description: { 
    type: String 
},
  posterUrl: { 
    type: String ,
}
},
{ 
    timestamps: true 
});

export const Movie = mongoose.model("Movie", MovieSchema)
