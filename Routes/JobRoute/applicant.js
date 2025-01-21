import express from "express";
import User from "../../models/Users.js";
import Applicant from "../../models/Jobs/applicant.js";
import { protect, roleBasedAccess, verifyToken } from "../../middleware/authMiddleware.js";
import Job from "../../models/Jobs/job.model.js";
const applicantRouter = express.Router()

applicantRouter.post("/updateProfile", protect, roleBasedAccess(["jobseeker"]), async(req, res) => {
    try {
        const jobseekerId = req.params.jobseekerId || req.body.jobseekerId
        const {  grade, certificate, courseStudied, schoolattended, experience, skills, yearsOfExperience } = req.body

        const jobseeker = await User.findById(jobseekerId);
        if (!jobseeker || jobseeker.role !== "jobseeker") {
            return res.status(404).json({ error: "Job seeker not found or invalid role." });
        }

        const updatedProfile = await Applicant.findOneAndUpdate(
            { jobseekerId },
            { grade, certificate, courseStudied, schoolattended, experience, skills, yearsOfExperience },
            { new: true, upsert: true }
        );


        res.status(200).json({ message: "Profile updated successfully!", profile: updatedProfile })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})


applicantRouter.post("/appliforjob", verifyToken, roleBasedAccess(["jobseeker"]), async(req, res) => {
    try {
        const {email, jobId} = req.body

         
           const jobseeker = await User.findOne({ email });
           if (!jobseeker || jobseeker.role !== "jobseeker") {
               return res.status(404).json({ message: "Job seeker not found or invalid role." });
           }


           const job = await Job.findById(jobId);
           if (!job) {
               return res.status(404).json({ error: "Job not found." });
           }

           const applicantProfile = await Applicant.findOne({ jobseekerId: jobseeker._id });
           if (!applicantProfile) {
               return res.status(404).json({ message: "Applicant profile not found. Please update your profile first." });
           }

           const applicationDetails = {
            jobTitle: job.jobTitle,
            employerId: job.employerId,
            jobseekerId: jobseeker._id,
            profile: applicantProfile,
        };

        res.status(200).json({
            message: "Job application submitted successfully!",
            application: applicationDetails,
        });

   
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})


applicantRouter.get("/application/:jobId", verifyToken,roleBasedAccess(["employer"]), async(req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate("employerId", "name email");
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        const applications = await Applicant.find({
            jobseekerId: { $in: [{fname}, {lname}, {grade}] },
        });
        res.status(200).json({
            jobDetails: job,
            applications,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})

export default applicantRouter