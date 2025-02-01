import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Landing from './pages/LandingPage/Landing'
import Navbar from './components/Navbar'

import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import LoginAsPage from './pages/Auth/RedirectLogin'
import socket from './socket'
import { useAuthContext } from './context/AuthContext'
import RedirectLogin from './pages/Auth/RedirectLogin'
import Test from './pages/Test'
import Test2 from './pages/Test2'
import EmployerDashboard from './pages/Dashboards/EmployerDashboard'
import JobSeekerDashBoard from './pages/Dashboards/JobSeekerDashBoard'
import Test3 from './pages/Test3'
import JobDetails from './pages/JobSeekers/JobDetails'
const App = () => {

  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />} />
        <Route path='/test' element={<Test />} />
        <Route path='/test2' element={<Test2 />} />
        <Route path='/test3' element={<Test3 />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/redirectlogin" element={<RedirectLogin />} />


        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/jobseekerdashboard" element={<JobSeekerDashBoard />} />


        <Route path="/jobdetails/:id" element={<JobDetails />} />

      </Routes>
    </Router>
      
    </>
  )
}

export default App
