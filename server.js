// Express Module
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');



// Routes
app.get('/', (req, res) => {
  res.send("Hello Cats!");
});



// Server
app.listen(3000, () => {
  console.log("Server listening on 3000!");
});