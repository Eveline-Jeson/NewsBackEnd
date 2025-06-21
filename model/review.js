var mongoose = require('mongoose')
// schema creation
var reviewschema = mongoose.Schema({
    review:String
});
// model creation
var reviewmodel = mongoose.model("review",reviewschema);
// exporting the model
module.exports = reviewmodel;