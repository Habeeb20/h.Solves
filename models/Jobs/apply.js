import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    jobTitle: String,
    employerId: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
    },
    email: String,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Applicant"
    }, 
    dateApplied: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Application', applicationSchema);


