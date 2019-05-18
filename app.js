const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');

app.use(volleyball);

app.use('/api', require('./api'));

app.use(express.static(path.join(__dirname, '.', 'public')))

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

module.exports = app;
