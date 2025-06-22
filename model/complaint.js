var mongoose = require('mongoose')
// schema creation
var complaintschema = mongoose.Schema({
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'user', // important for population
     required: true
    },
    date:Date,
    issue:String,
    description:String  ,
    status: {
    type: String,
    enum: ['pending', 'responded'],
    default: 'pending'
    }

});
// model creation
var complaintmodel = mongoose.model("complaint",complaintschema);
// exporting the model
module.exports = complaintmodel;