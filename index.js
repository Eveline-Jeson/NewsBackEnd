//importing express
var express = require("express");
//initialization
var app =  express();
//db connection
require("./db");
//midleware
app.use(express.json());
//install cors
var cors=require("cors");
app.use(cors());
//port assigning
var port=3000;
//port assigning
var port=3000;
var complaints =  require("./model/complaint");
var notes =  require("./model/note");
var reviews =  require("./model/review");
var profiles =  require("./model/profile");
//api to get data
//req- request res- response 
//app.get('/',(req,res)=>{})
app.get("/",(req,res)=>{
    res.send("Hello")
    });
// server in listening state
app.listen(port,()=>{
    console.log(`Sever is up and running in ${port}`);
    });

    // to add data to database
app.post('/complaints',async(req,res) => {
    try {
        await complaints(req.body).save();
        res.send("Data added")
    } catch (error) {
        console.log(error)
    }
})

app.post('/notes',async(req,res) => {
    try {
        await notes(req.body).save();
        res.send("Data added")
    } catch (error) {
        console.log(error)
    }
})

app.post('/reviews',async(req,res) => {
    try {
        await reviews(req.body).save();
        res.send("Data added")
    } catch (error) {
        console.log(error)
    }
})

app.post('/profiles',async(req,res) => {
    try {
        await profiles(req.body).save();
        res.send("Data added")
    } catch (error) {
        console.log(error)
    }
})



app.put("/:id", async (req, res) => {
  try {
    const updatedProfile = await profiles.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).send("Profile not found");
    }

    res.send("Profile data updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Profile data");
  }
});

app.get("/reviews",async (req,res)=>{
    try {
        var data =await reviews.find();
        res.send(data);

    } catch (error) {
      res.send(error)  
    }
});
// app.get("/profile", async (req, res) => {
//   try {
//     const profile = await profiles.findOne(); 
//     if (profile) {
//       res.json(profile);
//     } else {
//       res.status(404).send("No profile found");
//     }
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });
