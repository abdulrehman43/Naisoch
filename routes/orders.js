const { Order, orderValidator } = require('../models/order');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        // const { error } = orderValidator(req.body);
        // if (error) return res.status(400).send(error.details[0].message);

        console.log("req.body=>", req.body)
        const order = await new Order(req.body).save()
        res.send({orderId: order._id})
    }
    catch (err) {
        res.send(err.message)
    }
});

router.get('/', async (req, res) => {
    try {
        const query = await Order.find().populate('products.bookId', 'image title -_id')
        res.send(query);
    }
    catch (err) {
        res.send(err.message)
    }

});

router.get('/:id', async (req, res) => {
    try {

        const query = await Order.findById(req.params.id).populate('products.bookId', 'image title price -_id')
        res.send(query);
    }
    catch (err) {
        res.send(err.message)
    }

});

// router.get('/:id', async (req, res) => {
//     try {

//         const query = await Order.find({customerId: req.params.id})
//         res.send(query);
//     }
//     catch (err) {
//         res.send(err.message)
//     }

// });

router.get('/status/:id/phoneNumber/:userPhone', async (req, res) => {
    let userPhone = req.params.userPhone
    let _id = req.params.id;
    if(userPhone !== req.params.userPhone)
    res.status(402).send("Entered phone Number is woring!")

    try {
        let order = await Order.findOne({
            _id,
            userPhone
        })
        res.send(order);
    }
    catch (err) {
        res.send(err.message)
    }
});

module.exports = router;