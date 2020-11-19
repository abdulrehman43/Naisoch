const express = require('express')
const router = express.Router();

const {Contact} = require('../models/contact')

router.post("/", async(req, res) => {
  const contact = new Contact(req.body).save(); 
  res.send(contact)
});

module.exports = router;
