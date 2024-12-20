import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      setError('Please enter your email.');
      setSuccess('');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setSuccess('');
      return;
    }

    // Clear error and display success message
    setError('');
    setSuccess('If this email is registered, a password reset link has been sent.');

    // Placeholder for API call
    console.log('Password reset request sent for:', email);
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
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Forgot Password
          </h2>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-medium mb-2 text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-100 rounded px-4 py-2 w-full border border-gray-300 focus:border-black focus:outline-none text-lg placeholder-gray-500"
              type="email"
              placeholder="Enter your registered email"
            />
          </div>

          <button
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <a
            href="/userlogin"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
