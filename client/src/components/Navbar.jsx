import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.jpeg"
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white static">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-8" />
          <span className="text-lg font-semibold">A_Solves</span>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-600">
          <a href="#watch" className="hover:text-red-600">Watch</a>
          <a href="#explore" className="hover:text-black">Explore</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#business" className="hover:text-black">Business</a>
          <a href="#blog" className="hover:text-black">Blog</a>
        </div>
        <div className="hidden md:flex space-x-4">
        <Link to="/login">
            <button className="px-4 py-2 text-white bg-red-500 rounded-lg">Log in</button>
        </Link>
        <Link to="/signup">
            <button className="px-4 py-2 text-black bg-gray-200 rounded-lg">Sign up</button>
        </Link>
          
        </div>
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.div
            className="w-8 h-8 bg-gray-500 rounded-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: menuOpen ? 90 : 0 }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-md p-4 space-y-4`}
      >
        <a href="#watch" className="block text-gray-600 hover:text-black">Watch</a>
        <a href="#explore" className="block text-gray-600 hover:text-black">Explore</a>
        <a href="#about" className="block text-gray-600 hover:text-black">About</a>
        <a href="#business" className="block text-gray-600 hover:text-black">Business</a>
        <a href="#blog" className="block text-gray-600 hover:text-black">Blog</a>
      </motion.div>
    </div>
  );
};

export default Navbar;
