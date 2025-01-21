import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUserCircle, FaBell, FaChartBar, FaClipboardList } from "react-icons/fa";

const Test = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{
          x: isSidebarOpen ? 0 : "-100%",
          mdX: 0, // Ensure the sidebar is visible on larger screens
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed md:relative top-0 left-0 h-full bg-white p-4 border-r z-50 md:w-1/4 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
        } md:translate-x-0`}
      >
        <div className="text-center my-4">
          <FaUserCircle size={80} className="mx-auto text-gray-400" />
          <h1 className="text-xl font-bold">Harriet Nunez</h1>
          <span className="text-sm text-green-600">New Client</span>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
            Add New Appointment
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          <li className="flex items-center space-x-4 p-2 text-green-600">
            <FaChartBar />
            <span>Overview</span>
          </li>
          <li className="flex items-center space-x-4 p-2 text-gray-700">
            <FaClipboardList />
            <span>Calendar</span>
          </li>
          <li className="flex items-center space-x-4 p-2 text-gray-700">
            <FaUserCircle />
            <span>Clients</span>
          </li>
          <li className="flex items-center space-x-4 p-2 text-gray-700">
            <FaBell />
            <span>Staff</span>
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
          <h1 className="text-2xl font-bold">Client Profile</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
            <FaBell className="text-gray-600" size={20} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold">5</h2>
            <p className="text-gray-600">All Bookings</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold">2</h2>
            <p className="text-gray-600">Completed</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <h2 className="text-xl font-bold text-red-500">5</h2>
            <p className="text-gray-600">Cancelled</p>
          </motion.div>
        </div>

        {/* Appointments Section */}
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
        </div>
      </main>
    </div>
  );
};

export default Test;
