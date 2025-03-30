//if captain login successfully then captain will redirect to this page

import React, {useContext, useEffect, useState} from 'react'
import { CaptainDataContext } from '../Context/CaptainContext';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

const CaptainProtectWrapper = ({
    children
}) => {

  // we are using token because with the help of token we will work like login and logut if no activity found in 2hrs or login expire after 24hrs

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const {captain, setCaptain} = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  // console.log('Stored Token', token)

useEffect(() => {
  if (!token){
    navigate('/captainlogin')
}},[token])


axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
    headers:{
        Authorization: `Bearer ${token}`
    }
}).then(response => {
    if(response.status == 200){
        setCaptain(response.data.captain)
        setIsLoading(false)
    }
}).catch(err => {
    console.log(err)
    localStorage.removeItem('token')
    navigate('/captainlogin')
})

if(isLoading){
    return(
        <div>Loading...</div>
    )
}

  return (
    <>
       {/* {token ? children : null} */}
       {children}
    </>
  )
}

export default CaptainProtectWrapper



















