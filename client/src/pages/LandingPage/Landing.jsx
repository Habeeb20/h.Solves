// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import m from "../../assets/1.jpg"
// import m2 from "../../assets/2.jpg"
// import m3 from "../../assets/3.jpg"
// import m4 from "../../assets/4.jpg"
// import m5 from "../../assets/5.jpg"
// import m6 from "../../assets/6.jpg"
// import m7 from "../../assets/7.jpg"
// import m8 from "../../assets/8.jpg"
// const Landing = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const texts = [
//     "Get your next weeknight dinner idea",
//     "Discover amazing new recipes",
//     "Explore creative dinner inspirations",
//   ];

//   const images = [
//     m,
//     m2,
//     m3,
//     m4,
//     m5,
//     m6,
//     m7,
//     m8,
//   ];

//   // Rotate texts every 2 seconds
//   useEffect(() => {
//     const textInterval = setInterval(() => {
//       setCurrentTextIndex((prev) => (prev + 1) % texts.length);
//     }, 2000);

//     return () => clearInterval(textInterval);
//   }, [texts.length]);

//   // Rotate images every 2 seconds
//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setCurrentImageIndex((prev) => (prev + 4) % images.length);
//     }, 2000);

//     return () => clearInterval(imageInterval);
//   }, [images.length]);

//   return (
//     <div className="relative min-h-screen flex flex-col ">
//       {/* Navbar */}
//       {/* <nav className="flex items-center justify-between px-6 py-4 shadow-md">
//         <div className="flex items-center space-x-2">
//           <img src="/images/pinterest-logo.png" alt="Pinterest" className="h-8" />
//           <span className="text-lg font-semibold">Pinterest</span>
//         </div>
//         <div className="hidden md:flex space-x-6 text-gray-600">
//           <a href="#watch" className="hover:text-red-600">Watch</a>
//           <a href="#explore" className="hover:text-black">Explore</a>
//           <a href="#about" className="hover:text-black">About</a>
//           <a href="#business" className="hover:text-black">Business</a>
//           <a href="#blog" className="hover:text-black">Blog</a>
//         </div>
//         <div className="hidden md:flex space-x-4">
//           <button className="px-4 py-2 text-white bg-red-500 rounded-lg">Log in</button>
//           <button className="px-4 py-2 text-black bg-gray-200 rounded-lg">Sign up</button>
//         </div>
//         <button
//           className="block md:hidden focus:outline-none"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           <motion.div
//             className="w-8 h-8 bg-gray-500 rounded-full"
//             initial={{ rotate: 0 }}
//             animate={{ rotate: menuOpen ? 90 : 0 }}
//           />
//         </button>
//       </nav>

    
//       {menuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="absolute top-16 left-0 w-full bg-white shadow-md p-4 space-y-4 z-10"
//         >
//           <a href="#watch" className="block text-gray-600 hover:text-black">Watch</a>
//           <a href="#explore" className="block text-gray-600 hover:text-black">Explore</a>
//           <a href="#about" className="block text-gray-600 hover:text-black">About</a>
//           <a href="#business" className="block text-gray-600 hover:text-black">Business</a>
//           <a href="#blog" className="block text-gray-600 hover:text-black">Blog</a>
//         </motion.div>
//       )} */}

//       {/* Hero Section */}
//       <div className="flex-1 flex flex-col items-center justify-center text-center">
//         {/* Animated Text */}
//         <motion.h1
//           key={currentTextIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl md:text-5xl font-bold"
//         >
//           {texts[currentTextIndex]}
//         </motion.h1>

//         {/* Carousel */}
//         <div className="flex space-x-4 mt-8">
//           {images.slice(currentImageIndex, currentImageIndex + 4).map((src, index) => (
//             <motion.img
//               key={index}
//               src={src}
//               alt={`Slide ${index}`}
//               className="w-32 h-32 rounded-lg shadow-md"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//             />
//           ))}
//         </div>

//         {/* Scroll Down Button */}
//         <motion.button
//           className="mt-8 p-4 bg-yellow-500 rounded-full"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           ↓
//         </motion.button>
//       </div>

//       {/* Footer Section */}
//       <footer className="py-4 bg-yellow-200 text-center">
//         <p>Here’s how it works ↓</p>
//       </footer>
//     </div>
//   );
// };

// export default Landing;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import m from "../../assets/1.jpg";
import m2 from "../../assets/2.jpg";
import m3 from "../../assets/3.jpg";
import m4 from "../../assets/4.jpg";
import m5 from "../../assets/5.jpg";
import m6 from "../../assets/6.jpg";
import m7 from "../../assets/7.jpg";
import m8 from "../../assets/8.jpg";
import Landing2 from "./Landing2";
import Landing3 from "./Landing3";

const Landing = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const texts = [
    "Get your next weeknight dinner idea",
    "Discover amazing new recipes",
    "Explore creative dinner inspirations",
  ];

  const images = [m, m2, m3, m4, m5, m6, m7, m8];

  // Rotate texts every 2 seconds
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(textInterval);
  }, [texts.length]);

  // Rotate images every 2 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 4) % images.length);
    }, 2000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  // Define text colors
  const textColors = ["skyblue", "green", "black"];

  return (
    <>
   <div
      className="relative min-h-screen flex flex-col bg-white transition-all duration-700"
      style={{
        backgroundColor: currentTextIndex % 2 === 0 ? "white" : "#e0e0e0",
      }}
    >
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        {/* Animated Text */}
        <motion.h1
          key={currentTextIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold"
          style={{
            color: textColors[currentTextIndex % textColors.length],
          }}
        >
          {texts[currentTextIndex]}
        </motion.h1>

        {/* Carousel */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          {images.slice(currentImageIndex, currentImageIndex + 4).map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Scroll Down Button */}
        <motion.button
          className="mt-8 p-4 bg-yellow-500 rounded-full text-white font-bold shadow-lg hover:bg-yellow-600 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↓
        </motion.button>
      </div>

      {/* Footer Section */}
      <footer className="py-4 bg-yellow-200 text-center text-sm sm:text-base">
        <p>Here’s how it works ↓</p>
      </footer>
     
    </div>
    <Landing2 />
    <Landing3 />
    </>
 
  );
};

export default Landing;
