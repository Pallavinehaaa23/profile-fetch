const { ObjectId } = require("mongodb");
const mongoose =require("mongoose");
const hireschema=new mongoose.Schema({
    
    name:{
       type:String,
       required:true

    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    // is_admin:{
    //     type:Number,
    //     required:true
    // },
    // is_verified:{
    //    type:Number,
    //    default:0
    // }
    // dob:{
    //     type:String,
    //     required:true 
    // }
});
const Auths= new mongoose.model('Userprof',hireschema);
module.exports=Auths;