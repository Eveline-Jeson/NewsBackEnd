var mongoose = require('mongoose');

// schema creation
var profileschema = mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,       
  location: String,
  occupation: String,
  bio: String
});

// model creation
var profilemodel = mongoose.model("profile", profileschema);

// exporting the model
module.exports = profilemodel;
