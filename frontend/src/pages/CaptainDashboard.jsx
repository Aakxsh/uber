import React, { useState, useEffect } from 'react';
import { RiHome2Line, RiArrowLeftLine } from 'react-icons/ri';
import CaptainRideRequestPanel from '../components/CaptainRideRequestPanel';
import MapView from '../components/MapView';

const CaptainDashboard = () => {
  const [rideQueue, setRideQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate incoming ride requests
    const rides = [
      {
        userName: 'User 101',
        pickup: 'Sector 18 Metro',
        drop: 'Noida City Center',
        fare: '₹180',
        time: '12:30 PM',
      },
      {
        userName: 'User 102',
        pickup: 'Botanical Garden',
        drop: 'Golf Course Road',
        fare: '₹210',
        time: '12:35 PM',
      },
      {
        userName: 'User 103',
        pickup: 'GIP Mall',
        drop: 'Sector 62',
        fare: '₹160',
        time: '12:40 PM',
      },
    ];

    setTimeout(() => {
      setRideQueue(rides);
      setCurrentIndex(0);
    }, 2000); // show first ride after 2 seconds
  }, []);

  const handleAccept = () => {
    alert('Ride Accepted!');
    setRideQueue([]); // Clear all ride requests
    setCurrentIndex(0);
  };

  const handleIgnore = () => {
    if (currentIndex < rideQueue.length - 1) {
      setCurrentIndex(currentIndex + 1); // Move to next ride
    } else {
      setRideQueue([]); // No more rides
      setCurrentIndex(0);
      alert('No more ride requests.');
    }
  };

  return (
    <div className="relative h-screen w-full font-sans">
      {/* Header Icons */}
      <div className="absolute top-14 left-4 z-50 text-gray-700 text-3xl cursor-pointer">
        <RiArrowLeftLine title="Back" />
      </div>
      <div className="absolute top-14 right-4 z-50 text-gray-700 text-3xl cursor-pointer">
        <RiHome2Line title="Home" />
      </div>

      {/* Map Section */}
      <MapView />

      {/* Ride Accept/Cancel Panel */}
      <CaptainRideRequestPanel
        rideRequest={rideQueue[currentIndex]}
        onAccept={handleAccept}
        onIgnore={handleIgnore}
      />
    </div>
  );
};

export default CaptainDashboard;
