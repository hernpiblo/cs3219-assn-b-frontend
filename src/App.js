import UserList from './UserList.js'
import AddUserForm from './AddUserForm.js'
import GetUserForm from './GetUserForm.js'
import {useEffect, useState} from 'react'
import axios from 'axios'
import User from './User.js'
import Button from '@mui/material/Button'
import { AppBar, Divider, Typography, List, ListItem } from '@mui/material'

function App() {
  // Frontend 
  const backendPath = "https://cs3219-assn-b.herokuapp.com/user"
  const [userData, setUserData] = useState([{}])
  const [singleUserData, setSingleUserData] = useState({})
  const [showAllUser, setShowAllUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState(false)

  // Serverless
  const awsLambdaUrl = "https://a7aonqonxdc5ubm5o6ussnzrum0amjgm.lambda-url.ap-southeast-1.on.aws/"
  const [serverlessData, setServerlessData] = useState([])

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
  }, [dataUpdate])
  
  const fetchServerless = () => {
    axios
    .get(awsLambdaUrl)
    .then(res => res.data)
    .then(res => setServerlessData(res))
  }

  return (
    <> 
      <AppBar position="static">
        <Typography variant="h4" component="div" padding={2}>
          User List
        </Typography>
      </AppBar>   
      <Button sx={{ my: 3 }} variant='contained' onClick={e => setShowAllUser(true)} color='success'>View all users</Button>
      <GetUserForm sx={{ my: 3 }} backendPath={backendPath} onChange={setSingleUserData} setShowAllUser={setShowAllUser}/>
      <AddUserForm backendPath={backendPath} onChange={setUserData} dataUpdate={dataUpdate} onUpdate={setDataUpdate}/>
      <Divider/>
      {showAllUser 
      ? <UserList userList = {userData} backendPath={backendPath} onChange={setUserData} dataUpdate={dataUpdate} onUpdate={setDataUpdate}/>     
      : singleUserData.name
      ? <User user={singleUserData} backendPath={backendPath} onChange={setSingleUserData} dataUpdate={dataUpdate} onUpdate={setDataUpdate} />
      : <></>
      }
      <Divider/>
      <Divider/>
      <Divider/>
      <Typography variant='h4'>SERVERLESS DATA (Assignment B3.4)</Typography>
      <Typography>NUS SOC modules (BT, CS, IS) for AY22/23 (data from NUSMODS-API)</Typography>
      <Button variant='outlined' onClick={e=>fetchServerless()}>FETCH SERVERLESS DATA</Button>
      <List>
      {serverlessData?.map(module => {
        return (
          <>
            <ListItem>
              <Typography>{module.code}</Typography>
            </ListItem>
            <ListItem>
              <Typography>{module.title}</Typography>
            </ListItem>
              <Divider/>
          </> 
        )
      })}
      </List>

    </>
  );
}

export default App;
