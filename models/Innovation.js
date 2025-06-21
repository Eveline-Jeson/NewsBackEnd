var mongoose= require('mongoose')
//schema creation 
var innovationSchema = mongoose.Schema({
    ProductName:String, 
    Details:String, 
    PhoneNumber:Number, 
    Email:String,
    Doj: {
        type: Date,
        default: Date.now 
    },
});
//model creation
//var studentModel = mongoose.model("collectionName",SchemaName);
var innovationModel = mongoose.model("innovation",innovationSchema);
//exporting the model
module.exports= innovationModel;
