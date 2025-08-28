import React from "react";
import Navbar from "../component/Navbar";
import Slider from "../component/Slider";
import Footer from "../component/Footer";
import ShowQueries from "../component/ShowQueries";
import TopRecommendedQueries from "../component/TopRecommendationQueries";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1">
        <Slider />
      </section>
      <ShowQueries></ShowQueries>
      <TopRecommendedQueries></TopRecommendedQueries>
    </div>
  );
};

export default Home;
