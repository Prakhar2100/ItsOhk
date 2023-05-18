const express           = require("express"),
mongoose                = require("mongoose"),
bodyParser              = require("body-parser"),
Songs                    = require("../models/songs"),
LocalStrategy           = require("passport-local");
const songs = require("../models/songs");
const path = require('path');

var app = express();
const router = express.Router();

router.get('/data', async (req, res) => {
    // Perform a MongoDB query to fetch the sings from the database
    try {
    const songs = await Songs.find();
    // const blogs = await Blogs.find();
    // const books = await Books.find();
    res.render('resources.ejs', {
      songs: songs
      // blogs: blogs,
      // books: books
    })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

    Songs.find({}, function(err, songs) {
      if (err) {
        console.log(err);
      } else {
        console.log("In here>>>>");
        // Render the EJS template and pass the blogs as a variable
        res.render('resources.ejs', { songs: songs });
      }
    });
});

router.post('/songs', async (req, res) => {
  try {
    const { title, iframeLink, rating } = req.body;

    // Create a new song
    const newSong = new Songs({
      title,
      iframeLink,
      rating
    });

    // Save the songs to the database
    const savedSong = await newSong.save();

    res.status(201).json(savedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router; 