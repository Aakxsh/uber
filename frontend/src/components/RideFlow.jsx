import React, { useEffect, useState } from 'react';
import WaitingForDriver from './WaitingForDriver';
import SucessfullyDriverDetails from './SucessfullyDriverDetails';

const RideFlow = ({ driverData, cancelRide }) => {
  const [showWaiting, setShowWaiting] = useState(true);
  const [showDriverDetails, setShowDriverDetails] = useState(false);

  useEffect(() => {
    if (showWaiting) {
      const timer = setTimeout(() => {
        setShowWaiting(false);
        setShowDriverDetails(true);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [showWaiting]);

  return (
    <>
      {showWaiting && <WaitingForDriver cancelRide={cancelRide} />}
      {showDriverDetails && (
        <SucessfullyDriverDetails driver={driverData} onCancel={cancelRide} />
      )}
    </>
  );
};

export default RideFlow;
