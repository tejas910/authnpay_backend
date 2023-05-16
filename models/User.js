const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    fullname: {
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
        unique:true,
    },
    dob:{
        type:String,
        required:false,
    },
    mobile_no:{
        type:Number,
        required: false,
    },
    USAI_ID:{
        type:String,
        required:false,
    },
    User_face_id:{
        type:String,
        required:false,  
    }


})
mongoose.model("User",userschema);