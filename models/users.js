const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema({
  createdAt : { type: Date },
  updatedAt: { type: Date },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  first: { type: String, required: true },
  last: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
  // SET createdAt AND updaedAt
  let now = new Date();
  this.updatedAt = now;

  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  let user = this;
  if ( !user.isModified('password')) {
    return next();
  }
  bcrypt.getSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    })
  })
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password. this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);













