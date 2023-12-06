import React, { useState, useEffect } from 'react';
import { Box, Tooltip, IconButton } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import ShowClientDates from './ShowClientDates';
import ShowDeleteClient from './ShowDeleteClient';
import axios from 'axios';
import dayjs from 'dayjs';
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
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      
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
    }
  
  
  })

const ShowCurrentClients = (props) => {

    const theme = useTheme();
    const styles = useStyles(theme);
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

    const name = props.info[2].replace(new RegExp("%20", 'g'), " ");


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
          handleClose2();
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    return (
      <Box style={{ width: '100%', height: '100%', overflowY: 'scroll'}}>
        <ShowClientDates open={open} clientName={clientName} dates={dates} handleClose={handleClose}/>
        <ShowDeleteClient open2={open2} clientName={clientName} handleClose2={handleClose2} removeClient={removeClient}/>


          <h2 style={{ textAlign: 'center', paddingBottom:'1.5%'}}>Clients</h2>
        
          {Array.isArray(props.allClients) ? (
              props.allClients.map((x, i) => (

                  <Box key={i} sx={{ width: '100%', height: '20px', paddingBottom: '5%'}}>
                      <p style={{ fontSize: '1.7em', marginLeft: '7%' }} key={i}><u style={{ float: 'left' }}>{x}</u></p>

                      <Box sx={{ display:'flex', flexDirection:'row', float: 'right', marginRight: '7%'}}>
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


/**
 * <Box key={i} sx={{ paddingBottom: '3%'}}>
                  <Box key={i} sx={styles.clientItem}>
                      <p style={{ fontSize: '2em' }} key={i}><u style={{ float: 'left' }}>{x}</u></p>

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
 * 
 */