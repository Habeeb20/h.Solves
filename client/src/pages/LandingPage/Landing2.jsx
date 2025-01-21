import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import m from "../../assets/1.jpg";
import m2 from "../../assets/2.jpg";
import m3 from "../../assets/3.jpg";
import m4 from "../../assets/4.jpg";

const Landing2 = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the section is visible
  });

  return (
    <motion.div
      ref={ref}
      className="bg-yellow-200 min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-8 md:py-16"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Left Side - Intertwined Images */}
      <div className="flex flex-wrap justify-center md:w-1/2 gap-4">
        {[
          { src: m, mt: "0", ml: "0" },
          { src: m2, mt: "2rem", ml: "0" },
          { src: m3, mt: "-4rem", ml: "2rem" },
          { src: m4, mt: "1rem", ml: "0" },
        ].map((image, index) => (
          <motion.div
            key={index}
            className="relative w-40 h-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: index * 0.3 }}
            style={{ marginTop: image.mt, marginLeft: image.ml }}
          >
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </div>

      {/* Right Side - Text and Button */}
      <motion.div
        className="md:w-1/2 flex flex-col justify-center items-start mt-8 md:mt-0 md:ml-8 text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-red-600 leading-relaxed">
          Transform Your Ideas Into Reality
        </h1>
        <p className="text-lg md:text-xl text-red-600 mt-4">
          Explore your creativity and bring new ideas to life.
        </p>
        <p className="text-lg md:text-xl text-red-600 mt-4">
          Discover a world of possibilities with our tools.
        </p>
        <p className="text-lg md:text-xl text-red-600 mt-4">
          Make an impact with unique solutions.
        </p>
        <motion.button
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Landing2;
