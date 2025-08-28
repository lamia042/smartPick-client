import React from "react";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import bg from "../assets/bg.jpg";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4 ">
      {/* Header */}
      <div className="py-10 md:px-25 mb-6" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          About Us
        </h1>
        <p className="text-center font-bold text-white mb-12">
          SmartPick is a platform designed to help users make informed decisions
          by sharing queries and recommendations on products. Our goal is to
          empower users with collective knowledge and reliable insights.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Our Mission
        </h2>
        <p className="text-gray-600 text-center md:px-20">
          Our mission is to create a trusted community where users can ask
          questions, provide recommendations, and help each other make smarter
          choices. We believe in transparency, reliability, and empowering users
          with knowledge.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src={pic3}
              alt="Team Member"
              className="mx-auto rounded-full mb-4 w-4/6"
            />
            <h3 className="text-xl font-bold">Lamia Aktar</h3>
            <p className="text-gray-500">Founder & Developer</p>
          </div>
          <div className="text-center">
            <img
              src={pic2}
              alt="Team Member"
              className="mx-auto rounded-full mb-4 w-4/6"
            />
            <h3 className="text-xl font-bold">Rukiya Tabassum</h3>
            <p className="text-gray-500">UI/UX Designer</p>
          </div>
          <div className="text-center">
            <img
              src={pic1}
              alt="Team Member"
              className="mx-auto rounded-full mb-4 w-4/6"
            />
            <h3 className="text-xl font-bold">Afiya Afra</h3>
            <p className="text-gray-500">Marketing Specialist</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
