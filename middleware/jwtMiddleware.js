const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next)=>{
 console.log("inside jwt middleware");   

 const token = req.headers['authorization'].slice(7)
 console.log(token);

 try{
const tokenVerification=jwt.verify(token,"superkey2024")
console.log(tokenVerification);
req.payload=tokenVerification.userId

 }
 catch(err){
    res.status(401).json("Authorization failed...please login again...")
 }
 next()
}
module.exports=jwtMiddleware