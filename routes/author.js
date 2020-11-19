const { Author, authorValidator } = require('../models/author');
const express = require('express');
var multer = require('multer')
const router = express.Router();

let folderName = __dirname + "/../public/uploads/author";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, folderName)
      }
      else {
        cb(new Error('not found'), true)
      }
    },
    filename: function (req, file, cb) {    
        cb(null,  + Date.now() + file.originalname)
    }
  });

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'){
    cb(null, true);
  } else {
    cb(new Error('invalid format'), true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/', async (req, res) => {
    
  const { error } = authorValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const author = new Author({
      name: req.body.name,
      about: req.body.about,
      description: req.body.description,
      dOB: req.body.dOB

  });
  
  const result = await author.save();
  res.send(result);
});

router.get('/', async (req, res) => {
  const authors = await Author.find().sort('name')
      .select('-__v');
  res.send(authors);
})

router.get('/:id', async (req, res) => {

  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).send('given id not found');

  res.send(author);

})

router.put('/:id', async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const author = await Author.findByIdAndUpdate(req.params.id, { name: req.body.name }
      , { new: true });
  if (!author) return res.status(404).send('given id not found');

  const result = await author.save();
  res.send(result);

})

router.delete('/:id', async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) return res.status(404).send('given id not found');

  const result = await author.save();
  res.send(result);
})

// on working..............................Route

router.post('/all', upload.array('images', 5), async (req, res) => {

  console.log(req)

  let files = [];

  req.files.map(f => {
    let { filename } = f;
    files.push(filename);

  });

  req.body.image = files;
  try {
    const author = new Author(req.body);
    const result = await author.save();
    res.send(result);
  }
  catch (err) {
    res.json(err.message)
    console.log(err.message)
  }


});



module.exports = router;