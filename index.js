//loads .env into process.env
require('dotenv').config()

//import express
const express=require('express');

//import corse

const cors=require('cors')

//import connection string
const db = require('./DB/connection')

//import router
const router=require("./Router/route")

const appMiddleware=require('./middleware/appMiddleware')

const jwtMiddleware=require('./middleware/jwtMiddleware')

//create an application using express
const pfServer=express()

//use
pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('/uploads'))




//port creation
const PORT=4000||process.env.PORT


//server listen
pfServer.listen(PORT,()=>{
    console.log('listening on port'+PORT);
})

//http-get resolving to url
pfServer.get("/",(req,res)=>{
    res.send(`<h1>project fair is started.....</h1>`)
})