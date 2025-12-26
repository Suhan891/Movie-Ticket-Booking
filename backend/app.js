require("dotenv").config()
const express = require("express")
const app = express();
const port = process.env.PORT || 8080;
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db");
const cors = require("cors")

const userRouter = require("./routes/user");

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}
app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("Movie Booking ticket")
})

app.use(express.json())
app.use(cookieParser());

app.use("/user",userRouter)

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
    dbConnect()
})




