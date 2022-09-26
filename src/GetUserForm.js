import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

export default function GetUserForm({backendPath, onChange, setShowAllUser}) {
    const [userId, setUserId] = useState('')

    const submitForm = e => {
        e.preventDefault()
        console.log(userId)
        axios
        .get(backendPath + "/" + userId)
        .then(res => {
            console.log(res.data)
            res.data["userId"] = userId
            onChange(res.data)
        })
        .catch(err => {
            console.log(err)
            window.alert(err.response.data.message)
        })
    }
  return (
    <form onSubmit={submitForm} style={{display:'flex', margin:10}}>
        <div>
            <TextField 
                variant='outlined'
                required
                type='text'
                label='User ID'
                value={userId}
                onChange={e => setUserId(e.target.value)}
                sx={{ mx: 1 }}
            />
        </div>
        <Button variant='contained' onClick={e => userId && setShowAllUser(false)} type='submit'>Search User</Button>
    </form>
  )
}
