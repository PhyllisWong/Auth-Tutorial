// Modules
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const hbs = require('express-handlebars');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('express-jwt');
const mongoose = require('mongoose');


require('dotenv').config();
const secret = process.env.SECRET;


// Port
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(methodOverride("_method"));

// Handlebars
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs');



// static content
// app.use(express.static('./public'));
app.use(express.static(__dirname + '/public'));
// Controllers

const authController = require('./controllers/auth');
app.use("", authController);


app.use(jwt({
  secret: secret,
  audience: 'http://localhost:3000',
  issuer: 'http://localhost:3000',
  getToken: function fromHeaderOrCookie (req) { //fromHeaderOrQuerystring
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      console.log('here ' + req.cookies.token);
      return req.cookies.token;
    }
    return null;
  }
}).unless({path: ['/', '/login', '/sign-up']}));

// Routes


//FIXME: Complete Step 2
mongoose.Promise = global.Promise;

// Mongoose Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/jwt-token";
mongoose.connect(
  mongoUri, { useNewUrlParser: true }
);

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

// Server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});