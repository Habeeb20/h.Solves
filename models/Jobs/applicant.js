import { Certificate } from "crypto";
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      
    },
    grade:{
        type:String,
        required: true
    },
    certificate:{type:String, required: true},
    courseStudied:{type:String, required: true},
    schoolattended:{type:String, required: true},
    experience:{type:String, required: true},
    skills:{type:String, required: true},
    yearsOfExperience:{type:String, required: true},
    createdAt:{ type: Date, default: Date.now },

})

export default mongoose.model("Applicant", applicantSchema)