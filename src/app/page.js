"use client"

import {React, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useTheme }  from '@mui/material/styles';
import Link from 'next/link';


const useStyles= (theme) => ({
    root: {
      width: '100vw',
      height: '100vh'
    },
    navicon: {
      position: 'absolute',
      top: '30px',
      right: '35px',
    },
    title1: {
      position: 'absolute',
      top: '44%',
      left: '34%',
      transform: "translate('-50%', '-50%')",
    }
})


export default function Home() {

  const theme = useTheme();
  const styles = useStyles(theme);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box style={styles.root}>
      <Box style={styles.navicon}>
        <IconButton aria-label="menu" onClick={handleClick}>
          <MenuIcon/>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link href="/registration">Register</Link>
          </MenuItem>
          
          <MenuItem onClick={handleClose}>
            <Link href="/login">Login</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

      </Box>
        <Typography variant="h1" component="h1" style={styles.title1}>Therapy Portal</Typography>
    </Box>
  )
  
}

/**
 * 
 * 
 * root: {
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
 */
