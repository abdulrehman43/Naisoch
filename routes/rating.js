const express = require('express')
const router = express.Router();

const {Rating} = require('../models/rating')

router.post("/:id", async(req, res) => {
  const rating = new Rating({...req.body, book: req.params.id}); 
  console.log(rating);
  const rt = await rating.save();
  if (rt) res.send(rt)
  else res.send("Incorrect details")
});

router.get("/:id", async (req, res) => {
  let rt = await Rating.find({book: req.params.id})
 
  console.log(rt)
  res.send(rt);
});

module.exports = router;
