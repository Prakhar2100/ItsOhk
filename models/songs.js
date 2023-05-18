const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  iframeLink: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Songs", songsSchema);
