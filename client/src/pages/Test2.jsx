import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";

const Test2 = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/4 bg-white shadow-lg p-6"
      >
        <h1 className="text-green-600 text-xl font-bold mb-6">wwwork</h1>
        <ul className="space-y-4">
          <li className="text-green-600 font-medium">Dashboard</li>
          <li className="text-green-600 font-medium">Job Board</li>
          <li className="text-gray-500">Schedule</li>
          <li className="text-gray-500">Messenger</li>
        </ul>
        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h2 className="text-green-600 font-bold">Get Upgrade</h2>
          <p className="text-gray-500 text-sm">Step to the next level with more features</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
            Learn more
          </button>
        </div>
        <p className="mt-8 text-gray-500 cursor-pointer">Logout</p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Quick Search (ctrl + D)"
            className="w-full lg:w-1/2 bg-gray-200 px-4 py-2 rounded-lg"
          />
          <span className="text-green-600">Anne Douglas</span>
        </div>

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
          {["UX Designer", "Product Designer", "UX/UI Designer", "Motion Designer"].map(
            (job, index) => (
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
                  <p className="text-gray-500 text-sm">Company Name - Location</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 mr-4">8.2 - 13.5k PLN</p>
                  <AiOutlineArrowRight className="text-green-600" />
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Test2;
