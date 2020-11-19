const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
    products:[{
        image:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        qty:{
            type: Number,
            required: true
        },
        sum:{
            type: Number,
            required: true
        }
    }],
    userName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    completeShippingAddress: {
        type: String,
        required: true,
    },
    userPhone: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true
    },    
    shipmentNote:{
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['JAZZ CASH', 'BANK TRANSFER', 'CASH ON DELIVERY'],
        default: 'CASH ON DELIVERY',
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['IN PROGRESS', 'ACKNOWLEDGED', 'REFUSED', 'RECIEVED', 'CONFIRM', 
        'SHIPMENT', 'PAYMENT', 'COMPLETE'],
        default: 'IN PROGRESS',
        required: true
    },
    
    // promoCode: {
    //     type: String,
    //     minlength: 2,
    //     maxlength: 55
    // },
    // promoDiscount: {
    //     type: Number,
    // },
    // promoDiscountUnit: {
    //     type: String,
    //     enum: ['ABSOLUTE', 'PERCENTAGE'],
    //     default: 'ABSOLUTE'
    // }
});
orderSchema.plugin(timestamps)

const Order = mongoose.model('Order', orderSchema);

orderValidator = (body) => {
    const schema = Joi.object({
      userName: Joi.string().required(),
      userPhone: Joi.number().required(),
      city: Joi.string().required(),
      completeShippingAddress: Joi.string().required(),
      products: Joi.array().items(
        Joi.object({
          bookId: Joi.string().required(),
          quantity: Joi.number().required(),
        })
      ),
      paymentMethod: Joi.string().required(),
      orderStatus: Joi.string().required(),
      totalAmount: Joi.number().required(),
      shipmentNote: Joi.string().allow(""),
    });
    return schema.validate(body);
};

exports.Order = Order;
exports.orderValidator = orderValidator;
