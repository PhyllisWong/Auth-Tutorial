const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');



// Routes
app.get('/', (req, res) => {
  res.render('button');
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

//FIXME: Find out if this is the process for Step 7
// ******  POST: sign-up a User  ********
app.post('/sign-up', (req, res) => {
// Create User and JWT
  const user = new User(req.body);

  user.save(function(err) {
    if (err) { console.log(err.message) }
    let token = jwt.sign({ _id: user._id }, process.env.SECRET);
  })
});

module.exports = app;
