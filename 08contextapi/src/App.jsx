import React from 'react'
import UserContextProvider from './context/UserContextProvider';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
  return (
    <UserContextProvider>
      <h1>Usercontext</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App;
