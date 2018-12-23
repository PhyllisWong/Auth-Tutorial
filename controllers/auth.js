const express = require('express');
const app = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/users');



// Routes
app.get('/', (req, res) => {
  res.json({"hello": "world"});
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

app.get('success', (req, res) => {
  res.render('success');
});

// ******  POST: sign-up a User  ********
app.post('/sign-up', (req, res) => {

  console.log(req.body);
// Create User and JWT
  const user = new User(req.body);

  user.save(function(err) {
    if (!err) {
      let token = jwt.sign({ _id: user._id }, process.env.SECRET);
      console.log('User created');
    } else {
      console.log(err.message)
    }
  })
});

// // POST: creates a new user
// app.post('/sign-up', (req, res) => {
//   // CREATE User and JWT
//   const user = new User(req.body);
//
//   user.save().then( user => {
//     let token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" });
//     res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
//     res.redirect('/');
//     // console.log(req.cookies);
//   }).catch( err => {
//     console.log(err.message);
//     return res.status(400).send({ err: err });
//   })
// });

module.exports = app;
