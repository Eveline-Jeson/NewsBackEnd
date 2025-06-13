var mongoose= require('mongoose')
//schema creation 
var userSchema = mongoose.Schema({
    Name:String, 
    Email:String, 
    Password:String,
    Count:{
        type: Number,
        default: 0
    }
});
//model creation
//var studentModel = mongoose.model("collectionName",SchemaName);
var userModel = mongoose.model("user",userSchema);
//exporting the model
module.exports= userModel;

    
   