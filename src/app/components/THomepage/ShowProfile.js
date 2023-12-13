/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import ShowCurrentClients from '../Profile/ShowCurrentClients';
import ShowUpcomingDates from '../Profile/ShowUpcomingDates';

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
    marginTop: '-1%',
    marginLeft: '10%'
  },
  showClientsContainer2: {
    width: '33em',
    height: '27em',
    backgroundColor: 'rgba(250, 243, 221, 1)',
    borderRadius: '20px',
    marginLeft: '5%',
    marginTop: '-1%'
  }
})

export default function ShowProfile(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const name = props.info[2].replace(new RegExp("%20", 'g'), " ");
  const date = new Date().toDateString();


  return (
    <>      
        <h3 style={styles.title}>Dashboard</h3>
        <Box sx={styles.intro}>
            <Box sx={styles.intro2}>
                <Box sx={styles.introText}>
                  <p>Welcome, <span style={{ fontWeight: 'bold'}}><u>{name}</u></span>
                    <br/>
                    <p style={{ paddingTop: '.35%'}}>Today's Date: <u>{date}</u></p>
                    
                    <p style={{ paddingTop: '.35%'}}>Upcoming Appointment: <u>{props.upcomingDate}</u></p>
                  </p>
                </Box>

              <Box>
                {/************ Image  ***********/}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
              <Box sx={styles.showClientsContainer}>
                <ShowCurrentClients refetch={props.refetch} datesScheduled={props.datesScheduled} username={props.username} allClients={props.allClients} info={props.info}/>
              </Box>

              <Box sx={styles.showClientsContainer2}>
                <ShowUpcomingDates upcomingDates={props.datesScheduled}/>
              </Box>
            </Box>
            
        </Box>  
    </>
  )
}
