const mongoose = require("mongoose");
require('dotenv').config();


const MONGO_URL = process.env.DB

const dbConnect = async()=> {
    try {
        await mongoose.connect(MONGO_URL,{
            // useNewUriParser:true,
            // useUnifiedTopology:true,
        })
        console.log("Connected Successfully");
        
    } catch (error) {
        console.log("Error Connecting to MongoDB",error.message)
        
    }
}

module.exports = dbConnect;