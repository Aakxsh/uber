import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserDataContext } from "../Context/UserContext"; 
import { CaptainDataContext } from "../Context/CaptainContext"; 
import axios from "axios";

const validVehicleTypes = ['Bike', 'Car', 'Autorickshaw', 'ElectricBike'];

const CaptainSignup = () => {
  const { setCaptain } = useContext(CaptainDataContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    license: "",
    vehicleType: "",
    capacity: "",
    vehicleColor: "",
    vehiclePlate: "",
    lat: "0",
    long: "0",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "vehicleType") {
      const capacityMap = {
        Bike: 2,
        ElectricBike: 2,
        Car: 5,
        Autorickshaw: 3,
      };
      setFormData((prev) => ({ ...prev, capacity: capacityMap[value] || "" }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, phoneNumber, license, vehicleType, vehicleColor, vehiclePlate, capacity, lat, long } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber || !license || !vehicleType || !vehicleColor || !vehiclePlate || !capacity) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, {
        fullName: { firstName, lastName },
        email,
        password,
        phoneNumber,
        captain: { license },
        vehicle: { vehicleType, color: vehicleColor, plate: vehiclePlate, capacity },
        lat: parseFloat(lat) || 0,
        long: parseFloat(long) || 0,
      });

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate("/captainDashboard");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <img className="w-20 h-20 mb-4" src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="Uber Logo" />
          <h2 className="text-2xl font-bold">Captain Signup</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={submitHandler}>
          {/* First Name and Last Name on the Same Line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-lg font-medium mb-2 text-gray-700">First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300" />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2 text-gray-700">Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300" />
            </div>
          </div>

          {/* Email and Password */}
          <label className="block text-lg font-medium mb-2 text-gray-700">Captain Email</label>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 mb-4" />

          <label className="block text-lg font-medium mb-2 text-gray-700">Enter Password</label>
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Enter Password" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 mb-4" />

          <label className="block text-lg font-medium mb-2 text-gray-700">Confirm Password</label>
          <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="Confirm Password" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 mb-4" />

          <label className="block text-lg font-medium mb-2 text-gray-700">Phone Number</label>
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter Phone Number" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 mb-4" />

          <label className="block text-lg font-medium mb-2 text-gray-700">License</label>
          <input name="license" value={formData.license} onChange={handleChange} placeholder="Enter License" className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 mb-4" />

          <h3 className="text-xl font-semibold mt-6 mb-4">Vehicle Information</h3>

          {/* Vehicle Type and Capacity on Same Line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="bg-gray-100 rounded px-4 py-2 border border-gray-300">
              <option value="">Select Vehicle</option>
              {validVehicleTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <input name="capacity" value={formData.capacity} placeholder="Vehicle Capacity" readOnly className="bg-gray-100 rounded px-4 py-2 border border-gray-300" />
          </div>

          {/* Vehicle Plate and Vehicle Color on Same Line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="vehiclePlate" value={formData.vehiclePlate} onChange={handleChange} placeholder="Ex- UP 16 TS 8742" className="bg-gray-100 rounded px-4 py-2 border border-gray-300" />
            <input name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} placeholder="Vehicle Color" className="bg-gray-100 rounded px-4 py-2 border border-gray-300" />
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 rounded">Create Captain Account</button>

          <p className="mt-6 text-center text-gray-600">Already have an account? <Link to="/captainLogin" className="text-blue-500 hover:underline">Login as a Captain</Link></p>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By registering, you agree to the <Link to="/terms" className="text-blue-500 hover:underline">Terms and Conditions</Link>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;

























