
import mongoose from "mongoose";

export const DbConnect= async() => {
    try {
        
        const mongo = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Database Connected Successfully ! Host: ${mongo.connection.host}`);
    } catch (error) {
        console.log("Connection Failed:", error);
        process.exit(1)
    }
}