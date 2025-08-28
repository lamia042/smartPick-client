import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Error from "../assets/Lotties/404 Error - Doodle animation.json"; // Lottie animation file

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Lottie Animation */}
        <Lottie animationData={Error} className="h-40 mx-auto -mt-40" />

        {/* 404 Heading */}
        <h1 className="text-9xl font-extrabold text-[#094fc9] mb-4">404</h1>

        {/* Description */}
        <p className="text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>

        {/* Back Home Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="bg-[#094fc9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d3a8f] transition-colors"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
