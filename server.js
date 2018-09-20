// Modules
const express = require('express');
const hbs = require('express-handlebars');
const env = require('dotenv');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const authController = require('./controllers/auth.js');
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(methodOverride("_method"));
// Cookie Parser
app.use(cookieParser());
// Handlebars
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');


// static content
app.use(express.static('./public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(jwt({
  secret: process.env.SECRET,
  audience: 'http://localhost:3000',
  issuer: 'http://localhost:3000',
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

/ Mongoose Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/jwt-token";
mongoose.connect(
  mongoUri, { useNewUrlParser: true }
);
mongoose.set('debug', true);

// Server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});