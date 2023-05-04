

const express           = require("express"),
mongoose                = require("mongoose"),
passport                = require("passport"),
bodyParser              = require("body-parser"),
User                    = require("../models/user"),
LocalStrategy           = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose");

var app = express();
const router = express.Router();


// Handling the case where user register and passport local strategy is used to authenticate the user 
router.post("/register", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
   if(err){
        console.log(err);
        return res.render('signup');
    } 
    passport.authenticate("local")(req, res, function(){
        res.redirect("/api/users/login"); // after signup user is redirect to login screen
   }); 
});
});

// Login Routes

router.get("/login", function(req, res){
res.render("login");
});

router.get("/register", function(req, res){
    res.render("signup");
});

router.post("/login", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/api/users/login"
    }),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
req.logout();
res.redirect("/login");
});

module.exports = router; 