const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', new mongoose.Schema({
 
  date: {
	  type: Date,
	  default: Date.now
  },
    
  name: {
	  type: String,
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }

}));


exports.Contact = Contact;