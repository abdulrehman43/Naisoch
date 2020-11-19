const mongoose = require('mongoose');
const Joi = require('joi');

const Author = mongoose.model('Author', new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    image: [{
        type: String,
    }],
    about: {
        type: String,
        required: true,
    },
    dOB: {
        type: String,
        // required: true
    },

}));

authorValidator = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(55).required(),
        description: Joi.string().min(10).max(55).required(),
        about: Joi.string().min(10).max(255).required(),
        dOB: Joi.string().min(10).max(20).required()
    });
    return schema.validate(body);
}


exports.Author = Author;
exports.authorValidator = authorValidator;