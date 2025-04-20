import React, { useState } from 'react';

const VehicleSelection = () => {
  // Mock data for vehicles
  const vehicles = [
    { id: 1, name: 'Sedan', image: 'sedan-image-url', price: '$10', type: 'Economy' },
    { id: 2, name: 'SUV', image: 'suv-image-url', price: '$20', type: 'Luxury' },
    { id: 3, name: 'Van', image: 'van-image-url', price: '$30', type: 'Group' },
  ];

  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="vehicle-selection-container">
      <h2 className="text-xl font-semibold mb-4">Select Your Vehicle</h2>

      {/* Display list of vehicles */}
      <div className="vehicle-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`vehicle-card p-4 border rounded-lg shadow-md ${selectedVehicle?.id === vehicle.id ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <img src={vehicle.image} alt={vehicle.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">{vehicle.name}</h3>
            <p className="text-gray-500 text-sm">{vehicle.type}</p>
            <p className="text-gray-700 mt-2">{vehicle.price} per ride</p>
          </div>
        ))}
      </div>

      {/* Display selected vehicle */}
      {selectedVehicle && (
        <div className="mt-6 p-4 border-t border-gray-300">
          <h3 className="font-semibold text-lg">Selected Vehicle:</h3>
          <div className="flex items-center mt-2">
            <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-16 h-16 object-cover rounded-full mr-4" />
            <div>
              <h4 className="font-semibold">{selectedVehicle.name}</h4>
              <p className="text-gray-500">{selectedVehicle.type}</p>
              <p className="text-gray-700">{selectedVehicle.price} per ride</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSelection;
