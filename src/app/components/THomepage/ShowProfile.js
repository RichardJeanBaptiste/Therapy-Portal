/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Modal, Button, Tooltip } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import catImg from  "../../../../public/p1.png";
import ShowCurrentClients from '../Profile/ShowCurrentClients';
import ShowUpcomingDates from '../Profile/ShowUpcomingDates';
import { compareDates } from '../Commons';

const useStyles= (theme) => ({
  root: {
    width: '40em',
    height: '20em',
    marginLeft: '4%'
  },
  oBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '4%',
    marginLeft: '5%',
    backgroundColor: 'rgba(104,176,171, 0.1)',
    borderRadius: '2%',
    width: '49em',
    height: '16em',
  },
  oBoxTitle: {
    whiteSpace: 'pre-wrap',
    marginTop: '5%',
    marginLeft: '8%'
  },
  clientItem: {
    display: 'flex',
    flexDirection: 'row',
    height: '40px',
    width: '15em',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'lightgrey',
    borderWidth: '2px',
    borderRadius: '2%',
  },

  title: {
    fontSize: '1.85em',
    marginTop: '2%',
    marginLeft: '2%'
  },

  intro: {
    width: '85em',
    height: '13em',
    marginLeft: '4%',
    backgroundColor: 'rgba(200, 213, 185, 0.5)',
    borderRadius: '20px',
  },
  intro2: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '5%'
  },
  introText: {
    marginTop: '1%',
    marginLeft: '2%',
    fontSize: '1.35em'
  },
  dashboardItem1: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3%'
  },
  showClientsContainer: {
    width: '33em',
    height: '27em',
    backgroundColor: 'rgba(250, 243, 221, 1)',
    borderRadius: '20px',
    marginTop: '3%',
    marginLeft: '10%'
  },
  showClientsContainer2: {
    width: '33em',
    height: '27em',
    backgroundColor: 'rgba(250, 243, 221, 1)',
    borderRadius: '20px',
    marginLeft: '5%',
    marginTop: '3%'
  }


})

export default function ShowProfile(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const [profileInfo, SetProfileInfo] = useState([]);
  const [upcomingDate, SetUpcomingDate] = useState("");
  const [allClients, SetAllClients] = useState([]);
  const [availableDates, SetAvailableDates] = useState([]);
  const [datesScheduled, SetDatesScheduled] = useState([]);

  const name = props.info[2].replace(new RegExp("%20", 'g'), " ");
  const date = new Date().toDateString();


  useEffect(() => {
    axios.post('/api/therapist/dashboard', {
      username: props.username
    })
    .then(function (response) {

      let allKeys = response.data.scheduled.map(item => {

        let parsed = dayjs(Object.keys(item)[0]);

        if(parsed.isAfter(dayjs())){
          return Object.keys(item)[0];
        };
      });

      let sortedKeys = allKeys.sort((date1, date2) => {
        const dayjsDate1 = dayjs(date1);
        const dayjsDate2 = dayjs(date2);

        // Compare dates using the diff method
        return dayjsDate1.diff(dayjsDate2);
      })


      let sortedDates = response.data["available"].sort(compareDates);

      //console.log(sortedKeys);
      SetUpcomingDate(sortedKeys[0]);
      SetAvailableDates(sortedDates);
      SetAllClients(response.data["clients"]);
      SetDatesScheduled(response.data["scheduled"]);
      SetProfileInfo(response.data);

    })
    .catch(function (error) {
        console.log(error);
    });
  },[props.username]);


  return (
    <>
      
        <h3 style={styles.title}>Dashboard</h3>
        <Box sx={styles.intro}>
            <Box sx={styles.intro2}>
                <Box sx={styles.introText}>
                  <p>Welcome, <span style={{ fontWeight: 'bold'}}><u>{name}</u></span>
                    <br/>
                    Today's Date: <span><u>{date}</u></span>
                    <br/>
                    Upcoming Appointment: <span><u>{upcomingDate}</u></span> 
                  </p>
              </Box>

              <Box>
                {/************ Image  ***********/}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Box sx={styles.showClientsContainer}>
                <ShowCurrentClients datesScheduled={datesScheduled} username={props.username} allClients={allClients} info={props.info}/>
              </Box>

              <Box sx={styles.showClientsContainer2}>
                <ShowUpcomingDates upcomingDates={datesScheduled}/>
              </Box>
            </Box>
            
        </Box>
      
      
    </>
  )
}

/***
 *  
            <Box sx={styles.dashboardItem1}>
                <ShowCurrentClients datesScheduled={datesScheduled} username={props.username} allClients={allClients} info={props.info}/>

            </Box> 
 * 
 * <Typography variant="h5" component="h5"sx={{ marginLeft: '3%'}}>Overview</Typography>

          <Box sx={styles.oBox}>
              <Image
                src={catImg}
                width={200}
                height={200}
                alt="Stock Therapy Photo"
              />

              <Typography sx={styles.oBoxTitle}>Welcome, {name} 
                {"\n"}Today's Date: {date}
                {"\n"}Upcoming Appointment: {upcomingDate}
              </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <ShowClients/>
            <Box sx={{ marginLeft: '5%'}}>
              <ShowDatesAvailable availableDates={availableDates}/>
            </Box>
          </Box>
  * 
 * 
 * 
 * 
 */
