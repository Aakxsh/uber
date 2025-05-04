import React from 'react';

const CaptainLogout = () => {
  const handleLogout = () => {
    alert('Logged out successfully!');
    // Add actual logout logic here
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Are you sure you want to logout?</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default CaptainLogout;
