const mongoose = require('mongoose');

const Rating = mongoose.model('Rating', new mongoose.Schema({

  rating: {
    type: Number,
  },
  comment: {
    type: String,
    required: true
  },
 
  date: {
	  type: Date,
	  default: Date.now
  },
    
  book:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required: true
  },
    
  userName: {
	  type: String,
	  required: true
  },
  email: {
    type: String,
  }

}));


exports.Rating = Rating;