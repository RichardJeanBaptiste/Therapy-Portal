/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Modal, Button, Tooltip } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
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
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: '27em',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  },
  list: {
    height: '17em',
    width: '13em',
    overflowY: 'scroll',
    marginLeft: '7%'
  },
  list2: {
    display: 'flex',
    flexDirection: 'row',
    width: '15em',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listitem: {
    fontSize: '1rem',
    paddingBottom: '5%',
  },
  modalStyle2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

    return (
      <ul>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={clientName}
        aria-describedby={`Appointments Scheduled for ${clientName}`}
        >
          <Box sx={styles.modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
              {`${clientName}'s Upcoming Appointments`}
              <ul>
                <Box sx={styles.list}>
                  {Array.isArray(dates) ? (
                    dates.map((x, i) => (
                      <Box key={i} sx={styles.list2}>
                        <li key={i}>
                          <Typography variant="p" component="p" sx={styles.listitem}>{x}</Typography>
                        </li>
                      </Box>
                    ))
                  ) : (
                      <></>
                  )}
                </Box>
              </ul>
            </Typography>
            <Button variant='outlined' color='error' onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
        <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby={clientName}
        aria-describedby={`Remove ${clientName} from client list`}
        >
          <Box sx={styles.modalStyle2}>
            <Typography component='h3' variant='h3' align='center' sx={{ fontSize: '2rem'}}>{`Remove ${clientName} from client list?`}</Typography>
            <Typography component='p' variant='p' align='center' sx={{ marginTop: '2%'}}>This will remove the client and all Scheduled Appointments</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '95%', marginTop: '7%'}}>
              <Button variant='outlined' color='info' onClick={handleClose2}>Cancel</Button>
              <Button variant='outlined' color='error' sx={{ position: 'absolute', right: '6%'}}>Remove</Button>
            </Box>
          </Box>
        </Modal>
          {Array.isArray(allClients) ? (
              allClients.map((x, i) => (

                <Box key={i} sx={{ paddingBottom: '3%'}}>
                    <Box key={i} sx={styles.clientItem}>
                      <li key={i}>{x}</li>

                      <Tooltip title="Show Appointments" arrow>
                          <IconButton>
                              <VisibilityIcon onClick={() => handleOpen(x)}/>  
                          </IconButton>
                      </Tooltip>
                      

                      <Tooltip title="Remove Client" arrow>
                          <IconButton>
                            <CloseIcon onClick={() => handleOpen2(x)}/>
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

  const ShowDates = () => {

    return (
      <ul>
          {Array.isArray(availableDates) ? (
              availableDates.map((x, i) => (
              <li key={i}>{x}</li>
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
              <ShowDates/>
            </Box>
          </Box>
  
      </Box>
    </>
  )
}
