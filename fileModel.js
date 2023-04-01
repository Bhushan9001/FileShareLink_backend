const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : true
    },
    originalName:{
        type: String,
        required : true
    },
    password :{
        type:String
    }
})

module.exports =  mongoose.model("File",fileSchema);