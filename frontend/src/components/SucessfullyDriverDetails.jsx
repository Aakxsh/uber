import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const SucessfullyDriverDetails = ({ driver, onCancel }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [otp] = useState(() => Math.floor(1000 + Math.random() * 9000)); // Random 4-digit OTP
  const [arrivalMinutes, setArrivalMinutes] = useState(2); // Set initial value to 2 minutes (or undefined if you want to update it manually)

  useEffect(() => {
    if (driver) {
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [driver]);

  // Function to manually set the arrival time (For example, when the driver comes closer)
  const updateArrivalTime = (newTime) => {
    setArrivalMinutes(newTime);
  };

  // Countdown logic for arrival time
  useEffect(() => {
    if (arrivalMinutes === null) return; // Don't start a countdown if arrivalMinutes is null
    if (arrivalMinutes > 0) {
      const countdown = setInterval(() => {
        setArrivalMinutes((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            return 0; // Arriving now
          }
          return prev - 1;
        });
      }, 60000); // 1 minute interval

      return () => clearInterval(countdown);
    }
  }, [arrivalMinutes]);

  if (!driver) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 py-8 rounded-t-3xl shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-2xl font-bold text-black">Driver Assigned</h2>
          {!isLoading && (
            <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <i className="ri-time-line text-base" />
              {arrivalMinutes > 0 ? (
                <span>
                  Arriving in <span className="text-black font-semibold">{arrivalMinutes} min{arrivalMinutes > 1 ? 's' : ''}</span>
                </span>
              ) : arrivalMinutes === 0 ? (
                <span className="text-green-600 font-semibold">Arriving now</span>
              ) : (
                <span className="text-gray-500 font-semibold">Waiting for driver...</span>
              )}
            </div>
          )}
        </div>
        {!isLoading && (
          <button onClick={onCancel} className="text-red-500 hover:text-red-700 transition">
            <i className="ri-close-circle-line text-2xl"></i>
          </button>
        )}
      </div>

      {/* Driver Info */}
      <div className="flex items-center mb-6">
        {isLoading ? (
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
            <div className="space-y-3">
              <div className="h-5 w-40 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-44 h-28 flex items-center">
              <img
                src={driver.profilePic}
                alt="Driver"
                className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-md z-20 bg-white"
                style={{ marginRight: '-70px' }}
              />
              {driver.vehicleImage && (
                <img
                  src={driver.vehicleImage}
                  alt="Vehicle"
                  className="w-30 h-35 z-5" // Removed round shape, borders, and shadows for vehicle image
                />
              )}
            </div>
            <div className="ml-5">
              <h3 className="text-xl font-semibold text-gray-800">{driver.name}</h3>
              <div className="flex gap-3 mt-2">
                <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full flex items-center gap-1 text-base font-medium">
                  <i className="ri-shield-check-fill"></i> Verified
                </span>
                <span className="bg-yellow-100 text-yellow-600 text-sm px-3 py-1 rounded-full flex items-center gap-1 text-base font-medium">
                  <i className="ri-shield-user-fill"></i> Safety
                </span>
              </div>
              <p className="text-yellow-500 text-sm flex items-center gap-1 mt-1">
                <i className="ri-star-fill" />
                {driver.rating} / 5.0
              </p>
            </div>
          </>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="bg-gray-50 p-4 rounded-xl shadow-inner text-sm space-y-3 mb-4">
        {isLoading ? (
          <>
            <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle</span>
              <span className="font-medium text-gray-800">{driver.vehicle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vehicle Number</span>
              <span className="font-medium text-gray-800">{driver.vehicleNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Phone</span>
              <a
                href={`tel:${driver.phone}`}
                className="text-blue-600 font-semibold flex items-center gap-1"
              >
                <i className="ri-phone-fill" /> {driver.phone}
              </a>
            </div>
          </>
        )}
      </div>

      {/* OTP Section */}
      {!isLoading && (
        <div className="text-center mt-4 space-y-2">
          <p className="text-gray-500 text-sm">Share this OTP with the driver to start the ride</p>
          <div className="text-4xl font-bold tracking-widest text-black">{otp}</div>
        </div>
      )}

      {/* Tip */}
      <div className="mt-6 text-center text-sm italic text-gray-400">
        “Your driver is approaching. Please be ready.”
      </div>
    </motion.div>
  );
};

export default SucessfullyDriverDetails;
