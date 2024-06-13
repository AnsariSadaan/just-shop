// require('dotenv').config({path: './env'});
import dotenv from 'dotenv';
import connectDB from "./db/db_connect.js";
import { app } from './app.js';


dotenv.config({
    path: './env'
})


connectDB()
.then(()=> {
    app.listen(process.env.PORT || 7000, ()=> {
        console.log(`Server is Running on port ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log("MONGODB Connection failed !!", err);
})