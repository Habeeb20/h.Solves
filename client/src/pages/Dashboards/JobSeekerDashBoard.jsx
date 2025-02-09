import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const JobSeekerDashBoard = () => {
  const navigate = useNavigate();
  const [myJobs, setMyJobs] = useState([]);

  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successMessageFrom, setSuccessMessageFrom] = useState("");
  const [userId, setUserId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [searchInput, setSearchInput] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showCvModal, setShowCvModal] = useState(false)
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cvModal, setCvModal] = useState(false);
  const [mycvData, setmycvData] = useState([])
  const [myAppliedJob, setMyAppliedJob] = useState([])
  const [editMyCVDataId, setEditMyCVDataId] = useState("")
  const [myMessages, setMyMessages] = useState([])
  const [otherMessages, setOtherMessages] = useState([])
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });

  const [cvData, SetCvData] = useState({
    grade: "",
    certificate: "",
    courseStudied: "",
    schoolAttended: "",
    experience: "",
    skills: "",
    yearsOfExperience: "",
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem("notificationsEnabled")) ?? true
  );
  //fetching data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_1}/dashboard`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setUserData(data);
        setUserId(data._id);
        console.log(data._id);
        toast.success("you are successfully logged in");
      } catch (error) {
        navigate("/login");
        console.log(error);
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_2}/getAll`
        );
        toast.success("all jobs successfully fetched");
        setAllJobs(response.data);
        setFilteredJobs(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("an error occurred");
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);

  //handle search jobs

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchInput(term);

    const filtered = allJobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(term.toLowerCase()) ||
        job.location.toLowerCase().includes(term.toLowerCase()) ||
        job.CompanyName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredJobs(filtered);
  };
  console.log("your jobs", filteredJobs);

  //edit your profile

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      console.log(userId);

      const response = await axios.put(
        `${import.meta.env.VITE_API_1}/editdashboard/${userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowPopup(false);
      toast.success("Successfully updated");
      setSuccessMessage("Profile successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  //add Cv details

  const handleSubmitCvData = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_3}/postcvprofile`,
        cvData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("successfully posted");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message);
    }
  };

  //getCv details

  useEffect(() => {
    const fetchmycvdata = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getcvdetails`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setmycvData(response.data[0]);
     
        console.log("your cv details",response.data)
        setEditMyCVDataId(response.data._id)
    
        toast.success("successfully fetched");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };
    fetchmycvdata();
    
  }, []);

  //edit cv details
  const handleEditCvDetails= async(e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(`${import.meta.env.VITE_API_3}/updatemycv/${editMyCVDataId}`, cvData,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      )
      toast.success('successfully updated')
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  }

  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dc0poqt9l/image/upload",
        formData,
        {
          params: {
            upload_preset: "essential",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        [field]: response.data.secure_url,
      }));
    } catch (err) {
      console.error("Error uploading file to Cloudinary", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

// input for cv edit
  const handleChangeEdit= (e) => {
    const {name, value } = e.target
    SetCvData({...cvData, [name]: value})
  }

  const handleShowPopupClose = () => {
    setShowPopup(false);
  };



  const handleShowCvModalClose = () => {
    setShowCvModal(false);
  };

  const handleShowEditModalClose = () => {
    setCvModal(false)
  }

  // Fetch existing CV data when component mounts or modal opens
useEffect(() => {
  if (mycvData) {
    SetCvData(mycvData);
  }
}, [mycvData]);


//get my applied jobs
useEffect(() => {
  const fetchMyAppliedJob = async() => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_3}/getmyappliedjobs`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setMyAppliedJob(response.data)
      console.log("my jobs", response.data)
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
    }
  }
  fetchMyAppliedJob()
}, [])

  const cvInputChange = (e) => {
    const { name, value } = e.target;
    SetCvData({ ...cvData, [name]: value });
  };

  //notification
  useEffect(() => {
    let interval;

    if (notificationsEnabled) {
      // Show the message immediately on page refresh
      setMessage(
        "Please update your job profile by clicking the green button on your profile page. This serves as your CV for employers."
      );
      setShowModal(true);

      setTimeout(() => setShowModal(false), 5000);

      // Repeat every 30 seconds
      interval = setInterval(() => {
        setMessage(
          "Please update your job profile by clicking the green button on your profile page. This serves as your CV for employers."
        );
        setShowModal(true);

        setTimeout(() => setShowModal(false), 5000);
      }, 30000);
    }

    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      const newState = !prev;
      localStorage.setItem("notificationsEnabled", JSON.stringify(newState));
      return newState;
    });
  };


  //get my messages
  useEffect(() => {
 

    const fetchMymessage = async () => {
     try {
      const token = localStorage.getItem("token")
      const response =await axios.get(`${import.meta.env.VITE_API_4}/getmessagesentbyjobseeker`, {
        headers:{Authorization: `Bearer ${token}`}
      })
      setMyMessages( response.data)
     
      console.log("myposted jobs", response.data)
      setSuccessMessage("your messages are here")
     } catch (error) {
      console.log(error)
      setError(error.response?.data?.message)
     }
    }
    fetchMymessage()

  }, [])


  //get messages being sent to me
   useEffect(() => {
    const getMessagesFromEmployer = async() => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${import.meta.env.VITE_API_4}/getmessagereceivedbyjobseeker`, {
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        setOtherMessages(response.data)
        console.log("other message", response.data)
        setSuccessMessageFrom("messages sent by employers")
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message)
      }
    }
    getMessagesFromEmployer()
   }, [])


  const renderPage = () => {
    switch (activePage) {
      case "Available jobs":
        return (
          <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-6"
            >
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                  <FiSearch className="text-green-600" />
                  <input
                    type="text"
                    placeholder="Search by job title, company, keywords"
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="flex-1 bg-transparent outline-none ml-2"
                  />
                </div>
                <MdOutlineLocationOn className="text-green-600 text-2xl" />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <FiFilter className="mr-2" /> Filters
                </button>
              </div>

              {/* Job List */}
              <h2 className="text-gray-500 mb-2">
                We've found {filteredJobs.length} jobs!
              </h2>

              <div className="space-y-4">
                {filteredJobs && filteredJobs.length > 0 ? (
                  filteredJobs.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
                    >
                      <div>
                        <h3 className="text-green-600 font-bold">
                          {job.companyName || job.jobType}
                        </h3>
                        <p className="text-blue-500 text-sm">{job.jobTitle}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-500 mr-4">{job.location}</p>
                        {job && (
                          <Link to={`/jobdetails/${job._id}`}>
                            <AiOutlineArrowRight className="text-green-600" />
                            <h4>view more</h4>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <h3>No jobs are available</h3>
                )}
              </div>
            </motion.div>
          </div>
        );

      case "Applied jobs":
        return (
          <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-6"
            >
              {/* Filters */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                  <FiSearch className="text-green-600" />
                  <input
                    type="text"
                    placeholder="Search by job title, company, keywords"
                    className="flex-1 bg-transparent outline-none ml-2"
                  />
                </div>
                <MdOutlineLocationOn className="text-green-600 text-2xl" />
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <FiFilter className="mr-2" /> Filters
                </button>
              </div>

              {/* Job List */}
              <h2 className="text-gray-500 mb-2">you have applied for {myAppliedJob.length} jobs!</h2>
              <div className="space-y-4">
  {Array.isArray(myAppliedJob) && myAppliedJob.length > 0 ? (
    myAppliedJob.map((job, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
      >
        <div>
          <h3 className="text-green-600 font-bold">{job.jobTitle}</h3>
          <p className="text-gray-500 text-sm">Company Name- {job.jobId?.companyName}</p>
          <p className="text-gray-500 text-sm">About the Company- {job.jobId?.companyAbout}</p>
          <p className="text-gray-500 text-sm">Job type- {job.jobId?.jobType}</p>
          <p className="text-gray-500 text-sm">Salary- {job.jobId?.salary}</p>
          <p className="text-gray-500 text-sm">years of Experience needed- {job.jobId?.experience} years</p>
          <p className="text-gray-500 text-sm">Location- {job.jobId?.location}</p>
        </div>
        <div className="flex items-center">
          <p className="text-gray-500 mr-4">Date- {new Date(job.dateApplied).toLocaleDateString()}</p>
          <AiOutlineArrowRight className="text-green-600" />
        </div>
      </motion.div>
    ))
  ) : (
    <h1>You haven't applied for a job yet</h1>
  )}
</div>

            </motion.div>
          </div>
               
              
        );
      case "Messenges":
        return (    <><div>
          <div className="space-y-4 space-x-2">
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
{Array.isArray(myMessages) && myMessages.length > 0 ? (
myMessages.map((job, index) => (
<motion.div
key={index}
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
>
<div>

<h3>Message: <span className="text-green-600 font-bold"> {job?.message}</span></h3>

<p className="text-gray-500 text-sm">Name of the Company applied for- {job.jobId?.companyName}</p>
<p className="text-gray-500 text-sm">Job title- {job.jobId?.jobTitle}</p>
<p className="text-gray-500 text-sm">Salary- {job.jobId?.salary}</p>
<p className="text-gray-500 text-sm">Job type- {job.jobId?.jobType}</p>
<p className="text-gray-500 text-sm">Location- {job.jobId?.location}</p>
</div>
<div className="flex items-center">
<p className="text-gray-500 mr-4">Date- {new Date(job.date).toLocaleDateString()}</p>
<AiOutlineArrowRight className="text-green-600" />
</div>
</motion.div>
))
) : (
<h1>You dont have any message yet</h1>
)}
</div>



<div className="ml-20 space-y-4 space-x-2">
          {successMessageFrom && <p className="text-blue-600 text-center">{successMessageFrom }</p>}
{Array.isArray(otherMessages) && otherMessages.length > 0 ? (
otherMessages.map((job, index) => (
<motion.div
key={index}
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.3 }}
className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
>
<div>

<h3>Message: <span className="text-blue-600 font-bold"> {job?.message}</span></h3>

<p className="text-gray-500 text-sm ">Name of the Company applied for- <span className="font-bold">{job.jobId?.companyName}</span></p>
<p className="text-gray-500 text-sm">full Name of the employer- <span className="font-bold">{job.senderId?.fname} {job.senderId?.lname}</span></p>
<p className="text-gray-500 text-sm">Job title- {job.jobId?.jobTitle}</p>
<p className="text-gray-500 text-sm">Salary- {job.jobId?.salary}</p>
<p className="text-gray-500 text-sm">Job type- {job.jobId?.jobType}</p>
<p className="text-gray-500 text-sm">Location- {job.jobId?.location}</p>
</div>
<div className="flex items-center">
<p className="text-gray-500 mr-4">Date- {new Date(job.date).toLocaleDateString()}</p>
<AiOutlineArrowRight className="text-green-600" />
</div>
</motion.div>
))
) : (
<h1>You dont have any message yet</h1>
)}
</div>

</div>
</>);
      case "My CV" :
        return (
          <>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <div className="flex flex-col items-center text-center">
              
                {/* <h2 className="text-2xl text-black font-semibold mt-4">
                  {cvData.grade}
                </h2>
                <p className="text-gray-500">@{cvData.username}</p> */}
              </div>

              <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p className="font-medium">
                  School Attended:{" "}
                  <span className="font-bold"> { mycvData.schoolattended}</span>
                </p>
                <p className="font-medium">
                  Grade graduated with <span className="font-bold">{mycvData.grade}</span>
                </p>
                <p className="font-medium">
                  Certificate:{" "}
                  <span className="font-bold">{mycvData.certificate}</span>
                </p>
                <p className="font-medium">
                  Course studied in school: <span className="font-bold">{mycvData.courseStudied}</span>
                </p>
                <p className="font-medium">
                  work experience: <span className="font-bold">{mycvData.experience}</span>
                </p>
                <p className="font-medium">
                  skills: <span className="font-bold">{mycvData.skills}</span>
                </p>
                <p className="font-medium">
                  years of experience: <span className="font-bold">{mycvData.yearsOfExperience}</span>
                </p>
                <p className="font-medium">
                  Date created:{" "}
                  <span className="font-bold">
                    {new Date(mycvData.createdAt).toLocaleDateString()}
                  </span>
                </p>
              
              </div>

              <button
                onClick={() => setCvModal(true)}
                className="mt-6 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Edit Your Cv
              </button>
            </div>
            <div className="">
              {cvModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                    {error && <div className="text-red-500 mt-5">{error}</div>}
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                      Update Your CV
                    </h2>
                    <form onSubmit={handleEditCvDetails} className="space-y-6">
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Grade</label>
    <input
      type="text"
      name="grade"
      value={cvData.grade || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">School Attended</label>
    <input
      type="text"
      name="schoolattended"
      value={cvData.schoolattended || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Course Studied</label>
    <input
      type="text"
      name="courseStudied"
      value={cvData.courseStudied || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Certificate</label>
    <select
      name="certificate"
      value={cvData.certificate || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">Select your certificate</option>
      <option value="Secondary school certificate examination(SSCE)">SSCE</option>
      <option value="National diploma(ND)">National Diploma (ND)</option>
      <option value="NCE">NCE</option>
      <option value="University Degree(Bsc,B.A,BTech,etc)">University Degree</option>
      <option value="Higher National Diploma(HND)">Higher National Diploma (HND)</option>
      <option value="Masters(Msc)">Masters (MSc)</option>
      <option value="Doctorate(PhD)">Doctorate (PhD)</option>
    </select>
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Work Experience</label>
    <input
      type="text"
      name="experience"
      value={cvData.experience || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Other Skills</label>
    <input
      type="text"
      name="skills"
      value={cvData.skills || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-600 mb-1">Years of Experience</label>
    <input
      type="text"
      name="yearsOfExperience"
      value={cvData.yearsOfExperience || ""}
      onChange={handleChangeEdit}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  <div className="flex -col-start-2 space-x-1">
    <button
      type="button"
      className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
      onClick={handleShowEditModalClose}
    >
      Cancel
    </button>

    <button
      type="submit"
      className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
    >
      Update Cv
    </button>
  </div>
</form>

                  </div>
                </div>
              )}
              {error && <div className="text-red-500 mt-5">{error}</div>}
              {successMessage && (
                <div className="text-green-500 mt-5">{successMessage}</div>
              )}
            
            </div>
          </>
        )
      case "Your profile":
        return (
          <>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
            <button
  onClick={() => setShowCvModal(true)}
  className="bg-green-400 text-black rounded-full p-2"
>
  Update Your Cv
</button>

{showCvModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
      {error && <div className="text-red-500 mt-5">{error}</div>}
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Add Your Cv Data
      </h2>
      <form onSubmit={handleSubmitCvData} className="space-y-6">
        {/* Grade Input */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Grade</label>
          <input
            type="text"
            name="grade"
            value={cvData.grade}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Certificate Select */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Certificate</label>
          <select
            name="certificate"
            value={cvData.certificate}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select your certificate</option>
            <option value="Secondary school certificate examination(SSCE)">
              Secondary school certificate examination (SSCE)
            </option>
            <option value="National diploma(ND)">National diploma (ND)</option>
            <option value="NCE">NCE</option>
            <option value="University Degree(Bsc,B.A,BTech,etc)">
              University Degree (BSc, B.A, BTech, etc.)
            </option>
            <option value="Higher National Diploma(HND)">Higher National Diploma (HND)</option>
            <option value="Masters(Msc)">Masters (MSc)</option>
            <option value="Doctorate(PhD)">Doctorate (PhD)</option>
          </select>
        </div>

        {/* Course Studied Input */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Course Studied</label>
          <input
            type="text"
            name="courseStudied"
            value={cvData.courseStudied}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* School Attended Input */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">School Attended</label>
          <input
            type="text"
            name="schoolattended"
            value={cvData.schoolattended}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Work Experience */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Work Experience</label>
          <textarea
            name="experience"
            value={cvData.experience}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Other Skills */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Other Skills</label>
          <textarea
            name="skills"
            value={cvData.skills}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            value={cvData.yearsOfExperience}
            onChange={cvInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <button
            type="button"
            className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => setShowCvModal(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Update Your Details
          </button>
        </div>
      </form>
    </div>
  </div>
)}

              <div className="flex flex-col items-center text-center">
                <img
                  src={userData.profilePicture}
                  alt="User"
                  className="rounded-full w-32 h-32 object-cover border-4 border-green-400 shadow-md"
                />
                <h2 className="text-2xl font-semibold mt-4">
                  {userData.fname} {userData.lname}
                </h2>
                <p className="text-gray-500">@{userData.username}</p>
              </div>

              <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p className="font-medium">
                  First Name:{" "}
                  <span className="font-bold">{userData.fname}</span>
                </p>
                <p className="font-medium">
                  Last Name: <span className="font-bold">{userData.lname}</span>
                </p>
                <p className="font-medium">
                  Username:{" "}
                  <span className="font-bold">{userData.username}</span>
                </p>
                <p className="font-medium">
                  Email: <span className="font-bold">{userData.email}</span>
                </p>
                <p className="font-medium">
                  Phone: <span className="font-bold">{userData.phone}</span>
                </p>
                <p className="font-medium">
                  Gender: <span className="font-bold">{userData.gender}</span>
                </p>
                <p className="font-medium">
                  Role: <span className="font-bold">{userData.role}</span>
                </p>
                <p className="font-medium">
                  Joined:{" "}
                  <span className="font-bold">
                    {new Date(userData.registrationDate).toLocaleDateString()}
                  </span>
                </p>
                <p className="font-medium">
                  Unique Number:{" "}
                  <span className="font-bold">{userData.uniqueNumber}</span>
                </p>
              </div>

              <button
                onClick={() => setShowPopup(true)}
                className="mt-6 w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Edit Profile
              </button>
            </div>
            <div className="">
              {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
                    {error && <div className="text-red-500 mt-5">{error}</div>}
                    <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                      Update Your Profile
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {Object.keys(userData).map(
                        (key) => key !== "profilePicture"
                      )}

                      {/* New input fields */}
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          name="fname"
                          value={userData.fname}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lname"
                          value={userData.lname}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          phone number(preferably whatsapp number)
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          profile Picture
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(e, "profilePicture")
                          }
                          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
                        />
                      </div>

                      <div className="flex -col-start-2 space-x-1">
                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                          onClick={handleShowPopupClose}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {error && <div className="text-red-500 mt-5">{error}</div>}
              {successMessage && (
                <div className="text-green-500 mt-5">{successMessage}</div>
              )}
            </div>
          </>
        );
      default:
        return (
          <>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
                  <p className="text-gray-800 text-lg font-semibold">
                    {message}
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Toggle Notifications Button */}
            <button
              onClick={toggleNotifications}
              className={`mt-6 px-6 py-3 h-10 text-white font-semibold rounded-lg transition ${
                notificationsEnabled
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {notificationsEnabled
                ? "Stop Notifications"
                : "Start Notifications"}
            </button>

            <h5>You welcome</h5>
          </>
        );
    }
  };
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/4 bg-white shadow-lg p-6"
      >
        <h1 className="text-green-600 text-xl font-bold mb-6">
          {userData.username}'s Dashboard
        </h1>
        <ul className="space-y-4">
          <li
            className={`text-blue-600 font-medium${
              activePage === "Your profile" ? "text-green-600" : "text-blue-700"
            } cursor-pointer`}
            onClick={() => setActivePage("Your profile")}
          >
            Your profile
          </li>
          <li
            className={`text-blue-400 font-medium ${
              activePage === "Available jobs"
                ? "text-green-600"
                : "text-blue-400 font-medium"
            } cursor-pointer`}
            onClick={() => setActivePage("Available jobs")}
          >
            Available jobs
          </li>
          <li
            className={`text-orange-500 font-medium ${
              activePage === "Applied jobs"
                ? "text-green-600"
                : "text-orange-500"
            } cursor-pointer`}
            onClick={() => setActivePage("Applied jobs")}
          >
            Appiled jobs
          </li>
          <li
            className={`text-green-500 font-medium ${
              activePage === "Messenges" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("Messenges")}
          >
            Messenges
          </li>
          <li
            className={`text-green-500 font-medium ${
              activePage === "My CV" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("My CV")}
          >
            My CV
          </li>
        </ul>
        {/* <div className="mt-8 bg-blue-100 p-4 rounded-lg">
          <h2 className="text-blue-600 font-bold">Get Upgrade</h2>
          <p className="text-yellow-900 text-sm">
            Step to the next level with more features
          </p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Learn more
          </button>
        </div> */}
      </motion.div>
      {renderPage()}

      {/* Main Content */}
    </div>
  );
};

export default JobSeekerDashBoard;
