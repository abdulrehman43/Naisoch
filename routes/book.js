const { Book, bookValidator } = require('../models/book');
var multer = require('multer');
const express = require('express');
const router = express.Router();

let folderName = __dirname + "/../public/assets/images/naisoch";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, folderName)
    }
  },
  filename: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg') {
      cb(null, + Date.now() + file.originalname)
    }
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('invalid format'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', upload.single('image'), async (req, res) => {
  console.log("req.body", req.body)
  // const { error } = bookValidator(req.body);
  // console.log("error", error)
  // if (error) return res.status(400).send(error.details[0].message);

  req.body.image = req.file.filename;
  try {
    const book = await new Book(req.body).save();

    res.send(book);
  }
  catch (err) {
    res.json(err.message)
  }
});

router.get('/:id', async (req, res) => {

  const book = await Book.findById(req.params.id).select('image');
  if (!book) return res.status(404).send('given id not found');

  res.send(book);

});

router.get('/', async (req, res) => {

  const book = await Book.find().populate('authorsIds', 'name -_id');
  res.send(book);

});

module.exports = router;