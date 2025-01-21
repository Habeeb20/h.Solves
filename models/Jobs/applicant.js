import { Certificate } from "crypto";
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      
    },
    grade:{
        type:String,
    },
    certificate:{type:String},
    courseStudied:{type:String},
    schoolattended:{type:String},
    experience:{type:String},
    skills:{type:String},
    yearsOfExperience:{type:String}

})

export default mongoose.model("Applicant", applicantSchema)