// import React from 'react'
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';


// const UserLogout = () => {

//     const token = localStorage.getItem('token')
//     const navigate = useNavigate()

//     axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{headers:{
//         Authorization: 'Bearer ${token}'
//     }}).then((response) => {
//         if(response.status === 200){
//             localStorage.removeItem('token')
//             navigate('/login')
//         }
//     })
//   return (
//     <div>UserLogout</div>
//   )
// }

// export default UserLogout

























import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Ensures cookies are sent if needed
        });

        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/userlogin");
        }
      } catch (error) {
        console.error("Logout Error:", error.response?.data || error.message);
      }
    };

    if (token) {
      logoutUser();
    } else {
      navigate("/userlogin"); // Redirect if user is already logged out
    }
  }, [navigate, token]);

  return (
    <div className="text-center mt-10 text-lg font-semibold text-gray-700">
      Logging out...
    </div>
  );
};

export default UserLogout;
