const express= require("express");
const route =express();
const session =require('express-session')
const config=require("../config/config")
const auth = require("../middleware/auth")
route.use(session({secret:config.sessionSecret}));
const multer =require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:function(req,file,cb){
    cb(null,path.join(__dirname,'../public/userimages'))
    },
    filename:function(req,file,cb){
        const name =Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const upload=multer({storage:storage});
const bodyParser= require("body-parser");
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}))
route.set('view engine','ejs');
route.set('views','./views/users')
const usercontroller= require("../controllers/usercontroller");
route.get("/register",auth.isLogout,usercontroller.loadregister)
route.post("/register",upload.single('resume'),usercontroller.insertuser)
route.get('/',auth.isLogout,usercontroller.loginload);
route.get('/login',auth.isLogout,usercontroller.loginload);
route.post('/login',usercontroller.verifylogin);
route.get('/home',auth.isLogin,usercontroller.loadhome);
route.get('/logout',auth.isLogin,usercontroller.logout)
route.get('/edit',auth.isLogin,usercontroller.editprof);
route.post('/edit',auth.isLogin,usercontroller.updateprof);
module.exports= route;