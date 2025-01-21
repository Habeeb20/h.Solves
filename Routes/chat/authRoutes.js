import express from "express";
import upload from "../../upload.js";
import User from "../../models/chat/userSchema.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
const authRoute = express.Router()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})


authRoute.post("/signup", upload, async(req, res, next) => {
    try {
        const {fullname, username, email, password, gender, confirmPassword} =  req.body;
        const missingFields = [];
        

    if (!fullname) missingFields.push("fullname");
    if (!username) missingFields.push("username");
    if (!email) missingFields.push("email");
    if (!gender) missingFields.push("gender");
    if (!password) missingFields.push("password");
    if (!confirmPassword) missingFields.push("confirmPassword");
 
        

    if(missingFields.length > 0) {
        console.log("missing fields detected:", missingFields)
        return res.status(400).json({message:"all fields are required"})
    }

    const existingEmail =  await User.findOne({email})
    if(existingEmail){
        console.log("email exist")
        return res.status(400).json({message: "email already exists, please login to your account or signup with a different email"})
    }

    if(password !== confirmPassword) {
        return res.status(400).json({message: "your password is not the same with the confirm password"})
    }
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
 
    const newUser = new User({
      fullname,
      username,
      email,
      gender,
      password: hashedPassword,
   
    });

      
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    await  newUser.save()

    res.cookie("access_token", token, {httpOnnly: true}).status(201).json({
        _id: newUser._id,
        fullname:newUser.fullname,
        username: newUser.username,
        gender:newUser.gender,
        email: newUser.email,
       
    })
    } catch (error) {
        next(error);
        console.log(error)
    }
} )
authRoute.post("/login", async (req, res, next) => {
    try {
        const {email, password}  = req.body

        const validUser = await User.findOne({ email })

        if (!validUser) {
            return res.status(404).json({message: "your email is not registered with any account or with the account type you chose"})
          }

          const validPassword = bcryptjs.compareSync(password, validUser.password)
  
          if (!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"))
          }
      
          const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
          
          res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            _id: validUser._id,
            username: validUser.username,
            email: validUser.email,
            profilePic: validUser.profilePic,
          })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "an error occured"})
    }
})
authRoute.get("/logout", async (req, res) => {
    try {
        res.clearCookie("access_token")

        res.status(200).json({
            message: "user has been logged out successfully"
        })
    } catch (error) {
        res.status(500).json({message: "an error occured "})
    }
})

export default authRoute