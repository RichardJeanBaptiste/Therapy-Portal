import React, { useState, useEffect } from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import ShowClientDates from './ShowClientDates';
import ShowDeleteClient from './ShowDeleteClient';
import axios from 'axios';
import dayjs from 'dayjs';
import { compareDates, sortNames } from '../util.js';

const useStyles= (theme) => ({
    root: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
      scrollbarWidth: 'thin',
      scrollbarColor: 'transparent transparent',
      /* For WebKit browsers (Chrome, Safari, etc.) */
      '&::-webkit-scrollbar': {
          width: '0.6rem', /* Set a width for the scrollbar (WebKit) */
      },
      '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'transparent', /* Set thumb color to transparent (WebKit) */
      },
    },
    heading: {
      textAlign: 'center',
      paddingBottom: '1.5%'
    },
    client_item_div: {
      width: '100%',
      height: '20px',
      paddingBottom: '5%'
    },
    client_item_p: {
      fontSize: '1.7em',
      marginLeft: '7%'
    },
    buttons: {
      display:'flex', 
      flexDirection:'row', 
      float: 'right', 
      marginRight: '7%'
    }
})



const ShowCurrentClients = (props) => {

    const theme = useTheme();
    const styles = useStyles(theme);
    const [clientName, SetClientName] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [dates, SetDates] = useState([]);
    const [allClients, SetAllClients] = useState([]);

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

    const name = props.info[2].replace(new RegExp("%20", 'g'), " ");

    useEffect(() => {
      SetAllClients(props.allClients.sort(sortNames));
    },[props.allClients])


    useEffect(() => {

      let temp = [];

      props.datesScheduled.forEach((entry) => {
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
    },[clientName, props.datesScheduled]);

    const removeClient = () => {
      axios.post('/api/therapist/remove_client', {
        username: props.username,
        clientname: clientName,
      })
      .then(function (response) {
          alert(`${clientName} deleted from client list`)
          props.refetch();
          handleClose2();
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    return (
      <Box style={styles.root}>
          <ShowClientDates open={open} clientName={clientName} dates={dates} handleClose={handleClose}/>
          <ShowDeleteClient open2={open2} clientName={clientName} handleClose2={handleClose2} removeClient={removeClient}/>


          <h2 style={styles.heading}>Clients</h2>
        
          {Array.isArray(allClients) ? (
              allClients.map((x, i) => (

                  <Box key={i} sx={styles.client_item_div}>
                      <p style={styles.client_item_p} key={i}><u style={{ float: 'left' }}>{x}</u></p>

                      <Box sx={styles.buttons}>
                          <Tooltip title="Show Appointments" arrow>
                              <IconButton onClick={() => handleOpen(x)}>
                                  <VisibilityIcon />  
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
        
      </Box>
    )
}

export default ShowCurrentClients

