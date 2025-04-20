import React, { useState, useEffect } from 'react';

const VehiclePanel = ({ vehiclePanelCloseRef, handleCloseVehiclePanel, setConfirmRidePanelOpen, onVehicleSelect }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // simulate 2 sec loading
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // 🔄 Skeleton Loader
    return (
      <div className="animate-pulse">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex border-2 rounded-xl p-3 mb-3 items-center justify-between">
            <div className="w-14 h-12 bg-gray-300 rounded-md"></div>
            <div className="flex-1 mx-4 space-y-2">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-20 h-3 bg-gray-300 rounded"></div>
              <div className="w-32 h-3 bg-gray-300 rounded"></div>
            </div>
            <div className="w-16 h-6 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Actual Panel
  return (
    <div>
      {/* Close button for Vehicle panel */}
      <button
        ref={vehiclePanelCloseRef}
        onClick={handleCloseVehiclePanel}
        className='absolute top-6 right-6 text-2xl text-gray-500 hover:text-black cursor-pointer'
      >
        <i className='ri-close-line'></i>
      </button>

      <h3 className='text-2xl font-semibold mb-5'>Choose Vehicle</h3>

      {/* UberGo */}
      <div onClick={() => {setConfirmRidePanelOpen(true);
      onVehicleSelect({type: 'car', price: 192.98})
      }
      } className='flex border-2 rounded-xl mb-2 active:border-black p-3 items-center justify-between transition-transform transform hover:scale-105 hover:border-gray-400 hover:shadow-lg'>
        <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png' alt='Premium car' />
        <div>
          <h4 className='font-medium text-base'>
            UberGo <span><i className='ri-user-fill'>4</i></span>
          </h4>
          <h5 className='font-normal text-xs text-black'>2 min away</h5>
          <p className='font-normal text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹192.98</h2>
      </div>

      {/* UberAuto */}
      <div onClick={() => {setConfirmRidePanelOpen(true);
      onVehicleSelect({ type: 'autorickshaw', price: 148.50})
      }
      } className='flex border-2 rounded-xl mb-2 active:border-black p-3 items-center justify-between transition-transform transform hover:scale-105 hover:border-gray-400 hover:shadow-lg'>
        <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt='Auto' />
        <div>
          <h4 className='font-medium text-base'>
            UberAuto <span><i className='ri-user-fill'>3</i></span>
          </h4>
          <h5 className='font-normal text-xs text-black'>3 min away</h5>
          <p className='font-normal text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹148.50</h2>
      </div>

      {/* UberBike */}
      <div onClick={() => {setConfirmRidePanelOpen(true);
      onVehicleSelect({ type : 'bike', price: 50.00})
      }
      } className='flex border-2 rounded-xl active:border-black p-3 items-center justify-between transition-transform transform hover:scale-105 hover:border-gray-400 hover:shadow-lg'>
        <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png' alt='Bike' />
        <div>
          <h4 className='font-medium text-base'>
            UberBike <span><i className='ri-user-fill'>1</i></span>
          </h4>
          <h5 className='font-normal text-xs text-black'>1 min away</h5>
          <p className='font-normal text-gray-600'>Affordable, compact rides</p>
        </div>
        <h2 className='text-2xl font-semibold'>₹50.00</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
