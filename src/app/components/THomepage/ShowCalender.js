import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box, Button, IconButton, Tooltip, Modal, TextField } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTheme }  from '@mui/material/styles';
import Calendar from 'react-calendar';
import axios from 'axios';
import './Calendar.css';
//import 'react-calendar/dist/Calendar.css';

const useStyles= (theme) => ({
    calenderMenu: {
      display: 'flex',
      flexDirection: 'row'
    },
    calenderButtons: {
      display: 'flex',
      flexDirection: 'column'
    },
    availableButton: {
      fontSize: '3em',
      '&:hover': {
        color: 'green'
      },
    },
    modelStyle: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      height: '40em',
    }
})


export default function ShowCalender(props) {

  const theme = useTheme();
  const styles = useStyles(theme);
  const [value, onChange] = useState(new Date());
  const [ open, setOpen ] = useState(false);
  const [ newClient, SetNewClient ] = useState(null);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const makeAvailable = () => {

    const currentDate = new Date();

    if(value < currentDate){
      alert("Can't make this Date available");
    } else {
      axios.post('/api/therapist/add_available_date', {
        username: props.username,
        newDate: value.toUTCString(),
      }).then((response) => {
          alert(response.data.msg);
  
      }).catch((error) => {
          console.log(error);
      })
    }
  }

  const addClient = () => {
      const currentDate = new Date();

      if( value < currentDate){
        alert("Can't make this Date available");
      } else {
        axios.post('/api/therapist/add_client', {
          therapist: props.username,
          client: newClient,
          newDate: value.toUTCString(),
        }).then((response) => {
            alert(response.data.msg);
    
        }).catch((error) => {
            console.log(error);
        })
      }
  }


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modelStyle}>

          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            Client Info
          </Typography>

          <TextField id="Date" label="Date" variant="outlined" defaultValue={value} sx={{ marginTop: '10%'}} disabled fullWidth/>

          <TextField 
            id="Name" label="Name" 
            variant="outlined" 
            sx={{ marginTop: '5%'}} 
            fullWidth
            onChange={(e) => {
              SetNewClient(e.target.value);
            }}
          />

          <Box sx={{ marginTop: '5%'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Time" />
            </LocalizationProvider>
          </Box>
          
          <TextField
            id="Notes"
            label="Notes"
            multiline
            fullWidth
            rows={3}
            sx={{ marginTop: '5%'}}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '5%'}}>
            <Box sx={{ paddingRight: '3%'}}>
              <Button variant="outlined" color="success" onClick={addClient} >Add Client</Button>
            </Box>
            <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
          </Box>
          
        </Box>
      </Modal>

      <Box sx={styles.calenderMenu}>
        <Calendar onChange={onChange} value={value} />
        <Box sx={styles.calenderButtons}>
        <Tooltip title="Make Available">
            <IconButton sx={styles.availableButton} onClick={makeAvailable}>
                <EventAvailableIcon fontSize='inherit'/>
            </IconButton>
        </Tooltip>


        <Tooltip title="Add Client">
          <IconButton sx={styles.availableButton} onClick={handleOpen}>
            <PersonAddIcon fontSize='inherit'/>
          </IconButton>
        </Tooltip>
        

        </Box>
      </Box>
    </>
  )
}
