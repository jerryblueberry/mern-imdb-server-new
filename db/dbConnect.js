const mongoose = require("mongoose");


const MONGO_URL = "mongodb+srv://sajan2121089:sajank1818@cluster0.rflkwmd.mongodb.net/?retryWrites=true&w=majority";

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