"use client"

import {React, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import Link from 'next/link';

const useStyles= (theme) => ({
    root: {
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
      },
      cardStyle: {
        border: '1px solid #BDBDBD',
        borderRadius: '24px',
        height: '45em',
        width: '30em',
      },
      formStyle: {
        display: 'flex',
        flexDirection: 'column',
      },
      textFieldStyle:{
        paddingBottom: '2em',
      }
})


export default function Registration() {

    const theme = useTheme();
    const styles = useStyles(theme);

    const [ username, SetUsername] = useState("");
    const [ password, SetPassword] = useState("");
  
    const handleUsername = (e) => {
      SetUsername(e.target.value);
    }
  
    const handlePassword = (e) => {
      SetPassword(e.target.value);
    }
  
    const handleRegister  = () => {

        axios.post('/api/register', {
            username: username,
            password: password
          })
          .then(function (response) {
            if (response.status === 200){
                alert("Account Created");
                SetUsername("");
                SetPassword("");
            } else {
                alert("Something went wrong");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      
    }
  
    return (
        <Box sx={styles.root}>
            <Card sx={styles.cardStyle}>
              <CardContent>
                <form style={styles.formStyle}>
                  <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Username' variant="outlined" onChange={handleUsername} value={username}/>
                  <TextField  sx={styles.textFieldStyle} className='TextBox' id="outlined-basic" placeholder='Password' variant="outlined" onChange={handlePassword} value={password}/>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <Link href="/">Cancel</Link>
                    <Button variant="outlined" onClick={handleRegister}>Register</Button>
                  </Box>
                  
                </form>
              </CardContent>
            </Card>
        </Box>
    )
}