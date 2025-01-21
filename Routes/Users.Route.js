import User from "../models/Users.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import express from "express";
import { protect, verifyToken } from "../middleware/authMiddleware.js";
import cloudinary from "cloudinary"
import nodemailer from "nodemailer"
import upload from "../upload.js"
import crypto from 'crypto'
const userRouter = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


const transporter = nodemailer.createTransport(({
    service:'gmail',
    auth: {
        user:"pknseuxqxzkoqdjg",
        pass:"babatundeademola112@gmail.com"
      },
}));



const sendOTPEmail = async(email, otp) => {
    const mailOptions = {
        from:process.env.EMAIL_USER,
        to:email,
        subject: 'Verify your email',
        text: `Your verification code is: ${otp}`,

    };
    
  await transporter.sendMail(mailOptions);
}


userRouter.post("/register", upload, async(req, res, next) => {
    try {
        const {fname, lname, username, email, password, confirmPassword, gender,role} = req.body
        const missingFields = [];

        if (!fname) missingFields.push("fname");
        if (!lname) missingFields.push("lname")
        if (!username) missingFields.push("username");
        if (!email) missingFields.push("email");
        if (!role) missingFields.push("role");
        if (!gender) missingFields.push("gender");
        if (!password) missingFields.push("password");
        if (!confirmPassword) missingFields.push("confirmPassword");

        if(missingFields.length > 0) {
            console.log("missing fields required", missingFields)
            return res.status(400).json({message:"all fields are required"})
        }

        const existingUsername = await User.findOne({username})
        if(existingUsername){
            return res.status(400).json({message:"username is taken, please choose another username"})
        }

        const existingEmail =  await User.findOne({email})
        if(existingEmail){
            console.log("email exist")
            return res.status(400).json({message: "email already exists, please login to your account or signup with a different email"})
        }

        if(password.length < 8){
            return res.status(400).json({message:"your password should not be less than 8 characters"})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: "your password is not the same with the confirm password"})
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // OTP generation
        const uniqueNumber = `RL-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
       
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const profilePicture = result.secure_url;
    
        const user = new User({
            email, fname, lname, username, gender, role, password: hashedPassword, profilePicture, uniqueNumber,
            verificationToken,
            verificationTokenExpiresAt,
        })
    
        await user.save();
    
  
        res.status(201).json({
        
            user: { ...user._doc, password: undefined },
          });
    
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"an error occured with the server"})
    }
})



userRouter.post("/login", async(req, res) => {
    const {role, password, username, email, } = req.body;
  console.log(req.body)
    try {

        if (!role || !password || (!email && !username)) {
        
            return res.status(400).json({  message: 'role, email/username and password are required' });
          }
      const user = await User.findOne({$or:[{email }, {username}]});
      if (!user || !(await bcryptjs.compare(password, user.password))) {
        console.log('Invalid credentials')
        return res.status(400).json({  message: 'Invalid credentials' });
      }
      if (user.role !== role) {
        return res.status(403).json({ message: `you sign up as ${user.role}. Please log in as a ${user.role}.` });
      }

      
  
      
      user.lastLogin = new Date();
      await user.save();
  
   
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    
  
  
  
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user,
        token
        
      });
      console.log('user details',user, token)
    } catch (error) {
      console.error('Error in login: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
})



userRouter.post("/redirectlogin", async(req, res) => {
    const { email, password, username } = req.body;
    console.log(req.body)
    try {

        if ( !password || (!email && !username)) {
            return res.status(400).json({ success: false, message: 'email/Username and password are required' });
          }
      const user = await User.findOne({$or:[{email }, {username}]});
      if (!user || !(await bcryptjs.compare(password, user.password))) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      
  
      
      user.lastLogin = new Date();
      await user.save();
  
   
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    
  
  
  
      res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user,
        token
        
      });
      console.log('user details',user, token)
    } catch (error) {
      console.error('Error in login: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
})



userRouter.post("/verify-email", async (req, res) => {
    const { code } = req.body;
  
    try {
      const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: 'Email verified successfully',
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      console.error('Error in verifyEmail: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
})

userRouter.get("/dashboard", verifyToken, async(req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(user);

})


userRouter.put("/editdashboard/:id", protect, async(req, res) => {
  const {id} = req.params

  const dashboard = await User.findById(id)
  if(!dashboard){
    res.status(404).json({message: "this is not found"})
  }

  if(dashboard._id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("not authorized to update this dashboard")
  }
  const updates = { ...req.body };

  const uploadFile = async (file) => {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "schools",
    });
    return result.secure_url;
  };
    
  if (req.files) {
    if (req.files.profilePicture) {
      updates.picture1 = await uploadFile(req.files.profilePicture);
    }
  }
  const updatedUsers = await User.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!updatedUsers) {
    res.status(500);
    throw new Error("Failed to update dashboard.");
  }
  res.status(200).json({
    message: "updated successfully.",
    updatedUsers,
  });
})



export default  userRouter