import express from "express";
import dotenv from 'dotenv';
import { DbConnect } from "./db/index.js";
import cookieParser from 'cookie-parser'
import { userRoutes } from "./routes/user.routes.js";
import { movieRoutes } from "./routes/movie.routes.js";
import { ratingRoutes } from "./routes/rating.routes.js";

const port = 5000
const app = express()
const hostname =  "127.0.0.1"


dotenv.config()

DbConnect().then(() => {
    app.listen(port, hostname, () => {
        console.log(`Server on http://${hostname}:${port}`);
    })
}).catch((err) => {
    console.log("Error", err);
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/movie', movieRoutes)
app.use('/api/v1/rating', ratingRoutes)



app.get('/', (req, res) => {
    res.send('Hello ram !!!')
})

