import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [strength, setStrength] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkPasswordStrength = (password) => {
    const suggestionsList = [];
    let strengthLevel = 0;

    if (password.length >= 8) strengthLevel++;
    else suggestionsList.push('Password should be at least 8 characters long.');
    if (/[A-Z]/.test(password)) strengthLevel++;
    else suggestionsList.push('Include at least one uppercase letter.');
    if (/\d/.test(password)) strengthLevel++;
    else suggestionsList.push('Include at least one number.');
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthLevel++;
    else suggestionsList.push('Include at least one special character.');

    setStrength(strengthLevel === 4 ? 'Strong' : strengthLevel >= 2 ? 'Medium' : 'Weak');
    setSuggestions(suggestionsList);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      setSuccess('');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    // Successful signup
    setSuccess('Signup successful! Welcome aboard!');
    setError('');
    console.log('User Signup Data:', formData);

    // Clear form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setStrength('');
    setSuggestions([]);
  };

  console.log('User Signup Data:', formData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Signup</h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          {/* First Name and Last Name */}
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
          {[{ id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' }, { id: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' }, { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm password' }].map(({ id, label, type, placeholder }) => (
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
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Already have an account?{' '}
            <Link to="/userLogin" className="text-blue-500 hover:underline">
              Login as a User
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/privacy-Policy" className="text-blue-500 hover:underline">
              Privacy Policy | Terms and conditions
            </Link>
          </p>

          <p>
            <Link to="/contact-us" className="text-blue-500 hover:underline">
              Contact Us
            </Link>
          </p>
          <p>
            <Link to="/about-us" className="text-blue-500 hover:underline">
              About Us & FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
