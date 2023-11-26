/* eslint-disable react/no-unescaped-entities */
import React, {useState, useEffect} from 'react';
import { Box, Typography, IconButton, Modal, Button } from '@mui/material';
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
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
    const [ dates, SetDates] = useState([]);
    const handleOpen = (name) => {
      SetClientName(name);
      setOpen(true);
    };
    const handleClose = () => setOpen(false);


    useEffect(() => {

      let temp = [];

      datesScheduled.forEach((entry) => {
        for (const key in entry){
          entry[key].forEach((item) => {
            if(item[0] === clientName){
              temp.push(key.toString())
            }
          })
        }
      })

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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {clientName}
              <ul>

              {Array.isArray(dates) ? (
                dates.map((x, i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'row', height: '40px', width: '100px', justifyContent: 'center', alignItems: 'center'}}>
                    <li key={i}>
                      <Typography variant="p" component="p" sx={{ fontSize: '1rem' }}>{x}</Typography>
                    </li>
                  </Box>
                ))
              ) : (
                  <></>
              )}
                
              </ul>
            </Typography>
          </Box>
        </Modal>
          {Array.isArray(allClients) ? (
              allClients.map((x, i) => (
                <Box key={i} sx={{ display: 'flex', flexDirection: 'row', height: '40px', width: '100px', justifyContent: 'center', alignItems: 'center'}}>
                   <li key={i}>{x}</li>
                   <IconButton>
                      <VisibilityIcon onClick={() => handleOpen(x)}/>  
                   </IconButton>

                   <IconButton>
                     <CloseIcon/>
                   </IconButton>
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
