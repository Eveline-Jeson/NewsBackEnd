var mongoose = require('mongoose');

// schema creation
var noteschema = mongoose.Schema({
  name: String,       
  date: Date,
  note: String
});

// model creation
var notemodel = mongoose.model("note", noteschema);

// exporting the model
module.exports = notemodel;