import React from 'react';

const CaptainRides = ({ rides }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recent Rides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md">
            <div className="flex items-center space-x-4">
              <img src={ride.userImage} alt="" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h4 className="text-lg font-semibold">{ride.userName}</h4>
                <p className="text-sm text-gray-500">Pickup: {ride.pickup}</p>
                <p className="text-sm text-gray-500">Drop: {ride.drop}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-600">
              <span>{ride.time}</span>
              <span>{ride.fare}</span>
              <span>{ride.rating} ★</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptainRides;
