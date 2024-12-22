import { useParams } from 'react-router-dom'

function User(){
  const {userid} = useParams()
  return (
    <div>
      <h1>User Page</h1>
      <p>user id: {userid}</p>
    </div>
  )
  
}


export default User
