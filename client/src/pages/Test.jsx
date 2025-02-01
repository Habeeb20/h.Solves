// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaBars, FaTimes, FaUserCircle, FaBell, FaChartBar, FaClipboardList } from "react-icons/fa";

// const Test = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: "-100%" }}
//         animate={{
//           x: isSidebarOpen ? 0 : "-100%",
//           mdX: 0, // Ensure the sidebar is visible on larger screens
//         }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         className={`fixed md:relative top-0 left-0 h-full bg-white p-4 border-r z-50 md:w-1/4 ${
//           isSidebarOpen ? "translate-x-0" : "translate-x-[-100%]"
//         } md:translate-x-0`}
//       >
//         <div className="text-center my-4">
//           <FaUserCircle size={80} className="mx-auto text-gray-400" />
//           <h1 className="text-xl font-bold">Harriet Nunez</h1>
//           <span className="text-sm text-green-600">New Client</span>
//           <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg">
//             Add New Appointment
//           </button>
//         </div>
//         <ul className="mt-6 space-y-4">
//           <li className="flex items-center space-x-4 p-2 text-green-600">
//             <FaChartBar />
//             <span>Overview</span>
//           </li>
//           <li className="flex items-center space-x-4 p-2 text-gray-700">
//             <FaClipboardList />
//             <span>Calendar</span>
//           </li>
//           <li className="flex items-center space-x-4 p-2 text-gray-700">
//             <FaUserCircle />
//             <span>Clients</span>
//           </li>
//           <li className="flex items-center space-x-4 p-2 text-gray-700">
//             <FaBell />
//             <span>Staff</span>
//           </li>
//         </ul>
//         {/* Close Sidebar Button (Mobile Only) */}
//         <button
//           onClick={toggleSidebar}
//           className="md:hidden absolute top-4 right-4 text-gray-600"
//         >
//           <FaTimes size={24} />
//         </button>
//       </motion.aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           {/* Hamburger Menu */}
//           <button
//             onClick={toggleSidebar}
//             className="md:hidden text-gray-600"
//           >
//             <FaBars size={24} />
//           </button>
//           <h1 className="text-2xl font-bold">Client Profile</h1>
//           <div className="flex items-center space-x-4">
//             <input
//               type="text"
//               placeholder="Search"
//               className="border border-gray-300 rounded-lg px-4 py-2"
//             />
//             <FaBell className="text-gray-600" size={20} />
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white shadow rounded-lg p-4 text-center"
//           >
//             <h2 className="text-xl font-bold">5</h2>
//             <p className="text-gray-600">All Bookings</p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="bg-white shadow rounded-lg p-4 text-center"
//           >
//             <h2 className="text-xl font-bold">2</h2>
//             <p className="text-gray-600">Completed</p>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="bg-white shadow rounded-lg p-4 text-center"
//           >
//             <h2 className="text-xl font-bold text-red-500">5</h2>
//             <p className="text-gray-600">Cancelled</p>
//           </motion.div>
//         </div>

//         {/* Appointments Section */}
//         <div className="bg-white shadow rounded-lg">
//           <div className="flex justify-between border-b p-4">
//             <h2 className="text-lg font-bold">Appointments</h2>
//             <select className="border border-gray-300 rounded-lg px-4 py-2">
//               <option>All Time (5)</option>
//               <option>Past</option>
//               <option>Upcoming</option>
//             </select>
//           </div>
//           <ul>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3 }}
//               className="flex justify-between p-4 border-b"
//             >
//               <span>29 Sep</span>
//               <span>Plumbing</span>
//               <span className="text-red-500">Cancelled</span>
//               <span>$50</span>
//             </motion.li>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.4 }}
//               className="flex justify-between p-4 border-b"
//             >
//               <span>15 Oct</span>
//               <span>Carpentry</span>
//               <span className="text-blue-500">Booked</span>
//               <span>$345</span>
//             </motion.li>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="flex justify-between p-4 border-b"
//             >
//               <span>11 Nov</span>
//               <span>Painting</span>
//               <span className="text-green-600">Done</span>
//               <span>$130</span>
//             </motion.li>
//             <motion.li
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex justify-between p-4"
//             >
//               <span>13 Apr</span>
//               <span>Hair Drying</span>
//               <span className="text-green-600">Done</span>
//               <span>$50</span>
//             </motion.li>
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Test;




import React from "react";

const Test = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-gray-100 w-64 p-4 hidden md:block opacity-50">
        <div className="text-purple-600 font-bold text-2xl mb-6">HRMS</div>
        <nav>
          <ul className="space-y-4">
            <li className="text-purple-600 font-medium">Dashboard</li>
            <li>All Employees</li>
            <li>All Departments</li>
            <li>Attendance</li>
            <li>Payroll</li>
            <li>Jobs</li>
            <li>Conditions</li>
            <li>Leaves</li>
            <li>Holidays</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 opacity-30">
          <div>
            <h1 className="text-xl font-bold">Hello Robert 👋</h1>
            <p className="text-gray-500">Good Morning</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2 w-64 shadow-sm"
            />
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 opacity-30">
          {[
            { title: "Total Employees", count: 560, update: "July 14, 2023" },
            { title: "Total Applicants", count: 1050, update: "July 14, 2023" },
            { title: "Today Attendance", count: 470, update: "July 14, 2023" },
            { title: "Total Projects", count: 250, update: "July 14, 2023" },
          ].map((stat, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <h2 className="text-gray-500 text-sm">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.count}</p>
              <p className="text-gray-400 text-xs">Updated: {stat.update}</p>
            </div>
          ))}
        </section>

        {/* Attendance Overview */}
        <section>
          <div className="flex justify-between items-center mb-4 opacity-20">
            <h2 className="text-lg font-bold">Attendance Overview</h2>
            <select className="border px-2 py-1 rounded">
              <option>Today</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center border">
            <p>Attendance Chart Placeholder</p>
          </div>
        </section>
      </main>

      {/* Login Section (Mobile only) */}
      <div className="bg-gray-50 p-6 w-full md:w-1/3 md:block hidden">
        <div className="text-purple-600 font-bold text-2xl mb-4">HRMS</div>
        <h2 className="text-lg font-bold mb-2">Welcome 👋</h2>
        <p className="text-gray-500 mb-4">Please login here</p>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              className="border rounded w-full px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="border rounded w-full px-4 py-2"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="#" className="text-purple-600 text-sm">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white w-full py-2 rounded font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;