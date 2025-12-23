const mongoose = require("mongoose")
 
const dbConnect = async ()=>{
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/movie")
        console.log("MongoDb connection Successfull : ", dbConnection.connection.host)
        console.log(process.env.MONGO_URL);
        
        console.log("Mongoose Connection Successfull");
        
    } catch (error) {
        console.error("Db Coonection Error: ",error);
    }
}

module.exports = dbConnect