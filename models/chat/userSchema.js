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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    confirmPassword: {
        type: String,
     
      },
    	gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
      },
  
 
  },
  { timestamps: true }
)

const User1 = mongoose.model("User1", userSchema)

export default User1
