import React, { useContext } from 'react'
import UserContext from '../context/UserContext';

const Profile = () => {
    const { user } = useContext(UserContext);

    if(!user) {
        return <h1>Please login to view your profile</h1>;
    }
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome to {user.username}</p>
    </div>
  )
}

export default Profile;
