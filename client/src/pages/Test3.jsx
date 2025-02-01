import React from 'react';

const Test3 = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-4 font-bold text-lg">HRMS</div>
        <ul className="mt-4 space-y-4 text-sm">
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Dashboard</li>
          <li className="pl-4 py-2 bg-gray-800 cursor-pointer">All Employees</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">All Departments</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Attendance</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Payroll</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Jobs</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Candidates</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Leaves</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Holidays</li>
          <li className="pl-4 py-2 hover:bg-gray-800 cursor-pointer">Settings</li>
        </ul>
        <div className="mt-auto flex items-center justify-center mb-4">
          <button className="p-2 bg-gray-700 rounded-full mr-2">Light</button>
          <button className="p-2 bg-purple-500 rounded-full">Dark</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
          <div>
            <h2 className="text-lg font-semibold">Design Department</h2>
            <p className="text-sm text-gray-500">All Departments  Design Department</p>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-md p-2 text-sm w-60"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md">Add New Employee</button>
            <button className="bg-gray-300 p-2 rounded-md">
              <span className="material-icons">filter_list</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 bg-white shadow-md rounded-md">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-sm text-gray-600">Employee ID</th>
                <th className="p-4 text-sm text-gray-600">Employee Name</th>
                <th className="p-4 text-sm text-gray-600">Designation</th>
                <th className="p-4 text-sm text-gray-600">Type</th>
                <th className="p-4 text-sm text-gray-600">Status</th>
                <th className="p-4 text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">345321231</td>
                  <td className="p-4 text-sm flex items-center space-x-2">
                    <img
                      src={`https://i.pravatar.cc/30?img=${index}`}
                      alt="Employee"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Darlene Robertson</span>
                  </td>
                  <td className="p-4 text-sm">Lead UI/UX Designer</td>
                  <td className="p-4 text-sm">Office</td>
                  <td className="p-4 text-sm text-blue-500">Permanent</td>
                  <td className="p-4 text-sm flex space-x-2">
                    <button className="text-gray-500">
                      <span className="material-icons">visibility</span>
                    </button>
                    <button className="text-purple-500">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="text-red-500">
                      <span className="material-icons">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md">4</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test3;