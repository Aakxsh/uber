import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import ForgotPassword from './pages/ForgotPassword'
import UserContext from './Context/UserContext'
import NewHome from './pages/NewHome'
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainDashboard from './pages/CaptainDashboard';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';


// import PrivacyPolicy from './pages/PrivacyPolicy'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/newHome' element = {<UserProtectWrapper><NewHome/></UserProtectWrapper>}/>
        <Route path = '/home' element = {<Home />}/>
        <Route path = '/userLogin' element = {<UserLogin />}/>
        <Route path = '/userSignup' element = {<UserSignup />}/>
        <Route path = '/captainLogin' element = {<CaptainLogin/>}/>
        <Route path = '/captainSignup' element = {<CaptainSignup/>}/>
        <Route path = '/forgotPassword' element = {<ForgotPassword/>}/>
        {/* <Routes path = '/privacy-Policy' element = {<PrivacyPolicy/>}/> */}
        <Route path = '/userContext' element = {<UserContext/>}></Route>
        <Route path = "/user/logout" element={<UserProtectWrapper>
          <UserLogout />
        </UserProtectWrapper>}>
        </Route>
        <Route path='/captainDashboard' element = {<CaptainProtectWrapper>
          <CaptainDashboard />
        </CaptainProtectWrapper>}></Route>
      </Routes>
    </div>
  )
}

export default App