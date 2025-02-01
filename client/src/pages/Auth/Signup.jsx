import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";
import { useState } from "react";
const Signup = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone:"",
    username: "",
    password: "",
    role: "",
    confirmPassword: "",
    gender: "",
    profilePicture: ""
  });
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
      const response = await axios.post(
        `${import.meta.env.VITE_API_1}/register`,
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data) {
        localStorage.setItem("userRole", role);
        navigate("/login");
        toast.success("Successfully registered");
      }
    } catch (err) {
      console.error("Axios Error:", err);

      const errorMessage =
        err.response?.data?.message || "A network error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
      if (err.code === "ERR_NETWORK") {
        console.error("Network Error:", err);
      } else if (err.response) {
        console.log("Response Data:", err.response.data);
        console.log("Response Status:", err.response.status);
      } else if (err.request) {
        console.log("Request:", err.request);
      } else {
        console.log("Error", err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      {/* Main Card */}
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-center">
          {/* Robot Icon */}
          <div className="flex justify-center mb-4 text-green-600">
            <FaRobot size={50} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Sign Up to A_Solves</h1>
          <p className="text-gray-500">Please create an account to continue</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email Field */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="relative">
            <select
              name="role"
              onChange={handleInputChange}
              className="w-full py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none text-gray-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="">select role</option>
              <option value="jobseeker">Jobseeker</option>
              <option value="employer">Employer</option>
              <option value="service-provider">Service Provider</option>
              <option value="one-time-seller">One Time Seller</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your first name..."
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="fname"
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your last name..."
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="lname"
              onChange={handleInputChange}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter your preferred username..."
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="phone number"
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange}
                  className="form-radio text-green-600"
                />
                <span className="text-gray-500">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange}
                  className="form-radio text-green-600"
                />
                <span className="text-gray-500">Female</span>
              </label>
            </div>
          </div>
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="file"
                name="profilePicture"
                onChange={handleFileChange}
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
       
            />
          </div>
          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password..."
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="password"
              onChange={handleInputChange}
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="confirm your password..."
              className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="text-sm text-red-500 flex items-center">
            <span className="mr-2">Weak!</span>
            <span className="text-yellow-500">
              💪 Please add more strength!
            </span>
          </div>

          {/* Create Account Button */}
          <motion.button
          
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-green-700"
            whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                    Creating an account
                  </span>
                ) : (
                  'Create an account'
                )}
          </motion.button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-semibold">
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
