import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaUser, FaCalendarAlt, FaHeartbeat, FaBars, FaTimes, FaUserCircle, FaBell, FaChartBar, FaClipboardList } from "react-icons/fa";
import { MdHome, MdEvent, MdReport, MdPerson } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
  );
  
const EmployerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobCount, setJobCount] = useState([])
  const [employerId, setEmployerId] = useState('')
  const [myJobs, setMyJobs] = useState([])
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedSection, setSelectedSection] = useState("overview");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [myAppointment, setMyAppointment] = useState([]);
    const [activePage, setActivePage] = useState("overview"); 
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
    
  const navigate= useNavigate()

  
 
    
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
        const fetchProfile = async() => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No token found");
        
                const { data } = await axios.get(
                  `${import.meta.env.VITE_API_1}/dashboard`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );

                setUserData(data)
                setUserId(data._id)
                console.log(data._id)
                toast.success("you are successfully logged in");
            } catch (error) {
                navigate("/login")
                console.log(error);
                toast.error("Failed to fetch user data");
            }finally {
                setLoading(false);
              }
        }
        fetchProfile()
    }, [])
//edit submit
    const handleEditSubmit = async(e) => {
      e.preventDefault()
      setError('')
      setSuccessMessage("")
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
    }

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
          {...formData, employerId},
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
        setError(error.response?.data?.message || "something went wrong")
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
    
          const response = await axios.get(`${import.meta.env.VITE_API_2}/getJobByemployer`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
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
    

    //count job posted
  

const fetchJobCount = async () => {
 
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_2}/count/${employerId}`
        );
        console.log("Job count:", response.data.jobCount);
        setJobCount(response.data.jobCount)
    } catch (error) {
        console.error("Error fetching job count:", error);
    }
};



  
//shwoside render 

    const renderPage = () => {
      switch (activePage) {
        case "overview":
          return <div>Overview Content</div>;
        case "post jobs":
          return <div>
            <form onSubmit={handlePostJobSubmit}>
            {error &&  <p className="text-red-500">{error}</p>}
        <div style={{ marginBottom: "10px" }}>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>About the Company:</label>
          <textarea
            name="companyAbout"
            value={formData.companyAbout}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Job Type:</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Salary:</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
           className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Requirements:</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            required
          className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Duties:</label>
          <textarea
            name="duties"
            value={formData.duties}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          ></textarea>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Number of Vacancies:</label>
          <input
            type="number"
            name="vacancies"
            value={formData.vacancies}
            onChange={handleInputChange}
            required
         className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Experience (in years):</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
        className="w-full p-2 mt-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <button type="submit" disabled={loading}    className={`w-full py-2 px-4 rounded ${
            loading
              ? "bg-green-800 text-green-100"
              : "bg-green-400 text-white hover:bg-green-600"
          }`}>
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
          </div>;
        case "Candidates-Applied":
          return <div>  
          <div className="bg-white shadow rounded-lg">
          <div className="flex justify-between border-b p-4">
            <h2 className="text-lg font-bold">Appointments</h2>
            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Time (5)</option>
              <option>Past</option>
              <option>Upcoming</option>
            </select>
          </div>
          <ul>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between p-4 border-b"
            >
              <span>29 Sep</span>
              <span>Plumbing</span>
              <span className="text-red-500">Cancelled</span>
              <span>$50</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-between p-4 border-b"
            >
              <span>15 Oct</span>
              <span>Carpentry</span>
              <span className="text-blue-500">Booked</span>
              <span>$345</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between p-4 border-b"
            >
              <span>11 Nov</span>
              <span>Painting</span>
              <span className="text-green-600">Done</span>
              <span>$130</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-between p-4"
            >
              <span>13 Apr</span>
              <span>Hair Drying</span>
              <span className="text-green-600">Done</span>
              <span>$50</span>
            </motion.li>
          </ul>
        </div></div>;
        case "My posted Jobs":
          return <div>
          <h4>My posted jobs</h4>
          {myJobs.length > 0 ? (
            <ul>
            {myJobs.map((job) => (
              <>
              <motion.li
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between p-4 border-b"
            >
          
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
              <span>{job.jobTitle}</span>
              <span className="text-green-600">{job.salary} </span>
              <span>View More</span>
            </motion.li>
        
         
              </>
          
            ))}
           
          </ul>
          ): (
            <h2>You havnt posted any job</h2>
          )}
          </div>;
        case "settings":
            return <div>
              <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
  <div className="text-center">
    <img
      src={userData.profilePicture || "default-placeholder-image.jpg"}
      alt="User"
      className="rounded-full w-24 h-24 object-cover mx-auto border-2 border-indigo-600"
    />
    <h1 className="text-2xl font-semibold mt-4 text-gray-800">
      {userData.name}
    </h1>
    <p className="text-sm text-gray-600">Username: {userData.username}</p>
    <p className="text-sm text-gray-600">Account type: {userData.role}</p>
  </div>

  <div className="mt-6 space-y-4">
  <h4>
      <span className="font-medium text-gray-700">Your Full Name:</span>{" "}
      <span className="text-gray-900 font-semibold">{userData.fname} {userData.lname}</span>
    </h4>
    <h4>
      <span className="font-medium text-gray-700">Your Email:</span>{" "}
      <span className="text-gray-900 font-semibold">{userData.email}</span>
    </h4>

    <h4>
      <span className="font-medium text-gray-700">Your Phone Number:</span>{" "}
      <span className="text-gray-900 font-semibold">{userData.phone}</span>
    </h4>
   

    <h4>
      <span className="font-medium text-gray-700">Address:</span>{" "}
      <span className="text-gray-900 font-semibold">{userData.location}</span>
    </h4>
   
  </div>

  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Update Your Profile
        </h2>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={userData.fname}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lname"
              value={userData.lname}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="location"
              value={userData.location}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "profilePicture")}
              className="text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleShowpopupClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  <button
    onClick={() => setShowPopup(true)}
    className="mt-6 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 w-full"
  >
    Edit Profile
  </button>

  {error && <div className="text-red-500 mt-4">{error}</div>}
  {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
</div>

            </div>;
        default:
          return <div>Select a page</div>;
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
              activePage === "post jobs" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("post jobs")}
          >
            <FaClipboardList />
            <span>post jobs</span>
          </li>
          <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "Candidates=Applied" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("Candidates-Applied")}
          >
            <FaUserCircle />
            <span>Candidates-Applied</span>
          </li>
          <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "My posted Jobs" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("My posted Jobs")}
          >
            <FaBell />
            <span>My posted Jobs</span>
          </li>
          <li
            className={`flex items-center space-x-4 p-2 ${
              activePage === "settings" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("settings")}
          >
            <FaBell />
            <span>Settings</span>
          </li>
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
          <button
            onClick={toggleSidebar}
            className="md:hidden text-gray-600"
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold">Employer Profile</h1>
          <div className="flex items-center space-x-4">
            {/* <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2"
            /> */}
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
  )
}

export default EmployerDashboard
