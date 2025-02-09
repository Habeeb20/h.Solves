import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSearch, FiFilter } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBell,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";
import { MdHome, MdEvent, MdReport, MdPerson } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

const CandidateDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobCount, setJobCount] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [myJobs, setMyJobs] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("overview");

  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [myAppointment, setMyAppointment] = useState([]);
  const [activePage, setActivePage] = useState("overview");
  const [myCandidate, setMyCandidate] = useState([]);
  const [formData, setFormData] = useState({
    companyName: "",
    companyAbout: "",
    jobTitle: "",
    jobType: "",
    location: "",
    salary: "",
    requirements: "",
    duties: "",
    vacancies: "",
    experience: "",
  });

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
  //edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_1}/editdashboard/${userId}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("profile successfully updated");
      setSuccessMessage("Profile updated successfully!");
      setShowPopup(false);
    } catch (err) {
      toast.error(err?.data?.message);
      console.log(err);
      setError(err?.data?.message);
    }
  };

  //changing file in cloudinary

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

  const handleShowpopupClose = () => {
    setShowPopup(false);
  };

  //post job form button

  const handlePostJobSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_2}/postjob`,
        { ...formData, employerId },
        config
      );
      console.log("Employer ID being sent:", employerId);

      setLoading(false);
      toast.success(response.data.message || "Job posted successfully!");

      setFormData({
        companyName: "",
        companyAbout: "",
        jobTitle: "",
        jobType: "",
        location: "",
        salary: "",
        requirements: "",
        duties: "",
        vacancies: "",
        experience: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong!");
      setError(error.response?.data?.message || "something went wrong");
    }
  };

  //get jobs posted by employer

  useEffect(() => {
    const fetchJobsByEmployer = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          toast.error("Authentication token is missing");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_2}/getJobByemployer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched jobs:", response.data);
        setMyJobs(response.data);
        toast.success("Check your posted jobs");
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch jobs");
      }
    };

    fetchJobsByEmployer();
  }, []);

  //get candidates that  apply for a job

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/getcandidatesthatapply`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMyCandidate(response.data);
        console.log("my candidates", response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, []);

  const { id } = useParams();
  const [viewCandidate, setViewCandidate] = useState([]);
  const [jobId, setJobId] = useState('')
  const [jobseekerId, setJobseekerId] = useState('')
  const [error, setError] = useState("");
  const [message, setMessage] = useState('')
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    if (!id) {
      setError("candidate Id not found");
    }

    const getCandidateDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_3}/jobcandidates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setViewCandidate(response.data);
        setJobId( response.data.jobId._id)
        setJobseekerId(response.data.jobseekerId._id)
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    };
    getCandidateDetails();
  }, []);


  const handleOpenChat = () => setShowChat(true);
  const handleCloseChat = () => {
    setShowChat(false);
    setMessage("");
  };


  const handleMessageInput = (e) => {
    setMessage(e.target.value)
  }
  ///post a message

  const postMessage =async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_API_4}/messagefromEmployer/${jobseekerId}`, {jobId, message}, {
        headers:{Authorization: `Bearer ${token}`}
      })
      setSuccessMessage("successfully sent")
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "an error occured")
    }
  }

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return (
          <div>
            {" "}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 p-6"
            ></motion.div>
            <section className="p-4 md:p-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {viewCandidate.jobseekerId?.fname}{" "}
                        {viewCandidate.jobseekerId?.lname}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {viewCandidate.jobseekerId?.phone}
                      </p>
                      <p className="text-sm text-purple-600">
                        {viewCandidate.jobseekerId?.email}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                    Candidates
                  </button>
                </div>

                {/* Details Section */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Left Column */}
                  {/* Candidate Profile Section */}
                  <div className="col-span-1 sm:col-span-2">
                    <h4 className="text-center text-lg font-semibold">
                      About the Candidate
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          full Name
                        </h4>
                        <p className="text-sm text-blue-500">
                          {" "}
                          {viewCandidate.jobseekerId?.fname}{" "}
                          {viewCandidate.jobseekerId?.lname}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Grade
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.grade}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Certificate
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.certificate}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Course Studied
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.courseStudied}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Work Experience
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.experience}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Other Skills
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.skills}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">
                          Years of Experience
                        </h4>
                        <p className="text-sm text-blue-500">
                          {viewCandidate.profile?.yearsOfExperience}
                        </p>
                      </div>
                    </div>
                  </div>
                  <section className="p-4 sm:p-6">
                    <div className="bg-white shadow-lg rounded-xl p-6">
                      <h3 className="text-center text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                        About the Job Applied For
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Company Name
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500 font-medium">
                            {viewCandidate?.jobId?.companyName}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            About the Company
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.companyAbout}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Job Title
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.jobTitle}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Job Type
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.jobType}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Job Requirements
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.requirements}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Salary
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.salary}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">
                            Location
                          </h4>
                          <p className="text-sm sm:text-base text-blue-500">
                            {viewCandidate.jobId?.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Additional Details */}
                </div>

                {/* Chat Button */}
                <div className="flex justify-center mt-6">
                  {/* <Link to={`/more/${viewCandidate._id}`}> */}
                    <button
                    onClick={handleOpenChat} 
                    className="bg-blue-500 text-white font-semibold rounded-lg px-6 py-2 hover:bg-blue-700 transition">
                      Chat the job seeker
                    </button>
                  {/* </Link> */}

                  {showChat && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 shadow-lg">

          {successMessage && <p className="text-green-700 text center">{successMessage}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
            <h3 className="text-lg font-semibold text-center mb-4">
              Chat with {viewCandidate.jobseekerId?.fname}{" "}
              {viewCandidate.jobseekerId?.lname}
            </h3>

            <textarea
              className="w-full h-28 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={postMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
              <button
                onClick={handleCloseChat}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
                </div>
              </div>
            </section>
          </div>
        );
      case "post jobs":
        return <></>;
      case "Candidates-Applied":
        return <></>;
      case "My posted Jobs":
        return <></>;
      case "settings":
        return <></>;
      default:
        return (
      
          <></>
        );
    }
  };

  return (
    <div>
      <div className="flex flex-col  text-black md:flex-row min-h-screen bg-gray-100">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{
            x: isSidebarOpen ? 0 : "-100%",
            mdX: 0, // Ensure the sidebar remains visible on md screens
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed md:relative top-0 left-0 height-full bg-green-100 p-4 border-r z-50 md:w-1/4 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
          } md:translate-x-0`}
        >
          <div className="text-center my-4 text-black">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="mx-auto text-gray-400 rounded-full h-20 w-20"
            />
            <h1 className="text-xl font-bold">
              {userData.fname} {userData.lname}
            </h1>
            <span className="text-sm text-green-600">New Client</span>
          </div>
          <ul className="mt-6 space-y-4 text-black">
            <li
              className={`flex items-center space-x-4 p-2 ${
                activePage === "overview" ? "text-green-600" : "text-gray-700"
              } cursor-pointer`}
              onClick={() => setActivePage("overview")}
            >
              <FaChartBar />
              <span>Overview</span>
            </li>
            <li
              className={`flex items-center space-x-4 p-2 ${
                activePage === "overview" ? "text-green-600" : "text-gray-700"
              } cursor-pointer`}
              onClick={() => setActivePage("overview")}
            >
              <FaChartBar />
              <Link to="/employer">
                <span>Go to dashboard</span>
              </Link>
            </li>
            <li
              className={`text-blue-400 font-medium ${
                activePage === "Available jobs"
                  ? "text-green-600"
                  : "text-blue-400 font-medium"
              } cursor-pointer`}
              onClick={() => setActivePage("Available jobs")}
            >
              {/* Available jobs */}
            </li>
            {/* <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "post jobs" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("post jobs")}
          >
            <FaClipboardList />
            <span>post jobs</span>
          </li> */}
            {/* <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "Candidates=Applied" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("Candidates-Applied")}
          >
            <FaUserCircle />
            <span>Candidates-Applied</span>
          </li> */}
            {/* <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "My posted Jobs" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("My posted Jobs")}
          >
            <FaBell />
            <span>My posted Jobs</span>
          </li> */}
            {/* <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "settings" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("settings")}
          >
            <FaBell />
            <span>Settings</span>
          </li> */}
          </ul>
          {/* Close Sidebar Button (Mobile Only) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden absolute top-4 right-4 text-gray-600"
          >
            <FaTimes size={24} />
          </button>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            {/* Hamburger Menu */}
            <button onClick={toggleSidebar} className="md:hidden text-gray-600">
              <FaBars size={24} />
            </button>
            <h1 className="text-2xl font-bold">Employer Profile</h1>
            <div className="flex items-center space-x-4">
              <FaBell className="text-gray-600" size={20} />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-green-100 shadow rounded-lg p-4 text-center"
            >
              <h2 className="text-xl font-bold">{myJobs.length}</h2>
              <p className="text-gray-600 ">Jobs Posted</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-yellow-100 shadow rounded-lg p-4 text-center"
            >
              <h2 className="text-xl font-bold">2</h2>
              <p className="text-gray-600">Completed</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-red-100 shadow rounded-lg p-4 text-center"
            >
              <h2 className="text-xl font-bold text-red-500">5</h2>
              <p className="text-gray-600">Cancelled</p>
            </motion.div>
          </div>

          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default CandidateDetails;
