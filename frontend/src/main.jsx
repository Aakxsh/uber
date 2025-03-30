// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'
// import UserContext from './Context/UserContext'

  

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//    <UserContext.provider value={{user, setUser}}>
//    <BrowserRouter>
//    <App/>
//    </BrowserRouter>
//    </UserContext.provider>
//   </StrictMode>,
// )






import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './Context/UserContext';  // Correct import of UserContext
import CaptainContext from './Context/CaptainContext.jsx';

function Main() {
  return (
    <StrictMode>
      <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
      </CaptainContext>
      
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />);
