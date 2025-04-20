import React, { useState, useEffect } from 'react';

const CaptainRides = () => {
  const [rides, setRides] = useState([]);
  const [rideHistory, setRideHistory] = useState([]);
  const [isHistory, setIsHistory] = useState(false);

  useEffect(() => {
    const fetchedRides = [
      { id: 1, userName: 'John Doe', userId: '12345', pickup: 'A', drop: 'B', time: '2025-04-17T09:00:00', fare: 100, rating: 4.5, profilePic: '', userImage: '' },
      { id: 2, userName: 'Jane Smith', userId: '67890', pickup: 'C', drop: 'D', time: '2025-04-18T12:00:00', fare: 150, rating: 4.0, profilePic: '', userImage: '' },
    ];

    setRides(fetchedRides);

    const now = new Date();
    const history = fetchedRides.filter((ride) => {
      const rideDate = new Date(ride.time);
      return (now - rideDate) > 24 * 60 * 60 * 1000;
    });

    setRideHistory(history);
  }, []);

  const displayedRides = isHistory ? rideHistory : rides;

  return (
    <div>
      <div className="flex mb-6">
        <button
          onClick={() => setIsHistory(false)}
          className={`px-6 py-2 rounded-t-xl ${!isHistory ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All Rides
        </button>
        <button
          onClick={() => setIsHistory(true)}
          className={`px-6 py-2 rounded-t-xl ${isHistory ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Ride History
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {isHistory ? 'Ride History' : 'All Rides'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedRides.map((ride) => (
          <div
            key={ride.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 hover:border-yellow-400"
          >
            <div className="flex items-center space-x-4 mb-5">
              <img
                src={ride.profilePic || ride.userImage || 'https://via.placeholder.com/150'}
                alt={ride.userName}
                className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{ride.userName}</h3>
                <p className="text-sm text-gray-500">
                  User ID: <span className="text-gray-700 font-medium">{ride.userId}</span>
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-semibold text-gray-700">Pickup:</span> {ride.pickup}</p>
              <p><span className="font-semibold text-gray-700">Drop:</span> {ride.drop}</p>
              <p><span className="font-semibold text-gray-700">Time:</span> {new Date(ride.time).toLocaleString()}</p>
              <p><span className="font-semibold text-gray-700">Fare:</span> ₹{ride.fare}</p>
              <p>
                <span className="font-semibold text-gray-700">Rating:</span>{' '}
                <span className="text-yellow-500 font-bold">{ride.rating} ★</span>
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button className="bg-yellow-400 text-white px-5 py-2 rounded-full hover:bg-yellow-500 transition duration-200 text-sm font-medium">
                View Ride
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaptainRides;
