// import React,{createContext, useState} from 'react'
// export const UserDataContext = createContext(null) //This is the context which will be used to pass the data to all the children

// const UserContext = ({children}) => {
//   const [user, setUser] = useState({
//     email:'',
//     fullName:{
//       firstName:'',
//       lastName:''
//     }
//     })

//   return (
//     <div>
//       <UserDataContext.Provider value={{user, setUser} }> {/*This is the provider which provider data to all the children*/}
//       {children}
//       </UserDataContext.Provider>
//     </div>
    
//   )
// }

// export default UserContext













import React, { createContext, useState } from 'react';

// This is the context which will be used to pass the data to all the children
export const UserDataContext = createContext(null); 

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  return (
    // Provide the state and setter to all children components
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;









