import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext"; 
import axios from "axios";

const UserSignup = () => {
  //  Move Hooks to the top-level
  const { user, setUser } = useContext(UserDataContext); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [strength, setStrength] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  Function to Check Password Strength
  const checkPasswordStrength = (password) => {
    const suggestionsList = [];
    let strengthLevel = 0;

    if (password.length >= 8) strengthLevel++;
    else suggestionsList.push("Password should be at least 8 characters long.");
    if (/[A-Z]/.test(password)) strengthLevel++;
    else suggestionsList.push("Include at least one uppercase letter.");
    if (/\d/.test(password)) strengthLevel++;
    else suggestionsList.push("Include at least one number.");
    if (/[!@#$%^&*(),.?\":{}|<>]/.test(password)) strengthLevel++;
    else suggestionsList.push("Include at least one special character.");

    setStrength(strengthLevel === 4 ? "Strong" : strengthLevel >= 2 ? "Medium" : "Weak");
    setSuggestions(suggestionsList);
  };

  //  Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // Fix the `submitHandler`
  const submitHandler = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;


    //  Validate required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      setSuccess("");
      return;
    }

    //  Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      // Make API request to register user
      const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/register`,
          {
              fullName: { firstName, lastName },
              email,
              password,
          }
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate("/NewHome"); //  Redirect to home on success
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup Error:", error.response.data);
        setError(error.response.data.error || "Signup failed. Please try again.");
      } else {
        console.error("Signup Error:", error.message);
        setError("An unexpected error occurred.");
      }
    }
  };

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

          {/* Email, Password, Confirm Password */}
          {[
            { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
            { id: "password", label: "Password", type: "password", placeholder: "Create a password" },
            { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm password" },
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

          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 font-semibold text-lg" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;





