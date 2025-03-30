// //if user login successfully then user will redirect to this page
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);



  
// we are using token because with the help of token we will work like login and logut if no activity found in 2hrs or login expire after 24hrs
  useEffect(() => {
    if (!token) {
      navigate('/userlogin');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/userlogin');
      });
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
