import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

export default function AddUserForm({backendPath, onChange, dataUpdate, onUpdate}) {
    const [newUser, setNewUser] = useState({
        name: '',
        age: 0,
        phone: ''
    })

    const submitForm = e => {
        e.preventDefault()
        console.log(newUser)
        axios
        .post(backendPath, newUser)
        .then(res => {
            console.log(res)
            alert(res.data.message + "\nNew User ID : " + res.data.userId)
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
    <form onSubmit={submitForm} style={{display:'flex', margin:10}}>
        <div>
            <TextField sx={{ mx: 1 }} variant='outlined' required type='text' label='Name' value={newUser.name} onChange={e => setNewUser({...newUser, name:e.target.value})}></TextField>
            <TextField sx={{ mx: 1 }} variant='outlined' required type='number' label='Age' min='0' max='100' value={newUser.age} onChange={e => setNewUser({...newUser, age:e.target.value})}></TextField>
            <TextField sx={{ mx: 1 }} variant='outlined' required type='text' label='Phone' value={newUser.phone} onChange={e => setNewUser({...newUser, phone:e.target.value})}></TextField>
        </div>
        <Button variant='contained' type='submit'>Add User</Button>
    </form>
  )
}
