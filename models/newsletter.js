const mongoose = require('mongoose');

const NewsLetter = mongoose.model('NewsLetter', new mongoose.Schema({
 
  email: {
    type: String,
    required: true
  }

}));


exports.NewsLetter = NewsLetter;