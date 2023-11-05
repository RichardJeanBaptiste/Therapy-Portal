"use client"

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme }  from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShowProfile from './ShowProfile';
import ShowCalender from './ShowCalender';
import ShowClients from './ShowClients';

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
    width: '4rem',
    height: '99%',
    borderRightStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'lightgrey',
    paddingRight: '2.5em'
  },
  display_root: {
    position: 'absolute',
    left: '6.5%',
    top: '9%',
    width: '111.8em',
    height: '50em',
  }
})

export default function Thomepage(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const [ displayName, SetDisplayName ] = useState("Profile");

  const Display = () => {

    if(displayName === undefined){
      SetDisplayName("Profile")
    }
    
    if(displayName === "Profile"){
      return (
        <ShowProfile/>
      )
    } else if(displayName === "Calender") {
      return (
        <ShowCalender/>
      )
    } else if(displayName === "Clients") {
      return (
        <ShowClients username={props.id}/>
      )
    }
  }

  return (
    <Box sx={styles.root}>
      {/** Navigation */}
      <Box sx={styles.nav}>
        <Box sx={{ paddingBottom: '5rem', paddingTop: '5rem'}}>
          <Tooltip title="Profile">
            <IconButton sx={{ fontSize: '3rem'}} onClick={() => SetDisplayName("Profile")}>
                <AccountBoxIcon fontSize='inherit'/>
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
          <Tooltip title="Clients">
            <IconButton sx={{fontSize: '3rem'}} onClick={() => SetDisplayName("Clients")}>
                <PeopleAltIcon fontSize='inherit'/>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/** Title */}
      <Typography variant="h3" component="h3" align='center' sx={styles.title}>Welcome, {props.id}</Typography>

      <Box sx={styles.display_root}>
        <Display/>
      </Box>
      
    </Box>
  )
}

