import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body
    if(!username || !email || !password)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userCheck=await User.findOne({email})
    if(userCheck)
    {
        res.status(400)
        throw new Error("User already registered")
    }
    
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user)
    {
        res.status(201).json({_id:user.id, email:user.email})
    }
    else{
        res.status(400)
        throw new Error("User data not valid")
    }
})

export const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const user=await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password))
    {
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        }, process.env.SECRET_KEY, {expiresIn:"20m"})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("Email OR Password not valid")
    }
})

// private route: needs to be protected
export const currentUser=asyncHandler(async (req,res)=>{
    console.log("Hello")
    res.json(req.user)
})