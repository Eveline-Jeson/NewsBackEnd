var mongoose = require('mongoose');
 mongoose.connect("mongodb+srv://evelinejeson:eveline@quickbytes.mxaj677.mongodb.net/QuickBytesDB")
            .then(()=>{
            console.log("Db connected")
            })
            .catch(()=>{
            console.log(err)
            });