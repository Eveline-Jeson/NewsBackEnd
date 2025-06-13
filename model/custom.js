var mongoose=require('mongoose')

var customschema=mongoose.Schema({
    title:String,
    description:String,
    content:String,
    url:String,
    image:String,
    publishedAt:String,
    name:String,
});

var custommodel=mongoose.model("custom",customschema)
//collection name-student
//schema name- studentschema

//exporting the model
module.exports=custommodel