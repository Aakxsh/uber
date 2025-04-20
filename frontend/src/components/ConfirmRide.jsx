import React, { useEffect, useState, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';

const ConfirmRide = ({ setConfirmRidePanelOpen, selectedVehicle = 'car', onConfirm }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const panelRef = useRef(null); // ✅ ref for GSAP

  const vehicleImages = {
    car: {
      src: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1591275848/assets/57/348090-0115-46b7-96b3-b9085e736876/original/Comfort_Vehicle_list.png',
      label: 'Car',
    },
    bike: {
      src: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png',
      label: 'Bike',
    },
    autorickshaw: {
      src: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
      label: 'Auto Rickshaw',
    },
    suv: {
      src: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/41291/exterior-right-front-three-quarter-5.jpeg?q=80',
      label: 'SUV',
    },
    mini: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/2014_Maruti_Alto_800_LXi_%28Facelift%29_in_Coimbatore.jpg/1280px-2014_Maruti_Alto_800_LXi_%28Facelift%29_in_Coimbatore.jpg',
      label: 'Mini Car',
    },
    van: {
      src: 'https://imgd-ct.aeplcdn.com/1056x594/n/cw/ec/39083/maruti-suzuki-eeco-exterior-right-front-three-quarter-4.jpeg?q=80',
      label: 'Van',
    },
  };

  const selected = vehicleImages[selectedVehicle] || vehicleImages.car;

  // 🔄 Reset state when component mounts
  useEffect(() => {
    setIsClosing(false);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedVehicle]); // ensure it resets when vehicle changes


  useEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: '100%', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);




  const handleClosePanel = () => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => setConfirmRidePanelOpen(false),
      });
    } else {
      setConfirmRidePanelOpen(false);
    }
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

  // ✅ MAIN PANEL
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ${isClosing ? 'translate-y-full' : 'translate-y-0'}`}>
    <button
      onClick={handleClosePanel}
      className='absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow text-xl text-gray-600'
    >
      <i className='ri-close-line'></i>
    </button>

    <h3 className='text-2xl font-bold text-center mb-6'>Confirm Your Ride</h3>

      <div className='bg-white rounded-xl shadow-md p-4 flex flex-col gap-4'>

        {/* 🚘 Dynamic Vehicle Image */}
        <div className='relative w-full flex justify-center'>
          <img
            className='rounded-lg w-64 relative z-10'
            src={selected.src}
            alt={selected.label}
          />
          <div className='absolute -bottom-3 left-1/2 -translate-x-1/2 w-72 h-24 bg-blue-400/60 blur-2xl rounded-full opacity-60 z-0'></div>
        </div>

        {/* 📝 Ride Info */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Vehicle Type</span>
            <span className='font-semibold'>{selected.label}</span>
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

        {/* ✅ Confirm Button */}
       <button
  onClick={onConfirm}
  className='mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-200'
>
  Confirm Ride
</button>

      </div>
    </div>

    
  );

  
};

export default ConfirmRide;
