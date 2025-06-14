const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
   from : {
        type:String,
        reuired : true ,
    },

    to :{
        type:String , 
        required:true ,
    },

    msg:{
        type:String , 
        maxLength:50,
    },

    created_date:{
        type:Date,
        required:true ,
    }
});

const chat = mongoose.model("chat", chatSchema);

module.exports = chat;