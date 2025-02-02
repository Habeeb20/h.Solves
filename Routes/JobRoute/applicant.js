import express from "express";
import User from "../../models/Users.js";
import Applicant from "../../models/Jobs/applicant.js";
import { protect, roleBasedAccess, verifyToken } from "../../middleware/authMiddleware.js";
import Job from "../../models/Jobs/job.model.js";
import jwt from "jsonwebtoken"
import Application from "../../models/Jobs/apply.js"
const applicantRouter = express.Router()


applicantRouter.post("/postcvprofile", protect, roleBasedAccess(["jobseeker"]), async(req, res) => {
    try {
        const {  grade, certificate, courseStudied, schoolattended, experience, skills, yearsOfExperience } = req.body
        const jobseeker = await User.find({jobseekerId: req.user.id});
        if (!jobseeker ) {
            return res.status(404).json({ error: "Job seeker not found or invalid role." });
        }
        const applicant = new Applicant({
            grade,
            certificate,
            courseStudied,
            schoolattended,
            schoolattended,
            experience,
            skills,
            yearsOfExperience,
            jobseekerId: req.user.id
        })

        await applicant.save()
        return res.status(200).json(applicant)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "an error occured"})
    }
})

applicantRouter.put("/updatemycv/:id", protect, roleBasedAccess(["jobseeker"]), async (req, res) => {
    try {
        const { grade, certificate, courseStudied, schoolattended, experience, skills, yearsOfExperience } = req.body;

      
        const jobseeker = await User.findById(req.user.id);
        if (!jobseeker || jobseeker.role !== "jobseeker") {
            return res.status(404).json({ error: "Job seeker not found or invalid role." });
        }


        const updatedProfile = await Applicant.findOneAndUpdate(
            { jobseekerId: req.user.id }, 
            { grade, certificate, courseStudied, schoolattended, experience, skills, yearsOfExperience },
            { new: true, upsert: true } 
        );

        res.status(200).json({ message: "Profile updated successfully!", profile: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

applicantRouter.get("/getcvdetails", protect,roleBasedAccess(["jobseeker"]), async(req, res) => {
    try {
        const myapplicantdetails = await Applicant.find({jobseekerId: req.user.id})
        return res.status(200).json(myapplicantdetails)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "an error occurred"})
    }
} )





applicantRouter.post("/applyforjob", verifyToken, async (req, res) => {
    try {
        const { jobId } = req.body;

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const jobseekerId = decoded.id; 

        
        const jobseeker = await User.findById(jobseekerId);
        if (!jobseeker) {
            return res.status(404).json({ message: "Job seeker not found." });
        }

        const email = jobseeker.email; 

     
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        
        const applicantProfile = await Applicant.findOne({ jobseekerId });
        if (!applicantProfile) {
            return res.status(404).json({ message: "Applicant profile not found. Please update your profile first." });
        }

        const applicationDetails = {
            jobTitle: job.jobTitle,
            employerId: job.employerId,
            jobId: job._id,
            jobseekerId,
            email, 
            profile: applicantProfile,
        };

     
        const newApplication = new Application(applicationDetails);
        await newApplication.save();

        res.status(200).json({
            message: "Job application submitted successfully!",
            application: applicationDetails,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

//for jobseekers
applicantRouter.get("/getmyappliedjobs", verifyToken, async (req, res) => {
    try {
        const appliedJob = await Application.find({ jobseekerId: req.user.id })
            .populate({
                path: "jobId", 
                select: "companyName companyAbout jobTitle jobType  salary requirements duties vacancies experience location",
            })
            .populate({
                path: "employerId", // Fetch employer details
                select: "fname lname ",
            })
            .populate({
                path: "profile", // Fetch profile details
                select: "grade certificate courseStudied schoolattended",
            });

        if (!appliedJob || appliedJob.length === 0) {
            return res.status(404).json({ message: "No job found for this account" });
        }

   
        return res.status(200).json(appliedJob);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});




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