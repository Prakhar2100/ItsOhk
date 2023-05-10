
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
var app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("homepage");
});

app.get("/information",function(req,res){
    res.render("indexADULTS");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/api/users/login");
}

app.get("/courses"  , function(req, res){
    res.render("courses.ejs");
});

app.get("/resources", function(req, res){
    res.render("resources.ejs");
});


app.get("/games", function(req, res){
    res.render("games.ejs");
});

app.get("/silk", function(req, res){
    res.render("games/weavesilk.ejs");
});

app.get("/noisless", function(req, res){
    res.render("games/noisless.ejs");
});

app.get("/arrange", function(req, res){
    res.render("games/arrange.ejs");
});

app.get("/gamesAdults", function(req, res){
    res.render("gamesAdults.ejs");
});

app.get("/therapyKids", function(req, res){
    res.render("therapists/kidstherapy.ejs");
});
app.get("/therapySection", function(req, res){
    res.render("therapists/therapyadults.ejs");
});

app.get("/moreInformation", function(req, res){
    res.render("adultsreadmore.ejs");
});

app.get("/meditation", function(req, res){
    res.render("meditation/index");
});

/// Auth Routes
app.use('/api/users', require('./routes/users'));


app.listen(3000, function(){
    console.log("connect!");
});