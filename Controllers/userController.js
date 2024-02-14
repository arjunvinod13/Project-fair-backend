const users = require('../Models/userSchema')

//import jwt token
const jwt = require('jsonwebtoken')

//register logic
exports.register=async(req,res)=>{
    console.log("inside register function");

    const {username,email,password}=req.body
   try{
     //if check the email already in mongoDB->user already registered
     const existingUser=await users.findOne({email})
     if(existingUser){
         res.status(401).json("User already registered")
     }
     //////
 
     //if the email already not present in db
     else{
         const newUser=await users({
             username,email,password,github:"",link:"",profile:""
         })
         await newUser.save()//save the new user data to db
         res.status(200).json("user registration succesful")
     }
   }
   catch(err){
    res.status(500).json("server error:"+err.message)
   }
   

    

}

//login logic
exports.login=async(req,res)=>{
const {email,password}=req.body
try{
    const user=await users.findOne({email,password})
    if(user){
        //token generation
        const token =jwt.sign({userId:user._id},"superkey2024")
        console.log(token);

        res.status(200).json({user,token})
        
    }
    else{
        res.status(404).json("invalid login")
    }
}
catch(err){
    res.status(500).json("server error:" +err.message)
}

}