const express = require('express');
const router = express.Router();



// Routes
router.get('/', (req, res) => {
  res.send("Hello Cats!");
});

//FIXME: Find out if this is the process for Step 7
// ******  POST: sign-up a User  ********
router.post('/sign-up', (req, res) => {
  // Create User and JWT
  const user = new User(req.body);

  user.save().then( user => {
    let token = jwt.sign({ _id: user._id}, process.env.SECRET, { expiresIn: "7 days" });
    res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
    res.redirect('/');
    console.log(req.cookies);
  })

});




module.exports = router;