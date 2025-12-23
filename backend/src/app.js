const express = require("express")
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser")

app.get("/",(req,res)=>{
    res.send("Movie Booking ticket")
})

app.use(express.json())
app.use(cookieParser());

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})




