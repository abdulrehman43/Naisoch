const mongoose = require('mongoose');
const Joi = require('joi');

const Book = mongoose.model('Book', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authorsIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }],
    category: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    isbn: {
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    numberInStock: {
        type: Number,
        // required: true,
    },
    translatedBy: [{
        type: String,
    }],
    publisher: {
        type: String,
        required: true,
    },
    new: {
        type: Boolean,
        required: true
    },
    premium: {
        type: Boolean,
        required: true
    },
    sale: {
        type: Boolean,
        required: true
    },

    description: {
        type: String,
        required: true,
        
    },
    offer: {
        type: Boolean,
        required: true
    }
    // edition: {
    //     type: Number,
    //     // required: true
    // },
    // famous: {
    //     type: Boolean,
    //     default: true,
    //     // required: true
    // },
    // latest: {
    //     type: Boolean,
    //     default: true,
    //     // required: true
    // },
    // published: {
    //     type: Boolean,
    //     // required: true,
    //     // default: true
    // },
    // publishedDate: {
    //     type: String,
    //     // required: true
    // },


    // illustrators: {
    //     type: [String],
    //     // minlength: 3,
    //     // maxlength: 55
    // },
    // publications: {
    //     type: [String],
    //     // required: true,
    //     // minlength: 3,
    //     // maxlength: 55
    // },

    // review:String,
    // averageRating:Number,
    // noOfReviews:Number,
    // copyright:String
}));

bookValidator = (body) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        authorsIds: Joi.required(),
        publisher: Joi.required(),
        // published: Joi.boolean().required(),
        numberInStock: Joi.number(),
        price: Joi.number().required(),
        pages: Joi.number().required(),
        category: Joi.string().required(),
        language: Joi.string().required(),
        image: Joi.string().required(),
        translatedBy: Joi.array().items(Joi.string()),
        description: Joi.string(),
        new: Joi.boolean().required(),
        sale: Joi.boolean().required(),
        premium: Joi.boolean().required(),
        offer: Joi.boolean().required()
    });
    return schema.validate(body);
}

exports.Book = Book;
exports.bookValidator = bookValidator;