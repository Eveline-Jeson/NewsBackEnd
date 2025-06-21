var mongoose= require('mongoose')
//schema creation 
var userSchema = new mongoose.Schema({
    Name:String, 
    Email:String, 
    Password:String,
    Doj: {
        type: Date,
        default: Date.now 
    },
    Count:{
        type: Number,
        default: 0
    }
}, { timestamps: true });

//model creation
//var studentModel = mongoose.model("collectionName",SchemaName);
var userModel = mongoose.model("user",userSchema);
//exporting the model
module.exports= userModel;

    
   