var mongoose=require('mongoose')

var reposchema=mongoose.Schema({
    title:String,
    description:String,
    location:String,
    datetime:String,
    name:String,
    email:String,
    num:Number,
    isRead: { type: Boolean, default: false }
});

var repomodel=mongoose.model("repo",reposchema)
//collection name-student
//schema name- studentschema

//exporting the model
module.exports=repomodel