"use client"

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { useTheme }  from '@mui/material/styles';
import Button  from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowProfile from './ShowProfile';
import ShowCalender from './ShowCalender';
import ShowClients from './ShowClients';
import ContextWrapper from '../Calender/ContextWrapper';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

const useStyles= (theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: '2.5rem',
  },
  nav: {
    position: 'absolute',
    left: '17px',
    display: 'flex',
    flexDirection: 'column',
    width: '2rem',
    height: '99%',
    borderRightStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'lightgrey',
    paddingRight: '2.5em'
  },
  display_root: {
    position: 'absolute',
    left: '5%',
    top: '0%',
    width: '103.65em',
    height: '100%',
    backgroundColor: 'rgba(112, 101, 99, 0.1)',
  }
})

export default function Thomepage(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const [ displayName, SetDisplayName ] = useState("Profile");



  const Display = () => {

    if(displayName === undefined){
      SetDisplayName("Profile")
    }
    
    if(displayName === "Profile"){
      return (
        <ShowProfile info={props.info} username={props.info[1]}/>
      )
    } else if(displayName === "Calender") {
      return (
        <ShowCalender username={props.info[1]}/>
      )
    } else if(displayName === "Clients") {
      return (
        <ShowClients username={props.id}/>
      )
    }
  }

  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., by checking the presence of a token)
    const token = localStorage.getItem('jwtToken');
    
    if(!!token){
      // do nothing
    } else {
      console.log("logout");
    }
    //return !!token;

    return !!token;

  };

  const handleLogout = () => {
    // Implement logic to delete the token (e.g., from local storage)
    localStorage.removeItem('jwtToken');

    // Redirect to the login page or any other desired location
    router.push(`/`, { scroll: false });
  };

  return (
    <ContextWrapper>      
      <Box sx={styles.root}>
        {/** Navigation */}
        
        <Box sx={styles.nav}>
          <Box sx={{ paddingBottom: '5rem', paddingTop: '5rem'}}>
            <Tooltip title="Profile">
              <IconButton sx={{ fontSize: '3rem'}}>
                  <AccountBoxIcon fontSize='inherit' onClick={() => SetDisplayName("Profile")}/>
              </IconButton>
            </Tooltip>
          </Box>
            
          <Box sx={{ paddingBottom: '5rem'}}>
            <Tooltip title="Calender">
              <IconButton sx={{fontSize: '3rem'}} onClick={() => SetDisplayName("Calender")}>
                  <CalendarMonthIcon fontSize='inherit'/>
              </IconButton>
            </Tooltip>
          </Box>
            

          <Box sx={{ paddingBottom: '5rem'}}>
            <Tooltip title="Settings">
              <IconButton sx={{fontSize: '3rem'}}>
                  <SettingsIcon fontSize='inherit'/>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{
          position: 'absolute',
          right: '1.5%',
          top: '2%',
          zIndex: '1'
        }}>
          <Button variant="text" onClick={handleLogout} size="small">Logout</Button>
        </Box>

        <Box sx={styles.display_root}>
          {isAuthenticated() ? (
            <Display/>
          ) : (
            <p>You are not authenticated. Please log in: <Link href="/">click here</Link></p>
          )}
        </Box>
        
      </Box>
    </ContextWrapper>
  )
}

