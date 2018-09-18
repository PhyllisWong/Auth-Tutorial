// Express Module
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const authController = require('./controllers/auth.js');

// Middleware
app.use(methodOverride("_method"));
// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes
app.use("", authController);



// Server
app.listen(3000, () => {
  console.log("Server listening on 3000!");
});