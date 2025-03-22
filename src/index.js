import express from "express";
import dotenv from 'dotenv';
import { DbConnect } from "./db/index.js";
import { userRoutes } from "./routes/user.routes.js";
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

app.use(express.json())
app.use(express.urlencoded()); 

app.use('/api/v1/auth', userRoutes)



app.get('/', (req, res) => {
    res.send('Hello ram !!!')
})

