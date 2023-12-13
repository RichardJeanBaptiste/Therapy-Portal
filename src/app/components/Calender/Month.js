import React, {useState} from 'react';
import { Box, Button, Modal, Typography, TextField, Divider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Day from './Day';
import dayjs from 'dayjs';
import axios from 'axios';
import { useTheme }  from '@mui/material/styles';

const useStyles= (theme) => ({
    monthRoot: {
        display: 'flex',
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        backgroundColor: 'white',
        border: '.2px solid black',
    },

    modalStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: '28%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },

    modalStyle2: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    innerModal:{
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    inputField: {
        display: 'none',
        // width: '4%',
        // height: '4%',
        // marginTop: '2%'
    },
    inputField2: {
        display: 'block',
        // width: '4%',
        // height: '4%',
        // marginTop: '2%'
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '5%'
    }
})


export default function Month({month,username}) {

    const theme = useTheme();
    const styles = useStyles(theme);
    const [ activeDate, SetActiveDate] = useState("");
    //const [ showClientField, SetShowClient] = useState(false);
    const [ currentClient, SetClient] = useState("");
    const [ currentClients, SetCurrentClients] = useState([""]);
    const [ currentTime, SetCurrentTime] = useState("");
    const [ currentDuration, SetCurrentDuration] = useState("");
    const [ open, setOpen] = useState(false);
    const [ expandModal, SetExpandModal] = useState(false);
   

    const handleOpen = (day) => {
        
        SetActiveDate(day.format('ddd, DD MMM YYYY'))
        
        setOpen(true);

        SetCurrentClients([]);
        
        axios.post('/api/therapist/get_scheduled',{
            username: username,
            date: day
        })
        .then(function (response){
            SetCurrentClients(response.data.msg);
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });

    };

    const handleClose = () => setOpen(false);

    const handlePastDates = (thisDay) => {
        let currentDate = dayjs().subtract(1, 'day');

        if(thisDay < currentDate){
            return {
                opacity: '0.5',
                pointerEvents: 'none',    
            }
        } else {
            return {
               
            }
        }
    }

    const handleModalStyle = () => {
        if(expandModal){
            return styles.modalStyle2;
        } else {
            return styles.modalStyle;
        }
    }

    const handleInputField = () => {
        if(expandModal){
            return styles.inputField2;
        } else {
            return styles.inputField;
        }
    }

    const showClient = () => {
        SetExpandModal(true);
    }
    
    const handleClientField = (e) => {
        SetClient(e.target.value);
    }

    const cancelClientField = () => {
        SetExpandModal(false);
        SetClient("");
    }

    const makeDateAvailable = () => {
        axios.post('/api/therapist/add_available_date', {
            Username: username,
            newDate: activeDate,
        })
        .then(function (response) {
            alert(response.data.msg);
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });
    }


    const AddClient = () => {
        axios.post('/api/therapist/add_client', {
            therapist: username,
            newDate: activeDate,
            client: currentClient,
            time: dayjs(currentTime).format('hh:mm:ss A'),
            duration: dayjs(currentDuration).format('mm:ss'),
        })
        .then(function (response) {
            alert(response.data.msg);
            //SetCurrentClients(response.data.msg);
            //SetShowClient("none");
            SetClient("");
        })
        .catch(function (error) {
            console.log(error);
            alert("Something Went Wrong");
        });
    }

    const ShowScheduledClients = () => {
    
        return (
            <ul>
                {Array.isArray(currentClients) ? (
                    currentClients.map((x, i) => (
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Current-Selected-Date"
                aria-describedby="modal-modal-description"
            >
                <Box sx={handleModalStyle}>
                    <Typography id="selected-date" variant="p" component="h3" align='center'>{activeDate}</Typography>

                    <Box sx={styles.innerModal}>

                        {/** Left Side Modal */}
                        <Box sx={styles.modalButtons}>
                            <Button onClick={makeDateAvailable}>Add Availability</Button>
                            <Button onClick={showClient}>Add Client</Button>
                            <Box sx={handleInputField}>
                                <TextField id="outlined-basic" label="client name" variant="outlined" sx={{ marginTop: '3%', paddingBottom: '2%'}} onChange={handleClientField}/>

                                <Box sx={{ paddingBottom: '2%'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker label="Time" onChange={(value) => SetCurrentTime(value)}/>
                                    </LocalizationProvider>
                                </Box>
                               

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker  label="Duration" views={['minutes', 'seconds']} format="mm:ss" onChange={(value) => SetCurrentDuration(value)}/>
                                </LocalizationProvider>

                                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                    <Button onClick={cancelClientField} sx={handleInputField}>Cancel</Button>
                                    <Button onClick={AddClient} sx={handleInputField}>Confirm</Button>
                                </Box>

                                
                            </Box>

                            <Button onClick={handleClose}>Cancel</Button>

                        </Box>

                        <Divider orientation="vertical" flexItem />
                        
                        {/** Rigth Side */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '9%'}}>
                            <Typography>Scheduled</Typography>
                            <ShowScheduledClients/>
                        </Box>
                    </Box>
                      
                </Box>
            </Modal>

            <Box sx={styles.monthRoot}>
                {month.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((day, idx) => (
                                <Box key={idx} sx={handlePastDates(day)} onClick={() => handleOpen(day)}>
                                    <Day day={day} key={idx} rowIdx={i}/>
                                </Box>
                            ))}
                        </React.Fragment>
                    )
                )}
            </Box>
        </>
        
    )
}
