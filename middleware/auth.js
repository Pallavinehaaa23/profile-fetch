const isLogin=(req,res,next)=>{
    try{
        if(req.session.user_id){}
        else{
            res.redirect("/login")
        }
        next();
    }catch(e){
        console.log(e);
    }
}
const isLogout=(req,res,next)=>{
    try{
        if(req.session.user_id){ res.redirect("/home")}
        next();
    }catch(e){
        console.log(e);
    }
}
module.exports={
    isLogin,isLogout
}