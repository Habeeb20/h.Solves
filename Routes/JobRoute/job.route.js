import mongoose from "mongoose";
import Job from "../../models/Jobs/job.model.js";
import User from "../../models/Users.js";
import express from "express";
import { verifyToken } from "../../middleware/authMiddleware.js";
import { roleBasedAccess } from "../../middleware/authMiddleware.js";

const jobRouters = express.Router()




jobRouters.post("/postjob", verifyToken, async (req, res) => {
    const {
        companyName,
        companyAbout,
        jobTitle,
        jobType,
        location,
        salary,
        requirements,
        duties,
        vacancies,
        experience,
    } = req.body;

 
  
    try {
       const employer = await User.findById(req.user.id);
       if(!employer || (employer.role !== "employer")){
        console.log("Employer not found in database");
        return res.status(404).json({ message: "Employer not found" });
       }
       
      

        console.log("Employer validation successful:", employer);

        // Create new job
        const newJob = new Job({
            employerId:new mongoose.Types.ObjectId(req.user.id), 
            companyName,
            companyAbout,
            jobTitle,
            jobType,
            location,
            salary,
            requirements,
            duties,
            vacancies,
            experience,
        });
        const savedJob = await newJob.save();
        res.status(201).json({ message: "Job posted successfully!", job: savedJob });
    } catch (error) {
        console.error("Error in posting job:", error.message);
        res.status(500).json({ error: error.message });
    }
});
    

jobRouters.get("/getJobByemployer", verifyToken, async(req, res) => {
    try {
        const employerId = req.user.id;

        if(!mongoose.Types.ObjectId.isValid(employerId)){
            return res.status(400).json({message: 'invalid employer id'})
        }

        console.log("employer id ", employerId)

        const employerExist = await User.findById(new mongoose.Types.ObjectId(employerId))
        if(!employerExist){
            return res.status(404).json({message: "employer account doesnt exist"})
        }


        const job = await Job.find({employerId:new mongoose.Types.ObjectId(employerId)}).populate("jobTitle jobType salary requirements experience location createdAt")

        console.log("job found", job)
        res.status(200).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "an error occurred"})
    }
})


jobRouters.get("/employer/:employerId", async(req, res) => {
    try {
        const { employerId } = req.params;

        const employer = await User.findById(employerId);
        if (!employer || employer.role !== "employer") {
            return res.status(404).json({ message: "Employer not found or invalid role." });
        }

        const jobs = await Job.find({ employerId });
        res.status(200).json(jobs);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
})

jobRouters.get("/getAll", async(req, res) => {
    try {
        const jobs = await Job.find({})
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message:"an error occured"})
    }
})

jobRouters.get("/:jobId", async(req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findById(jobId).populate("employerId", "fname lname email");
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


jobRouters.get("/count/:employerId", verifyToken, async (req, res) => {
    const { employerId } = req.params;

    try {
       
        if (!mongoose.Types.ObjectId.isValid(employerId)) {
            return res.status(400).json({ message: "Invalid Employer ID format" });
        }

   
        const jobCount = await Job.countDocuments({ employerId });

    
        res.status(200).json({ jobCount });
    } catch (error) {
        console.error("Error counting jobs:", error);
        res.status(500).json({ message: error.message });
    }
});


export default jobRouters