"use client"

import {React, useState } from 'react';
import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme }  from '@mui/material/styles';


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


export default function Home() {

  
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
    alert('abc123')
  }

  const handleLogin = () => {
    alert(`${username} --- ${password}`)
  }

  return (
      <Box sx={styles.root}>
          <Card sx={styles.cardStyle}>
            <CardContent>
              <form style={styles.formStyle}>
                <TextField  sx={styles.textFieldStyle} id="outlined-basic" placeholder='Username' variant="outlined" onChange={handleUsername}/>
                <TextField  sx={styles.textFieldStyle} className='TextBox' id="outlined-basic" placeholder='Password' variant="outlined" onChange={handlePassword}/>
                
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                  <Button variant="outlined" onCLick={handleRegister}>Register</Button>
                  <Button variant="outlined" onClick={handleLogin}>Login</Button>
                </Box>
                
              </form>
            </CardContent>
          </Card>
      </Box>
  )
}
