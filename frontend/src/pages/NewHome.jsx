import React, { useRef, useState, useEffect, cancelRide } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import SucessfullyDriverDetails from '../components/SucessfullyDriverDetails';
import RideStartedPanel from '../components/RideStartedPanel';




const NewHome = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 🟡 Skeleton loading state
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [closingConfirmPanel, setClosingConfirmPanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [closingWaitingForDriverPanel, setClosingWaitingForDriverPanel] = useState(false);
  const [driverAssigned, setDriverAssigned] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState()



  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelCloseRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulate delay
    return () => clearTimeout(timer);
  }, []);

  const submitHandler = (e) => e.preventDefault();

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '50%', duration: 1, ease: 'power2.out' });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: '0%', duration: 0.5, ease: 'power5.in' });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.5,
      ease: vehiclePanelOpen ? 'power2.out' : 'power5.in',
    });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelRef.current) {
      gsap.to(confirmRidePanelRef.current, {
        transform: confirmRidePanelOpen ? 'translateY(0)' : 'translateY(100%)',
        duration: 0.5,
        ease: confirmRidePanelOpen ? 'power2.out' : 'power5.in',
      });
    }
  }, [confirmRidePanelOpen])

  const handleLocationSelect = (location) => {
    setPickup(location);
    setPanelOpen(false);
    setVehiclePanelOpen(true);
  };

  const handleCloseVehiclePanel = () => setVehiclePanelOpen(false);




  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle); // ✅ this line sets the selected vehicle
    setConfirmRidePanelOpen(true);
  };



  const handleVehicleSelect = (vehicle) => {
    if (selectedVehicle?.id === vehicle.id && confirmRidePanelOpen) {
      setConfirmRidePanelOpen(false);
      setTimeout(() => {
        setSelectedVehicle(vehicle);
        setConfirmRidePanelOpen(true);
      }, 200); // Delay for animation out
    } else {
      setSelectedVehicle(vehicle);
      setConfirmRidePanelOpen(true);
    }
  };


  const handleConfirmRide = () => {
    setConfirmRidePanelOpen(false);
    setTimeout(() => {
      setWaitingForDriver(true);
  
      // After 5 seconds show driver details
      setTimeout(() => {
        setWaitingForDriver(false);
        setDriverAssigned(true);
      }, 5000);
  
    }, 300); // delay for confirm panel to close
  };
  

  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='Uber logo' />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://i.redd.it/g2r5ewz4tqk11.jpg' alt='Background' />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        {isLoading ? (
          <div className='h-[30%] p-6 bg-white'>
            <div className='animate-pulse space-y-4'>
              <div className='h-6 w-1/3 bg-gray-300 rounded'></div>
              <div className='relative'>
                <div className='absolute top-[32%] left-0 pl-2 flex flex-col items-center'>
                  <i className='ri-stop-circle-fill text-gray-400'></i>
                  <div className='h-5 w-0.5 bg-gray-400'></div>
                  <i className='ri-square-fill text-gray-400'></i>
                </div>
                <div className='ml-6 space-y-3'>
                  <div className='h-10 bg-gray-200 rounded w-full'></div>
                  <div className='h-10 bg-gray-200 rounded w-full'></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='h-[30%] p-6 bg-white relative'>
            <h4 className='text-2xl font-semibold'>Find a Trip</h4>
            <form onSubmit={submitHandler}>
              {/* Line with Circle and Square Icons */}
              <div className='absolute top-[32%] left-10 flex flex-col items-center'>
                <i className='ri-stop-circle-fill'></i>
                <div className='h-5 w-0.5 bg-gray-900'></div>
                <i className='ri-square-fill'></i>
              </div>

              <input
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                type='text'
                placeholder='Add a pick-up location'
              />

              <input
                onClick={() => setPanelOpen(true)}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2'
                type='text'
                placeholder='Enter your destination'
              />
            </form>
          </div>
        )}

        {/* Close Panel Button */}
        <button
          ref={panelCloseRef}
          onClick={() => setPanelOpen(false)}
          className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-110 w-12 h-12 flex items-center justify-center'
        >
          <i className='ri-close-line'></i>
        </button>

        {/* Location Panel */}
        <div ref={panelRef} className='h-0 bg-white overflow-hidden'>
          <LocationSearchPanel onLocationSelect={handleLocationSelect} />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <VehiclePanel
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          vehiclePanelCloseRef={vehiclePanelCloseRef}
          handleCloseVehiclePanel={handleCloseVehiclePanel}
          onVehicleSelect={({ type, price}) => {
            setSelectedVehicle(type);
            setSelectedPrice(price);
          } }
          
        />
      </div>

      {/* Confirm Ride Panel */}
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl px-3 py-8'>
        <ConfirmRide
        key = {selectedVehicle + Date.now()} 
        setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} 
        selectedVehicle={selectedVehicle}
        closingConfirmPanel={closingConfirmPanel}
        onConfirm={handleConfirmRide} />
        
      </div>


      {/* Nearby Ride Panel */}
      <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl px-3 py-8'>
        <LookingForDriver />
      </div>


      {/* waiting for Driver */}
      <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white rounded-t-3xl px-3 py-8'>
      {waitingForDriver && !driverAssigned && !closingWaitingForDriverPanel && (
  <div className='fixed w-full z-10 bottom-0 bg-white rounded-t-3xl px-3 py-8'>
    <WaitingForDriver cancelRide={cancelRide} />
  </div>
)}

      </div>


     
{/* Successfully Driver Details */}
{driverAssigned && (
  <div className="fixed w-full z-10 bottom-0 bg-white rounded-t-3xl px-3 py-8">
    <SucessfullyDriverDetails
      driver={{
        name: 'Rohit Sharma',
        profilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.9,
        vehicle: 'Toyota Innova Crysta',
        vehicleNumber: 'DL01 AB 1234',
        phone: '9876543210',
        vehicleImage: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1591275848/assets/57/348090-0115-46b7-96b3-b9085e736876/original/Comfort_Vehicle_list.png', // Add the vehicle image URL here
      }}
      onCancel={() => {
        setDriverAssigned(false);
        setWaitingForDriver(false);
      }}
    />
  </div>
)}



{isOtpVerified && (
  <RideStartedPanel
    driver={driver}
    onPay={(method) => console.log("User chose:", method)}
    onCancel={() => setIsOtpVerified(false)}
  />
)}




    </div>
  );
};

export default NewHome;




