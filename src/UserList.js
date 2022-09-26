import React from 'react'
import User from './User.js'
import { List, ListItem } from '@mui/material'

export default function UserList({ userList, backendPath, onChange }) {
  return (
    <>
      <List dense={true}>
              {userList.map(user => {
        return <ListItem><User key={user.userId} user={user} backendPath={backendPath} onChange={onChange}/></ListItem>
      })}
      </List>
    </>
  )
}
