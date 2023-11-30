/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Modal, Button, Tooltip } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import ShowClientDates from '../Profile/ShowClientDates';
import ShowDates from '../Profile/ShowDates';
import ShowDeleteClient from '../Profile/ShowDeleteClient';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import dayjs from 'dayjs';
import Image from 'next/image';
import catImg from  "../../../../public/p1.png";

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

  const compareDates = (date1, date2) => {
    const parsedDate1 = dayjs(date1);
    const parsedDate2 = dayjs(date2);
  
    if (parsedDate1.isBefore(parsedDate2)) {
      return -1;
    } else if (parsedDate1.isAfter(parsedDate2)) {
      return 1;
    } else {
      return 0;
    }
  };

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

  const ShowClients = () => {

    const [clientName, SetClientName] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [ dates, SetDates] = useState([]);

    const handleOpen = (name) => {
      SetClientName(name);
      setOpen(true);
    };

    const handleOpen2 = (name) => {
      SetClientName(name);
      setOpen2(true);

    }

    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);


    useEffect(() => {

      let temp = [];

      datesScheduled.forEach((entry) => {
        for (const key in entry){
          entry[key].forEach((item) => {
            if(item[0] === clientName){
              //temp.push(key.toString())
              temp.push(dayjs(key).format('ddd, DD MMM YYYY'))
            }
          })
        }
      })

      temp = temp.sort(compareDates);
      SetDates(temp);
    },[clientName]);

    const removeClient = () => {
      axios.post('/api/therapist/remove_client', {
        username: props.username,
        clientname: clientName,
      })
      .then(function (response) {
          alert(`${clientName} deleted from client list`)
          handleClose2();
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    return (
      <ul>
        <ShowClientDates open={open} clientName={clientName} dates={dates} handleClose={handleClose}/>
        <ShowDeleteClient open2={open2} clientName={clientName} handleClose2={handleClose2} removeClient={removeClient}/>
        
          {Array.isArray(allClients) ? (
              allClients.map((x, i) => (

                <Box key={i} sx={{ paddingBottom: '3%'}}>
                    <Box key={i} sx={styles.clientItem}>
                      <li key={i}>{x}</li>

                      <Tooltip title="Show Appointments" arrow>
                          <IconButton onClick={() => handleOpen(x)}>
                              <VisibilityIcon/>  
                          </IconButton>
                      </Tooltip>
                      

                      <Tooltip title="Remove Client" arrow>
                          <IconButton onClick={() => handleOpen2(x)}>
                            <CloseIcon />
                          </IconButton>
                      </Tooltip>
                  </Box>
                </Box>
                
              ))
          ) : (
              <></>
          )}
      </ul>
    )
  }



  return (
    <>
      <Box>
          <Typography variant="h5" component="h5"sx={{ marginLeft: '3%'}}>Overview</Typography>

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
              <ShowDates availableDates={availableDates}/>
            </Box>
          </Box>
  
      </Box>
    </>
  )
}
