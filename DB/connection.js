//import mongoose
const mongoose=require('mongoose')
//set connection string from env
const connectionString = process.env.DATABASE
//
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB connection established");
})
.catch((error)=>{
    console.log("MongoDB connection error");
})