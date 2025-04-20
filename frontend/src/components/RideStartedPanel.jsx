import React from 'react';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const RideStartedPanel = ({ driver, onPay, onCancel }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white px-6 py-8 rounded-t-3xl shadow-2xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Ride Started</h2>
        <button onClick={onCancel} className="text-red-500 hover:text-red-700 transition">
          <i className="ri-close-circle-line text-2xl"></i>
        </button>
      </div>

      {/* Ride Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={driver?.profilePic}
          alt="Driver"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">{driver?.name}</p>
          <p className="text-sm text-gray-500">{driver?.vehicle} • {driver?.vehicleNumber}</p>
        </div>
      </div>

      <hr className="mb-5" />

      {/* Payment Section */}
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Choose Payment Method</h3>
      <div className="space-y-4">
        <button
          onClick={() => onPay('cash')}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <span className="flex items-center gap-3 text-lg text-gray-800">
            <i className="ri-money-rupee-circle-line text-2xl text-green-600" />
            Pay with Cash
          </span>
        </button>

        <button
          onClick={() => onPay('upi')}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <span className="flex items-center gap-3 text-lg text-gray-800">
            <i className="ri-bank-card-line text-2xl text-blue-600" />
            Pay via UPI / Online
          </span>
        </button>

        <button
          onClick={() => onPay('wallet')}
          className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <span className="flex items-center gap-3 text-lg text-gray-800">
            <i className="ri-wallet-3-line text-2xl text-black" />
            Pay with Uber Wallet
          </span>
        </button>
      </div>

      <div className="mt-6 text-center text-sm italic text-gray-400">
        Sit back and relax. We’ll notify you when your ride is complete.
      </div>
    </motion.div>
  );
};

export default RideStartedPanel;
