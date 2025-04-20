
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const captainData = { email, password };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData);
      
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        setSuccess('Login Successful!');
        navigate('/captainDashboard');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login.';
      setError(errorMessage);
      console.error('Error during login:', errorMessage);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            className="w-30 h-20"
            src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">Enter email or phone number</label>
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

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-700">Enter password</label>
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

         
          {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg" type="submit">
            Captain Login
          </button>

          <Link to={'/userLogin'} className="w-full my-5 flex items-center justify-center bg-[#7ace6e] text-black py-3 rounded hover:bg-red-600 transition duration-300 font-semibold text-lg">
            Sign In as User
          </Link>
        </form>

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/captainSignup" className="text-blue-500 hover:underline">Register as a Captain</Link>
          </p>
          <p className="mt-2">
            <Link to="/forgotPassword" className="text-blue-500 hover:underline">Forgot password?</Link>
          </p>
          <p className='text-xs mt-5'>
            This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service apply</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
















