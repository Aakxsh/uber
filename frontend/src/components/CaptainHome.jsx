import React from 'react';

const CaptainHome = ({ captain }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to Your Dashboard, Captain!</h2>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Earnings */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <img src="/assets/earnings.jpg" className="w-full h-36 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Total Earnings</h3>
          <p className="text-3xl font-bold text-yellow-500">₹{captain.earnings}</p>
        </div>
        {/* Total Rides */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <img src="/assets/total-rides.jpg" className="w-full h-36 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Total Rides</h3>
          <p className="text-3xl font-bold text-yellow-500">{captain.totalRides}</p>
        </div>
        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <img src="/assets/location.jpg" className="w-full h-36 object-cover rounded-xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Current Location</h3>
          <p className="text-3xl font-bold text-yellow-500">{captain.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
