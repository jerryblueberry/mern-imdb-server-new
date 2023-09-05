const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    img: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    rating: {type: Number, required: true}

})

module.exports = mongoose.model("product",productSchema);