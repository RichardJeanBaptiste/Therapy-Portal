"use client"

import React, {useState, useEffect} from 'react';
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
import Settings from './Settings';
import ContextWrapper from '../Calender/ContextWrapper';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
import { compareDates, sortDates, compareDateKeys } from '../util';

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
    left: '4.7%',
    top: '0%',
    width: '114.3em',
    height: '100%',
    backgroundColor: 'rgba(112, 101, 99, 0.1)',
  }
})

export default function Thomepage(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const [displayName, SetDisplayName] = useState("Profile");
  const [profileInfo, SetProfileInfo] = useState([]);
  const [authToken, SetAuthToken] = useState(null);
  const [upcomingDate, SetUpcomingDate] = useState("");
  const [allClients, SetAllClients] = useState([]);
  const [availableDates, SetAvailableDates] = useState([]);
  const [datesScheduled, SetDatesScheduled] = useState([]);

  useEffect(() => {
    SetAuthToken(localStorage.getItem('jwtToken'));
  },[]);

  /// Fetch Initial Data
  useEffect(() => {
    
    axios.post('/api/therapist/dashboard', {
      username: props.info[1],
    })
    .then(function (response) {
      let allKeys = response.data.scheduled.map(item => {
        let parsed = dayjs(Object.keys(item)[0]);

        if(parsed.isAfter(dayjs())){
          return Object.keys(item)[0];
        };
      });

      let sortedKeys = allKeys.sort(sortDates);
      let sortedDates = response.data["available"].sort(compareDates);
      
      SetAvailableDates(sortedDates);
      SetAllClients(response.data["clients"]);
      SetUpcomingDate(dayjs(sortedKeys[0]).format('ddd, DD MMM YYYY'));
      SetDatesScheduled(response.data["scheduled"]);
      SetProfileInfo(response.data["info"]);
    })
    .catch(function (error) {
        console.log(error);
    });
  },[props.info]);

  const reFetch = () => {

    console.log("refetch");

    axios.post('/api/therapist/dashboard', {
      username: props.info[1],
    })
    .then(function (response) {
      let allKeys = response.data.scheduled.map(item => {
        let parsed = dayjs(Object.keys(item)[0]);

        if(parsed.isAfter(dayjs())){
          return Object.keys(item)[0];
        };
      });
      
      
      let sortedKeys = allKeys.sort(compareDates);
      let sortedDates = response.data["available"].sort(compareDates);
      
      SetAvailableDates(sortedDates);
      SetUpcomingDate(dayjs(sortedKeys[0]).format('ddd, DD MMM YYYY'));
      SetAllClients(response.data["clients"]);
      SetDatesScheduled(response.data["scheduled"]);
      SetProfileInfo(response.data["info"]);
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  const Display = () => {

    if(displayName === undefined){
      SetDisplayName("Profile")
    }
    
    if(displayName === "Profile"){
      return (
        <ShowProfile info={props.info} username={props.info[1]} upcomingDate={upcomingDate} datesScheduled={datesScheduled} allClients={allClients} refetch={reFetch}/>
      )
    } else if(displayName === "Calender") {
      return (
        <ShowCalender username={props.info[1]}/>
      )
    } else if(displayName === "Settings") {
      return (
        <Settings username={props.info[1]} profInfo={profileInfo}/>
      )
    }
  }

  const switchToProfile = () => {
    reFetch();
    SetDisplayName("Profile")
  }

  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., by checking the presence of a token)
    //const token = localStorage.getItem('jwtToken');
    return !!authToken;
  };

  const handleLogout = () => {
    // Implement logic to delete the token (e.g., from local storage)
    localStorage.removeItem('jwtToken');
    router.push(`/`, { scroll: false });
  };

  return (
    <ContextWrapper>      
      <Box sx={styles.root}>
        {/** Navigation */}
        
        <Box sx={styles.nav}>
          <Box sx={{ paddingBottom: '5rem', paddingTop: '5rem'}}>
            <Tooltip title="Profile">
              <IconButton sx={{ fontSize: '3rem'}} onClick={switchToProfile}>
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
            <Tooltip title="Settings">
              <IconButton sx={{fontSize: '3rem'}} onClick={() => SetDisplayName("Settings")}>
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

