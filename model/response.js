var mongoose = require('mongoose')
// schema creation
var responseschema = mongoose.Schema({
    date:Date,
    issue:String,
    description:String    
});
// model creation
var responsemodel = mongoose.model("response",responseschema);
// exporting the model
module.exports = responsemodel;

