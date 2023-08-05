const Auths=require("../models/usermodel");
const bcrypt= require('bcrypt');
const mongoose =require("mongoose")

const securepassword=async(password)=>{
try{
    const pwdhash=bcrypt.hash(password,10);
    return pwdhash;
}catch(e){
    console.group(e.message);
}
}
const loadregister=async(req,res)=>{
try{
 res.render("regd")
}catch(e){
console.log(e.message);
}
}
const insertuser=async(req,res)=>{
    try{
        const spassword =await securepassword(req.body.password);
     const user=new Auths({
        
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:spassword,
        resume:req.body.resume,
        // is_admin:0,
        // is_verified:0
    })
    const userdata = await user.save();
    if(userdata){
        res.render('regd',{message:"regd successful"})
    }
    else{
        res.render('regd',{message:"regd unsuccessful"})
    }
    }catch(e){
     console.log(e.message);
    }
}
const loginload =async(req,res)=>{
 try{
  res.render("login");
 }catch(e){
   console.log(e);
 }
}
const verifylogin=async(req,res)=>{
    try{
      const email=req.body.email;
      const password =req.body.password;
    const check = await Auths.findOne({email:email});
   if(check){
    const pwdchk=bcrypt.compare(password,check.password);
    if(pwdchk){
        req.session.user_id=check._id;
      res.redirect("/home");
    }else{
        res.render('login',{message:"email and password incorrect"})
    }
   }else{
    res.render('login',{message:"email and password incorrect"})
   }
    }catch(e){
        console.log(e);
    }
}
const loadhome =async(req,res)=>{
    try{
       const usercontent = await Auths.findById({_id:req.session.user_id})
        res.render('home',{user:usercontent});
          }catch(e){
        console.log(e);
    }
}
const logout =async(req,res)=>{
    try{
      req.session.destroy();
      res.redirect('/')
    }catch(e){
     console.log(e);
    }
}
const editprof =async(req,res)=>{
    try{
     const id =req.query.id;
     console.log(id);
     const userdata=await Auths.findById({_id:id});
     if(userdata){
      res.render("edit",{user:userdata})
     }else{
        res.redirect("/home")
     }
    }catch(e){
      console.log(e);
    }
}
const updateprof =async(req,res)=>{
    try{
        console.log(req.body);
        if( !mongoose.Types.ObjectId.isValid(req.body.user_id) ){ 
            console.log(req.body.user_id);
            return false;
        }
        
        else{
           
        const userdata=await Auths.findByIdAndUpdate(req.body.user_id ,{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}})
    }
        res.redirect("/home");

    }catch(e){
        console.log(e);
    }
    
}
module.exports={
    loadregister,
    insertuser,
    loginload,verifylogin,
    loadhome,logout,editprof,updateprof
}