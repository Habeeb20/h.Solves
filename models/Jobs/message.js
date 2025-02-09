import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    employerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobseekerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    applicantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, 
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", }, 
    message: {
        type:String,
        required: true
    },
    date: {
        type:Date,
        default: Date.now()
    }
}, {timestamps: true})


export default mongoose.model("Message1", messageSchema)