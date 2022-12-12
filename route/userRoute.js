const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel=require("../model/User.model")

const usersRouter=express.Router()

usersRouter.post("/signup",async(req,res)=>{
  
    const {name,email,password}=req.body

    const userPresent=await UserModel.findOne({email})
    if(userPresent?.email){
        res.send("user exists")
    }else{
        try{
            bcrypt.hash(password,4,async function(err,hash){
                const user=new UserModel({name,email,password:hash})
                await user.save()
                res.send("Sign up successfull")
            })

        } catch(err){
            console.log(err)
            res.send("Something went wrong")
       }
        
    }
})

usersRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await UserModel.find({email})
         
      if(user.length > 0){
        const hashedPassword = user[0].password;
        bcrypt.compare(password, hashedPassword, function(err, result) {
            if(result){
                const token = jwt.sign({"userID":user[0]._id}, process.env.JWT_SECRET);
                res.send({"msg":"Login successfull","token" : token})
            }
            else{
                res.send("Login failed")
            }
      })} 
      else{
        res.send("Login failed")
      }
    }
    catch{
        res.send("Something went wrong")
    }
})



module.exports=usersRouter