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