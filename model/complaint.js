var mongoose = require('mongoose')
// schema creation
var complaintschema = mongoose.Schema({
    date:Date,
    issue:String,
    description:String    
});
// model creation
var complaintmodel = mongoose.model("complaint",complaintschema);
// exporting the model
module.exports = complaintmodel;