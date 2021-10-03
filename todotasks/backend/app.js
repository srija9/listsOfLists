require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');

const app = express();

const MONGODB_URI = `mongodb+srv://srija:${process.env.MONGO_PASSWORD}@cluster0.pghhd.mongodb.net/myFirstDatabase`;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    app.listen(port);
    console.log("user connected");
})
.catch(err => {
    console.log(err);
})