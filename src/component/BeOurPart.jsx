import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import Team from "../assets/Lotties/Teamwork Lottie animation.json";
const BeOurPart = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Be A Part of Our SmartPick
            !
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join our mission to create a community where everyone can share 
            queries and recommendations. Your participation helps others 
            make smarter product decisions. 🚀
          </p>

          <Link to="/add-query">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition-transform hover:scale-105">
            Add Your Query
            </button>
          </Link>
        </div>

        {/* Right side - Lottie Animation */}
        <div className="flex-1 flex justify-center">
          <Lottie   loop={true} className="w-80 h-80" />
        </div>
      </div>
    </div>
  );
};

export default BeOurPart;
