import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
   
    },
    lname:{
      type:String, 
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone:{
      type:String
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
        type: String,
     
      },
      profilePicture: {
        type:String,
      },
    	gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
      },

      role:{
        type:String,
        required:true,
        enum:["jobseeker", "employer", "service privider", "seller", "one-time seller"]
      },
      isVerified: {type: Boolean,default: false},
      status: { type: String, enum: ['active', 'blocked', 'pending'], default: 'pending' },
      createdAt: { type: Date, default: Date.now },
      registrationDate: { type: Date, default: Date.now },
      uniqueNumber: { type: String, unique: true },
      resetPasswordToken: String,
      resetPasswordExpiresAt: Date,
      verificationToken: String,
      verificationTokenExpiresAt: Date,
 
  },
  { timestamps: true }
)

const User1 = mongoose.model("User", userSchema)

export default User1
