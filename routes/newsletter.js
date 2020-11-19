const express = require('express')
const router = express.Router();

const {NewsLetter} = require('../models/newsletter')

router.post("/", async(req, res) => {
  const news = new NewsLetter(req.body).save(); 
  res.send(news)
});

module.exports = router;
