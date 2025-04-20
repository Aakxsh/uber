import React from 'react';

const LookingForDriver = ({ isLoading, handleClosePanel, selectedVehicle }) => {
  const vehicleImages = {
    car: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1591275848/assets/57/348090-0115-46b7-96b3-b9085e736876/original/Comfort_Vehicle_list.png',
    bike: 'https://upload.wikimedia.org/wikipedia/commons/1/13/TVS_Apache_RTR_160_%28matte_blue%29.jpg',
    autorickshaw: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Auto_rickshaw_Bangalore_India.jpg',
  };

  // 🔄 SKELETON
  if (isLoading) {
    return (
      <div className='p-4 relative bg-white rounded-t-2xl animate-pulse'>
        <div className='h-6 bg-gray-300 rounded w-1/2 mx-auto mb-6'></div>

        <div className='bg-white rounded-xl shadow-md p-4 flex flex-col gap-4'>
          <div className='w-full flex justify-center'>
            <div className='w-64 h-40 bg-gray-300 rounded-lg'></div>
          </div>

          <div className='space-y-2'>
            {[...Array(3)].map((_, idx) => (
              <div className='flex justify-between' key={idx}>
                <div className='w-1/3 h-4 bg-gray-300 rounded'></div>
                <div className='w-1/4 h-4 bg-gray-300 rounded'></div>
              </div>
            ))}
          </div>

          <hr />

          <div className='space-y-1'>
            <div className='w-1/2 h-4 bg-gray-300 rounded'></div>
            <div className='w-2/3 h-4 bg-gray-300 rounded'></div>
          </div>

          <div className='w-full h-12 bg-gray-300 rounded-lg'></div>
        </div>
      </div>
    );
  }

  const imageSrc = vehicleImages[selectedVehicle] || vehicleImages.car;

  // ✅ MAIN PANEL
  return (
    <div className='p-4 relative bg-white rounded-t-2xl'>
      {/* ❌ Cross Button */}
      <button
        onClick={handleClosePanel}
        className='absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow text-xl text-gray-600'
      >
        <i className='ri-close-line'></i>
      </button>

      <h3 className='text-2xl font-bold text-center mb-6'>Looking For Driver</h3>

      <div className='bg-white rounded-xl shadow-md p-4 flex flex-col gap-4'>
        {/* 🚗 Vehicle Image */}
        <div className='relative w-full flex justify-center'>
          <img
            className='rounded-lg w-64 relative z-10'
            src={imageSrc}
            alt='Vehicle'
          />
          <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 w-72 h-24 bg-blue-400/60 blur-2xl rounded-full opacity-60 z-0'></div>
        </div>

        {/* 📝 Ride Info */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Vehicle</span>
            <span className='font-semibold'>{selectedVehicle || 'Car'}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>ETA</span>
            <span className='font-semibold'>4 mins</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Fare</span>
            <span className='font-semibold'>$15.60</span>
          </div>
        </div>

        <hr />

        {/* 📍 Locations */}
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <i className='ri-map-pin-line text-green-600'></i>
            <span className='text-gray-700 text-sm'>123 Main Street, Noida</span>
          </div>
          <div className='flex items-center gap-2'>
            <i className='ri-flag-line text-red-500'></i>
            <span className='text-gray-700 text-sm'>Sector 62, Ghaziabad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
