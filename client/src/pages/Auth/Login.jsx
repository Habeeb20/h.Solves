import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaRobot } from "react-icons/fa";
import useLogin from "../../hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
const Login = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername:"",
    password:"",
    role:"",
  })
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)


const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
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
    
  

      const response = await axios.post(`${import.meta.env.VITE_API_1}/login`, payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
        
      )
      const { token } = response.data;
      localStorage.setItem('token', token);
      toast.success('Successfully logged in');
      if (role === "admin") {
        navigate("/admindashboard");
      } else if (role === "jobseeker") {
        navigate("/jobseekerdashboard");
      } else if (role === "service-provider") {
        navigate("/service-provider");
       } else if (role === "employer") {
          navigate("/employer");
        } else if (role === "one-time-seller") {
          navigate("/onetimeseller");
        } else if (role === "seller") {
          navigate("/seller");
        } else if (role === "buyer") {
          navigate("/buyer");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
          console.error("Login error:", error);
          toast.error(error.response?.data?.message || "Something went wrong");
          setError(error.response?.data?.message)
    } finally{
      setLoading(false);
    }
	};

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
            <FaRobot size={50} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-gray-500">Log in to your account as </p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form  onSubmit={handleSubmit} className="mt-6 space-y-4">
        
        <div>
          <div className="relative">
            <select
              name="role"
              onChange={handleInputChange}
              className="w-full py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none text-gray-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="">select a role</option>
              <option value="jobseeker">Jobseeker</option>
              <option value="employer">Employer</option>
              <option value="service-provider">Service Provider</option>
              <option value="one-time-seller">One Time Seller</option>
              <option value="seller">Seller</option>
            </select>
          </div>
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

          <div className="text-right text-sm">
            <a href="/forgotpassword" className="text-green-600 font-semibold">
              Forgot Password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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

        <div className="text-center mt-4 text-sm">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
