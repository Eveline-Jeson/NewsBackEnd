const http = require("http");
const { Server } = require("socket.io");

//importing express
var express = require("express");
//initialization
var app =  express();
const server = http.createServer(app);
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
var reviews =  require("./model/review");
var profiles =  require("./model/profile");
var custom=require("./model/custom");
var repo = require("./model/repo");

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

                res.json({ status: "Success", Name: user.Name });
            } else {
                 res.json({ status: "Password Incorrect" });
            }
        } else {
            res.json({ status: "User Not Exist" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ status: "Internal Server Error" });
    }
});

app.post('/addtomarket',async (req, res) =>{
    try {
        const newInnovation = new innovation(req.body); 
        await newInnovation.save();
        res.send("Data Added");
    } catch (error) {}
});


app.get('/innovations',async (req, res) =>{
    try{
        const marketdata = await innovation.find();
        res.send(marketdata);
    }catch (error) {
        console.error(error);
        res.status(500).send("Error fetching innovation data");
    }})

    

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


//api to fetch user compaints
app.get('/admin/usercomp', async (req, res) => {
       try{
            var data= await complaints.find();
            res.send(data);

       }
       catch(error){
          res.send(error)
       }
});



// Get total users count
app.get('/count', async (req, res) => {
  try {
    const count = await users.countDocuments();
    res.send({ count });
  } catch (err) {
       res.send(error)
  }
});



/*
app.get('/monthly-growth', async (req, res) => {
  try {
    const result = await users.aggregate([
      // ... your existing aggregation pipeline
    ]);
    
    // Ensure we always return an array
    res.send(Array.isArray(result) ? result : []);
  } catch (err) {
    console.error('Error fetching monthly users:', err);
    res.send(error) // Return empty array on error
  }
});
 */



// Get monthly growth data based on Doj (Date of Joining)
app.get('/monthly-growth', async (req, res) => {
  try {
    const result = await users.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$Doj" },
            month: { $month: "$Doj" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInString: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                               "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              },
              in: {
                $concat: [
                  { $arrayElemAt: ["$$monthsInString", "$_id.month"] },
                  " ",
                  { $toString: "$_id.year" }
                ]
              }
            }
          },
          count: 1,
          _id: 0
        }
      }
    ]);
    res.send(Array.isArray(result) ? result : []);
  } catch (err) {
    console.error('Error fetching monthly growth:', err);
     res.send(error) 
  }
});



// Example route for newusers
app.get('/recent-users', async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentUsers = await users.find({
      createdAt: { $gte: twoDaysAgo }
    }).sort({ createdAt: -1 }); // Sort by newest first

    res.json(recentUsers);
  } catch (err) {
    res.send({ message: 'Server error' });
  }

});

//socket connection, sending-message ,disconnect 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New user connected: " + socket.id);

  socket.on("sendMessage", (data) => {
    console.log("Message received:", data);
    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

//api to add report to database
app.post('/addreport',async(req,res)=>{
    try {
        await repo(req.body).save();
        res.send("Data added")  
    } catch (error) {
        
    }
})


//api to get report from db
app.get('/viewreport',async(req,res)=>{
    try {
        var data = await repo.find();
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})

//api to delete a custom news from db
app.delete('/rdel/:id',async(req,res)=>{
    console.log(req.params.id)
    try {
        await repo.findByIdAndDelete(req.params.id);
        res.send("deleted")
    } catch (error) {
        res.send(error);
    }
})

app.put('/markasread/:id', async (req, res) => {
    try {
        await repo.findByIdAndUpdate(req.params.id, { isRead: true });
        res.send("Marked as read");
    } catch (error) {
        res.send(error);
    }
});

// server in listening state
server.listen(port,()=>{
    console.log(`Sever is up and running in ${port}`);
    });

app.get('/notes/:name', async (req, res) => {
  try {
    const userNotes = await notes.find({ name: req.params.name }).sort({ date: -1 });
    res.json(userNotes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching notes");
  }
});

// Fetch profile based on email
app.get("/profile/:email", async (req, res) => {
  try {
    const userProfile = await profiles.findOne({ email: req.params.email });
    if (!userProfile) {
      return res.status(404).send("Profile not found");
    }
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

