import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdLocationOn, MdTimer, MdCurrencyRupee } from 'react-icons/md';

const CaptainRideRequestPanel = ({ rideRequest, onAccept, onIgnore }) => {
  const [progress, setProgress] = useState(100);

  // Optional: Auto-ignore after 10s
  useEffect(() => {
    if (!rideRequest) return;
    setProgress(100);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onIgnore(); // Auto-ignore
          return 0;
        }
        return prev - 1;
      });
    }, 100); // 100ms * 100 = 10 seconds

    return () => clearInterval(interval);
  }, [rideRequest]);

  return (
    <AnimatePresence mode="wait">
      {rideRequest && (
        <motion.div
          key={rideRequest.userName + rideRequest.time}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md text-gray-800 border border-blue-100"
        >
          {/* Progress Bar */}
          <div className="h-1 bg-blue-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Profile and Details */}
          <div className="flex items-center space-x-4">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${rideRequest.userName}`}
              alt="Profile"
              className="w-14 h-14 rounded-full shadow"
            />
            <div>
              <h3 className="text-lg font-bold text-blue-600">{rideRequest.userName}</h3>
              <p className="text-sm text-gray-500">New ride request</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2 text-gray-700">
              <MdLocationOn className="text-blue-500" /> <span className="font-medium">Pickup:</span> {rideRequest.pickup}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <MdLocationOn className="text-green-500" /> <span className="font-medium">Drop:</span> {rideRequest.drop}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <MdCurrencyRupee className="text-yellow-500" /> <span className="font-medium">Fare:</span> {rideRequest.fare}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <MdTimer className="text-purple-500" /> <span className="font-medium">Time:</span> {rideRequest.time}
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onIgnore}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium"
            >
              Ignore
            </button>
            <button
              onClick={onAccept}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaptainRideRequestPanel;
