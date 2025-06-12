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
        const newInnovation = new innovation(req.body); // ✅ Use 'new' keyword
        await newInnovation.save();
        res.send("Data Added");
    } catch (error) {}
});

// server in listening state
app.listen(port,()=>{
    console.log(`Sever is up and running in ${port}`);
    });