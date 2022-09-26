import UserList from './UserList.js'
import AddUserForm from './AddUserForm.js'
import GetUserForm from './GetUserForm.js'
import {useEffect, useState} from 'react'
import axios from 'axios'
import User from './User.js'
import Button from '@mui/material/Button'
import { AppBar, Divider, Typography } from '@mui/material'

function App() {
  const backendPath = "https://cs3219-assn-b.herokuapp.com/user"
  const [userData, setUserData] = useState([{}])
  const [singleUserData, setSingleUserData] = useState({})
  const [showAllUser, setShowAllUser] = useState(false)

  useEffect(() => {
    axios.get(backendPath)
    .then(res => res.data)
    .then(res => {
      const arr = [];
      for(var userId in res) {
        res[userId]["userId"] = userId 
        arr.push(res[userId]);
      }
      return arr.reverse()
    })
    .then(res => setUserData(res))
  }, [userData])
  
  return (
    <> 
      <AppBar position="static">
        <Typography variant="h4" component="div" padding={2}>
          User List
        </Typography>
      </AppBar>   
      <Button sx={{ my: 3 }} variant='contained' onClick={e => setShowAllUser(true)} color='success'>View all users</Button>
      <GetUserForm sx={{ my: 3 }} backendPath={backendPath} onChange={setSingleUserData} setShowAllUser={setShowAllUser}/>
      <AddUserForm backendPath={backendPath} onChange={setUserData}/>
      <Divider/>
      {showAllUser 
      ? <UserList userList = {userData} backendPath={backendPath} onChange={setUserData}/>     
      : singleUserData.name
      ? <User user={singleUserData} backendPath={backendPath} onChange={setSingleUserData} />
      : <></>
      }
    </>
  );
}

export default App;
