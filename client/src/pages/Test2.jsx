// import React from "react";
// import { motion } from "framer-motion";
// import { FiSearch, FiFilter } from "react-icons/fi";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { MdOutlineLocationOn } from "react-icons/md";

// const Test2 = () => {
//   return (
//     <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
//       {/* Sidebar */}
//       <motion.div
//         initial={{ x: -300 }}
//         animate={{ x: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full lg:w-1/4 bg-white shadow-lg p-6"
//       >
//         <h1 className="text-green-600 text-xl font-bold mb-6">wwwork</h1>
//         <ul className="space-y-4">
//           <li className="text-green-600 font-medium">Dashboard</li>
//           <li className="text-green-600 font-medium">Job Board</li>
//           <li className="text-gray-500">Schedule</li>
//           <li className="text-gray-500">Messenger</li>
//         </ul>
//         <div className="mt-8 bg-green-100 p-4 rounded-lg">
//           <h2 className="text-green-600 font-bold">Get Upgrade</h2>
//           <p className="text-gray-500 text-sm">Step to the next level with more features</p>
//           <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
//             Learn more
//           </button>
//         </div>
//         <p className="mt-8 text-gray-500 cursor-pointer">Logout</p>
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="flex-1 p-6"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <input
//             type="text"
//             placeholder="Quick Search (ctrl + D)"
//             className="w-full lg:w-1/2 bg-gray-200 px-4 py-2 rounded-lg"
//           />
//           <span className="text-green-600">Anne Douglas</span>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center space-x-4 mb-6">
//           <div className="flex-1 flex items-center bg-gray-200 px-4 py-2 rounded-lg">
//             <FiSearch className="text-green-600" />
//             <input
//               type="text"
//               placeholder="Search by job title, company, keywords"
//               className="flex-1 bg-transparent outline-none ml-2"
//             />
//           </div>
//           <MdOutlineLocationOn className="text-green-600 text-2xl" />
//           <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center">
//             <FiFilter className="mr-2" /> Filters
//           </button>
//         </div>

//         {/* Job List */}
//         <h2 className="text-gray-500 mb-2">We've found 523 jobs!</h2>
//         <div className="space-y-4">
//           {["UX Designer", "Product Designer", "UX/UI Designer", "Motion Designer"].map(
//             (job, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//                 className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg"
//               >
//                 <div>
//                   <h3 className="text-green-600 font-bold">{job}</h3>
//                   <p className="text-gray-500 text-sm">Company Name - Location</p>
//                 </div>
//                 <div className="flex items-center">
//                   <p className="text-gray-500 mr-4">8.2 - 13.5k PLN</p>
//                   <AiOutlineArrowRight className="text-green-600" />
//                 </div>
//               </motion.div>
//             )
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Test2;







import React from "react";

const Test2 = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-purple-600">HRMS</h1>
        </div>
        <nav className="mt-4 space-y-2">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100 rounded-md"
              >
                <i className="mr-3 text-lg">🏠</i> Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-purple-100 text-purple-600 rounded-md"
              >
                <i className="mr-3 text-lg">👥</i> All Employees
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100 rounded-md"
              >
                <i className="mr-3 text-lg">📋</i> All Departments
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100 rounded-md"
              >
                <i className="mr-3 text-lg">📅</i> Attendance
              </a>
            </li>
            {/* Add other sidebar items here */}
          </ul>
        </nav>
        <div className="mt-6 px-4">
          <button className="w-full py-2 bg-gray-100 text-sm font-medium rounded-lg">
            <span className="flex items-center justify-center gap-2">
              ☀️ Light
              <span className="ml-1">|</span> 🌙 Dark
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Brooklyn Simmons</h2>
            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search"
                className="px-4 py-2 text-sm border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Robert Allen</span>
                <img
                  src="https://via.placeholder.com/30"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Profile Card */}
        <section className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">Brooklyn Simmons</h3>
                  <p className="text-sm text-gray-600">Project Manager</p>
                  <p className="text-sm text-purple-600">
                    brooklyn.s@example.com
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Edit Profile
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-6">
              <ul className="flex gap-4 text-sm border-b pb-2">
                <li className="text-purple-600 border-b-2 border-purple-600">
                  Personal Information
                </li>
                <li className="hover:text-purple-600">Professional Information</li>
                <li className="hover:text-purple-600">Documents</li>
                <li className="hover:text-purple-600">Account Access</li>
              </ul>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">First Name</h4>
                  <p className="text-sm text-gray-900">Brooklyn</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Last Name</h4>
                  <p className="text-sm text-gray-900">Simmons</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Mobile Number
                  </h4>
                  <p className="text-sm text-gray-900">(702) 555-0122</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Email</h4>
                  <p className="text-sm text-gray-900">brooklyn.s@example.com</p>
                </div>
                {/* Add other details here */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Test2;
