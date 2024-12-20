import React from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = React.useState({});
  const [error, setError] = React.useState(''); // Error state for form validation

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent page reload
    setUserData({email:email, password:password});
    setEmail('');
    setPassword('');

  

    // Log the email and password
    console.log('Email:', email, 'Password:', password);

    // You can also add additional logic here, like calling an API to authenticate the user

    // Clear error message if everything is fine
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            className="w-20"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>

        {/* Form Section */}
        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Welcome Back
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">
              Enter email or phone number
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
              type="email"
              placeholder="Email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-700">
              Enter password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
              type="password"
              placeholder="Password"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          {/* Submit Button */}
          <button
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg"
            type="submit"
          >
            Login
          </button>

          {/* Captain Login */}
          <Link to={'/captainLogin'} className="w-full my-5 flex items-center justify-center bg-[#d3d300] text-black py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg">
            Sign In as Captain
          </Link>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/userSignup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgotPassword" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </p>

          <p className='text-grey text-[13px] text-left mt-5'>By Proceeding, you consent to get calls, Whatsapp or SMS messages by automated means, from Uber and its affiliates to the number provided</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
