import React from "react";
import { motion } from "framer-motion";
import m from "../../assets/1.jpg";
import m2 from "../../assets/2.jpg";
import m3 from "../../assets/3.jpg";
import m4 from "../../assets/4.jpg";
import m5 from "../../assets/5.jpg";
import m6 from "../../assets/6.jpg";
import m7 from "../../assets/7.jpg";
import m8 from "../../assets/8.jpg";

const Landing3 = () => {
  return (
    <div className="relative bg-gray-800">
      {/* Background grid */}
      <div className="grid grid-cols-3 gap-2 h-screen overflow-hidden">
        <img
          src={m}
          alt="Background 1"
          className="w-full h-full object-cover"
        />
        <img
          src={m3}
          alt="Background 2"
          className="w-full h-full object-cover"
        />
        <img
          src={m2}
          alt="Background 3"
          className="w-full h-full object-cover"
        />
        <img
          src={m4}
          alt="Background 4"
          className="w-full h-full object-cover"
        />
        <img
          src={m5}
          alt="Background 5"
          className="w-full h-full object-cover"
        />
        <img
          src={m6}
          alt="Background 6"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Foreground text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h1 className="text-white text-5xl font-bold text-center px-4">
          Sign up to get your ideas
        </h1>
      </motion.div>
    </div>
  );
};

export default Landing3;
