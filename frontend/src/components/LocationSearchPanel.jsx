

import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';

const LocationSearchPanel = ({ setPanelOpen, onLocationSelect }) => {
  const [isLoading, setIsLoading] = useState(true);

  const locations = [
    'E260 New Ashok Nagar, Vasundhara Enclave, East Delhi, Delhi-96',
    'Connaught Place, New Delhi',
    'Delhi University - North Campus'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // simulate load
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // 🔄 Skeleton Loader
    return (
      <div className="p-6 bg-white rounded-lg overflow-hidden max-w-lg mx-auto animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center mb-4 border-2 p-3 border-gray-100 rounded-xl">
            <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
            <div className="ml-4 w-3/4 h-5 bg-gray-300 rounded"></div>
          </div>
        ))}

        <div className="flex justify-between mt-6 border-t pt-4">
          <div>
            <div className="w-24 h-4 bg-gray-300 mb-2 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
          </div>
          <div>
            <div className="w-24 h-4 bg-gray-300 mb-2 rounded"></div>
            <div className="w-20 h-5 bg-gray-300 rounded"></div>
          </div>
        </div>

        <div className="w-full h-12 bg-gray-300 rounded-lg mt-6"></div>
      </div>
    );
  }

  // ✅ Actual Panel Content
  return (
    <div className="p-6 bg-white rounded-lg overflow-hidden max-w-lg mx-auto">
      {locations.map((element, index) => (
        <div 
          key={index}
          onClick={() => onLocationSelect(element)}
          className="flex items-center mb-4 border-2 p-3 border-gray-50 active:border-black rounded-xl"
        >
          <h2
            className="p-2 rounded-xl"
            style={{
              backgroundColor: element.includes('Connaught Place') 
                ? '#D1FAD1' 
                : element.includes('Delhi University') 
                ? '#FFF9C4' 
                : '#E0E7FF'
            }}
          >
            <i
              className={element.includes('Connaught Place') 
                ? 'ri-bus-fill text-green-600 text-xl' 
                : element.includes('Delhi University') 
                ? 'ri-graduation-cap-fill text-yellow-600 text-xl' 
                : 'ri-map-pin-fill text-blue-600 text-xl'}
            />
          </h2>
          <h4 className="text-lg font-semibold ml-4">{element}</h4>
        </div>
      ))}


    </div>
  );
};

export default LocationSearchPanel;
