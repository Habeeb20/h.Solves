import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const RedirectLogin = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { emailOrUsername, password, role } = formData;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
  
     
      const payload = {
        [isEmail ? 'email' : 'username']: emailOrUsername,
        password,
        role,
      };
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_1}/redirectlogin`,
        {payload, role: selectedRole},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Successfully logged in');
      if (selectedRole === "jobseeker") navigate("/dashboardJobseeker");
      else if (selectedRole === "employer") navigate("/dashboardEmployer");
      else if (selectedRole === "service-provider") navigate("/dashboardServiceProvider");
      else if (selectedRole === "one-time-seller") navigate("/dashboardOneTimeSeller");
      else if (selectedRole === "seller") navigate("/dashboardSeller");
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'A network error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-center">
          <div className="flex justify-center mb-4 text-green-600">
            <FaUserCircle size={50} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Login As</h1>
          <p className="text-gray-500">Select your role to proceed</p>
        </div>

        <form onSubmit={handleSubmit}
          
          className="mt-6 space-y-4"
        >
        {error &&<p className="text-red-500">{error}</p>}
          {/* Dropdown Selection */}
          <div className="relative">
            <select
             
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none text-gray-500"
            >
              <option value="" disabled>
                Select your role
              </option>
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
							type='text'
							placeholder='Enter username or email'
							className='w-full input input-bordered h-10 pl-10'
							name="emailOrUsername"
							onChange={handleInputChange}
              disabled={loading}
						/>
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password..."
           
							className='w-full input input-bordered h-10 pl-10'
							
              name="password"
							onChange={handleInputChange}
              disabled={loading}
						/>
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-green-700"
          >
            {loading ? (
                  <span className="flex items-center justify-center">
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-2" />
                    Logging In
                  </span>
                ) : (
                  'Log In'
                )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RedirectLogin;
