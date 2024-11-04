import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { connect } from "mongoose";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Route for user login 
const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;
        // console.log(email, password)
    
        if([email, password].some((field) => field?.trim() === "")){
            return res.json({success:false, message:"email and password are required"})
        }
    
        const user = await userModel.findOne({email});
        console.log(user)
    
        if(!user){
            res.json({success:false, message:"User doesn't exists"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.json({success:false, message:"Invalid password"})
        }
        
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true, token})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}


// Route for user register 
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(
            [name, email, password].some((field) => field?.trim() === "")
        ){
            return res.json({err:"All fields are required"})
        }
        console.log(name, email, password);
        console.log(req.body);
        
        const exist = await userModel.findOne({email});
        // console.log(exist)
        
        if(exist){
            return res.json({success:false, message:"user is already exist"})
        } 

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email id"})
        }

        if(password.length <8){
           return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save();
        console.log(user)

        const token = createToken(user._id)

        return res.json({success:true, token});
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// Route for admin login
const adminLogin = async (req, res) => {

    try {

        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL &&  password === process.env.ADMIN_PASSWORD){
            const token = createToken(email+password)
            res.json({success:true, token})
        }
        else {
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        
        console.log(error.message)
        res.json({success:false, message:error.message})
    }

}


// Route for admin register
const registerAdmin = async (req, res) => {

}


export {loginUser, registerUser, adminLogin}