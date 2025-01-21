import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaRedoAlt } from "react-icons/fa";

const ForgotPassword = () => {
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
            <FaRedoAlt size={50} />
          </div>
          <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
          <p className="text-gray-500">
            Enter your email to receive password reset instructions
          </p>
        </div>

        <form className="mt-6 space-y-4">
          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full pl-10 py-3 border rounded-lg focus:ring focus:ring-green-200 outline-none"
            />
          </div>

          {/* Reset Password Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-green-700"
          >
            Send Reset Instructions
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-4 text-sm">
          <p>
            Remember your password?{" "}
            <a href="/login" className="text-green-600 font-semibold">
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
