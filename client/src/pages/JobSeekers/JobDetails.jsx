import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
const JobDetails = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [userData, setUserData] = useState({});
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [activePage, setActivePage] = useState("overview");
  const [searchInput, setSearchInput] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
 const {id} = useParams()
 const [viewJobs, setViewJobs] = useState([])
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


  useEffect(() => {
    if(!id){
        setError("job id not found")
    }

    const getJobDetails = async() => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${import.meta.env.VITE_API_2}/${id}`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        setViewJobs(response.data)
        console.log(response.data)
        toast.success("successfull")
      } catch (error) {
       console.log(error)
       toast.error("an error occured") 
      }
    }
    getJobDetails()
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
              <h2 className="text-gray-500 mb-2">We've found 523 jobs!</h2>
              <div className="space-y-4">
                {[
                  "UX Designer",
                  "Product Designer",
                  "UX/UI Designer",
                  "Motion Designer",
                ].map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-green-600 font-bold">{job}</h3>
                      <p className="text-gray-500 text-sm">
                        Company Name - Location
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-gray-500 mr-4">8.2 - 13.5k PLN</p>
                      <AiOutlineArrowRight className="text-green-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case "Messenger":
        return <div>message</div>;
      case "Your profile":
        return <div>profile content</div>;
      default:
        return (
          <div className="pb-20 bg-gray-100 min-h-screen w-full">
              <motion.div
                 initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       transition={{ duration: 0.5 }}
       className="flex-1 p-6"
     >

              </motion.div>
              <section className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
               
                <div>
                  <h3 className="text-lg font-semibold">{viewJobs.companyName}</h3>
                  <p className="text-sm text-gray-600">{viewJobs.employerId?.name}</p>
                  <p className="text-sm text-purple-600">
                   {viewJobs.email}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-300 text-black rounded-lg hover:bg-green-400">
               Job Details
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <ul className="flex gap-4 text-sm border-b pb-2">
              

              </ul>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Company Name</h4>
                  <p className="text-sm text-gray-900">{viewJobs.companyName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">About the Company</h4>
                  <p className="text-sm text-gray-900">{viewJobs.companyAbout}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
job Title
                  </h4>
                  <p className="text-sm text-gray-900"> {viewJobs.jobTitle}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Job type</h4>
                  <p className="text-sm text-gray-900">{viewJobs.jobType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Job Requirements</h4>
                  <p className="text-sm text-gray-900">{viewJobs.requirements}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Salary</h4>
                  <p className="text-sm text-gray-900">{viewJobs.salary}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Location</h4>
                  <p className="text-sm text-gray-900">{viewJobs.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">years Experience needed</h4>
                  <p className="text-sm text-gray-900">{viewJobs.experience} years</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Number of vacancies</h4>
                  <p className="text-sm text-gray-900">{viewJobs.vacancies} </p>
                </div>
                {/* Add other details here */}
              </div>
            </div>
          </div>
        </section>
          </div>
       
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
            {/* Available jobs */}
          </li>
          <li
            className={`text-orange-500 font-medium ${
              activePage === "Applied jobs"
                ? "text-green-600"
                : "text-orange-500"
            } cursor-pointer`}
            onClick={() => setActivePage("Applied jobs")}
          >
            {/* Appiled jobs */}
          </li>
          <li
            className={`text-green-500 font-medium ${
              activePage === "Messenger" ? "text-green-600" : "text-gray-700"
            } cursor-pointer`}
            onClick={() => setActivePage("Messenger")}
          >
            {/* Messenger */}
          </li>
        </ul>
        <div className="mt-8 bg-blue-100 p-4 rounded-lg">
         <Link to="/jobseekerdashboard">
         <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
          your dashboard
          </button>

         </Link>
         
        </div>
      </motion.div>
      {renderPage()}

      {/* Main Content */}
    </div>
  );
};

export default JobDetails;
