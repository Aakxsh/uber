import React from 'react';
import uberOnboardingTraffic from '../assets/images/uberOnboardingTraffic.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div
        className="h-screen pt-5 flex justify-between flex-col w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${uberOnboardingTraffic})`}}
      >
        {/* Uber Logo */}
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* Content Section */}
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get Started With Uber</h2>
          <Link to='/userLogin' className="flex items-center justify-center font-mono w-full bg-black text-white py-3 rounded mt-4">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
