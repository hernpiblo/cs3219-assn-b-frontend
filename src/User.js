import React from 'react'
import axios from 'axios'
import { Button, List, ListItem, Typography } from '@mui/material'
import { Container } from '@mui/system'

export default function User({user, backendPath, onChange, dataUpdate, onUpdate}) {
  const deleteHandler = e => {
    if (!user.userId) {
      return window.alert("Nothing to delete")
    }
    e.preventDefault()
    axios.delete(backendPath + "/" + user.userId)
    .then(res => {
        console.log(res)
        alert(res.data.message + "\nDeleted User ID : " + res.data.userId)
    })
    .catch(err => console.log(err))
    .then(
      axios
      .get(backendPath)
      .then(res => res.data)
      .then(res => {
      const arr = [];
      for(var userId in res) {
          res[userId]["userId"] = userId 
          arr.push(res[userId]);
      }
      return arr
      })
      .then(res => {
        onChange(res)
        onUpdate(!dataUpdate)
      })
  )
    }
  return (
    <List dense={true} style={{display:'flex'}}>
      <Container>
        <ListItem divider={true}><Typography>ID: {user.userId}</Typography></ListItem>
        <ListItem><Typography>Name : {user.name}</Typography></ListItem>
        <ListItem><Typography>Age : {user.age}</Typography></ListItem>
        <ListItem><Typography>Phone : {user.phone}</Typography></ListItem>
      </Container>
      <Button variant='contained' color='error' onClick={deleteHandler}>DELETE</Button>
    </List>
  )
}
