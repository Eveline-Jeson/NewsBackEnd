//importing express
var express = require("express");
//initialization
var app =  express();
//db connection
require("./db");
//get the model file
var users=require("./models/User"); 
var innovation=require("./models/Innovation");
//midleware
app.use(express.json());
//install cors
var cors=require("cors");
app.use(cors());

//port assigning
var port=3000;


var complaints =  require("./model/complaint");
var notes =  require("./model/note");
var profiles =  require("./model/profile");
var custom=require("./model/custom");

//api to add data to database
app.post('/addcustom',async(req,res)=>{
    try {
        await custom(req.body).save();
        res.send("Data added")  
    } catch (error) {
        
    }
})


//api to get custom news from db
app.get('/viewcustom',async(req,res)=>{
    try {
        var data = await custom.find();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//api to delete a custom news from db
app.delete('/cdel/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        await custom.findByIdAndDelete(req.params.id);
        res.send("deleted")
    } catch (error) {
        res.send(error);
    }
})

//api to update a custom news
app.put('/cupdate/:id',async(req,res)=>{
    try {
        await custom.findByIdAndUpdate(req.params.id,req.body);
        res.send("data updated")
    } catch (error) {
        res.send(error);
    }
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


//api to get data
//req- request res- response 
//app.get('/',(req,res)=>{})
app.get("/signup",(req,res)=>{
    res.send("Hello")
    
    });
//api to add data to db
 app.post('/signup', async (req, res) => {
    const { Name, Email, Password } = req.body;

    try {
        const existingUser = await users.findOne({ Email: Email });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new users({
            Name,
            Email,
            Password,
            Count: 0,
        });

        await newUser.save();
        res.send("User Registered Successfully");
    } catch (error) {
        console.error("Error while registering user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ Email: email }); 

        if (user) {
            if (user.Password === password) {
                user.Count = (user.Count || 0) + 1;

                await user.save(); 

                res.json("Success");
            } else {
                res.json("Password Incorrect");
            }
        } else {
            res.json("User Not Exist");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json("Internal Server Error");
    }
});

app.post('/addtomarket',async (req, res) =>{
    try {
        const newInnovation = new innovation(req.body); 
        await newInnovation.save();
        res.send("Data Added");
    } catch (error) {}
});


//api to get users from db
app.get('/viewuser',async(req,res)=>{
    try {
        var data = await users.find();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//api to delete a user from db
app.delete('/udel/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        await users.findByIdAndDelete(req.params.id);
        res.send("deleted")
    } catch (error) {
        res.send(error);
    }
})

// server in listening state
app.listen(port,()=>{
    console.log(`Sever is up and running in ${port}`);
    });
