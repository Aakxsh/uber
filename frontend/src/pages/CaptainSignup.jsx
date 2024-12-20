import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    vehicleType: '',
    vehicleNumber: '',
    licenseNumber: '',
    contactNumber: '',
  });

  const [strength, setStrength] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkPasswordStrength = (password) => {
    const suggestionsList = [];
    let strengthLevel = 0;

    if (password.length >= 8) {
      strengthLevel++;
    } else {
      suggestionsList.push('Password should be at least 8 characters long.');
    }

    if (/[A-Z]/.test(password)) {
      strengthLevel++;
    } else {
      suggestionsList.push('Include at least one uppercase letter.');
    }

    if (/\d/.test(password)) {
      strengthLevel++;
    } else {
      suggestionsList.push('Include at least one number.');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strengthLevel++;
    } else {
      suggestionsList.push('Include at least one special character.');
    }

    if (strengthLevel <= 1) {
      setStrength('Weak');
    } else if (strengthLevel === 2 || strengthLevel === 3) {
      setStrength('Medium');
    } else {
      setStrength('Strong');
    }

    setSuggestions(suggestionsList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword, ...otherFields } = formData;

    for (const key in otherFields) {
      if (!formData[key]) {
        setError('Please fill out all fields.');
        setSuccess('');
        return;
      }
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setSuccess('Signup successful! Welcome aboard!');
    setError('');
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center mb-6">
        <img
            className="w-30 h-20"
            src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Captain Signup
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* First and Last Name in Same Line */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-lg font-medium mb-2 text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
                type="text"
                placeholder="Enter your first name"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-lg font-medium mb-2 text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
                type="text"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Other Fields */}
          {[
            { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
            { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' },
            { id: 'contactNumber', label: 'Contact Number', type: 'Number', placeholder: 'Enter your contact number' },
            { id: 'vehicleType', label: 'Vehicle Type', type: 'text', placeholder: 'Enter your vehicle type' },
            { id: 'vehicleNumber', label: 'Vehicle Number', type: 'text', placeholder: 'Enter your vehicle number' },
            { id: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'Enter your license number' },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id} className="block text-lg font-medium mb-2 text-gray-700">
                {label}
              </label>
              <input
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
                type={type}
                placeholder={placeholder}
              />
            </div>
          ))}

          {formData.password && (
            <>
              <p
                className={`text-lg font-semibold mb-2 ${
                  strength === 'Weak'
                    ? 'text-red-500'
                    : strength === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}
              >
                Password Strength {strength}
              </p>
              {suggestions.length > 0 && (
                <div className="bg-yellow-100 text-yellow-700 p-4 rounded mb-4">
                  <p className="font-medium mb-2">Suggestions:</p>
                  <ul className="list-disc ml-5">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          <button
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg"
            type="submit">
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Already have an account?{' '}
            <Link to="/captainLogin" className="text-blue-500 hover:underline">
              Login as a Captain
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
