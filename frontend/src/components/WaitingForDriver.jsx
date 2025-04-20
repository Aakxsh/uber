import React from 'react';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const WaitingForDriver = ({ cancelRide }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white p-6 rounded-t-2xl shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Searching for a driver</h2>
        <button
          onClick={cancelRide}
          className="text-red-500 text-lg hover:text-red-600 transition"
        >
          Cancel
        </button>
      </div>

      {/* Car Icon Spinner */}
      <div className="flex flex-col items-center justify-center py-8">
        <motion.i
          className="ri-car-line text-5xl text-blue-500"
          animate={{ x: [0, 20, 0] }}  // Adding horizontal bounce effect
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="text-gray-600 font-medium mt-2">Hang tight, we're finding your ride...</p>
      </div>

      {/* Estimated wait time */}
      <div className="text-center mt-4 text-gray-500 text-sm">
        Estimated wait time: <span className="font-semibold text-gray-700">2–4 minutes</span>
      </div>

      {/* Fun Tip or Fact */}
      <div className="mt-6 text-sm text-center text-gray-400 italic">
        “Your ride is just around the corner 🚗💨”
      </div>
    </motion.div>
  );
};

export default WaitingForDriver;
