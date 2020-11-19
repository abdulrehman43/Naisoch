const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const book = require('./routes/book');
const author = require('./routes/author');
const orders = require('./routes/orders');
const rating = require('./routes/rating')
const contact = require('./routes/contact')
const newsLetter = require('./routes/newsletter')
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const express = require('express');

const app = express();
app.use(morgan('tiny'));

// app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
// app.use(bodyParser.json());

app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@naisoch.1s49p.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true 
  })
  .then(() => console.log('successfully connected to mongodb'))
  .catch((err) => console.log('connection failed', err));

app.use('/api/uploads', express.static('public/uploads'));
// app.use('/api/assets/images/naisoch', express.static('public/assets/images/naisoch'));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });

app.use(express.json());

app.use('/api/book', book);
app.use('/api/author', author);
app.use('/api/orders', orders);
app.use('/api/rating', rating);
app.use('/api/contact', contact);
app.use('/api/newsletter', newsLetter)


// const port = process.env.PORT || 5000;
app.listen(process.env.PORT, () => console.log(`listning on port ${process.env.PORT}...`));
