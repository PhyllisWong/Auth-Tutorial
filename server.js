// Modules
const express = require('express');
const env = require('dotenv')l
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const authController = require('./controllers/auth.js');
const app = express();


// Middleware
app.use(methodOverride("_method"));
// Cookie Parser
app.use(cookieParser());
// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(jwt({
  secret: process.env.SECRET,
  getToken: function fromHeaderOrCookie(req) { //fromHeaderOrQueryString
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  }
}).unless({path: ['/', '/login', 'sign-up']}));

// Routes
app.use("", authController);

//FIXME: Complete Step 2

// Server
app.listen(3000, () => {
  console.log("Server listening on 3000!");
});