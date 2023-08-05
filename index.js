const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/we-hire-reg")
const express=require("express");
const routes= require("./routes/route")
const app =express();
app.use("/",routes);
app.listen(3040,function(){
    console.log('succedd');
})